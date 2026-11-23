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
    guichet: z.array(
      z.object({
        jour: z.enum(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']),
        heures: z.string(),
      }),
    ),
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

export const collections = { commune, personnes, services, avis, seances, accueil, pilier };
