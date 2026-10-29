/* =====================================================================
   DERMOPUR – fonctionnement du site
   (Vous n'avez normalement pas besoin de modifier ce fichier.
   Les textes, prix et planning sont dans le dossier « mes-contenus ».)
   ===================================================================== */
(function () {
  "use strict";

  var TELEPHONE = "07 66 23 04 30";
  var TELEPHONE_LIEN = "tel:+33766230430";
  var WHATSAPP = "33766230430";          // laissez "" pour cacher les boutons WhatsApp
  var EMAIL = "coudret.indie@gmail.com";
  var ADRESSE = "15 rue du Général de Gaulle, 45650 Saint-Jean-le-Blanc";
  var BONJOUR = "Bonjour, je souhaiterais prendre rendez-vous.";
  var JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var ORDRE_CATEGORIES = ["Sourcils", "Yeux", "Lèvres", "Visage", "Retouches"];

  var prestations = window.PRESTATIONS || [];

  function $(sel, racine) { return (racine || document).querySelector(sel); }
  function $$(sel, racine) { return Array.prototype.slice.call((racine || document).querySelectorAll(sel)); }
  function echapper(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icone(nom) { return '<svg class="ic" aria-hidden="true"><use href="images/icones.svg#' + nom + '"/></svg>'; }
  function identifiant(nom) {
    return String(nom).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function prix(n) { return n + " €"; }
  function lienWhatsapp(texte) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texte); }
  // 120 → « 2h », 165 → « 2h45 »
  function texteMinutes(min) { var h = Math.floor(min / 60), m = min % 60; return h ? h + "h" + (m ? (m < 10 ? "0" : "") + m : "") : m + " min"; }
  // durée et prix d'un soin, avec une fourchette si minutesMin / prixMax sont indiqués
  function texteDuree(p) { return p.minutesMin ? texteMinutes(p.minutesMin) + " à " + texteMinutes(p.minutes) : texteMinutes(p.minutes); }
  function textePrix(p, court) {
    if (!p.prixMax) return prix(p.prix);
    return court ? p.prix + " – " + prix(p.prixMax) : "Entre " + prix(p.prix) + " et " + prix(p.prixMax);
  }
  function trouverPrestation(nom) { return prestations.filter(function (p) { return p.nom === nom; })[0] || null; }
  // soins rangés par catégorie : [{ nom: "Sourcils", liste: [...] }]
  function parCategorie() {
    var groupes = [];
    prestations.forEach(function (p) {
      var g = groupes.filter(function (x) { return x.nom === p.categorie; })[0];
      if (!g) groupes.push(g = { nom: p.categorie || "Autres", liste: [] });
      g.liste.push(p);
    });
    return groupes.sort(function (a, b) {
      var ia = ORDRE_CATEGORIES.indexOf(a.nom), ib = ORDRE_CATEGORIES.indexOf(b.nom);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }

  /* ---------- WhatsApp : boutons cachés si aucun numéro n'est indiqué ---------- */
  if (!WHATSAPP) $$("[data-whatsapp]").forEach(function (el) { el.hidden = true; el.style.display = "none"; });

  /* ---------- Menu sur téléphone ---------- */
  var boutonMenu = $(".menu-bouton");
  var menu = $("#menu");
  if (boutonMenu && menu) {
    boutonMenu.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      boutonMenu.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("ouvert")) {
        menu.classList.remove("ouvert");
        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.focus();
      }
    });
  }

  /* ---------- Photos : cadre « Photo à venir » tant qu'il n'y a pas de photo ---------- */
  function surveillerPhotos(racine) {
    $$(".photo img", racine).forEach(function (img) {
      var cadre = img.parentNode;
      cadre.setAttribute("data-fichier", (img.getAttribute("src") || "").replace(/^.*\//, "photos/"));
      function absente() { cadre.classList.add("photo--absente"); }
      if (img.complete && img.naturalWidth === 0) absente();
      img.addEventListener("error", absente);
      img.addEventListener("load", function () { cadre.classList.remove("photo--absente"); });
    });
  }
  function cadrePhoto(p, classe, alt) {
    if (!p.photo) return "";
    return '<div class="' + classe + ' photo"><img src="photos/' + echapper(p.photo) + '" alt="' + echapper(alt) + '" loading="lazy"></div>';
  }

  /* ---------- Textes calculés à partir des tarifs ---------- */
  function prixMin() {
    return prestations.reduce(function (min, p) { return Math.min(min, p.prix); }, Infinity);
  }
  $$("[data-prix-min]").forEach(function (el) { if (prestations.length) el.textContent = prix(prixMin()); });

  /* ---------- Cartes des soins (page d'accueil) ---------- */
  var resume = $("#resume-prestations");
  if (resume) {
    resume.innerHTML = prestations.filter(function (p) { return p.categorie !== "Retouches"; }).map(function (p) {
      return '<article class="carte">' +
        cadrePhoto(p, "carte__photo", "") +
        '<div class="carte__corps"><p class="carte__categorie">' + echapper(p.categorie) + '</p><h3>' + echapper(p.nom) + '</h3>' +
        '<p class="carte__infos">' + texteDuree(p) + ' · ' + textePrix(p, true) + '</p>' +
        '<a class="carte__lien" href="prestations.html#' + identifiant(p.nom) + '">En savoir plus<span class="cache"> : ' + echapper(p.nom) + '</span> →</a></div>' +
        '</article>';
    }).join("");
  }

  /* ---------- Page « Nos soins » ---------- */
  var tableau = $("#tableau-tarifs");
  if (tableau) {
    tableau.querySelector("tbody").innerHTML = parCategorie().map(function (g) {
      return '<tr class="tarifs__groupe"><th scope="rowgroup" colspan="3">' + echapper(g.nom) + '</th></tr>' +
        g.liste.map(function (p) {
          return '<tr><th scope="row"><a href="#' + identifiant(p.nom) + '">' + echapper(p.nom) + '</a></th>' +
            '<td>' + texteDuree(p) + '</td><td class="prix">' + textePrix(p, true) + '</td></tr>';
        }).join("");
    }).join("");
  }
  var liste = $("#liste-prestations");
  if (liste) {
    liste.innerHTML = parCategorie().map(function (g) {
      return '<h2 class="categorie-titre">' + echapper(g.nom) + '</h2>' + g.liste.map(function (p) {
        return '<article class="prestation' + (p.photo ? '' : ' prestation--sans-photo') + '" id="' + identifiant(p.nom) + '">' +
          cadrePhoto(p, "prestation__photo", "Photo : " + p.nom) +
          '<div class="prestation__texte">' +
            '<h3>' + echapper(p.nom) + '</h3>' +
            '<ul class="infos">' +
              '<li>' + icone("horloge") + 'Durée du rendez-vous : ' + texteDuree(p) + (p.minutesMin ? ' selon la zone' : '') + '</li>' +
              '<li>' + icone("euro") + textePrix(p) + '</li>' +
            '</ul>' +
            (p.description ? '<p>' + echapper(p.description) + '</p>' : '') +
            (p.bonASavoir ? '<p class="bon-a-savoir"><strong>Bon à savoir :</strong> ' + echapper(p.bonASavoir) + '</p>' : '') +
            '<p><a class="bouton bouton--plein" href="contact.html?prestation=' + encodeURIComponent(p.nom) + '#rendez-vous">' + icone("calendrier") + 'Réserver ce soin</a></p>' +
          '</div></article>';
      }).join("");
    }).join("");
  }

  /* ---------- Planning : réservation en trois étapes ---------- */
  function lireDate(texte) {
    var m = String(texte || "").trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/);
    if (!m) return null;
    var annee = +m[3] < 100 ? 2000 + +m[3] : +m[3];
    return new Date(annee, +m[2] - 1, +m[1]);
  }
  function cleJour(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function memeJour(a, b) { return cleJour(a) === cleJour(b); }
  function jourMois(d) { return (d.getDate() === 1 ? "1er" : d.getDate()) + " " + MOIS[d.getMonth()]; }
  function nomJour(d) { return JOURS[(d.getDay() + 6) % 7]; }
  // « 13h45 » → 825 minutes après minuit
  function lireHeure(texte) {
    var m = String(texte || "").trim().match(/^(\d{1,2})\s*[h:]\s*(\d{0,2})$/i);
    if (!m) return null;
    return +m[1] * 60 + (m[2] ? +(m[2].length === 1 ? m[2] + "0" : m[2]) : 0);
  }
  function ecrireHeure(min) { var h = Math.floor(min / 60), m = min % 60; return h + "h" + (m < 10 ? "0" : "") + m; }
  // « 2h45 », « 2h », « 90 » → minutes
  function lireDuree(texte) {
    texte = String(texte || "").trim().toLowerCase();
    var m = texte.match(/^(\d+)\s*h\s*(\d{0,2})/);
    if (m) return +m[1] * 60 + (m[2] ? +m[2] : 0);
    m = texte.match(/^(\d+)\s*(min)?$/);
    return m ? +m[1] : null;
  }
  // « 10h00-13h00, 17h00 » → [{debut, fin}] ; fin = null pour un horaire de début seul
  function lirePlages(texte) {
    texte = String(texte || "").trim();
    if (!texte || /^ferm/i.test(texte)) return [];
    return texte.split(/[,;]+/).map(function (morceau) {
      var parts = morceau.split(/\s*(?:-|–|à)\s*/);
      var debut = lireHeure(parts[0]);
      if (debut == null) return null;
      var fin = parts.length > 1 ? lireHeure(parts[1]) : null;
      return { debut: debut, fin: fin };
    }).filter(Boolean);
  }
  function lireListe(nom) { var v = window[nom]; return Array.isArray(v) ? v : []; }

  var choisirCreneau = null, oublierCreneau = null;   // renseignés par le formulaire (page « Rendez-vous »)

  var zonePlanning = $("#planning");
  if (zonePlanning) {
    var pause = +window.PAUSE_ENTRE_PRESTATIONS || 0;
    var pas = +window.PRECISION_DES_CRENEAUX || 15;
    var delai = (window.DELAI_MINIMUM == null ? 24 : +window.DELAI_MINIMUM) * 60;
    var nbSemaines = +window.NOMBRE_DE_SEMAINES || 2;
    var habituels = window.HORAIRES_HABITUELS || {};

    var particuliers = {};
    lireListe("JOURS_PARTICULIERS").forEach(function (ligne) {
      var m = String(ligne).match(/^\s*([\d\/.\-]+)\s*:?\s*(.*)$/);
      var d = m && lireDate(m[1]);
      if (d) particuliers[cleJour(d)] = m[2];
    });
    var reserves = {};
    lireListe("RENDEZ_VOUS_RESERVES").forEach(function (ligne) {
      var m = String(ligne).trim().split(/\s+/);
      var d = lireDate(m[0]), debut = lireHeure(m[1]), duree = lireDuree(m.slice(2).join(""));
      if (!d || debut == null || !duree) return;
      (reserves[cleJour(d)] = reserves[cleJour(d)] || []).push({ debut: debut, fin: debut + duree });
    });

    // tous les horaires de début possibles pour un jour et une durée donnés
    function creneauxDuJour(date, duree, maintenant) {
      var cle = cleJour(date);
      var plages = lirePlages(cle in particuliers ? particuliers[cle] : habituels[nomJour(date)]);
      var pris = reserves[cle] || [];
      var minimum = -Infinity;
      if (memeJour(date, maintenant)) minimum = maintenant.getHours() * 60 + maintenant.getMinutes() + delai;
      else if (date < maintenant) return null;
      else {
        var ecart = (date - new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate())) / 60000;
        minimum = maintenant.getHours() * 60 + maintenant.getMinutes() + delai - ecart;
      }
      var resultat = [];
      plages.forEach(function (p) {
        var fin = p.fin == null ? p.debut : p.fin - duree;   // dernier début possible
        for (var t = p.debut; t <= fin; t += pas) {
          if (t < minimum) continue;
          var libre = pris.every(function (r) { return t + duree + pause <= r.debut || t >= r.fin + pause; });
          if (libre && resultat.indexOf(t) < 0) resultat.push(t);
        }
      });
      return { ouvert: plages.length > 0, tropTot: plages.length > 0 && !resultat.length && minimum > 0, debuts: resultat.sort(function (a, b) { return a - b; }) };
    }

    var zoneChoix = $("#choix-prestation");
    var params = new URLSearchParams(location.search);
    var prestationChoisie = trouverPrestation(params.get("prestation") || "");

    zoneChoix.innerHTML = parCategorie().map(function (g) {
      return '<div class="choix-groupe"><h3 class="choix-groupe__titre">' + echapper(g.nom) + '</h3><div class="durees">' +
        g.liste.map(function (p) {
          return '<button type="button" class="duree" data-prestation="' + echapper(p.nom) + '" aria-pressed="false">' +
            '<span class="duree__temps">' + echapper(p.nom) + '</span>' +
            '<span class="duree__prix">' + textePrix(p, true) + '</span>' +
            '<span class="duree__sous">' + texteDuree(p) + '</span></button>';
        }).join("") + '</div></div>';
    }).join("");

    function afficher() {
      var p = prestationChoisie;
      $$(".duree[data-prestation]", zoneChoix).forEach(function (b) { b.setAttribute("aria-pressed", p && b.getAttribute("data-prestation") === p.nom ? "true" : "false"); });
      var etape2 = $("#etape-creneau");
      if (!p) { etape2.hidden = true; return; }
      etape2.hidden = false;
      $("#prestation-rappel").textContent = p.nom + " (" + texteDuree(p) + ", " + textePrix(p, true) + ")";
      var noteDuree = $("#note-duree");
      if (noteDuree) noteDuree.hidden = !p.minutesMin;

      var maintenant = new Date();
      var aujourdhui = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
      var lundi = new Date(aujourdhui);
      lundi.setDate(lundi.getDate() - ((lundi.getDay() + 6) % 7));
      dessinerPlanning(lundi, maintenant, p, function (date) { return creneauxDuJour(date, p.minutes, maintenant); });
    }

    // dessine les semaines ; infoJour(date) → null (jour passé) ou { ouvert, tropTot, debuts: [minutes] }
    function dessinerPlanning(lundi, maintenant, p, infoJour) {
      var duree = p.minutes;
      var html = "";
      for (var s = 0; s < nbSemaines; s++) {
        var debutSem = new Date(lundi); debutSem.setDate(lundi.getDate() + 7 * s);
        var finSem = new Date(debutSem); finSem.setDate(debutSem.getDate() + 6);
        var total = 0, lignes = "";
        for (var j = 0; j < 7; j++) {
          var date = new Date(debutSem); date.setDate(debutSem.getDate() + j);
          var c = infoJour(date);
          if (c === null) continue; // jour passé
          var titre = '<h3 class="jour-ligne__nom">' + nomJour(date).charAt(0).toUpperCase() + nomJour(date).slice(1) +
            ' <span>' + jourMois(date) + (memeJour(date, maintenant) ? " · aujourd'hui" : "") + '</span></h3>';
          var contenu;
          if (!c.ouvert) contenu = '<p class="jour-ligne__info">Fermé</p>';
          else if (!c.debuts.length && c.tropTot) contenu = '<p class="jour-ligne__info">Moins de 24h à l\'avance : réservation <a href="' + TELEPHONE_LIEN + '">par téléphone</a></p>';
          else if (!c.debuts.length) contenu = '<p class="jour-ligne__info">Complet pour ce soin</p>';
          else {
            total += c.debuts.length;
            contenu = '<ul class="heures">' + c.debuts.map(function (t) {
              var quand = nomJour(date) + " " + jourMois(date) + " à " + ecrireHeure(t);
              return '<li><a class="heure" data-quand="' + echapper(quand) + '" data-prestation="' + echapper(p.nom) + '"' +
                ' href="contact.html?creneau=' + encodeURIComponent(quand) + '&prestation=' + encodeURIComponent(p.nom) + '#formulaire"' +
                ' aria-label="Réserver le ' + quand + ', fin à ' + ecrireHeure(t + duree) + '">' + ecrireHeure(t) + '</a></li>';
            }).join("") + '</ul>';
          }
          lignes += '<div class="jour-ligne' + (!c.ouvert || !c.debuts.length ? " jour-ligne--vide" : "") + '">' + titre + contenu + '</div>';
        }
        var badge = s === 0 ? "Cette semaine" : s === 1 ? "Semaine prochaine" : "";
        html += '<section class="semaine"><div class="semaine__titre"><h2>Semaine du ' + jourMois(debutSem) + ' au ' + jourMois(finSem) + '</h2>' +
          (badge ? '<span class="semaine__badge">' + badge + '</span>' : '') + '</div>' +
          '<p class="semaine__resume">' + (total ? "" : "Plus de place cette semaine-là pour ce soin. Appelez Indie : un créneau se libère parfois.") + '</p>' +
          (lignes || '<p class="jour-ligne__info">Cette semaine est terminée.</p>') + '</section>';
      }
      zonePlanning.innerHTML = html;
    }

    zonePlanning.addEventListener("click", function (e) {
      var lien = e.target.closest ? e.target.closest("a.heure") : null;
      if (!lien || !choisirCreneau) return;        // sur la page Disponibilités : le lien mène au formulaire
      e.preventDefault();
      $$("a.heure.heure--choisie", zonePlanning).forEach(function (a) { a.classList.remove("heure--choisie"); });
      lien.classList.add("heure--choisie");
      choisirCreneau(lien.getAttribute("data-quand"), lien.getAttribute("data-prestation"));
    });
    zoneChoix.addEventListener("click", function (e) {
      var bouton = e.target.closest(".duree");
      if (!bouton) return;
      prestationChoisie = trouverPrestation(bouton.getAttribute("data-prestation"));
      if (oublierCreneau) oublierCreneau(prestationChoisie.nom);
      afficher();
      try { history.replaceState(null, "", "?prestation=" + encodeURIComponent(prestationChoisie.nom)); } catch (err) { /* rien */ }
      $("#etape-creneau").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    afficher();
  }

  /* ---------- Avis clients (page d'accueil) ---------- */
  var sectionAvis = $("#avis");
  if (sectionAvis) {
    var avis = window.AVIS || [];
    var lienVoir = window.LIEN_VOIR_AVIS || "";
    var lienDeposer = window.LIEN_DEPOSER_AVIS || "";
    if (avis.length || lienVoir || lienDeposer) {
      sectionAvis.hidden = false;
      if (!avis.length) $("#avis-note").textContent = "Découvrez les avis de ses clients, directement sur Google.";
      $("#liste-avis").innerHTML = avis.map(function (a) {
        var n = Math.max(0, Math.min(5, a.etoiles == null ? 5 : a.etoiles));
        return '<figure class="avis"><p class="avis__etoiles" role="img" aria-label="' + n + ' étoiles sur 5">' +
          "★★★★★".slice(0, n) + '</p><blockquote>« ' + echapper(a.texte) + ' »</blockquote>' +
          '<figcaption>' + echapper(a.nom) + ' · avis Google</figcaption></figure>';
      }).join("");
      $("#liens-avis").innerHTML =
        (lienVoir ? '<a class="bouton" href="' + echapper(lienVoir) + '" target="_blank" rel="noopener">Voir tous les avis Google</a>' : "") +
        (lienDeposer ? '<a class="bouton bouton--plein" href="' + echapper(lienDeposer) + '" target="_blank" rel="noopener">Laisser un avis</a>' : "");
    }
  }

  /* ---------- Page « Rendez-vous » : formulaire ---------- */
  var formulaire = $("#formulaire-rdv");
  if (formulaire) {
    var choixPrestation = $("#prestation", formulaire);
    prestations.forEach(function (p) {
      var opt = document.createElement("option");
      opt.value = p.nom + " – " + texteDuree(p) + " – " + textePrix(p, true);
      opt.textContent = p.nom + " (" + textePrix(p, true) + ")";
      opt.setAttribute("data-nom", p.nom);
      choixPrestation.appendChild(opt);
    });
    function choisirPrestation(nom) {
      Array.prototype.forEach.call(choixPrestation.options, function (o) {
        if (o.getAttribute("data-nom") === nom) choixPrestation.value = o.value;
      });
    }

    var creneauAffiche = $("#creneau-choisi");
    function afficherCreneau(quand) {
      $("#creneau", formulaire).value = quand;
      if (creneauAffiche) {
        $("[data-creneau-texte]", creneauAffiche).textContent = quand;
        var wa = $("[data-creneau-whatsapp]", creneauAffiche);
        if (wa && WHATSAPP) wa.href = lienWhatsapp("Bonjour, je souhaiterais réserver le créneau du " + quand + ".");
        creneauAffiche.classList.add("visible");
      }
    }
    // clic sur un horaire du planning, sur cette même page
    choisirCreneau = function (quand, nom) {
      choisirPrestation(nom);
      afficherCreneau(quand + " (" + nom + ")");
      var cible = $("#formulaire");
      if (cible) cible.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // le client change de soin : l'ancien créneau n'a plus de sens
    oublierCreneau = function (nom) {
      choisirPrestation(nom);
      $("#creneau", formulaire).value = "";
      if (creneauAffiche) creneauAffiche.classList.remove("visible");
    };

    var params = new URLSearchParams(location.search);
    if (params.get("prestation")) choisirPrestation(params.get("prestation"));
    if (params.get("creneau")) afficherCreneau(params.get("creneau") + (params.get("prestation") ? " (" + params.get("prestation") + ")" : ""));

    // ---- vérification et envoi du formulaire (le client reste sur le site) ----
    var boiteErreur = $("#form-erreur", formulaire);
    var boutonEnvoi = $("button[type=submit]", formulaire);
    var boutonWhatsapp = $("#envoi-whatsapp", formulaire);
    var ADRESSE_ENVOI = "https://formsubmit.co/ajax/" + EMAIL;
    var DELAI_MESSAGE = 5000;   // après 5 secondes, on propose une solution de secours
    var DELAI_MAXIMUM = 30000;  // on arrête d'attendre la réponse après 30 secondes

    function montrerInfo(html) {
      boiteErreur.innerHTML = html;
      boiteErreur.hidden = false;
      boiteErreur.classList.add("form-erreur--info");
    }
    function montrerErreur(html, champ) {
      boiteErreur.innerHTML = html;
      boiteErreur.classList.remove("form-erreur--info");
      boiteErreur.hidden = false;
      boiteErreur.scrollIntoView({ behavior: "smooth", block: "center" });
      if (champ) champ.focus({ preventScroll: true });
    }
    function chiffres(texte) { return String(texte).replace(/\D/g, ""); }

    // vérifie les champs obligatoires ; renvoie true si tout est bon
    function verifier() {
      boiteErreur.hidden = true;
      $$(".champ--erreur", formulaire).forEach(function (c) { c.classList.remove("champ--erreur"); });
      var prenom = $("#prenom", formulaire), nom = $("#nom", formulaire), tel = $("#telephone", formulaire);
      var accord = $("input[name=Accord]", formulaire), mail = $("#email", formulaire);
      var manques = [], premier = null;
      function probleme(champ, texte) {
        manques.push(texte);
        if (champ.closest(".champ")) champ.closest(".champ").classList.add("champ--erreur");
        if (!premier) premier = champ;
      }
      if (!prenom.value.trim()) probleme(prenom, "votre <strong>prénom</strong>");
      if (!nom.value.trim()) probleme(nom, "votre <strong>nom</strong>");
      var nbChiffres = chiffres(tel.value).length;
      if (!tel.value.trim()) probleme(tel, "votre <strong>numéro de téléphone</strong>");
      else if (nbChiffres < 9 || nbChiffres > 15) probleme(tel, "un <strong>numéro de téléphone valide</strong> (par exemple 06 12 34 56 78)");
      if (!accord.checked) probleme(accord, "la <strong>case d'accord</strong> en bas du formulaire");
      if (mail.value.trim() && !/^\S+@\S+\.\S+$/.test(mail.value.trim())) probleme(mail, "une <strong>adresse e-mail valide</strong> (ou laissez ce champ vide)");
      if (manques.length) {
        montrerErreur("<strong>Il manque encore :</strong> " + manques.join(", ") + ".", premier);
        return false;
      }
      return true;
    }

    // la demande écrite en texte simple (pour WhatsApp et l'e-mail)
    function texteDemande() {
      var v = function (id) { return $(id, formulaire).value.trim(); };
      var lignes = [BONJOUR, "",
        "Prénom : " + v("#prenom"), "Nom : " + v("#nom"), "Téléphone : " + v("#telephone")];
      if (v("#email")) lignes.push("E-mail : " + v("#email"));
      lignes.push("Soin : " + v("#prestation"));
      if (v("#creneau")) lignes.push("Créneau souhaité : " + v("#creneau"));
      if (v("#message")) lignes.push("", "Message : " + v("#message"));
      return lignes.join("\n");
    }
    function liensSecours() {
      var texte = texteDemande();
      return (WHATSAPP ? '<a href="' + lienWhatsapp(texte) + '" target="_blank" rel="noopener">envoyer votre demande par WhatsApp</a>, ' : '') +
        '<a href="mailto:' + EMAIL + '?subject=' + encodeURIComponent("Demande de rendez-vous") + "&body=" + encodeURIComponent(texte) + '">' + (WHATSAPP ? 'par e-mail' : 'envoyer votre demande par e-mail') + '</a>' +
        ' ou appeler le <a href="' + TELEPHONE_LIEN + '">' + TELEPHONE + '</a>';
    }

    // bouton « envoyer par WhatsApp » : ne dépend d'aucun service extérieur
    if (boutonWhatsapp && WHATSAPP) {
      boutonWhatsapp.addEventListener("click", function () {
        if (!verifier()) return;
        window.open(lienWhatsapp(texteDemande()), "_blank", "noopener");
      });
    }

    formulaire.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!verifier()) return;
      if ($("input[name=_honey]", formulaire).value) return; // champ piège rempli : c'est un robot

      var prenom = $("#prenom", formulaire).value.trim(), nom = $("#nom", formulaire).value.trim();
      var morceaux = [prenom + " " + nom, $("#telephone", formulaire).value.trim(), $("#creneau", formulaire).value.trim()].filter(Boolean);
      var objet = $("input[name=_subject]", formulaire);
      if (objet) objet.value = "Demande de rendez-vous – " + morceaux.join(" – ");

      var texteBouton = boutonEnvoi.textContent;
      boutonEnvoi.disabled = true;
      boutonEnvoi.textContent = "Envoi en cours…";
      montrerInfo("Envoi en cours, cela peut prendre quelques secondes. Merci de ne pas fermer la page.");

      var donnees = new FormData(formulaire);
      donnees.delete("_next");
      donnees.delete("_honey");

      var termine = false;
      function echec() {
        if (termine) return;
        termine = true;
        clearTimeout(minuteurMessage); clearTimeout(minuteur);
        boutonEnvoi.disabled = false;
        boutonEnvoi.textContent = texteBouton;
        montrerErreur("<strong>L'envoi de votre demande n'a pas pu être confirmé.</strong> Pour être certain qu'Indie la reçoive, vous pouvez " + liensSecours() + ".");
      }
      function reussite() {
        if (termine) return;
        termine = true;
        clearTimeout(minuteurMessage); clearTimeout(minuteur);
        window.location.href = "merci.html";
      }
      // au bout de 5 secondes : on propose une solution de secours, sans interrompre l'envoi
      var minuteurMessage = setTimeout(function () {
        if (termine) return;
        montrerInfo("<strong>L'envoi prend plus de temps que prévu.</strong> Vous pouvez patienter encore un instant, ou, pour être certain qu'Indie reçoive votre demande, " + liensSecours() + ".");
      }, DELAI_MESSAGE);
      var controle = window.AbortController ? new AbortController() : null;
      var minuteur = setTimeout(function () { if (controle) controle.abort(); echec(); }, DELAI_MAXIMUM);
      fetch(ADRESSE_ENVOI, { method: "POST", headers: { Accept: "application/json" }, body: donnees, signal: controle ? controle.signal : undefined })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, json: j }; }); })
        .then(function (res) {
          if (res.ok && (res.json.success === true || res.json.success === "true")) reussite(); else echec();
        })
        .catch(echec);
    });

    var suite = $("input[name=_next]", formulaire);
    if (suite) suite.value = new URL("merci.html", location.href).href;
  }

  /* ---------- Avant / après : curseur à faire glisser (mes-contenus/avant-apres.js) ---------- */
  var zoneAA = $("#avant-apres-liste");
  var listeAA = window.AVANT_APRES || [];
  if (zoneAA && listeAA.length) {
    $("#avant-apres").hidden = false;
    var fleches = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    zoneAA.innerHTML = listeAA.map(function (a) {
      return '<figure class="avant-apres__module"><div class="aa-cadre" style="--ratio:' + echapper(a.ratio || "4 / 3") + ';--pos:50%">' +
        '<img class="aa-apres" src="' + echapper(a.apres) + '" alt="' + echapper((a.alt || a.titre) + " : après") + '" loading="lazy">' +
        '<img class="aa-avant" src="' + echapper(a.avant) + '" alt="' + echapper((a.alt || a.titre) + " : avant") + '" loading="lazy">' +
        '<span class="aa-etiquette aa-etiquette--avant">Avant</span><span class="aa-etiquette aa-etiquette--apres">Après</span>' +
        '<span class="aa-poignee"><span class="aa-bouton">' + fleches + '</span></span>' +
        '<input class="aa-curseur" type="range" min="0" max="100" value="50" aria-label="Comparer l\'avant et l\'après : ' + echapper(a.titre) + '">' +
        '</div><figcaption>' + echapper(a.titre) + '</figcaption></figure>';
    }).join("");
    $$(".aa-cadre", zoneAA).forEach(function (cadre) {
      var curseur = $(".aa-curseur", cadre), actif = false;
      function placer(pct) {
        pct = Math.max(0, Math.min(100, pct));
        cadre.style.setProperty("--pos", pct + "%");
        curseur.value = Math.round(pct);
      }
      function depuis(e) {
        var r = cadre.getBoundingClientRect();
        placer((e.clientX - r.left) / r.width * 100);
      }
      cadre.addEventListener("pointerdown", function (e) {
        actif = true;
        try { cadre.setPointerCapture(e.pointerId); } catch (err) { /* rien */ }
        depuis(e);
      });
      cadre.addEventListener("pointermove", function (e) { if (actif) depuis(e); });
      ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (nom) { cadre.addEventListener(nom, function () { actif = false; }); });
      curseur.addEventListener("input", function () { placer(+curseur.value); });
    });
  }

  /* ---------- Accordéons : ouverture et fermeture en douceur ---------- */
  var sansAnimation = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $$("details.accordeon").forEach(function (d) {
    var titre = $("summary", d), contenu = $(".accordeon__contenu", d), anim = null;
    if (!titre || !contenu || sansAnimation || !contenu.animate) return;
    titre.addEventListener("click", function (e) {
      e.preventDefault();
      if (anim) anim.cancel();
      var h = contenu.offsetHeight;
      if (!d.open) {
        d.open = true;
        h = contenu.offsetHeight;
        anim = contenu.animate([{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }], { duration: 550, easing: "cubic-bezier(.22,.61,.36,1)" });
        anim.onfinish = function () { anim = null; };
      } else {
        anim = contenu.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 400, easing: "cubic-bezier(.22,.61,.36,1)" });
        anim.onfinish = function () { d.open = false; anim = null; };
      }
    });
  });

  /* ---------- Apparition en fondu au défilement ---------- */
  (function () {
    var racine = document.documentElement;
    if (!racine.classList.contains("anim")) return;
    if (!("IntersectionObserver" in window) || !window.SELECTEURS_REVEAL) { racine.classList.remove("anim"); return; }
    var cibles = $$(window.SELECTEURS_REVEAL);
    var rang = new Map();
    var observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, parent = el.parentNode;
        var n = rang.get(parent) || 0;
        rang.set(parent, n + 1);
        el.style.transitionDelay = Math.min(n, 5) * 110 + "ms";
        el.classList.add("vu");
        observateur.unobserve(el);
        setTimeout(function () { el.style.transitionDelay = ""; }, 1800);
        setTimeout(function () { rang.set(parent, Math.max(0, (rang.get(parent) || 1) - 1)); }, 900);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    cibles.forEach(function (el) { observateur.observe(el); });
    racine.setAttribute("data-anim-pret", "1");
  })();

  $$("[data-adresse]").forEach(function (el) { el.textContent = ADRESSE; });
  $$("[data-annee]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  surveillerPhotos(document);
})();
