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
  'seance.next.conseil': 'Prochaine séance du Conseil communal',
  'seance.next.municipalite': 'Prochaine séance de la Municipalité',
  'seance.title.conseil': 'Séance du Conseil communal',
  'seance.title.municipalite': 'Séance de la Municipalité',
  'seance.agenda': 'Ordre du jour',
  'seance.documents': 'Documents',
  'seance.back': '← Retour à la page Politique',
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
  'vie.sections': 'Rubriques',
  'photo.soon': 'Photo à venir',
  'contact.name': 'Nom',
  'contact.email': 'Adresse e-mail',
  'contact.subject': 'Sujet',
  'contact.message': 'Message',
  'contact.send': 'Envoyer',
  'contact.mailtoNote': "L'envoi ouvre votre messagerie avec le message prêt à partir.",
  'contact.from': 'De',
  'search.open': 'Rechercher sur le site',
  'search.title': 'Rechercher',
  'search.close': 'Fermer la recherche',
  'search.unavailable': 'La recherche est disponible sur le site publié (index généré au build).',
  'error.code': "Erreur 404",
  'error.title': "Page introuvable",
  'error.text': "La page que vous cherchez n'existe pas ou a été déplacée. Vérifiez l'adresse, ou poursuivez depuis l'une des pages ci-dessous.",
  'error.home': "Retour à l'accueil",
  'error.search': "Rechercher sur le site",
  'error.useful': "Pages utiles",
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
    'seance.next.conseil': 'Nächste Sitzung des Gemeinderats',
    'seance.next.municipalite': 'Nächste Sitzung der Gemeindeexekutive',
    'seance.title.conseil': 'Sitzung des Gemeinderats',
    'seance.title.municipalite': 'Sitzung der Gemeindeexekutive',
    'seance.agenda': 'Traktanden',
    'seance.documents': 'Dokumente',
    'seance.back': '← Zurück zur Seite Politik',
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
    'vie.sections': 'Rubriken',
    'photo.soon': 'Foto folgt',
    'contact.name': 'Name',
    'contact.email': 'E-Mail-Adresse',
    'contact.subject': 'Betreff',
    'contact.message': 'Nachricht',
    'contact.send': 'Senden',
    'contact.mailtoNote': 'Beim Senden öffnet sich Ihr E-Mail-Programm mit der vorbereiteten Nachricht.',
    'contact.from': 'Von',
    'search.open': 'Website durchsuchen',
    'search.title': 'Suchen',
    'search.close': 'Suche schliessen',
    'search.unavailable': 'Die Suche ist auf der veröffentlichten Website verfügbar (Index wird beim Build erstellt).',
    'error.code': "Fehler 404",
    'error.title': "Seite nicht gefunden",
    'error.text': "Die gesuchte Seite existiert nicht oder wurde verschoben. Prüfen Sie die Adresse oder fahren Sie mit einer der folgenden Seiten fort.",
    'error.home': "Zur Startseite",
    'error.search': "Website durchsuchen",
    'error.useful': "Nützliche Seiten",
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
    'seance.next.conseil': 'Next municipal council session',
    'seance.next.municipalite': 'Next municipal executive session',
    'seance.title.conseil': 'Municipal council session',
    'seance.title.municipalite': 'Municipal executive session',
    'seance.agenda': 'Agenda',
    'seance.documents': 'Documents',
    'seance.back': '← Back to Politics',
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
    'vie.sections': 'Sections',
    'photo.soon': 'Photo coming soon',
    'contact.name': 'Name',
    'contact.email': 'Email address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.mailtoNote': 'Sending opens your email app with the message ready to go.',
    'contact.from': 'From',
    'search.open': 'Search the site',
    'search.title': 'Search',
    'search.close': 'Close search',
    'search.unavailable': 'Search is available on the published site (the index is generated at build time).',
    'error.code': "Error 404",
    'error.title': "Page not found",
    'error.text': "The page you are looking for does not exist or has moved. Check the address, or continue from one of the pages below.",
    'error.home': "Back to the home page",
    'error.search': "Search the site",
    'error.useful': "Useful pages",
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

/**
 * Site base path, without trailing slash: '' when served at a domain root, '/concise' on GitHub Pages
 * (`base` in astro.config.mjs). Every internal URL must go through withBase() or localizePath().
 */
export const BASE = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');

/** Prefixes a site-root path with the base path: '/armoiries.svg' → '/concise/armoiries.svg'. */
export function withBase(path: string): string {
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/** URL of a file from content (images, PDFs): site-root paths get the base path, full URLs are kept. */
export function assetUrl(url: string): string {
  return url.startsWith('/') ? withBase(url) : url;
}

/** '/services' + 'de' → '/concise/de/services'; French stays unprefixed ('/concise/services'). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return withBase(clean);
  return withBase(clean === '/' ? `/${lang}/` : `/${lang}${clean}`);
}

/** Removes the base path and language prefix: '/concise/de/services' → '/services'. */
export function stripLang(pathname: string): string {
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
  const [, first, ...rest] = path.split('/');
  if (first && first in languages) return `/${rest.join('/')}`;
  return path;
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
