/* =====================================================================
   LES AVIS DE MES CLIENTS
   ---------------------------------------------------------------------
   Tant que ce fichier est vide, la partie « Les avis de mes clients »
   n'apparaît pas sur la page d'accueil.

   1) LES LIENS :
      - LIEN_VOIR_AVIS     : le lien qui ouvre vos avis Google
      - LIEN_DEPOSER_AVIS  : le lien qui permet de laisser un avis
      (Dans Google Business Profile : « Demander des avis » → copier le lien.)

   2) LES AVIS : recopiez vos plus beaux avis, un par bloc.
      Pour aller à la ligne dans un avis, écrivez \n.
      Ne recopiez que de vrais avis, mot pour mot. Mettez seulement
      le prénom et l'initiale du nom du client.

      Exemple de bloc (à recopier entre les crochets ci-dessous) :
        {
          nom: "Prénom N.",
          etoiles: 5,
          texte: "Texte de l'avis, recopié tel qu'il a été écrit sur Google."
        },
   ===================================================================== */

var LIEN_VOIR_AVIS = "https://share.google/HfPQmJmLSuuzoQI6j";
var LIEN_DEPOSER_AVIS = "https://g.page/r/CcM386THVuvcEAE/review";

var AVIS = [
  {
    nom: "Christelle",
    etoiles: 5,
    texte: "Ravie de ce premier maquillage semi-permanent des ras de cils, résultat très naturel. […]"
  },
  {
    nom: "Lucie C.",
    etoiles: 5,
    texte: "J'ai fait appel à Dermopur pour des taches de rousseur. Indie, a pris le temps de tout bien m'expliquer. […]"
  },
];
