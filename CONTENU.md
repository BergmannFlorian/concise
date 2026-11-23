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
| Une séance (Conseil communal, Municipalité) | `src/content/seances/<date>-<organe>.md` |

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
categorie: Voirie
date: 2026-12-01
resume: La route sera fermée du 1er au 5 décembre.
---

Texte complet de l'avis (facultatif).
```

Les 4 avis les plus récents apparaissent automatiquement sur la page d'accueil.

## Changer une personne de contact

Un même fichier `personnes/*.yaml` est utilisé partout (accueil, services…) :
un changement de numéro se fait **à un seul endroit**.

## Icônes disponibles

`batiment`, `identite`, `carte`, `construction`, `port`, `camion`, `document`, `sac`, `salle`, `enfants`.

## Vérifier avant de publier

Le site vérifie le contenu à la construction : un champ manquant ou mal écrit donne un message
d'erreur indiquant le fichier et le champ en cause.
