/**
 * Site languages and UI strings (menus, buttons, labels).
 * Editorial content lives in src/content/.
 *
 * To add a language: add it here, in `ui`, and in astro.config.mjs (i18n.locales).
 */

export const languages = {
  fr: 'Français',
  de: 'Deutsch',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';
export const langList = Object.keys(languages) as Lang[];

/** Locale used to format dates and numbers. */
export const intlLocale: Record<Lang, string> = {
  fr: 'fr-CH',
  de: 'de-CH',
  en: 'en-GB',
};

const fr = {
  'meta.description': "Site de la commune de Concise : informations, services communaux, pilier public et vie au village.",
  'skip': 'Aller au contenu',
  'unofficial.title': 'Site non officiel',
  'unofficial.text': 'Proposition de refonte réalisée à titre personnel. Le site officiel de la commune est',
  'topbar.desk': 'Guichet :',
  'topbar.emergency': 'Urgences, week-ends :',
  'brand.sub': 'Commune vaudoise',
  'brand.coatAlt': 'Armoiries de Concise',
  'nav.label': 'Navigation principale',
  'nav.menu': 'Menu',
  'nav.home': 'Accueil',
  'nav.pilier': 'Pilier public',
  'nav.politique': 'Politique',
  'nav.services': 'Services',
  'nav.vie': 'Vie quotidienne',
  'nav.locations': 'Locations',
  'nav.contact': 'Contact',
  'lang.label': 'Langue',
  'theme.toDark': 'Activer le thème sombre',
  'theme.toLight': 'Activer le thème clair',
  'breadcrumb': "Fil d'Ariane",
  'footer.contact': 'Contact',
  'footer.desk': 'Guichet',
  'footer.copyright': '© Administration communale de Concise',
  'home.allInfo': 'Toutes les informations →',
  'home.nextSession': 'Prochaine séance',
  'home.agenda': 'Ordre du jour et préavis →',
  'home.contacts': 'Qui contacter ?',
  'organe.conseil': 'Conseil communal',
  'organe.municipalite': 'Municipalité',
  'services.title': 'Services communaux',
  'services.intro': "À qui s'adresser, pour quoi, et comment nous joindre.",
  'services.nav': 'Services',
  'notTranslated': "Ce contenu n'est pas encore traduit.",
  'soon.title': 'Page en préparation',
  'soon.text': 'Cette page sera bientôt disponible. En attendant, consultez le site officiel :',
  'seance.next.conseil': 'Prochaine séance du Conseil communal',
  'seance.next.municipalite': 'Prochaine séance de la Municipalité',
  'pilier.featured': 'À la une',
  'pilier.agenda': 'Ordre du jour →',
  'pilier.searchLabel': 'Rechercher un avis',
  'pilier.searchPlaceholder': 'Rechercher un avis…',
  'pilier.filterLabel': 'Filtrer par catégorie',
  'pilier.all': 'Tout',
  'pilier.count.one': '1 avis',
  'pilier.count.other': '{n} avis',
  'pilier.empty': 'Aucun avis ne correspond à votre recherche.',
  'pilier.published': 'Publié le',
  'pilier.back': '← Retour au pilier public',
  'cat.conseil': 'Conseil communal',
  'cat.elections': 'Élections',
  'cat.environnement': 'Environnement',
  'cat.sante-social': 'Santé & social',
  'cat.culture-loisirs': 'Culture & loisirs',
  'cat.securite': 'Sécurité',
  'cat.finances': 'Finances',
  'cat.avis': 'Avis',
} as const;

export type UIKey = keyof typeof fr;

/** Notice board categories (keys used in content files; labels are the `cat.*` UI strings). */
export const avisCategories = [
  'conseil',
  'elections',
  'environnement',
  'sante-social',
  'culture-loisirs',
  'securite',
  'finances',
  'avis',
] as const;
export type AvisCategory = (typeof avisCategories)[number];

export const ui: Record<Lang, Partial<Record<UIKey, string>>> = {
  fr,
  de: {
    'meta.description': 'Website der Gemeinde Concise: Informationen, Gemeindedienste, amtliche Anschläge und Dorfleben.',
    'skip': 'Zum Inhalt springen',
    'unofficial.title': 'Inoffizielle Website',
    'unofficial.text': 'Privat erstellter Vorschlag für eine Neugestaltung. Die offizielle Website der Gemeinde ist',
    'topbar.desk': 'Schalter:',
    'topbar.emergency': 'Notfälle, Wochenende:',
    'brand.sub': 'Gemeinde im Kanton Waadt',
    'brand.coatAlt': 'Wappen von Concise',
    'nav.label': 'Hauptnavigation',
    'nav.menu': 'Menü',
    'nav.home': 'Startseite',
    'nav.pilier': 'Amtliche Anschläge',
    'nav.politique': 'Politik',
    'nav.services': 'Dienste',
    'nav.vie': 'Alltag',
    'nav.locations': 'Vermietung',
    'nav.contact': 'Kontakt',
    'lang.label': 'Sprache',
    'theme.toDark': 'Dunkles Design aktivieren',
    'theme.toLight': 'Helles Design aktivieren',
    'breadcrumb': 'Brotkrümelnavigation',
    'footer.contact': 'Kontakt',
    'footer.desk': 'Schalter',
    'footer.copyright': '© Gemeindeverwaltung Concise',
    'home.allInfo': 'Alle Informationen →',
    'home.nextSession': 'Nächste Sitzung',
    'home.agenda': 'Traktanden und Vorlagen →',
    'home.contacts': 'An wen wende ich mich?',
    'organe.conseil': 'Gemeinderat',
    'organe.municipalite': 'Gemeindeexekutive',
    'services.title': 'Gemeindedienste',
    'services.intro': 'Wer ist wofür zuständig und wie erreichen Sie uns.',
    'services.nav': 'Dienste',
    'notTranslated': 'Dieser Inhalt ist noch nicht übersetzt und wird auf Französisch angezeigt.',
    'soon.title': 'Seite in Vorbereitung',
    'soon.text': 'Diese Seite ist bald verfügbar. Bis dahin finden Sie alles auf der offiziellen Website:',
    'seance.next.conseil': 'Nächste Sitzung des Gemeinderats',
    'seance.next.municipalite': 'Nächste Sitzung der Gemeindeexekutive',
    'pilier.featured': 'Aktuell',
    'pilier.agenda': 'Traktanden →',
    'pilier.searchLabel': 'Mitteilung suchen',
    'pilier.searchPlaceholder': 'Mitteilung suchen…',
    'pilier.filterLabel': 'Nach Kategorie filtern',
    'pilier.all': 'Alle',
    'pilier.count.one': '1 Mitteilung',
    'pilier.count.other': '{n} Mitteilungen',
    'pilier.empty': 'Keine Mitteilung entspricht Ihrer Suche.',
    'pilier.published': 'Veröffentlicht am',
    'pilier.back': '← Zurück zu den amtlichen Anschlägen',
    'cat.conseil': 'Gemeinderat',
    'cat.elections': 'Wahlen',
    'cat.environnement': 'Umwelt',
    'cat.sante-social': 'Gesundheit & Soziales',
    'cat.culture-loisirs': 'Kultur & Freizeit',
    'cat.securite': 'Sicherheit',
    'cat.finances': 'Finanzen',
    'cat.avis': 'Mitteilungen',
  },
  en: {
    'meta.description': 'Website of the municipality of Concise: information, municipal services, official notices and village life.',
    'skip': 'Skip to content',
    'unofficial.title': 'Unofficial website',
    'unofficial.text': 'A redesign proposal made in a personal capacity. The official website of the municipality is',
    'topbar.desk': 'Front desk:',
    'topbar.emergency': 'Emergencies, weekends:',
    'brand.sub': 'Municipality of Vaud',
    'brand.coatAlt': 'Coat of arms of Concise',
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.pilier': 'Official notices',
    'nav.politique': 'Politics',
    'nav.services': 'Services',
    'nav.vie': 'Daily life',
    'nav.locations': 'Rentals',
    'nav.contact': 'Contact',
    'lang.label': 'Language',
    'theme.toDark': 'Switch to dark theme',
    'theme.toLight': 'Switch to light theme',
    'breadcrumb': 'Breadcrumb',
    'footer.contact': 'Contact',
    'footer.desk': 'Front desk',
    'footer.copyright': '© Municipal administration of Concise',
    'home.allInfo': 'All notices →',
    'home.nextSession': 'Next session',
    'home.agenda': 'Agenda and proposals →',
    'home.contacts': 'Who to contact?',
    'organe.conseil': 'Municipal council',
    'organe.municipalite': 'Municipal executive',
    'services.title': 'Municipal services',
    'services.intro': 'Who handles what, and how to reach us.',
    'services.nav': 'Services',
    'notTranslated': 'This content has not been translated yet and is shown in French.',
    'soon.title': 'Page in progress',
    'soon.text': 'This page will be available soon. Meanwhile, please visit the official website:',
    'seance.next.conseil': 'Next municipal council session',
    'seance.next.municipalite': 'Next municipal executive session',
    'pilier.featured': 'Featured',
    'pilier.agenda': 'Agenda →',
    'pilier.searchLabel': 'Search notices',
    'pilier.searchPlaceholder': 'Search notices…',
    'pilier.filterLabel': 'Filter by category',
    'pilier.all': 'All',
    'pilier.count.one': '1 notice',
    'pilier.count.other': '{n} notices',
    'pilier.empty': 'No notice matches your search.',
    'pilier.published': 'Published on',
    'pilier.back': '← Back to official notices',
    'cat.conseil': 'Municipal council',
    'cat.elections': 'Elections',
    'cat.environnement': 'Environment',
    'cat.sante-social': 'Health & social',
    'cat.culture-loisirs': 'Culture & leisure',
    'cat.securite': 'Safety',
    'cat.finances': 'Finance',
    'cat.avis': 'Notices',
  },
};

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? fr[key];
}

/** `[...lang]` route param → language (missing = French). */
export function langFromParam(param: string | undefined): Lang {
  return param && param in languages ? (param as Lang) : defaultLang;
}

/** Static paths for a page that exists in every language. */
export function langPaths() {
  return langList.map((lang) => ({ params: { lang: lang === defaultLang ? undefined : lang } }));
}

/** '/services' + 'de' → '/de/services'; French stays unprefixed. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Removes the language prefix from a path: '/de/services' → '/services'. */
export function stripLang(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (first && first in languages) return `/${rest.join('/')}`;
  return pathname;
}

/** Main navigation pages. Slugs stay in French in every language. */
export const navItems = [
  { key: 'home', path: '/', label: 'nav.home' },
  { key: 'pilier', path: '/pilier-public', label: 'nav.pilier' },
  { key: 'politique', path: '/politique', label: 'nav.politique' },
  { key: 'services', path: '/services', label: 'nav.services' },
  { key: 'vie', path: '/vie-quotidienne', label: 'nav.vie' },
  { key: 'locations', path: '/locations', label: 'nav.locations' },
] as const satisfies readonly { key: string; path: string; label: UIKey }[];

export type PageKey = (typeof navItems)[number]['key'] | 'contact';
