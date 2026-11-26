# Course des Dragons 🐉

Jeu de course de dragons en 3D pour apprendre le calcul mental (GS → CM2), pensé pour iPad.

- Plane à travers les anneaux et bats les dragons rivaux.
- Deux circuits au choix : **Les Îles volantes** et **Paris** (Arc de Triomphe, Champs-Élysées, tour Eiffel, Seine, Concorde, Louvre, Notre-Dame, Sacré-Cœur). Chaque circuit est un fichier de `circuits/`, chargé juste avant la course.
- Huit dragons avec leurs compétences (vitesse, maniabilité, turbo). Quatre dragons spéciaux se débloquent avec les étoiles gagnées en course (3 ⭐ pour une victoire, +1 ⭐ pour un sans-faute).
- Tous les 6 anneaux, une question de calcul : chaque bonne réponse donne un turbo, plus fort quand on enchaîne les bonnes réponses.
- Pas de chronomètre visible. Le temps de réponse est mesuré discrètement pour l'espace parents.
- Progression automatique par répétition espacée (façon Anki), alignée sur les repères Eduscol, avec un rythme doux pour les tables (×2, ×5, ×10 puis ×3, ×4 en CE1 ; ×6 à ×9 en CE2).
- Espace parents : âge de l'enfant (plafond des notions) et grille de progression.
- Questions lues à voix haute, interface en français. Les réponses se choisissent au toucher, et seul le premier toucher compte (mauvaise réponse = bouton en pierre ; toucher en rafale = le dragon a le tournis).
- Pilotage en penchant la tablette, avec aide à la visée et recentrage automatique ; sensibilité Facile / Moyen / Expert dans l'espace parents. On peut aussi glisser le doigt sur l'écran à tout moment : le doigt prend la main, et le penché reprend dès qu'on le lâche.
- Jeu en paysage : en portrait, un écran « Tourne la tablette » met la course en pause. Si la tablette est posée à plat ou trop penchée, petite pause jusqu'à ce qu'elle soit tenue droite (désactivable dans l'espace parents).

## Ajouter un circuit

Créer `circuits/mon-circuit.js` qui exporte `{laps, cp, tight, build(W, ctx), tick(t)}` (voir `circuits/paris.js`), puis l'ajouter à la liste `CIRCUITS` dans `index.html`.

## Jouer

Ouvrir `index.html` dans un navigateur récent (three.js est chargé depuis un CDN, une connexion internet est nécessaire).
Sur iPad, « Partager → Sur l'écran d'accueil » l'ouvre en plein écran comme une application.
Pour publier en ligne : Settings → Pages → Deploy from branch `main`, dossier `/`.
