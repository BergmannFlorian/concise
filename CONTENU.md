# Modifier le contenu du site

Tout le contenu se trouve dans le dossier `src/content/`. Les fichiers `.md` et `.yaml` sont du texte
simple : on peut les modifier avec n'importe quel éditeur, ou directement sur GitHub (bouton ✏️).

Le haut de chaque fichier `.md`, entre les deux lignes `---`, contient des champs (`titre: …`).
Le texte libre en dessous est écrit en [Markdown](https://www.markdownguide.org/basic-syntax/)
(`**gras**`, `*italique*`, `- liste`, `[lien](https://…)`).

> ⚠️ Dans les champs, l'indentation (les espaces en début de ligne) compte. Si un texte contient
> un deux-points `:` ou commence par `#`, mettez-le entre guillemets : `texte: "Attention : …"`.

## Où trouver quoi

| Je veux modifier… | Fichier(s) |
|---|---|
| Adresse, téléphone, horaires du guichet, urgences | `src/content/commune/infos.yaml` |
| Une personne de contact (nom, téléphone, e-mail) | `src/content/personnes/<prénom-nom>.yaml` |
| La page d'accueil | `src/content/accueil/fr.md` (et `de.md`, `en.md`) |
| Un service communal | `src/content/services/fr/<service>.md` |
| Un avis du pilier public | `src/content/avis/fr/<avis>.md` |
| Une séance (date, ordre du jour, documents) | `src/content/seances/<date>-<organe>.md` |
| La page Politique (Municipalité, dicastères, étapes, liens du Conseil) | `src/content/politique/fr.md` (et `de.md`, `en.md`) |

## Ajouter une séance

Créez `src/content/seances/2027-03-15-conseil.md` (`organe` : `conseil` ou `municipalite`) :

```markdown
---
date: 2027-03-15
organe: conseil
documents:
  - label: Préavis n° 1/2027 (PDF)
    url: /documents/preavis-2027-01.pdf
---

1. Appel
2. Adoption du procès-verbal de la séance du 7 décembre 2026
3. …
```

La prochaine séance à venir s'affiche automatiquement sur l'accueil, le pilier public et la page
Politique ; les séances passées apparaissent dans « Séances et élections récentes ».

> ℹ️ Le site étant statique, « la prochaine séance » est calculée au moment de la publication :
> il faut republier le site après une séance pour que l'affichage passe à la suivante.

## Langues

Les contenus traduits sont rangés par langue : `fr/`, `de/`, `en/`.
Pour traduire un service, copiez `services/fr/port.md` vers `services/de/port.md` et traduisez le texte
(gardez le même nom de fichier et le même champ `ancre`).
**Tant qu'une traduction n'existe pas, le site affiche la version française** avec une mention
« pas encore traduit ».

## Ajouter un avis au pilier public

Créez `src/content/avis/fr/mon-avis.md` :

```markdown
---
titre: Fermeture de la route du lac
categorie: avis
date: 2026-12-01
resume: La route sera fermée du 1er au 5 décembre.
# Facultatif : un document joint (le placer dans public/documents/)
document:
  label: Télécharger l'avis officiel (PDF)
  url: /documents/fermeture-route-du-lac.pdf
---

Texte complet de l'avis.
```

Le nom du fichier (`mon-avis`) devient l'adresse de la page : `/pilier-public/mon-avis`.
Utilisez des minuscules, sans accents ni espaces (tirets à la place).

**Catégories possibles** (champ `categorie`, à recopier tel quel) :

| Valeur | Affichée comme |
|---|---|
| `conseil` | Conseil communal |
| `elections` | Élections |
| `environnement` | Environnement |
| `sante-social` | Santé & social |
| `culture-loisirs` | Culture & loisirs |
| `securite` | Sécurité |
| `finances` | Finances |
| `avis` | Avis |

Les avis sont triés par date, du plus récent au plus ancien. Les 4 plus récents apparaissent aussi
sur la page d'accueil. Les textes de la page elle-même (introduction, encadrés, lien vers les archives)
sont dans `src/content/pilier/fr.md` (et `de.md`, `en.md`).

## Changer une personne de contact

Un même fichier `personnes/*.yaml` est utilisé partout (accueil, services…) :
un changement de numéro se fait **à un seul endroit**.

## Icônes disponibles

`batiment`, `identite`, `carte`, `construction`, `port`, `camion`, `document`, `sac`, `salle`, `enfants`.

## Vérifier avant de publier

Le site vérifie le contenu à la construction : un champ manquant ou mal écrit donne un message
d'erreur indiquant le fichier et le champ en cause.
