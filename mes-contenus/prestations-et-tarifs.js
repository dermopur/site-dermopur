/* =====================================================================
   MES PRESTATIONS ET MES TARIFS
   ---------------------------------------------------------------------
   C'est ici que vous changez les prix, les durées et les textes des
   prestations. Ils se mettent à jour tout seuls sur toutes les pages.

   Règles simples :
   - Ne modifiez que le texte ENTRE les guillemets "..." et les nombres.
   - Gardez les guillemets, les virgules et les accolades { } en place.
   - Si vous voulez écrire des guillemets dans un texte, utilisez « ».
   ===================================================================== */


/* ---------- LES PRESTATIONS ----------
   Pour chaque prestation :
   - nom          : le nom affiché
   - categorie    : le groupe dans lequel elle apparaît
                    ("Sourcils", "Yeux", "Lèvres", "Visage" ou "Retouches")
   - minutes      : la durée du rendez-vous (sert au planning en ligne)
   - prix         : le prix en euros
   - photo        : le nom du fichier photo, à déposer dans le dossier « photos »
                    (laissez "" pour une prestation sans photo)
   - description  : quelques phrases pour expliquer la prestation
                    (laissez "" tant que le texte n'est pas prêt)
   - bonASavoir   : une précaution ou une info utile (laissez "" si rien)
*/
var PRESTATIONS = [
  {
    nom: "Sourcils Hairstroke / Poil à poil",
    categorie: "Sourcils",
    minutes: 120,
    prix: 130,
    photo: "sourcils-hairstroke.jpg",
    description: "Un tracé poil à poil, dessiné pour se mêler à vos vrais poils. Pendant la cicatrisation, les pigments se stabilisent sous la peau et le tracé se fond avec vos poils.",
    bonASavoir: "Juste après la séance, la couleur est plus intense : elle s'adoucit d'environ 30 à 40 % pendant la cicatrisation, dans le mois qui suit. La retouche du mois suivant permet de fixer le tout et de perfectionner les détails."
  },
  {
    nom: "Sourcils Microshading (effet poudré)",
    categorie: "Sourcils",
    minutes: 120,
    prix: 200,
    photo: "sourcils-microshading.jpg",
    description: "Un ombrage fondu, pour des sourcils à l'effet poudré.",
    bonASavoir: "Juste après la séance, la couleur est plus intense : elle s'adoucit d'environ 30 à 40 % pendant la cicatrisation, dans le mois qui suit. La retouche du mois suivant permet de fixer le tout et de perfectionner les détails."
  },
  {
    nom: "Ras de cils supérieur",
    categorie: "Yeux",
    minutes: 120,
    prix: 100,
    photo: "ras-de-cils.jpg",
    description: "Aussi appelé eye-liner dermo-flash. Il densifie visuellement la racine des cils pour un effet « fourni » et naturel. Le pigment est choisi ensemble, pour s'accorder à vos yeux.",
    bonASavoir: "Juste après la séance, la couleur paraît plus foncée : le pigment est intense au début, puis s'adoucit d'environ 30 à 40 % pendant la cicatrisation, dans le mois qui suit."
  },
  {
    nom: "Lèvres complètes effet naturel",
    categorie: "Lèvres",
    minutes: 165,
    prix: 180,
    photo: "levres.jpg",
    description: "Un ombrage très fondu sur l'ensemble des lèvres, pour un rendu qui reste naturel. Après quelques semaines de cicatrisation, la couleur laisse place à un effet « lèvres mordues », frais et poudré.",
    bonASavoir: "Juste après la séance, la couleur est intense et brillante, et les lèvres sont légèrement gonflées : c'est normal. La couleur s'adoucit ensuite d'environ 30 à 40 % pendant la cicatrisation."
  },
  {
    nom: "Grain de beauté",
    categorie: "Visage",
    minutes: 120,
    prix: 50,
    photo: "grain-de-beaute.jpg",
    description: "Un grain de beauté dessiné sur mesure, de la touche la plus discrète à un effet plus affirmé. Il est toujours préférable de commencer en douceur lors de la première séance : on peut l'intensifier ensuite, lors de la retouche.",
    bonASavoir: "Les petites croûtes du début tombent pendant la cicatrisation. La couleur s'adoucit ensuite d'environ 30 à 40 % pour prendre sa teinte définitive."
  },
  {
    nom: "Taches de rousseur",
    categorie: "Visage",
    minutes: 120,
    prix: 100,
    photo: "taches-de-rousseur.jpg",
    description: "Des taches de rousseur dessinées sur mesure, de quelques touches discrètes à un effet « retour de vacances » plus affirmé. Il est toujours préférable de commencer en douceur lors de la première séance : on peut en rajouter ensuite, lors de la retouche.",
    bonASavoir: "Les petites croûtes du début tombent pendant la cicatrisation. La couleur s'adoucit ensuite d'environ 30 à 40 % pour prendre sa teinte définitive."
  },
  {
    nom: "Retouches fixatrices mois suivant",
    categorie: "Retouches",
    minutes: 120,
    prix: 50,
    photo: "",
    description: "La séance du mois suivant, pour fixer le tout et perfectionner les moindres détails une fois la peau cicatrisée.",
    bonASavoir: ""
  },
  {
    nom: "Retouche annuelle 12/18 mois",
    categorie: "Retouches",
    minutes: 120,
    prix: 100,
    photo: "",
    description: "Une retouche 12 à 18 mois après votre séance.",
    bonASavoir: ""
  }
];
