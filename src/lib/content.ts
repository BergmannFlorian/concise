import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { defaultLang, intlLocale, localizePath, type Lang } from '../i18n/ui';

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
export async function getLocalizedEntry<
  C extends 'accueil' | 'pilier' | 'politique' | 'vie' | 'locations' | 'contact',
>(collection: C, lang: Lang) {
  const entry = (await getEntry(collection, lang)) ?? (await getEntry(collection, defaultLang));
  if (!entry) throw new Error(`Missing content: src/content/${collection}/${defaultLang}.md`);
  return { entry, fallback: entry.id !== lang };
}

export async function getCommune() {
  const entry = await getEntry('commune', 'infos');
  if (!entry) throw new Error('Missing content: src/content/commune/infos.yaml');
  return entry.data;
}

type Organe = CollectionEntry<'seances'>['data']['organe'];

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/** Next upcoming session, optionally for one body only (evaluated at build time). */
export async function getNextSeance(organe?: Organe) {
  const today = startOfToday();
  const seances = await getCollection('seances');
  return seances
    .filter((s) => s.data.date >= today && (!organe || s.data.organe === organe))
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())[0];
}

/** Past sessions, most recent first. */
export async function getPastSeances(organe?: Organe) {
  const today = startOfToday();
  const seances = await getCollection('seances');
  return seances
    .filter((s) => s.data.date < today && (!organe || s.data.organe === organe))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** URL of a session page (agenda, documents). */
export function seanceHref(id: string, lang: Lang) {
  return localizePath(`/politique/seances/${id}`, lang);
}

/** Initials for an avatar: 'Marc-André Burdet' → 'MB'. */
export function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
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

interface ContactInput {
  personne?: { collection: 'personnes'; id: string };
  nom?: string;
  role?: string;
  telephone?: string;
  email?: string;
  url?: string;
}

/** Merges a content contact with its referenced person (explicit fields win). */
export async function resolveContact(c: ContactInput) {
  const p = c.personne ? (await getEntry(c.personne))?.data : undefined;
  return {
    nom: c.nom ?? p?.nom,
    role: c.role,
    telephone: c.telephone ?? p?.telephone,
    email: c.email ?? p?.email,
    url: c.url,
  };
}

export type ResolvedContact = Awaited<ReturnType<typeof resolveContact>>;
