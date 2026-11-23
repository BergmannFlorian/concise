/**
 * Schemas for the editable content (src/content/).
 * Each translated collection is organised by language: src/content/<collection>/<fr|de|en>/<file>.md
 * An entry missing in a language falls back to the French version (see src/lib/content.ts).
 *
 * Field names are intentionally in French: they are what (French-speaking) editors type.
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { avisCategories } from './i18n/ui';

const icone = z.enum([
  'batiment',
  'identite',
  'carte',
  'construction',
  'port',
  'camion',
  'document',
  'sac',
  'salle',
  'enfants',
]);

const lien = z.object({ label: z.string(), url: z.string() });

/** Opening hours row; weekday names are translated automatically. */
const horaire = z.object({
  jour: z.enum(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']),
  heures: z.string(),
});

/** Big number + label (stats, capacities, prices). */
const chiffre = z.object({ valeur: z.coerce.string(), libelle: z.string() });

/** General municipality info (not translated; weekday names are translated automatically). */
const commune = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/commune' }),
  schema: z.object({
    adresse: z.array(z.string()),
    telephone: z.string(),
    email: z.string(),
    urgences: z.string(),
    facebook: z.url(),
    siteOfficiel: z.url(),
    guichet: z.array(horaire),
  }),
});

/** Contact people: one file per person, referenced from services and the home page. */
const personnes = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/personnes' }),
  schema: z.object({
    nom: z.string(),
    telephone: z.string().optional(),
    email: z.string().optional(),
  }),
});

const contact = z.object({
  personne: reference('personnes').optional(),
  /** Without a person: name displayed as is (e.g. 'Garde-port'). */
  nom: z.string().optional(),
  role: z.string().optional(),
  telephone: z.string().optional(),
  email: z.string().optional(),
  /** Website (shown instead of / next to phone and email). */
  url: z.string().optional(),
});

/** Municipal services: one Markdown file per service; the file body is the description. */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    titre: z.string(),
    /** In-page anchor (#greffe…), identical in every language. */
    ancre: z.string(),
    ordre: z.number(),
    icone,
    miseEnAvant: z.boolean().default(false),
    taches: z.array(z.string()).default([]),
    contacts: z.array(contact).default([]),
    encadres: z
      .array(z.object({ titre: z.string().optional(), texte: z.string().optional(), lien: lien.optional() }))
      .default([]),
    bouton: lien.extend({ direct: z.boolean().default(false) }).optional(),
  }),
});

/** Pilier public (official notice board): notices, announcements, public inquiries. */
const avis = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/avis' }),
  schema: z.object({
    titre: z.string(),
    categorie: z.enum(avisCategories),
    date: z.coerce.date(),
    resume: z.string().optional(),
    /** Optional attached document (PDF…), e.g. in public/documents/. */
    document: lien.optional(),
  }),
});

/** Sessions (municipal council, executive). Not translated: the body name comes from the UI strings. */
const seances = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/seances' }),
  schema: z.object({
    date: z.coerce.date(),
    organe: z.enum(['conseil', 'municipalite']),
    /** Agenda items, proposals, minutes… (files in public/documents/). The body is the agenda. */
    documents: z.array(lien).default([]),
  }),
});

/** Home page content. */
const accueil = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/accueil' }),
  schema: z.object({
    surtitre: z.string(),
    titre: z.string(),
    intro: z.string(),
    liensHero: z.array(lien.extend({ direct: z.boolean().default(false) })).default([]),
    raccourcisTitre: z.string(),
    raccourcis: z.array(lien.extend({ icone })),
    pilierTitre: z.string(),
    villageTitre: z.string(),
    villageLiens: z.array(lien).default([]),
    chiffres: z.array(z.object({ valeur: z.coerce.string(), libelle: z.string() })),
    contacts: z.array(
      z.object({ personne: reference('personnes'), libelle: z.string(), description: z.string() }),
    ),
    notes: z.array(z.object({ titre: z.string(), texte: z.string(), lien: lien.optional() })).default([]),
  }),
});

/** Pilier public page texts (intro, sidebar boxes, archive link), one file per language. */
const pilier = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pilier' }),
  schema: z.object({
    intro: z.string(),
    archives: lien.optional(),
    encadres: z
      .array(
        z.object({
          titre: z.string(),
          texte: z.string(),
          lien: lien.optional(),
          /** true = beige background (highlight), false = white card. */
          accent: z.boolean().default(false),
        }),
      )
      .default([]),
  }),
});

const carte = z.object({ surtitre: z.string(), titre: z.string(), texte: z.string() });

/** Politique page: executive members, request steps, council links. One file per language. */
const politique = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/politique' }),
  schema: z.object({
    intro: z.string(),
    executif: carte,
    legislatif: carte,
    municipaliteIntro: z.string(),
    membres: z.array(
      z.object({
        personne: reference('personnes'),
        fonction: z.string(),
        /** Highlighted avatar (e.g. the syndic). */
        principal: z.boolean().default(false),
        dicasteres: z.array(z.string()).default([]),
      }),
    ),
    demandeTitre: z.string(),
    etapes: z.array(z.object({ titre: z.string(), texte: z.string(), lien: lien.optional() })),
    conseilLiens: z.array(z.object({ titre: z.string(), texte: z.string(), url: z.string() })).default([]),
    recentsTitre: z.string(),
  }),
});

/** Vie quotidienne page. Each section has a short `menu` label (chip) and a `titre` (heading). */
const vie = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/vie' }),
  schema: z.object({
    titre: z.string(),
    intro: z.string(),
    enfants: z.object({
      menu: z.string(),
      titre: z.string(),
      cartes: z.array(z.object({ surtitre: z.string(), titre: z.string(), texte: z.string(), url: z.string() })),
    }),
    ecoles: z.object({
      menu: z.string(),
      titre: z.string(),
      ecoles: z.object({ titre: z.string(), texte: z.string(), lien }),
      bibliotheque: z.object({
        titre: z.string(),
        texte: z.string(),
        horaires: z.array(horaire),
        contact,
      }),
    }),
    dechets: z.object({
      menu: z.string(),
      titre: z.string(),
      texte: z.string(),
      cartes: z.array(z.object({ valeur: z.string(), titre: z.string(), texte: z.string() })),
      document: lien.optional(),
      remarque: z.string().optional(),
    }),
    village: z.object({
      menu: z.string(),
      titre: z.string(),
      liens: z.array(z.object({ titre: z.string(), texte: z.string(), url: z.string() })),
    }),
    histoire: z.object({
      menu: z.string(),
      titre: z.string(),
      cartes: z.array(
        z.object({
          titre: z.string(),
          url: z.string(),
          /** Image path in public/ (e.g. /images/eglise.jpg). Without it, a placeholder is shown. */
          image: z.string().optional(),
          /** Image description (alt text), or placeholder caption. */
          photo: z.string(),
        }),
      ),
    }),
  }),
});

const lieu = z.object({
  surtitre: z.string(),
  titre: z.string(),
  chiffres: z.array(chiffre).default([]),
  texte: z.string().optional(),
  documents: z.array(lien).default([]),
  bouton: lien.optional(),
  contact: contact.optional(),
  image: z.string().optional(),
  photo: z.string().optional(),
});

/** Locations page: main venue, secondary venues, other (non-municipal) places. */
const locations = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/locations' }),
  schema: z.object({
    titre: z.string(),
    intro: z.string(),
    principal: lieu,
    /** `style`: beige or lake-blue card. */
    secondaires: z.array(lieu.extend({ style: z.enum(['beige', 'bleu']).default('beige') })).default([]),
    autresTitre: z.string(),
    autresIntro: z.string(),
    autres: z.array(z.object({ nom: z.string(), description: z.string(), contact })).default([]),
  }),
});

/** Contact page texts; address, phone and hours come from commune/infos.yaml. */
const contactPage = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/contact' }),
  schema: z.object({
    titre: z.string(),
    adresseTitre: z.string(),
    guichetTitre: z.string(),
    guichetNote: z.string(),
    urgencesTitre: z.string(),
    formTitre: z.string(),
    sujets: z.array(z.string()),
    formNote: z.string(),
    directsTitre: z.string(),
    directs: z.array(contact.extend({ libelle: z.string() })),
  }),
});

export const collections = {
  commune,
  personnes,
  services,
  avis,
  seances,
  accueil,
  pilier,
  politique,
  vie,
  locations,
  contact: contactPage,
};
