import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { defaultLang, intlLocale, type Lang } from '../i18n/ui';

type LocalizedCollection = 'services' | 'avis';

export interface Localized<C extends LocalizedCollection> {
  slug: string;
  entry: CollectionEntry<C>;
  /** true when the entry does not exist in the requested language and French is shown instead. */
  fallback: boolean;
}

/**
 * Entries of a collection organised by language (<lang>/<slug>.md), falling back
 * to French when a translation is missing.
 */
export async function getLocalized<C extends LocalizedCollection>(
  collection: C,
  lang: Lang,
): Promise<Localized<C>[]> {
  const all = (await getCollection(collection)) as CollectionEntry<C>[];
  const bySlug = new Map<string, Localized<C>>();

  for (const entry of all) {
    const [entryLang, ...rest] = entry.id.split('/');
    const slug = rest.join('/');
    if (entryLang === lang) bySlug.set(slug, { slug, entry, fallback: false });
    else if (entryLang === defaultLang && !bySlug.has(slug)) {
      bySlug.set(slug, { slug, entry, fallback: lang !== defaultLang });
    }
  }
  return [...bySlug.values()];
}

/** Single entry per language (e.g. accueil/fr.md), falling back to French. */
export async function getLocalizedEntry<C extends 'accueil'>(collection: C, lang: Lang) {
  const entry = (await getEntry(collection, lang)) ?? (await getEntry(collection, defaultLang));
  if (!entry) throw new Error(`Missing content: src/content/${collection}/${defaultLang}.md`);
  return { entry, fallback: entry.id !== lang };
}

export async function getCommune() {
  const entry = await getEntry('commune', 'infos');
  if (!entry) throw new Error('Missing content: src/content/commune/infos.yaml');
  return entry.data;
}

/** Next upcoming session (evaluated at build time). */
export async function getNextSeance() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const seances = await getCollection('seances');
  return seances
    .filter((s) => s.data.date >= today)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())[0];
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

const weekdays = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const;

/** 'lundi' → 'Lundi' / 'Montag' / 'Monday' (or short form: 'lun.' / 'Mo' / 'Mon'). */
export function weekdayName(jour: (typeof weekdays)[number], lang: Lang, style: 'long' | 'short' = 'long') {
  // 1 January 2024 was a Monday
  const date = new Date(Date.UTC(2024, 0, 1 + weekdays.indexOf(jour), 12));
  const name = new Intl.DateTimeFormat(intlLocale[lang], { weekday: style, timeZone: 'UTC' }).format(date);
  return style === 'long' ? name.charAt(0).toUpperCase() + name.slice(1) : name;
}

export function formatDate(date: Date, lang: Lang, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(intlLocale[lang], { timeZone: 'Europe/Zurich', ...options }).format(date);
}
