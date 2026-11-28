# Course des Dragons 🐉

Jeu de course de dragons en 3D pour apprendre le calcul mental (GS → CM2), pensé pour iPad.

- Plane à travers les anneaux et bats les dragons rivaux.
- Quatre circuits : **Les Îles volantes**, **Paris** (Arc de Triomphe, tour Eiffel, Seine, Louvre, Notre-Dame, Sacré-Cœur), **San Francisco** (Golden Gate, Alcatraz, collines, cable cars ; 30 ⭐) et **Washington** (Capitole, Washington Monument, Maison-Blanche, Lincoln, cerisiers ; 60 ⭐). Chaque circuit est un fichier de `circuits/`, chargé juste avant la course.
- Œufs de dragon : chaque bonne réponse tapée du premier coup réchauffe l'œuf ; il éclot en fin de course et donne un bébé dragon jouable (8 à collectionner, puis des œufs d'or). Il y a toujours un œuf presque prêt.
- Pouvoirs gagnés par les maths : 3 bonnes réponses d'affilée = souffle de feu (une boule de feu file vers le dragon devant et le fait tourner sur lui-même), 5 = bouclier de 10 s. Des cristaux mystère au centre du circuit donnent feu, bouclier, étoile turbo ou aimant à anneaux. Les rivaux crachent parfois du feu aussi ; le bouclier protège.
- Huit dragons avec leurs compétences (vitesse, maniabilité, turbo). Quatre dragons spéciaux se débloquent avec les étoiles gagnées en course (3 ⭐ pour une victoire, +1 ⭐ pour un sans-faute).
- Tous les 6 anneaux, une question de calcul : chaque bonne réponse donne un turbo, plus fort quand on enchaîne les bonnes réponses.
- Pas de chronomètre visible. Le temps de réponse est mesuré discrètement pour l'espace parents.
- Progression automatique par répétition espacée (façon Anki), alignée sur les repères Eduscol, avec un rythme doux pour les tables (×2, ×5, ×10 puis ×3, ×4 en CE1 ; ×6 à ×9 en CE2).
- Espace parents : « Recommencer le jeu » (étoiles, œufs, dragons, circuits) et « Effacer les calculs », avec confirmation.
- Espace parents : âge de l'enfant (plafond des notions) et grille de progression.
- Questions lues à voix haute, interface en français. Pendant le calcul, la course s'arrête complètement. Le clavier n'apparaît qu'un peu après la question. 3 essais au clavier (avec une pause entre chaque), puis QCM à 4 choix, puis à 2 choix, puis la réponse est montrée. Le calcul complet est lu à voix haute (« 3 plusse 2 égal 5 »).
- Impossible d'échapper aux maths : les anneaux ratés comptent aussi pour la prochaine question, et une question surprise arrive si aucune n'a été posée depuis 15 s.
- Pilotage en penchant la tablette, avec aide à la visée et recentrage automatique ; sensibilité Facile / Moyen / Expert dans l'espace parents. On peut aussi glisser le doigt sur l'écran à tout moment : le doigt prend la main, et le penché reprend dès qu'on le lâche.
- Jeu en paysage : en portrait, un écran « Tourne la tablette » met la course en pause. Si la tablette est posée à plat ou trop penchée, petite pause jusqu'à ce qu'elle soit tenue droite (désactivable dans l'espace parents).

## Ajouter un circuit

Créer `circuits/mon-circuit.js` qui exporte `{laps, cp, tight, build(W, ctx), tick(t)}` (voir `circuits/paris.js`, ou `circuits/kit.js` pour les outils partagés), puis l'ajouter à la liste `CIRCUITS` dans `index.html`.

## Jouer

Ouvrir `index.html` dans un navigateur récent (three.js est chargé depuis un CDN, une connexion internet est nécessaire).
Sur iPad, « Partager → Sur l'écran d'accueil » l'ouvre en plein écran comme une application.
Pour publier en ligne : Settings → Pages → Deploy from branch `main`, dossier `/`.
