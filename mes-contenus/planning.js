/* =====================================================================
   MON PLANNING
   ---------------------------------------------------------------------
   Le site calcule tout seul les créneaux libres des prochaines
   semaines, de 15 minutes en 15 minutes, pour la prestation choisie
   par le client (sa durée est dans « prestations-et-tarifs.js »).

   Vous n'avez que 3 choses à tenir à jour :
     1. vos HORAIRES HABITUELS (à changer rarement)
     2. les JOURS PARTICULIERS (vacances, horaires différents un jour précis)
     3. les RENDEZ-VOUS RÉSERVÉS (à chaque nouveau rendez-vous)

   Règles d'écriture :
   - Une plage d'horaires :            "10h00-19h00"
   - Plusieurs plages le même jour :   "10h00-13h00, 14h00-19h00"
   - Un horaire de début précis seul : "17h00"   (le rendez-vous commence
     à 17h, quelle que soit sa durée)
   - Un jour sans rendez-vous :        "fermé"
   - Les dates s'écrivent jour/mois/année : 27/10/2026
   ===================================================================== */


/* ---------- 1. MES HORAIRES HABITUELS ----------
   Les heures pendant lesquelles un rendez-vous peut avoir lieu.
   Le rendez-vous doit être terminé avant la fin de la plage. */
var HORAIRES_HABITUELS = {
  lundi:    "fermé",
  mardi:    "10h00-19h00",
  mercredi: "10h00-19h00",
  jeudi:    "10h00-19h00",
  vendredi: "10h00-19h00",
  samedi:   "10h00-19h00",
  dimanche: "fermé"
};


/* ---------- 2. LES JOURS PARTICULIERS ----------
   Pour changer les horaires d'un jour précis (vacances, journée
   exceptionnelle). Une ligne par jour, entre guillemets, suivie d'une
   virgule. Exemples (à adapter) :
     "15/12/2026 : fermé",
     "17/12/2026 : 10h00-14h00",
   Les jours qui ne sont pas dans cette liste suivent les horaires
   habituels, jours fériés compris. */
var JOURS_PARTICULIERS = [
];


/* ---------- 3. LES RENDEZ-VOUS RÉSERVÉS ----------
   À chaque nouveau rendez-vous, ajoutez une ligne :
     "date  heure de début  durée",
   Exemples :
     "27/10/2026 10h00 2h",
     "30/10/2026 14h00 2h45",
   Le site bloque alors ce créneau, plus la pause prévue après.
   Vous pouvez supprimer les lignes des jours passés. */
var RENDEZ_VOUS_RESERVES = [
];


/* ---------- 4. RÉGLAGES (à changer rarement) ---------- */
var PAUSE_ENTRE_PRESTATIONS = 30; // minutes bloquées après chaque rendez-vous
var PRECISION_DES_CRENEAUX = 15;  // les créneaux commencent toutes les 15 minutes
var DELAI_MINIMUM = 24;           // heures : réservation en ligne au plus tard 24h avant
var NOMBRE_DE_SEMAINES = 2;       // nombre de semaines affichées
