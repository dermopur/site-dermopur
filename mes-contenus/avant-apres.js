/* =====================================================================
   MES AVANT / APRÈS (curseur à faire glisser sur la page d'accueil)
   ---------------------------------------------------------------------
   Chaque bloc = une comparaison. Pour en ajouter une :
     1. déposez deux photos de MÊME TAILLE dans le dossier « photos »
        (la même zone, cadrée de la même façon, avant puis après) ;
     2. copiez un bloc ci-dessous, du « { » jusqu'au « }, », et changez
        les textes et les noms de fichiers.
   - titre   : le nom affiché sous le curseur
   - avant   : la photo AVANT
   - apres   : la photo APRÈS
   - ratio   : largeur / hauteur de vos photos, par exemple "736 / 440"
   - alt     : une courte description pour les personnes qui ne voient pas l'image
   Tant que la liste est vide, la partie « Avant / Après » n'apparaît pas.
   Photos de clients : uniquement avec leur accord écrit.
   ===================================================================== */

var AVANT_APRES = [
  {
    titre: "Lèvres",
    avant: "photos/levres-avant.jpg",
    apres: "photos/levres-apres.jpg",
    ratio: "736 / 440",
    alt: "Lèvres avant et après un maquillage semi-permanent"
  },
  {
    titre: "Taches de rousseur",
    avant: "photos/taches-avant.jpg",
    apres: "photos/taches-apres.jpg",
    ratio: "900 / 425",
    alt: "Visage avant et après des taches de rousseur en maquillage semi-permanent"
  },
];
