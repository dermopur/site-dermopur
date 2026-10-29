# Guide : modifier mon site Dermopur

Ce guide explique comment changer vous-même les prix, les textes, le planning et les photos, puis comment mettre le site en ligne.
Tout se fait **depuis le site GitHub, dans votre navigateur** (ordinateur ou téléphone). Vous n'avez rien à installer.

---

## 0. Utiliser GitHub, pas à pas

GitHub est le site qui garde tous les fichiers de votre site internet. Quand vous changez un fichier sur GitHub, votre site se met à jour tout seul.
GitHub est en anglais : ce guide vous indique le nom exact de chaque bouton.

### Étape 1 – Vous connecter

1. Allez sur **https://github.com** (sur ordinateur ou sur le navigateur de votre téléphone : Chrome ou Safari).
2. En haut à droite, cliquez sur **« Sign in »** (Se connecter).
3. Entrez votre identifiant (**dermopur**) ou votre e-mail, puis votre mot de passe, puis cliquez sur **« Sign in »**.
4. Si GitHub vous envoie un code par e-mail ou par SMS, recopiez-le.

💡 Astuce : ajoutez cette adresse à vos favoris : **https://github.com/dermopur/site-dermopur**. Vous arriverez directement sur votre site.

### Étape 2 – Ouvrir le fichier à modifier

1. Ouvrez **https://github.com/dermopur/site-dermopur**. Vous voyez la liste des fichiers du site : `mes-contenus`, `photos`, `index.html`, etc.
2. Cliquez sur le nom du **dossier** (par exemple `mes-contenus`).
3. Cliquez sur le nom du **fichier** (par exemple `planning.js`). Le contenu du fichier s'affiche.

### Étape 3 – Passer en mode modification

1. En haut à droite du contenu du fichier, cliquez sur le **crayon** ✏️ (quand vous passez la souris dessus, il est écrit « Edit this file »).
2. **Sur téléphone** : si vous ne voyez pas le crayon, touchez les **trois petits points « … »** en haut du fichier, puis **« Edit file »**.
3. Le texte devient modifiable, comme dans un traitement de texte.

### Étape 4 – Faire votre modification

- Touchez ou cliquez à l'endroit voulu, puis effacez et écrivez comme d'habitude.
- Vous pouvez utiliser **copier** (Ctrl + C) et **coller** (Ctrl + V). Sur Mac, c'est Cmd + C et Cmd + V. Sur téléphone, faites un appui long.
- Pour retrouver un mot dans un long fichier : cliquez dans le texte, puis tapez **Ctrl + F** (Cmd + F sur Mac).

### Étape 5 – Enregistrer (« Commit »)

Sur GitHub, « enregistrer » se dit **« Commit »**.

1. En haut à droite, cliquez sur le bouton vert **« Commit changes… »**.
2. Une petite fenêtre s'ouvre. Dans **« Commit message »**, vous pouvez écrire en quelques mots ce que vous avez fait (par exemple « Planning semaine du 2 novembre »). Ce n'est pas obligatoire.
3. Laissez cochée l'option **« Commit directly to the main branch »** (enregistrer directement).
4. Cliquez sur le bouton vert **« Commit changes »**.

C'est enregistré ! ✅

### Étape 6 – Vérifier sur votre site

1. Attendez **1 à 2 minutes**.
2. Ouvrez votre site et **rechargez la page** (la flèche en rond, ou tirez la page vers le bas sur téléphone).
3. Si l'ancienne version s'affiche encore, attendez une minute de plus et rechargez à nouveau.

Pour voir où en est la mise à jour : sur GitHub, cliquez sur l'onglet **« Actions »** en haut. Un rond orange 🟠 veut dire « en cours ». Une coche verte ✅ veut dire « terminé ».

### En cas d'erreur : revenir en arrière

Pas de panique : GitHub garde **toutes** les anciennes versions de chaque fichier.

**Si votre page est vide ou si le planning a disparu**, c'est presque toujours un guillemet `"` ou une virgule `,` oubliés.
1. Rouvrez le fichier avec le crayon ✏️.
2. Comparez avec les exemples de ce guide.
3. Corrigez, puis enregistrez.

**Pour remettre l'ancienne version d'un fichier :**
1. Ouvrez le fichier sur GitHub.
2. En haut à droite, cliquez sur **« History »** (avec une petite horloge 🕘). Vous voyez la liste de toutes les modifications, de la plus récente à la plus ancienne.
3. Trouvez la dernière version qui marchait. À droite de cette ligne, cliquez sur le bouton **« <> »** (« View code at this point »).
4. Ouvrez le même fichier, puis cliquez sur le bouton **« Copy raw file »** (deux petits carrés, en haut à droite) : tout le contenu est copié.
5. Revenez sur la version actuelle du fichier (cliquez sur le nom du dépôt `site-dermopur` en haut, puis rouvrez le fichier). Cliquez sur le crayon ✏️.
6. Sélectionnez tout le texte (Ctrl + A, ou Cmd + A sur Mac), puis collez (Ctrl + V).
7. Enregistrez.

### Les règles d'or

- ✏️ Ne changez que le **texte entre les guillemets** `"…"` et les **nombres**.
- 🔒 Ne supprimez jamais les guillemets `"`, les virgules `,`, ni les accolades `{ }` et les crochets `[ ]`.
- 🚫 Les lignes qui commencent par `/*` ou `//` sont des explications pour vous : elles n'apparaissent pas sur le site.
- 💾 Faites une seule modification à la fois, enregistrez, puis vérifiez sur le site.

---

## 1. Le planning et les demandes de rendez-vous

Fichier : **`mes-contenus/planning.js`**

Sur les pages « Disponibilités » et « Contact », le client choisit d'abord **son soin**, puis le site lui montre **toutes les heures de début possibles**, de 15 minutes en 15 minutes, sur la semaine en cours et la suivante. Le site calcule tout seul :
- que le soin se termine avant la fin de vos horaires (de 45 min à 2h45 selon le soin) ;
- qu'elle ne chevauche pas un rendez-vous déjà réservé ;
- qu'il reste **30 minutes de pause entre deux soins** ;
- qu'on ne demande pas un horaire à moins de 24h (le client est alors invité à vous appeler).

Quand un client touche une heure, il arrive sur le formulaire (ou peut passer par WhatsApp ou le téléphone). **La réservation n'est pas automatique : le rendez-vous n'est validé que quand vous l'avez confirmé.** Le site ne bloque pas le créneau tout seul : c'est vous qui l'ajoutez dans la liste des rendez-vous réservés (voir plus bas). Le site n'est relié à aucun agenda.

Vous n'avez qu'à tenir à jour 3 choses.

**a) Vos horaires habituels** (à changer rarement)

```
var HORAIRES_HABITUELS = {
  lundi:    "fermé",
  mardi:    "10h00-19h00",
  ...
};
```
- Une plage : `"10h00-19h00"` (le rendez-vous doit être fini avant 19h).
- Plusieurs plages : `"10h00-13h00, 14h00-19h00"` (par exemple pour une pause déjeuner).
- Une heure de début seule : `"17h00"` (le rendez-vous commence à 17h, quelle que soit sa durée).

Si vous changez vos horaires, pensez aussi à changer le tableau des horaires de la page `contact.html`.

**b) Les jours particuliers** (vacances, horaires différents un jour précis)

```
var JOURS_PARTICULIERS = [
  "15/12/2026 : fermé",
  "17/12/2026 : 10h00-14h00",
];
```

**c) Les rendez-vous réservés** : à chaque rendez-vous que vous confirmez, ajoutez une ligne avec la date, l'heure de début et la durée :

```
var RENDEZ_VOUS_RESERVES = [
  "27/10/2026 10h00 2h",
  "30/10/2026 14h00 2h45",
];
```
Le site bloque ce créneau et les 30 minutes de pause autour. Vous pouvez supprimer les lignes des jours passés de temps en temps.

**Annulation** : supprimez simplement la ligne du rendez-vous.

⚠️ Chaque ligne est entre guillemets `" "` et se termine par une virgule.

**Réglages** (en bas du fichier) : la pause entre deux soins (30 min), la précision des créneaux (15 min), le délai minimum avant un rendez-vous (24 h) et le nombre de semaines affichées (2).

---

## 2. Changer les prix, les durées et les descriptions des soins

Fichier : **`mes-contenus/prestations-et-tarifs.js`**

Chaque soin a :
- `nom` : le nom affiché ;
- `categorie` : le groupe (Sourcils, Yeux, Lèvres, Visage, Retouches) ;
- `minutes` : la durée du rendez-vous, utilisée par le planning (45 = 45 min, 120 = 2h, 165 = 2h45). Pour une durée qui varie, mettez la durée la plus longue ;
- `minutesMin` (facultatif) : la durée la plus courte. Le site affiche alors par exemple « 30 min à 1h30 » ;
- `prix` : le prix en euros, sans le signe € ;
- `prixMax` (facultatif) : le prix le plus haut. Le site affiche alors « Entre 50 € et 100 € » ;
- `photo` : le nom de la photo dans le dossier `photos` ;
- `description` et `bonASavoir` : les textes affichés sur la page « Nos soins ».

Les nouveaux prix apparaissent partout : accueil, page « Nos soins », tableau des tarifs, planning et formulaire.

- Si vous voulez des guillemets à l'intérieur d'un texte, utilisez « » (et pas " ").
- **Ajouter un soin** : copiez le bloc d'un soin, de `{` jusqu'à `},`, collez-le juste en dessous et changez les textes.
- **Retirer un soin** : supprimez son bloc entier.

⚠️ Les prix sont aussi cités dans la description Google de la page `prestations.html` (ligne `<meta name="description" …>` en haut). Pensez à la mettre à jour si vous changez un prix.

---

## 3. Mettre vos photos

Toutes les photos vont dans le dossier **`photos`**. Toutes les photos sont en place (accueil, portrait et soins). Pour changer une photo, envoyez la nouvelle **avec exactement le même nom**.

| Nom du fichier | Où elle apparaît |
|---|---|
| `accueil.jpg` | Grande photo en haut de l'accueil : le cabinet (format vertical idéal) |
| `portrait.jpg` | Votre photo, partie « Moi, c'est Indie » |
| `sourcils-hairstroke.jpg` | Sourcils Hairstroke / Poil à poil |
| `sourcils-microshading.jpg` | Sourcils Microshading |
| `ras-de-cils.jpg` | Ras de cils supérieur |
| `levres.jpg` | Lèvres complètes |
| `grain-de-beaute.jpg` | Grain de beauté |
| `taches-de-rousseur.jpg` | Taches de rousseur |
| `ambiance-1.jpg`, `ambiance-2.jpg`, `ambiance-3.jpg` | Réservées pour des photos du cabinet (pas encore affichées) |

⚠️ **Photos de clients (avant / après)** : publiez-les uniquement avec leur accord écrit.

**Étape A – Renommer la photo (avant de l'envoyer)**

Le nom doit être **exactement** celui du tableau : en minuscules, sans accent, sans espace, avec `.jpg` à la fin.

- **Sur ordinateur (Windows)** : clic droit sur la photo → **Renommer**.
- **Sur Mac** : cliquez une fois sur la photo, appuyez sur la touche **Entrée**, tapez le nouveau nom.
- **Sur Android** : ouvrez l'application **Fichiers**, faites un appui long sur la photo → **Renommer**.
- **Sur iPhone** : depuis Photos, touchez **Partager** → **Enregistrer dans Fichiers**. Ensuite, dans l'application **Fichiers**, faites un appui long sur la photo → **Renommer**.

**Étape B – Envoyer la photo sur GitHub**
1. Ouvrez votre dépôt sur GitHub, puis cliquez sur le dossier **`photos`**.
2. En haut à droite, cliquez sur **« Add file »**, puis sur **« Upload files »**. Sur téléphone, ce bouton peut s'appeler simplement **« + »** ou se trouver dans le menu **« … »**.
3. Glissez votre photo dans le cadre, ou cliquez sur **« choose your files »** pour la choisir. Vous pouvez en envoyer plusieurs d'un coup.
4. En bas, cliquez sur le bouton vert **« Commit changes »**.
5. Après 1 à 2 minutes, la photo apparaît sur le site.

**Taille et format des photos**
- Format **JPG** obligatoire (pas de HEIC, PNG ni PDF).
- Gardez-les **légères** : idéalement moins de 500 Ko, environ 1200 pixels de large. Une photo directement sortie du téléphone pèse souvent plus de 5 Mo : elle ralentit beaucoup le site.
- Format **vertical** (4:5) conseillé pour toutes les photos : accueil, portrait et soins.

---

## 4. Votre logo et vos couleurs

Le logo « DERMOPUR » du site est écrit en texte, avec la police Playfair Display, comme sur vos visuels : il reste net sur tous les écrans. L'icône de l'onglet (`images/favicon.png`, `images/icone.png`) et l'image d'aperçu des partages (`images/partage.jpg`) sont dans le dossier `images`.

Les couleurs sont réglées tout en haut du fichier `style.css` : bordeaux velours (`--bordeaux: #4a0d1c;`), vert matcha (`--matcha: #a8b66c;`), doré (`--or: #c9a95c;`) et crème.

## 5. Les autres textes

Les textes de présentation, les consignes et les horaires sont directement dans les pages :

- `index.html` : l'accueil (accroche, « Moi, c'est Indie », hygiène, déroulement)
- `prestations.html` : la page « Nos soins » (introduction et tarifs)
- `conseils.html` : les consignes avant et après la séance
- `contact.html` : le tableau des horaires et le formulaire
- `mentions-legales.html` : vos informations légales (SIRET, forme juridique, hébergeur)

Modifiez seulement le texte visible entre les balises, par exemple `<p>Mon texte</p>` → changez « Mon texte ». Ne touchez pas à ce qui est entre `<` et `>`.

---

## 6. Le formulaire de rendez-vous

Les demandes envoyées depuis le formulaire arrivent sur **coudret.indie@gmail.com** (service gratuit FormSubmit).

Le client doit obligatoirement remplir son **prénom**, son **nom** et son **numéro de téléphone** : le formulaire refuse l'envoi sans eux. L'e-mail que vous recevez contient aussi le soin choisi, le créneau choisi, son e-mail (s'il l'a donné) et son message. L'objet de l'e-mail affiche directement le prénom, le nom, le téléphone et le créneau.

Si l'envoi ne marche pas (pas de réseau, service indisponible), le site propose au client de vous envoyer sa demande **par WhatsApp**, par e-mail ou de vous appeler.

**La toute première fois** que quelqu'un envoie le formulaire (faites un essai vous-même !), vous recevez un e-mail de FormSubmit qui demande de **confirmer votre adresse** (« Activate Form »). Cliquez sur le bouton de confirmation : ensuite, toutes les demandes arriveront directement dans votre boîte mail. Pensez à regarder dans les spams.

---

## 7. Mettre le site en ligne (gratuit, avec GitHub Pages)

### a) Activer le site
1. Sur GitHub, ouvrez votre dépôt `site-dermopur`.
2. Allez dans **Settings** (Paramètres) → **Pages** (menu de gauche).
3. Dans « Branch », choisissez **main** et le dossier **/ (root)**, puis **Save**.
4. Après 1 à 2 minutes, le site est visible à l'adresse `https://dermopur.github.io/site-dermopur/`.

> Le dépôt doit être **public** pour utiliser GitHub Pages gratuitement.

### b) Brancher votre nom de domaine
1. Chez le site où vous avez acheté le nom de domaine (OVH, IONOS, Gandi…), ouvrez la **zone DNS** du domaine.
2. Ajoutez 4 lignes de type **A** pour le domaine (champ « sous-domaine » vide) :
   `185.199.108.153` — `185.199.109.153` — `185.199.110.153` — `185.199.111.153`
3. Ajoutez une ligne de type **CNAME** : sous-domaine `www` → `dermopur.github.io.`
4. Supprimez les anciennes lignes A ou CNAME qui existaient déjà pour le domaine et `www`.
5. Sur GitHub, dans **Settings → Pages → Custom domain**, écrivez votre domaine puis **Save**.
6. Attendez quelques heures (parfois jusqu'à 24h), puis cochez **Enforce HTTPS** (le petit cadenas).
7. Remplacez ensuite l'adresse `https://dermopur.github.io/site-dermopur/` par votre domaine dans `sitemap.xml`, `robots.txt` et en haut de chaque page (lignes `canonical`, `og:url`, `og:image` et le bloc `application/ld+json` de `index.html`). Je peux le faire pour vous.

### c) Dernière étape
Dans `mentions-legales.html`, l'hébergeur indiqué est GitHub. Si un jour vous changez d'hébergeur, pensez à le modifier.

---

## 8. Les avis Google sur le site

Le site affiche quelques avis Google sur la page d'accueil, avec deux boutons possibles : « Voir tous les avis Google » et « Laisser un avis ».

Fichier : **`mes-contenus/avis.js`**

1. **Les liens** : dans Google Business Profile, trouvez le lien « Demander des avis » (pour laisser un avis) et le lien de votre fiche (pour voir les avis). Collez-les entre les guillemets de `LIEN_DEPOSER_AVIS` et `LIEN_VOIR_AVIS`.
2. **Les avis** : recopiez vos plus beaux avis, **mot pour mot**, avec le prénom et l'initiale du nom seulement. Pour l'instant, deux avis sont recopiés en partie (la fin est remplacée par « […] ») : vous pouvez coller leur texte complet. Les deux liens sont déjà remplis.

Les avis ne se mettent pas à jour tout seuls : c'est vous qui choisissez ceux que vous montrez.

---

## 9. Être visible sur Google (« maquillage semi-permanent Orléans »)

Le site est déjà préparé : titres et descriptions des pages, fiche d'entreprise cachée pour Google, plan du site (`sitemap.xml`). Personne ne peut garantir une place sur Google, mais voici ce qui aide vraiment, par ordre d'importance :

1. **Votre fiche Google Business Profile** : vérifiez que le nom « Dermopur », l'adresse, le téléphone, les horaires et le lien du site y sont bien indiqués.
2. **Demander des avis** à vos clients satisfaits : les avis comptent beaucoup.
3. **Déclarer le site à Google** : sur **search.google.com/search-console**, ajoutez l'adresse de votre site, puis envoyez le plan du site (`sitemap.xml`).
4. **Mettre le même nom, la même adresse et le même numéro** partout (Instagram, Google, annuaires) : « Dermopur – 15 rue du Général de Gaulle, 45650 Saint-Jean-le-Blanc – 07 66 23 04 30 ».
5. Garder le site **à jour** (planning, photos) : Google aime les sites vivants.

Il faut parfois **plusieurs semaines** avant de voir les premiers effets.
