// Content data for the Not So Bad P3 raid guide.
// Editing this file is all you need to update the guide: the UI is generated from it.
//
// Section shape:
//   { id, kind: 'boss' | 'trash', num?, name, tagline, video?: {vid, t}, blocks: [...] }
// Block shape:
//   { title, role?: 'tank'|'heal'|'melee'|'ranged' | array of those, items: [...] }
//   role omitted => always visible, never filtered out.
// Item shape:
//   'plain string with inline <strong>/<em> allowed'
//   { t: 'lead text', sub: ['nested', 'bullets'] }

const VID_HYJAL = '6uQEOw76utQ'; // WoW Curios - Mount Hyjal guide
const VID_BT = 'cvMTW85NQJU'; // WoW Curios - "The ONLY Black Temple Guide You'll Ever Need"

// Community trainer for Teron Gorefiend's ghost phase.
const TERON_MINIGAME = 'https://teron.faldorn.net/terongame/';
const TERON_MINIGAME_LINK =
  '<a href="' + TERON_MINIGAME + '" target="_blank" rel="noopener">mini-jeu d\'entraînement \u2197</a>';

// Phase 3 global unlock: 2026-08-27 15:00 PDT === 2026-08-27 22:00 UTC (2026-08-28 00:00 CEST)
const P3_RELEASE_UTC = '2026-08-27T22:00:00Z';

const PREP_CHECKLIST = [
  { id: 'pvp-trinket', label: 'Médaillon JcJ <strong>2 min</strong> acheté (2 000 honneur)', note: 'Obligatoire sauf Paladin / Mage — Rage Winterchill' },
  { id: 'rep-cenarion', label: 'Exalté <strong>Expédition Cénarienne</strong>', note: 'Flacons via Marques des Illidari' },
  { id: 'rep-shatar', label: "Exalté <strong>Sha'tar</strong>", note: 'Flacons via Marques des Illidari' },
  { id: 'rep-aldor', label: 'Exalté <strong>Aldor / Clairvoyants</strong>', note: 'Flacons via Marques des Illidari' },
  { id: 'shadow-res', label: '<strong>174</strong> résistance Ombre sur l\'équipement', note: '244 en combat avec le buff +70 — Mother Shahraz' },
  { id: 'food-bloodfin', label: 'Stock de <strong>Broiled Bloodfin</strong>', note: '+8 toutes résistances — journalières cuisine/pêche' },
  { id: 'flask-chromatic', label: 'Stock de <strong>Flask of Chromatic Wonder</strong>', note: '+35 toutes résistances — intendant réputation Karazhan' },
  { id: 'quiver', label: '<strong>Carquois / giberne 24 emplacements</strong> (Chasseurs)', note: '~85-100g + 1 Néant primordial, Travail du cuir' },
  { id: 'teron-minigame', label: "Entraînement <strong>Ombre de la mort</strong> (Teron Gorefiend)", note: 'Rotation 5 / 4 / 2+Tab — ' + TERON_MINIGAME_LINK },
  { id: 'consumables', label: 'Flacons, potions de mana, runes, pierres de soin', note: 'Prévoir large : P3 est une phase à consommables' },
  { id: 'addons', label: 'Addons à jour (DBM/BigWigs, Weakauras)', note: 'Vérifier avant le premier soir' },
];

const INTRO_BLOCKS = [
  {
    title: 'Médaillon JcJ (Alliance / Horde)',
    items: [
      "<strong>Obligatoire</strong> pour tous les membres du raid (sauf Paladins et Mages) pour le premier boss d'Hyjal, <em>Rage Winterchill</em>.",
      "Coût réduit à <strong>2 000 points d'honneur</strong> — facile à obtenir en moins d'une heure sur un week-end de champ de bataille.",
      "<span class=\"warn\">Attention :</span> acheter la version avec <strong>2 minutes de recharge</strong>, pas celle de 5 minutes.",
    ],
  },
  {
    title: 'Réputations cruciales',
    items: [
      "Viser <strong>Exalté</strong> auprès de l'<strong>Expédition Cénarienne</strong>, du <strong>Sha'tar</strong> et de l'<strong>Aldor / Clairvoyants</strong>.",
      "Permet d'échanger les <strong>Marques des Illidari</strong> (qui tombent en abondance au Temple Noir et à Hyjal) contre des <strong>flacons gratuits ou bon marché</strong>, de caractéristiques identiques à vos flacons habituels.",
    ],
  },
  {
    title: "Résistance à l'Ombre (Mother Shahraz)",
    items: [
      "Viser <strong>244 de résistance à l'Ombre pendant le combat</strong> : c'est le palier où plus aucun coup d'Ombre ne passe à plein dégât.",
      "Le buff de raid apporte <strong>+70</strong> — <strong>Prayer of Shadow Protection</strong> rang 2 du Prêtre, ou <strong>Shadow Resistance Aura</strong> du Paladin. <span class=\"warn\">Ils ne se cumulent pas</span>, et aucun totem de Chaman ne donne de résistance à l'Ombre. Il reste donc <strong>174 à trouver sur l'équipement</strong>.",
      "<button type=\"button\" class=\"linklike js-sr-open\">Comment atteindre le cap facilement ?</button>",
      { t: 'Consommables qui comptent dans les 244 :', sub: [
        "<strong>Broiled Bloodfin</strong> (nourriture) : +8 à toutes les résistances — recette des journalières de cuisine/pêche.",
        "<strong>Flask of Chromatic Wonder</strong> : +35 à toutes les résistances — intendant de réputation de Karazhan.",
      ] },
      "<strong>Major Shadow Protection Potion</strong> : absorbe 2 800 à 4 000 dégâts d'Ombre pendant 2 min. <span class=\"warn\">Elle absorbe, elle n'ajoute pas de résistance</span> — elle ne compte pas dans les 244. Une en pré-pot, une pendant le combat.",
    ],
  },
  {
    title: 'Optimisations de classe & divers',
    items: [
      "<strong>Chasseurs :</strong> nouveaux carquois et gibernes de <strong>24 emplacements</strong> à fabriquer en Travail du cuir (~85-100g + 1 Néant primordial).",
      "<strong>Teron Gorefiend :</strong> entraînez-vous sur le " + TERON_MINIGAME_LINK + " pour maîtriser l'Ombre de la mort sous forme de fantôme. Une soirée entière peut se perdre là-dessus.",
      "<strong>Ne wipez pas à Hyjal :</strong> un wipe = 8 vagues de trash à refaire + 8 minutes d'attente. Voir la section <a href=\"#hyjal-trash\">Trash & vagues</a>.",
    ],
  },
];

const RAIDS = [
  {
    id: 'hyjal',
    slug: 'hyjal',
    name: 'Mont Hyjal',
    short: 'Hyjal',
    tagline: '5 boss',
    videoLabel: 'Guide vidéo Mont Hyjal — WoW Curios',
    videoUrl: 'https://www.youtube.com/watch?v=' + VID_HYJAL,
    sections: [
      {
        id: 'hyjal-trash',
        kind: 'trash',
        name: 'Trash & système de vagues',
        tagline: 'La gestion des vagues de monstres et la pénalité de wipe',
        video: { vid: VID_HYJAL, t: 14 },
        blocks: [
          {
            title: 'Le système des vagues',
            items: [
              "Chaque camp requiert de repousser <strong>8 vagues de monstres consécutives</strong> avant de faire apparaître le boss associé.",
            ],
          },
          {
            title: "La règle d'or : interdiction absolue de wiper",
            items: [
              "Si le raid wipe sur une vague ou sur un boss, vous devez <strong>recommencer l'intégralité des 8 vagues de trash</strong>.",
              "S'ajoute un délai de <strong>8 minutes d'attente</strong> avant la réapparition du PNJ leader du camp (Jaina ou Thrall) pour relancer l'événement.",
            ],
          },
          {
            title: 'Gestion des monstres clés',
            items: [
              "<strong>Nécromanciens ténébreux :</strong> à contrôler mentalement (Mind Control) par les Prêtres pour appliquer <strong>Unholy Frenzy</strong> sur vos DPS physiques. <span class=\"warn\">Attention :</span> le buff inflige 500 dégâts toutes les 2 s et génère énormément de menace.",
              "<strong>Abominations :</strong> aura de dégâts de Nature en zone qui surcharge vite les soigneurs de mêlée si elles sont trop regroupées.",
              "<strong>Wyrms de givre :</strong> uniquement au camp de la Horde. Volent et attaquent à distance. À tanker à l'écart du raid par un <strong>DPS à distance (caster tank)</strong> pour que le souffle de givre ne touche pas tout le groupe.",
            ],
          },
        ],
      },
      {
        id: 'rage-winterchill',
        kind: 'boss',
        num: 1,
        name: 'Rage Winterchill',
        tagline: "Gestion de l'Icebolt et placement en cercle",
        video: { vid: VID_HYJAL, t: 160 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Icebolt :</strong> cible un joueur au hasard, gros dégâts directs, le gèle/stun 4 s et applique un DoT qui le tue en 2 à 3 s s'il n'est pas libéré.",
              "<strong>Death &amp; Decay :</strong> zone rouge très peu visible au sol, <strong>15 % des PV max par seconde</strong>.",
              "<strong>Frost Nova :</strong> gèle les cibles proches au sol.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Récupérer le boss au milieu du camp et le positionner à proximité de <strong>Jaina Portvaillant</strong> pour bénéficier de l'aide des PNJ.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Restez bien écartés les uns des autres.",
              "Sur un Icebolt : soins massifs instantanés, et dissipation du débuff si possible.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              "<strong>Dispersion absolue en cercle</strong> tout autour du boss, le plus loin possible, pour minimiser Death &amp; Decay et Nova.",
              "<strong>Médaillon JcJ immédiat</strong> dès que vous êtes touché par l'Icebolt (Bulle pour les Paladins, Transfert pour les Mages) : ça annule le stun et vous survivez.",
              "<span class=\"warn\">Rappel :</span> rééquipez votre bijou normal après le combat.",
            ],
          },
        ],
      },
      {
        id: 'anetheron',
        kind: 'boss',
        num: 2,
        name: 'Anetheron',
        tagline: 'Placement des soigneurs et gestion des Infernaux',
        video: { vid: VID_HYJAL, t: 244 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Carrion Swarm :</strong> cône de zone toutes les 15 s. 3k à 6k dégâts d'Ombre + DoT réduisant les <strong>soins prodigués de 75 %</strong> pendant 15 s.",
              "<strong>Towering Infernals :</strong> invoqués sur des joueurs aléatoires. Assomment à l'impact, dégâts de feu de zone permanents. Profitent de l'aura vampirique du boss s'ils sont trop proches.",
              "<strong>Sleep :</strong> endort 2 à 3 joueurs pendant 10 s.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Le Main Tank tient Anetheron près de Jaina.",
              "Un <strong>Paladin off-tank</strong> se tient prêt à récupérer chaque Infernal dès son apparition (Exorcisme + Bouclier du vengeur).",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "<strong>Dispersion stricte à 360°</strong> tout autour du boss.",
              "Jamais groupés : le Carrion Swarm (-75 % soins) ne doit toucher qu'un seul soigneur à la fois.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              "Ignorez totalement les Infernaux. L'off-tank s'en occupe à l'écart.",
              "Tout le DPS sur le boss pour écourter le combat.",
            ],
          },
        ],
      },
      {
        id: 'kazrogal',
        kind: 'boss',
        num: 3,
        name: "Kaz'rogal",
        tagline: 'Gestion rigoureuse du mana et soft-enrage',
        video: { vid: VID_HYJAL, t: 345 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Mark of Kaz'rogal :</strong> lancée sur tous les utilisateurs de mana à 45 s de combat, puis toutes les 40 s, 35 s, etc. Draine 600 mana/s pendant 5 s (3k au total). <span class=\"warn\">Si le mana tombe à 0, le joueur explose</span> pour 10k-11k dégâts d'Ombre sur lui-même et ses voisins.",
              "<strong>Cleave :</strong> attaque frontale puissante.",
              "<strong>War Stomp :</strong> étourdit toutes les cibles en mêlée pendant 5 s.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Amener le boss vers Thrall dès l'engagement.",
              "Maintenez-le face opposée au raid pour que le Cleave ne touche pas les DPS de mêlée.",
            ],
          },
          {
            title: 'Soigneurs & Casters',
            role: ['heal', 'ranged'],
            items: [
              "Surveillez votre mana en permanence : il ne doit <strong>jamais descendre sous 3 000 à 4 000 points</strong>.",
              "Potions de mana et runes de façon ultra-proactive.",
              "<strong>Si votre mana est sur le point de tomber à zéro, courez immédiatement à l'écart</strong> pour exploser seul sans emporter le raid.",
            ],
          },
          {
            title: 'DPS Mêlée',
            role: 'melee',
            items: [
              "Positionnez-vous impérativement dans le dos du boss.",
            ],
          },
        ],
      },
      {
        id: 'azgalor',
        kind: 'boss',
        num: 4,
        name: 'Azgalor',
        tagline: 'Sacrifice des condamnés et contrôle des Gardes du courroux',
        video: { vid: VID_HYJAL, t: 434 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Doom :</strong> sur un joueur aléatoire toutes les 45 s. À l'expiration (20 s), le joueur meurt instantanément et fait apparaître un <strong>Lesser Doomguard</strong> puissant.",
              "<strong>Rain of Fire :</strong> zone de feu sur un joueur aléatoire.",
              "<strong>Howl of Azgalor :</strong> réduit le raid au silence pendant 5 s — résistable avec la protection contre l'Ombre.",
              "<strong>Cleave :</strong> attaque frontale.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Le Main Tank tient le boss face opposée au raid.",
              "L'<strong>off-tank</strong> se tient éloigné du raid. Il récupère chaque Lesser Doomguard à sa naissance et le maintient sur les PNJ alliés pour qu'ils génèrent de la menace à sa place.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Assurez-vous que tout le monde bénéficie de la protection contre l'Ombre du Prêtre pour maximiser les résistances au silence.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              "Restez bien dispersés pour limiter les dégâts de la Pluie de feu.",
              "<strong>Si vous recevez Doom : courez immédiatement sur l'off-tank</strong> et attendez votre mort. Le Lesser Doomguard doit apparaître directement sur le tank secondaire, pas au milieu des soigneurs ou des casters.",
              "Ne perdez aucun DPS sur les Lesser Doomguards : ils disparaissent d'eux-mêmes à la mort d'Azgalor.",
            ],
          },
        ],
      },
      {
        id: 'archimonde',
        kind: 'boss',
        num: 5,
        name: 'Archimonde',
        tagline: "Mécanique mortelle de l'Air Burst et interdiction de mourir",
        video: { vid: VID_HYJAL, t: 515 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Air Burst :</strong> propulse une cible et tous les joueurs à moins de 15 m très haut dans les airs. La chute est mortelle.",
              "<strong>Doomfire Strike :</strong> traînée de feu mobile se déplaçant vers un joueur aléatoire. 2,4k dégâts toutes les 3 s au contact.",
              "<strong>Fear :</strong> cri de zone de 8 s toutes les 40 s.",
              "<strong>Grip of the Legion :</strong> malédiction infligeant 2,5k dégâts toutes les 2 s pendant 5 minutes.",
              "<strong>Soul Charge :</strong> <span class=\"warn\">à chaque mort d'un joueur, Archimonde gagne une charge d'âme</span> et déclenche un effet dévastateur selon la classe de la victime (silence de zone, +50 % dégâts, ou brûlure de mana).",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Archimonde inflige d'énormes dégâts de mêlée (9k-10k sur un tank T5) mais ne fait pas de coups écrasants.",
              "Nécessite une attention de soin exclusive et permanente.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Dissipez <strong>Grip of the Legion</strong> en priorité absolue.",
              "<strong>Zéro mort tolérée dans le raid</strong>, sous peine de wipe en chaîne via Soul Charge.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              { t: "<strong>Tears of the Goddess</strong> — à récupérer auprès de Tyrande <em>avant</em> le combat. Sur un Air Burst :", sub: [
                "Attendez d'atteindre le point le plus haut de la propulsion (l'apex).",
                "Comptez <strong>3 secondes de chute libre</strong>.",
                "Activez l'objet — effet de chute lente de 2 secondes.",
              ] },
              "Restez à proximité de votre Chaman attitré : le Totem de séisme brise instantanément le Fear et vous évite de courir dans les flammes de Doomfire.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bt',
    slug: 'bt',
    name: 'Temple Noir',
    short: 'Temple Noir',
    tagline: '9 boss',
    videoLabel: 'Guide vidéo Temple Noir — WoW Curios',
    videoUrl: 'https://www.youtube.com/watch?v=' + VID_BT,
    sections: [
      {
        id: 'bt-trash',
        kind: 'trash',
        name: 'Trash & patrouilles',
        tagline: 'Gestion spécifique des packs de patrouille',
        video: { vid: VID_BT, t: 0 },
        blocks: [
          {
            title: "Packs de Généraux Coilskar (avant Naj'entus)",
            items: [
              "Les Généraux Coilskar possèdent l'aptitude passive <strong>Free Friend</strong>.",
              "Elle annule et supprime instantanément tous les contrôles de foule (Mouton, Glaçon, Piège) appliqués sur les monstres proches.",
              "<strong>Stratégie :</strong> aucun CC sur ces packs. Regroupez tout et tuez en priorité les <strong>Soothsayers</strong>, qui soignent leurs alliés.",
            ],
          },
          {
            title: 'Bonechewer Behemoth',
            items: [
              "Utilise un <strong>Météore</strong> répartissant d'immenses dégâts entre les cibles touchées.",
              "<strong>Stratégie :</strong> tout le raid — mêlées, casters, soigneurs — <strong>strictement packé derrière le monstre</strong> pour diviser les dégâts.",
            ],
          },
          {
            title: 'Sentinelle de la promenade',
            items: [
              "<strong>L1 Arcane Charge :</strong> dégâts d'arcane directs légers.",
              "<strong>L4 Arcane Charge :</strong> rayon laser persistant au sol — sortez de la trajectoire immédiatement.",
              "<strong>L5 Arcane Charge :</strong> incantation de 3 s qui <span class=\"warn\">tue instantanément un joueur aléatoire</span> (100 % des PV max).",
              "<strong>Stratégie :</strong> le joueur ciblé casse la ligne de vue derrière un pilier, ou reçoit d'urgence un Mot de pouvoir : Bouclier et remonte à 100 % de ses PV avant la fin du cast.",
            ],
          },
        ],
      },
      {
        id: 'najentus',
        kind: 'boss',
        num: 1,
        name: "High Warlord Naj'entus",
        tagline: 'Bouclier de marée et extraction des épines',
        video: { vid: VID_BT, t: 22 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Needle Spine :</strong> projectiles sur 3 cibles aléatoires, infligeant des dégâts de zone aux joueurs trop proches d'elles.",
              "<strong>Impaling Spine :</strong> empale un joueur toutes les 20 s. 5k dégâts directs + DoT de 2,7k toutes les 3 s. Le joueur est immobilisé.",
              "<strong>Tidal Shield :</strong> toutes les 60 s, le boss s'entoure d'une bulle qui l'immunise aux dégâts et le soigne sur la durée.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: ["Maintenir le boss au centre de la pièce."],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Dès que le Tidal Shield s'active, <strong>remontez tout le raid au-dessus de 8 500 PV</strong> avant que le bouclier ne soit brisé.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              "<strong>Distance :</strong> dispersion maximale en cône derrière le boss pour éviter la propagation de Needle Spine.",
              "<strong>Mêlée :</strong> deux sous-groupes distincts, bien packés derrière le boss.",
              "<strong>Libération :</strong> un joueur valide clique sur le joueur empalé pour retirer l'épine, qui atterrit dans son inventaire.",
              "<strong>Briser le bouclier :</strong> le porteur de l'épine la lance sur le boss dès que le Tidal Shield est actif. <span class=\"warn\">Attention :</span> briser le bouclier inflige <strong>8,5k dégâts de givre à tout le raid</strong> — pierre de soin de Démoniste immédiate pour soulager les heals.",
            ],
          },
        ],
      },
      {
        id: 'supremus',
        kind: 'boss',
        num: 2,
        name: 'Supremus',
        tagline: 'Phase de kiting et évitement des volcans',
        video: { vid: VID_BT, t: 270 },
        blocks: [
          {
            title: 'Phase 1 (60 s)',
            items: [
              "<strong>Hateful Strike :</strong> attaque de mêlée dévastatrice (27k-32k) lancée périodiquement sur le joueur ayant le plus de PV à portée de mêlée, hors cible principale.",
              "<strong>Molten Flame :</strong> ligne de feu bleuâtre traçant sa route vers un joueur.",
            ],
          },
          {
            title: 'Phase 2 (60 s) — phase de fixation',
            items: [
              "<strong>Volcanic Geyser :</strong> des volcans poussent au sol et infligent 5k dégâts par seconde dans un rayon de 15 m.",
              "<strong>Fixation</strong> (le raid dit « gaze ») : Supremus fixe un joueur toutes les 10 s et le poursuit. S'il l'atteint, <strong>Molten Punch</strong> le tue sur le coup.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Le Main Tank garde la menace principale.",
              "L'<strong>off-tank</strong> s'équipe d'un stuff d'atténuation maximal et maintient ses PV au plus haut pour absorber tous les Hateful Strikes en Phase 1.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "En Phase 1, soins ultra-intensifs focalisés sur l'off-tank pour l'empêcher de tomber sous les Hateful Strikes.",
            ],
          },
          {
            title: 'DPS Mêlée',
            role: 'melee',
            items: [
              "Strictement derrière le boss en Phase 1.",
              "Sortez immédiatement des trajectoires de feu bleu.",
            ],
          },
          {
            title: 'DPS Distance',
            role: 'ranged',
            items: [
              "En Phase 2, si Supremus vous fixe : <strong>fuyez loin de lui</strong> en évitant les geysers au sol.",
              "Les non-ciblés restent à bonne distance mais peuvent continuer à DPS en bougeant.",
            ],
          },
        ],
      },
      {
        id: 'shade-of-akama',
        kind: 'boss',
        num: 3,
        name: 'Shade of Akama',
        tagline: "Combat de vagues et libération d'Akama",
        video: { vid: VID_BT, t: 430 },
        blocks: [
          {
            title: 'Déroulement du combat',
            items: [
              "Le combat s'engage en parlant à Akama. Objectif premier : éliminer tous les <strong>Ashtongue Channelers</strong> pour libérer l'Ombre d'Akama.",
              "Une fois l'Ombre libérée, elle se dirige vers Akama. Le raid doit la tuer extrêmement vite avant qu'elle ne le tue.",
              "Des vagues de monstres de faible difficulté apparaissent en boucle par les portes latérales.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Regroupez les vagues qui arrivent par les portes pour que les DPS les nettoient facilement.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Maintenez en vie les tanks de vagues.",
              "Soignez Akama si nécessaire.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              "<strong>Option A (sécurité) :</strong> diviser le raid en trois groupes — un par porte pour contrôler les vagues, plus un groupe principal sur les canalisateurs.",
              "<strong>Option B (vitesse) :</strong> packer toutes les vagues au milieu et détruire à l'AoE massive tout en éliminant les canalisateurs.",
              "<strong>Dès que l'Ombre est libérée :</strong> tous les bursts pour l'exécuter avant qu'elle ne terrasse Akama.",
            ],
          },
          {
            title: 'Avantage stratégique',
            items: [
              "La mort de ce boss active un <strong>téléporteur</strong> depuis l'entrée du raid jusqu'à cette salle — indispensable en cas de wipe ultérieur.",
            ],
          },
        ],
      },
      {
        id: 'teron-gorefiend',
        kind: 'boss',
        num: 4,
        name: 'Teron Gorefiend',
        tagline: "Course au DPS et mini-jeu de l'Ombre de la mort",
        video: { vid: VID_BT, t: 530 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Shadow of Death :</strong> appliqué toutes les 30 s à un joueur aléatoire. Au bout de 55 s, le joueur meurt, se transforme en fantôme et fait apparaître <strong>4 Shadowy Constructs</strong> à l'endroit de sa mort. Ces monstres marchent vers le raid et le déciment s'ils l'atteignent.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "Maintenez Teron Gorefiend au centre.",
              "Pas de mécanique complexe côté tank : pur combat de menace et de robustesse.",
            ],
          },
          {
            title: 'Entraînement hors raid',
            items: [
              "Le contrôle du fantôme ne s'improvise pas : passez par le " + TERON_MINIGAME_LINK + " avant le soir de raid.",
            ],
          },
          {
            title: 'Si vous êtes ciblé par Shadow of Death',
            role: ['heal', 'melee', 'ranged'],
            items: [
              "Dès le débuff, <strong>courez à l'extrême opposé du raid</strong>, le plus loin possible, pour mourir à l'écart.",
              { t: "Dès votre réapparition en fantôme, rotation stricte sur les constructs :", sub: [
                "<strong>Touche 5 — Spirit Volley :</strong> instantanément, AoE sur le pack.",
                "<strong>Touche 4 — Spirit Chains :</strong> pour root l'ensemble des constructs.",
                "<strong>Touche 2 — Spirit Lance :</strong> deux sur un construct → <em>Tab</em> → deux sur le suivant → <em>Tab</em> → répétez, pour les ralentir individuellement.",
                "Relancez l'AoE (5) et le root (4) dès la fin de leurs cooldowns, en alternant avec les Lances.",
              ] },
            ],
          },
          {
            title: 'Raid complet',
            items: [
              "<strong>Bloodlust</strong> dès l'engagement et burn du boss le plus vite possible.",
            ],
          },
        ],
      },
      {
        id: 'gurtogg-bloodboil',
        kind: 'boss',
        num: 5,
        name: 'Gurtogg Bloodboil',
        tagline: 'Rotation des tanks, placement cascade et Fel Rage',
        video: { vid: VID_BT, t: 740 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Acidic Wound :</strong> cumul de poison appliqué sur le tank à chaque coup blanc reçu.",
              "<strong>Bloodboil :</strong> débuff cumulable lancé toutes les 10 s sur les <strong>5 joueurs les plus éloignés</strong> du boss.",
              "<strong>Fel Rage (Phase 2) :</strong> augmente massivement les PV, dégâts, armure et soins d'un joueur aléatoire, mais le boss ne cible plus que lui et le frappe avec violence.",
            ],
          },
          {
            title: 'Tanks — composition à 3 tanks obligatoire',
            role: 'tank',
            items: [
              "Le boss est <strong>immunisé aux provocations</strong>. Les trois tanks équipent un stuff de survie maximal et luttent en permanence à la menace pour rester dans le Top 3.",
              "Rotation de tank : le tank secondaire passe <em>devant</em> le tank actuel pour reprendre la menace naturelle, dès que le tank actif atteint <strong>15 à 20 charges d'Acidic Wound</strong> (~toutes les 30 s).",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Phase de survie extrême : tanks sous Acidic Wound + vagues de joueurs gérant le Bloodboil.",
              "<strong>Spam-heal sans aucune interruption le joueur ciblé par la Fel Rage</strong> en Phase 2, sous peine de wipe immédiat.",
            ],
          },
          {
            title: 'DPS Distance / Casters — stratégie de la cascade',
            role: ['ranged', 'melee'],
            items: [
              "Tout le raid se tient packé près de la cascade d'eau.",
              "À l'annonce du Raid Leader, le groupe désigné (ex. Groupe 3) se déplace dans l'eau — devenant les plus éloignés — pour absorber les charges de Bloodboil. Une fois les charges reçues, il réintègre le pack et le groupe suivant (ex. Groupe 4) prend le relais.",
              "<strong>Dispersion :</strong> dispersez-vous impérativement juste avant la 5<sup>e</sup> vague de Bloodboil pour ne pas être trop proches lors de la transition en Phase 2.",
            ],
          },
        ],
      },
      {
        id: 'reliquary-of-souls',
        kind: 'boss',
        num: 6,
        name: 'Reliquary of Souls',
        tagline: 'Le boss à trois visages et trois auras uniques',
        video: { vid: VID_BT, t: 940 },
        blocks: [
          {
            title: 'Phase 1 — Aura of Suffering',
            items: [
              "<strong>Effet :</strong> soins et régénération réduits de 100 %, armure réduite de 100 %, défense réduite de 500.",
            ],
          },
          {
            title: 'Phase 1 — Tanks',
            role: 'tank',
            items: [
              "La menace appartient au joueur le plus proche physiquement du boss. Tournez les tanks en faisant simplement passer l'off-tank devant le main tank.",
              "Le boss enrage toutes les 45 s pendant 15 s : un <strong>Voleur sous Évasion</strong> (15 s) peut se coller au boss pour tanker cette phase de rage.",
            ],
          },
          {
            title: 'Phase 1 — Soigneurs',
            role: 'heal',
            items: [
              "Aucun soin n'est possible.",
              "Concentrez-vous uniquement sur la dissipation du débuff <strong>Soul Drain</strong>.",
            ],
          },
          {
            title: 'Phase 2 — Aura of Desire',
            items: [
              "<strong>Effet :</strong> <span class=\"warn\">50 % de vos dégâts infligés vous sont renvoyés</span> sous forme de dégâts personnels.",
            ],
          },
          {
            title: 'Phase 2 — Tanks',
            role: 'tank',
            items: [
              "Le boss lance <strong>Deaden</strong> sur sa cible : +100 % de dégâts subis pendant 10 s.",
              "Le tank doit impérativement <strong>renvoyer ce sort au boss via Spell Reflect</strong>.",
            ],
          },
          {
            title: 'Phase 2 — Raid',
            role: ['melee', 'ranged', 'heal'],
            items: [
              "Interrompez absolument <strong>Spirit Shock</strong>.",
              "Les Mages volent (Spellsteal) ou les Chasseurs de l'Ombre dévorent le <strong>Rune Shield</strong> du boss.",
              "Dosez votre DPS pour ne pas vous suicider sur le renvoi de dégâts.",
            ],
          },
          {
            title: 'Phase 3 — Aura of Anger',
            items: [
              "<strong>Effet :</strong> dégâts d'Ombre périodiques sur tout le raid, qui augmentent exponentiellement toutes les 3 s.",
            ],
          },
          {
            title: 'Phase 3 — Tanks',
            role: 'tank',
            items: [
              "Le boss utilise <strong>Soul Scream</strong> en cône frontal. Ses dégâts sont multipliés par la quantité de rage ou de mana du tank.",
              "<span class=\"warn\">Videz impérativement toute votre rage et votre mana</span> avant que le sort ne parte.",
            ],
          },
          {
            title: 'Phase 3 — Raid',
            role: ['melee', 'ranged', 'heal'],
            items: [
              "Course pure au DPS. <strong>Bloodlust</strong> et tous les cooldowns offensifs immédiatement.",
              "Soigneurs : tenez le raid en vie face aux dégâts d'Ombre croissants et surveillez les cibles sous <strong>Spite</strong>.",
            ],
          },
        ],
      },
      {
        id: 'mother-shahraz',
        kind: 'boss',
        num: 7,
        name: 'Mother Shahraz',
        tagline: 'Positionnement sous les statues et Fatal Attraction',
        video: { vid: VID_BT, t: 1110 },
        blocks: [
          {
            title: 'Prérequis',
            items: [
              "<strong>174 de résistance à l'Ombre sur l'équipement</strong> pour tout le raid, soit <strong>244 en combat</strong> avec le buff +70. <button type=\"button\" class=\"linklike js-sr-open\">Comment atteindre le cap facilement ?</button>",
            ],
          },
          {
            title: 'Capacités importantes',
            items: [
              "<strong>Saber Lash :</strong> enchaînement frontal de 20 m de portée, 30 000 points de dégâts répartis équitablement entre 3 cibles maximum.",
              "<strong>Fatal Attraction :</strong> téléporte 3 joueurs aléatoires sur un même point et les lie par des lasers d'Ombre infligeant des dégâts majeurs tant qu'ils restent proches.",
              "<strong>Sinful Beam</strong>, <strong>Sinister Beam</strong>, <strong>Vile Beam</strong> et <strong>Wicked Beam</strong> : quatre rayons lancés toutes les 9 s sur 10 cibles au hasard — dégâts, projection en l'air ou brûlure de mana.",
              "<strong>Silencing Shriek :</strong> silence de zone. À ne pas confondre avec les <em>Prismatic Aura</em>, qui sont les auras de résistance de la boss.",
            ],
          },
          {
            title: 'Tanks — composition à 3 tanks obligatoire',
            role: 'tank',
            items: [
              "Les 3 tanks se tiennent <strong>strictement groupés face au boss</strong> pendant tout le combat pour diviser équitablement les 30k dégâts de chaque Saber Lash.",
              "Le tank maintient la boss bien au centre, éloignée des deux groupes de DPS.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Gardez le raid constamment au maximum de ses PV : les rayons et Fatal Attraction sont imprévisibles.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              { t: "<strong>Technique des mains de statues</strong> — annule ou réduit fortement les dégâts de chute des projections :", sub: [
                "Le groupe <strong>distance</strong> se place précisément <strong>sous la main de la statue de gauche</strong>.",
                "Le groupe <strong>mêlée</strong> fait de même sous la <strong>statue de droite</strong>.",
                "Vérifiez que votre caméra clip sous l'obstacle en visant le sol : c'est le repère que vous êtes bien placé.",
              ] },
              "<strong>Fatal Attraction :</strong> si vous êtes téléporté, <strong>courez immédiatement dans trois directions opposées</strong> pour briser les liens au plus vite.",
            ],
          },
        ],
      },
      {
        id: 'illidari-council',
        kind: 'boss',
        num: 8,
        name: 'Illidari Council',
        tagline: 'Coordination des 4 boss et rôle crucial des interrupteurs',
        video: { vid: VID_BT, t: 1220 },
        blocks: [
          {
            title: 'Capacités importantes',
            items: [
              "Les 4 boss <strong>partagent leur barre de vie</strong>. Concentrez les dégâts sur <strong>Gathios l'Aplatisseur</strong>, qui reçoit la majorité des débuffs de raid.",
              "<strong>Zerevor :</strong> puissantes explosions arcaniques à proximité de lui.",
              "<strong>Lady Malande :</strong> applique des boucliers immunisant périodiquement les boss aux dégâts physiques ou magiques, et lance de puissants soins.",
              "<strong>Gathios :</strong> pose des zones de Consécration au sol toutes les 30 s.",
            ],
          },
          {
            title: 'Tanks',
            role: 'tank',
            items: [
              "<strong>Mage tank :</strong> pull et tank <strong>Zerevor</strong> sur le côté gauche de la salle, à plus de 10 m de tout autre joueur pour éviter les explosions d'arcane. Volez impérativement son <strong>Dampen Magic</strong>.",
              "<strong>Main tank (Guerrier recommandé) :</strong> tank Gathios sur le côté droit. <strong>Spell Reflect</strong> sur son <strong>Judgement of Command</strong>. Déplacez Gathios hors de ses propres Consécrations de manière ultra-réactive.",
              "<strong>Off-tank :</strong> tank Lady Malande à l'écart.",
            ],
          },
          {
            title: 'Soigneurs',
            role: 'heal',
            items: [
              "Suivez les mouvements du raid.",
              "Soignez les victimes du poison de Veras (le voleur qui apparaît furtivement) et des plaques de Blizzard / Flamme au sol.",
            ],
          },
          {
            title: 'DPS Mêlée & Distance',
            role: ['melee', 'ranged'],
            items: [
              "<strong>Équipe d'interruption Lady Malande — 4 joueurs requis :</strong> 2 interrupteurs physiques (Voleurs / Guerriers) et 2 interrupteurs magiques (Chamans), pour contrer en permanence ses soins en s'adaptant à ses boucliers d'immunité magique ou physique.",
              "Ne restez jamais plus d'une seconde — un seul tick — dans une zone de Blizzard, Flamme ou Consécration.",
            ],
          },
        ],
      },
      {
        id: 'illidan-stormrage',
        kind: 'boss',
        num: 9,
        name: 'Illidan Stormrage',
        tagline: 'Le combat légendaire en 5 phases',
        video: { vid: VID_BT, t: 1335 },
        blocks: [
          {
            title: 'Phase 1 — 100 % à 65 %',
            items: [
              "Le MT oriente Illidan <strong>dos au raid</strong> pour éviter <strong>Draw Soul</strong>. Le tank bouge pour esquiver les flaques bleues de <strong>Flame Crash</strong>.",
              "<strong>Parasitic Shadowfiend :</strong> posé sur un joueur toutes les 30 s. Le joueur s'écarte du raid. À l'expiration, 2 parasites de 3k PV apparaissent et foncent sur d'autres joueurs — <span class=\"warn\">tuez-les instantanément à distance</span>.",
            ],
          },
          {
            title: "Phase 2 — vol d'Illidan (65 %)",
            items: [
              "Illidan s'envole et lance ses deux glaives, qui invoquent <strong>deux Élémentaires de feu</strong>.",
              "Le raid se divise en <strong>3 groupes formant un triangle</strong> au milieu de la pièce pour diviser les boules de feu. Évitez les deux lignes de lasers bleus (<strong>Eye Blast</strong>).",
            ],
          },
          {
            title: 'Phase 2 — Tanks Feu (2 tanks requis)',
            role: 'tank',
            items: [
              "Récupérez un élémentaire chacun.",
              "<span class=\"warn\">Ne les déplacez jamais trop loin de leur glaive d'origine</span> : ça déclenche leur enrage de wipe.",
              "Déplacez-les hors de leurs propres zones de feu au sol (<strong>Blaze</strong>) en les orientant dos au raid pour éviter leur souffle de flammes.",
            ],
          },
          {
            title: "Phase 3 — atterrissage d'Illidan",
            items: [
              "Similaire à la Phase 1, mais tout le raid reste dispersé à cause des dégâts de zone des <strong>Agonizing Flames</strong>.",
            ],
          },
          {
            title: 'Phase 4 — forme de démon (toutes les 40-50 s)',
            items: [
              "Le boss se transforme en démon. <strong>Arrêtez tout DPS lors de la transition</strong> pour laisser le <strong>Warlock tank Shadow Resist</strong> prendre la menace principale à distance.",
              "Des <strong>Shadow Demons</strong> apparaissent et fixent 4 joueurs en les stunnant. Les DPS doivent les détruire à distance avant qu'ils n'atteignent leurs cibles — <span class=\"warn\">mort instantanée</span> sinon.",
            ],
          },
          {
            title: "Phase 5 — arrivée de Maiev (30 % à 0 %)",
            items: [
              "Illidan subit une rage de zone toutes les 40 s.",
              "Le tank doit guider Illidan <strong>précisément sur les <strong>Cage Trap</strong> posés au sol par Maiev</strong> pour dissiper cette rage, tout en évitant d'orienter le boss face au raid.",
            ],
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Shadow resistance guide (shown in a modal from the intro tab and from the
// Mother Shahraz section). Every number below was checked against Wowhead's
// TBC dataset; see README for what was corrected from the first draft.
// ---------------------------------------------------------------------------
const SHADOW_RESIST = {
  title: "Atteindre le cap de résistance à l'Ombre",
  subtitle: 'Mother Shahraz — Temple Noir',

  intro: [
    "Mother Shahraz arrose le raid de dégâts d'Ombre : <strong>Fatal Attraction</strong> et les quatre rayons <strong>Sinful Beam</strong>, <strong>Sinister Beam</strong>, <strong>Vile Beam</strong> et <strong>Wicked Beam</strong>. Sans résistance, ça one-shot.",
    "La cible pratique est <strong>244 de résistance à l'Ombre pendant le combat</strong>. C'est le palier où chaque coup d'Ombre subit au moins une résistance partielle — plus aucun coup à plein dégât. Le plafond absolu du jeu est 365, hors de portée en Phase 3.",
  ],

  buff: {
    title: 'Le buff de raid : +70',
    items: [
      "<strong>Prayer of Shadow Protection</strong> rang 2 (Prêtre niveau 70) : +70 pendant 20 min.",
      "<strong>Shadow Resistance Aura</strong> (Paladin) : +70, en continu.",
      "<span class=\"warn\">Les deux ne se cumulent pas</span> — seul le plus élevé s'applique. Un seul suffit.",
      "<span class=\"warn\">Il n'existe aucun totem de résistance à l'Ombre en TBC.</span> Les Chamans n'ont que Feu, Givre et Nature.",
    ],
  },

  // Single sentence: rendered as a paragraph, not a one-item list.
  target: {
    title: 'Ce qu\'il faut sur le personnage',
    text: "<strong>244 buffé</strong> − 70 de buff = <strong>174 sur l'équipement</strong>, non buffé.",
  },

  sources: {
    title: 'Les sources de résistance',
    note: 'Colonne « RO » = résistance à l\'Ombre apportée.',
    family: {
      title: 'Les crafts Cendrelangue existent pour les quatre types d\'armure',
      text: "Mêmes valeurs, mêmes coûts, un set par type : <strong>Soulguard</strong> en tissu, <strong>Redeemed Soul</strong> en cuir, <strong>Shackled Souls</strong> en mailles, <strong>Shadesteel</strong> en plaque. Chaque set couvre poignets <span class=\"sr-n\">+40</span>, ceinture <span class=\"sr-n\">+54</span>, bottes <span class=\"sr-n\">+54</span> et jambes <span class=\"sr-n\">+72</span>. Tout est <em>BoE</em> : un artisan de la guilde peut vous les fabriquer.",
    },
    rows: [
      { item: 'Medallion of Karabor', slot: 'Cou', sr: '+40', how: "Quête d'accès au Temple Noir", universal: true },
      { item: "Night's End", slot: 'Dos', sr: '+40', how: 'Couture 375 · Cendrelangue <strong>Honoré</strong> · 1 Cœur des ténèbres · <em>BoE</em>', universal: true },
      { item: 'Enchant Cloak - Greater Shadow Resistance', slot: 'Dos', sr: '+15', how: 'Enchantement, se cumule avec la cape', universal: true },
      { item: 'Glyph of Shadow Warding', slot: 'Tête', sr: '+20', how: 'Ville basse <strong>Honoré</strong>', universal: true },
      { item: 'Shadow Armor Kit', slot: 'Torse, jambes, mains, pieds', sr: '+8 ×4 = +32', how: 'Travail du cuir — remplace l\'enchantement du slot', universal: true },
      { item: 'Void Sphere', slot: 'Châsses', sr: '+4 chacune', how: 'Toutes résistances, va dans une châsse rouge, jaune ou bleue', universal: true },
      { item: 'Prismatic Sphere', slot: 'Châsses', sr: '+3 chacune', how: 'Repli si vous ne trouvez pas de Sphère de vide', universal: true },
      { item: 'Soulguard Bracers', slot: 'Poignets · tissu', sr: '+40', how: 'Couture 375 · Cendrelangue <strong>Amical</strong> · 1 Cœur des ténèbres · <em>BoE</em>', craft: true },
      { item: 'Redeemed Soul Wristguards', slot: 'Poignets · cuir', sr: '+40', how: 'Travail du cuir 375 · Cendrelangue <strong>Honoré</strong> · 1 Cœur des ténèbres · <em>BoE</em>', craft: true },
      { item: 'Bracers of Shackled Souls', slot: 'Poignets · mailles', sr: '+40', how: 'Travail du cuir 375 · Cendrelangue <strong>Amical</strong> · 1 Cœur des ténèbres · <em>BoE</em>', craft: true },
      { item: 'Shadesteel Bracers', slot: 'Poignets · plaque', sr: '+40', how: 'Forge 375 · Cendrelangue <strong>Amical</strong> · 1 Cœur des ténèbres · <em>BoE</em>', craft: true },
    ],
  },

  paths: [
    {
      title: 'Premier soir — Amical suffit, un seul Cœur des ténèbres',
      total: '175 non buffé · 245 buffé · 1 Cœur des ténèbres',
      steps: [
        'Medallion of Karabor <span class="sr-n">+40</span> (quête d\'accès), Glyph of Shadow Warding <span class="sr-n">+20</span> sur la tête, quatre Shadow Armor Kit <span class="sr-n">+32</span> sur torse, jambes, mains et pieds.',
        'Enchantement <strong>Résistance à l\'Ombre supérieure</strong> <span class="sr-n">+15</span> sur la cape que vous portez déjà — pas besoin de Night\'s End à ce stade.',
        'Les <strong>brassards Cendrelangue</strong> <span class="sr-n">+40</span>, accessibles dès <strong>Amical</strong> pour 1 Cœur des ténèbres. <strong>Sous-total : 147.</strong>',
        '7 <strong>Void Sphere</strong> <span class="sr-n">+28</span> → <strong>175</strong>. À défaut, 9 Prismatic Sphere <span class="sr-n">+27</span> suffisent.',
        '<span class="warn">Porteurs de cuir :</span> les Redeemed Soul Wristguards demandent <strong>Honoré</strong>. En attendant, prenez les <strong>Soulguard Bracers</strong> en tissu — disponibles dès Amical, et un porteur de cuir peut équiper du tissu.',
      ],
    },
    {
      title: 'Une fois Honoré — deux Cœurs, et vous récupérez vos gemmes',
      total: '187 non buffé · 257 buffé · 2 Cœurs des ténèbres',
      steps: [
        'Remplacez votre cape par <strong>Night\'s End</strong> <span class="sr-n">+40</span> en gardant l\'enchantement : la cape passe de <span class="sr-n">15</span> à <span class="sr-n">55</span>. C\'est le deuxième Cœur des ténèbres.',
        'Vous montez à 215. Retirez les 7 Void Sphere et remettez vos gemmes de stats → <strong>187</strong>.',
        'Cap dépassé de 13 points, châsses rendues aux statistiques. C\'est la configuration à viser sur la durée.',
      ],
    },
  ],

  consumable: {
    title: 'Consommable',
    items: [
      "<strong>Major Shadow Protection Potion</strong> : absorbe 2 800 à 4 000 dégâts d'Ombre pendant 2 min, 2 min de recharge.",
      "Une en pré-pot avant le pull, une pendant le combat.",
      "<span class=\"warn\">Elle absorbe, elle n'ajoute pas de résistance</span> — elle ne compte pas dans les 244.",
    ],
  },

  caveats: {
    title: 'Les compromis à connaître',
    items: [
      "Les <strong>Shadow Armor Kit</strong> occupent la place de l'enchantement normal du slot. Quatre kits, c'est quatre enchantements de stats perdus.",
      "Idem pour les gemmes : chaque Sphère de vide remplace une gemme de stats.",
      "Toutes les pièces Cendrelangue et <strong>Night's End</strong> sont <em>BoE</em> : un artisan de la guilde peut les fabriquer pour vous, ou elles se trouvent à l'hôtel des ventes.",
      "Chaque craft Cendrelangue consomme <strong>1 Cœur des ténèbres</strong> : la cape et les brassards en demandent donc <strong>deux au total</strong> par joueur.",
      "Le Cœur des ténèbres tombe sur le trash des <strong>deux</strong> raids — Mont Hyjal comme Temple Noir. Vous pouvez donc en accumuler à Hyjal avant même d'entrer au Temple. <span class=\"warn\">En revanche la réputation Cendrelangue, elle, ne se gagne qu'au Temple Noir</span> : c'est elle qui conditionne l'accès aux patrons.",
      "Les autres composants (Void Crystal, Primal Life ×2, Primal Shadow ×2, plus le matériau du métier) s'achètent à l'hôtel des ventes.",
      "Ce set ne sert que sur Shahraz. Prévoyez de le déséquiper juste après.",
    ],
  },
};

const ROLES = [
  { id: 'tank', label: 'Tank', short: 'TANK' },
  { id: 'heal', label: 'Soigneur', short: 'HEAL' },
  { id: 'melee', label: 'DPS Mêlée', short: 'MÊLÉE' },
  { id: 'ranged', label: 'DPS Distance', short: 'DIST' },
];
