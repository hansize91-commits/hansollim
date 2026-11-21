import fs from 'node:fs';
import path from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';

export type ExhibitionEntry = CollectionEntry<'exhibitions'>;
export type Category = ExhibitionEntry['data']['category'];

const IMAGE_RE = /\.(jpe?g|png|webp|gif|avif)$/i;

export function compareExhibitions(a: ExhibitionEntry, b: ExhibitionEntry): number {
  const aTime = a.data.start?.getTime();
  const bTime = b.data.start?.getTime();
  if (aTime != null && bTime != null && aTime !== bTime) return bTime - aTime;
  const aOrder = a.data.order;
  const bOrder = b.data.order;
  if (aOrder != null && bOrder != null && aOrder !== bOrder) return bOrder - aOrder;
  const aYear = a.data.year ?? (aTime != null ? new Date(aTime).getUTCFullYear() : 0);
  const bYear = b.data.year ?? (bTime != null ? new Date(bTime).getUTCFullYear() : 0);
  return bYear - aYear;
}

export async function exhibitionsIn(category: Category): Promise<ExhibitionEntry[]> {
  const all = await getCollection('exhibitions');
  return all.filter((entry) => entry.data.category === category).sort(compareExhibitions);
}

const SUBFOLDER_ORDER = [
  '아카이브',
  '엽서',
  '전시 전경사진',
  '오프닝 사진',
  '전시연계프로그램',
  '아마도 태권도일지',
  '전경',
  '작품',
  '오프닝',
];

function byName(a: string, b: string): number {
  return a.localeCompare(b, 'en', { numeric: true });
}

function listImages(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => !entry.name.startsWith('.'));
  const files = entries
    .filter((entry) => entry.isFile() && IMAGE_RE.test(entry.name))
    .map((entry) => entry.name)
    .sort(byName);
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => {
      const ai = SUBFOLDER_ORDER.indexOf(a);
      const bi = SUBFOLDER_ORDER.indexOf(b);
      const ar = ai === -1 ? SUBFOLDER_ORDER.length : ai;
      const br = bi === -1 ? SUBFOLDER_ORDER.length : bi;
      if (ar !== br) return ar - br;
      return byName(a, b);
    });
  const nested = dirs.flatMap((name) =>
    listImages(path.join(dir, name)).map((rel) => `${name}/${rel}`),
  );
  return [...files, ...nested];
}

function publicUrl(folder: string, relativePath: string): string {
  const encoded = relativePath.split('/').map((part) => encodeURIComponent(part)).join('/');
  return `/exhibitions/${folder}/photos/${encoded}`;
}

export function photoFiles(folder: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'exhibitions', folder, 'photos');
  if (!fs.existsSync(dir)) return [];
  return listImages(dir).map((rel) => publicUrl(folder, rel));
}

function publicFileExists(urlPath: string): boolean {
  const clean = decodeURIComponent(urlPath.split('?')[0] ?? '');
  const relative = clean.startsWith('/') ? clean.slice(1) : clean;
  return fs.existsSync(path.join(process.cwd(), 'public', relative));
}

export function exhibitionPhotos(
  folder: string,
  gallery?: Array<string | { image?: string }>,
): string[] {
  const listed = (gallery ?? [])
    .map((item) => (typeof item === 'string' ? item : item?.image ?? ''))
    .map((item) => item.trim())
    .filter((item) => item.startsWith('/') && publicFileExists(item));
  if (listed.length > 0) return listed;
  return photoFiles(folder);
}

export function posterFile(folder: string, poster?: string): string | undefined {
  if (!poster) return undefined;
  if (poster.startsWith('/')) return publicFileExists(poster) ? poster : undefined;
  const abs = path.join(process.cwd(), 'public', 'exhibitions', folder, poster);
  if (!fs.existsSync(abs)) return undefined;
  return `/exhibitions/${folder}/${encodeURIComponent(poster)}`;
}

export function paragraphs(body: string | undefined): string[] {
  if (!body) return [];
  return body
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function dateLine(data: {
  start?: Date;
  end?: Date;
  dateLabel?: string;
  year?: number;
}): string {
  if (data.dateLabel) return data.dateLabel;
  if (!data.start || !data.end) return data.year ? String(data.year) : '';
  const part = (date: Date) => ({
    y: date.getUTCFullYear(),
    m: String(date.getUTCMonth() + 1).padStart(2, '0'),
    d: String(date.getUTCDate()).padStart(2, '0'),
  });
  const start = part(data.start);
  const end = part(data.end);
  if (start.y === end.y && start.m === end.m) return `${start.y}.${start.m}.${start.d}-${end.d}`;
  if (start.y === end.y) return `${start.y}.${start.m}.${start.d}-${end.m}.${end.d}`;
  return `${start.y}.${start.m}.${start.d}-${end.y}.${end.m}.${end.d}`;
}

export function paragraphAlign(text: string): string {
  const value = text.trim();
  if (/^\d+$/.test(value)) return 'is-center';
  if (value.startsWith('- ') || value.startsWith('글,') || value.includes(']글,')) return 'is-end';
  return '';
}
