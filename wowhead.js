// Wowhead TBC Classic entity registry.
//
// Resolved from Wowhead's own TBC-scoped search API, not hand-typed.
// app.js walks the rendered DOM and appends a Wowhead icon link after any
// <strong> whose text matches a key here. Nothing in data.js needs markup.
//
//   kind: 'spell' | 'npc' | 'item'  -> https://www.wowhead.com/tbc/<kind>=<id>
//   kind: 'search'                  -> https://www.wowhead.com/tbc/search?q=<q>
//   icon: Wowhead icon slug         -> https://wow.zamimg.com/images/wow/icons/medium/<icon>.jpg
//
// WOWHEAD_SCOPED wins over WOWHEAD when the match is inside that raid's panel.
// It exists because generic names ("Cleave", "Fear", "Sleep") resolve to the
// player spell globally; the encounter version differs per raid.

const WOWHEAD = {
 "4 Shadowy Constructs": {
  "icon": null,
  "id": 23111,
  "kind": "npc",
  "name": "Shadowy Construct"
 },
 "Abominations": {
  "icon": null,
  "id": 17898,
  "kind": "npc",
  "name": "Abomination"
 },
 "Acidic Wound": {
  "icon": "ability_gouge",
  "id": 40481,
  "kind": "spell",
  "name": "Acidic Wound"
 },
 "Agonizing Flames": {
  "icon": "spell_fire_blueimmolation",
  "id": 40932,
  "kind": "spell",
  "name": "Agonizing Flames"
 },
 "Air Burst": {
  "icon": "spell_nature_wispsplode",
  "id": 32014,
  "kind": "spell",
  "name": "Air Burst"
 },
 "Akama": {
  "icon": null,
  "id": 21700,
  "kind": "npc",
  "name": "Akama"
 },
 "Anetheron": {
  "icon": null,
  "id": 17808,
  "kind": "npc",
  "name": "Anetheron"
 },
 "Archimonde": {
  "icon": null,
  "id": 17968,
  "kind": "npc",
  "name": "Archimonde"
 },
 "Ashtongue Channelers": {
  "icon": null,
  "id": 23421,
  "kind": "npc",
  "name": "Ashtongue Channeler"
 },
 "Aura of Anger": {
  "icon": "ability_warrior_rampage",
  "id": 41337,
  "kind": "spell",
  "name": "Aura of Anger"
 },
 "Aura of Desire": {
  "icon": "ability_druid_dreamstate",
  "id": 41350,
  "kind": "spell",
  "name": "Aura of Desire"
 },
 "Aura of Suffering": {
  "icon": "spell_shadow_shadowfury",
  "id": 41292,
  "kind": "spell",
  "name": "Aura of Suffering"
 },
 "Azgalor": {
  "icon": null,
  "id": 17842,
  "kind": "npc",
  "name": "Azgalor"
 },
 "Bonechewer Behemoth": {
  "icon": null,
  "id": 23196,
  "kind": "npc",
  "name": "Bonechewer Behemoth"
 },
 "Bouclier du vengeur": {
  "icon": "spell_holy_avengersshield",
  "id": 32700,
  "kind": "spell",
  "name": "Avenger's Shield"
 },
 "Broiled Bloodfin": {
  "icon": "inv_misc_fish_29",
  "id": 33867,
  "kind": "item",
  "name": "Broiled Bloodfin"
 },
 "Carrion Swarm": {
  "icon": "spell_shadow_carrionswarm",
  "id": 31306,
  "kind": "spell",
  "name": "Carrion Swarm"
 },
 "Dampen Magic": {
  "icon": "spell_nature_abolishmagic",
  "id": 10174,
  "kind": "spell",
  "name": "Dampen Magic"
 },
 "Death & Decay": {
  "icon": "spell_shadow_deathanddecay",
  "id": 31258,
  "kind": "spell",
  "name": "Death & Decay"
 },
 "Doomfire Strike": {
  "icon": "spell_fire_selfdestruct",
  "id": 31903,
  "kind": "spell",
  "name": "Doomfire Strike"
 },
 "Draw Soul": {
  "icon": "spell_shadow_coneofsilence",
  "id": 40904,
  "kind": "spell",
  "name": "Draw Soul"
 },
 "Exorcisme": {
  "icon": "spell_holy_excorcism_02",
  "id": 10314,
  "kind": "spell",
  "name": "Exorcism"
 },
 "Fatal Attraction": {
  "icon": "spell_shadow_shadowmend",
  "id": 41001,
  "kind": "spell",
  "name": "Fatal Attraction"
 },
 "Flame Crash": {
  "icon": "classic_temp",
  "id": 40841,
  "kind": "spell",
  "name": "Flame Crash"
 },
 "Flask of Chromatic Wonder": {
  "icon": "inv_potion_48",
  "id": 33208,
  "kind": "item",
  "name": "Flask of Chromatic Wonder"
 },
 "Free Friend": {
  "icon": "spell_holy_dispelmagic",
  "id": 40081,
  "kind": "spell",
  "name": "Free Friend"
 },
 "Gathios": {
  "icon": null,
  "id": 22949,
  "kind": "npc",
  "name": "Gathios the Shatterer"
 },
 "Gathios l'Aplatisseur": {
  "icon": null,
  "id": 22949,
  "kind": "npc",
  "name": "Gathios the Shatterer"
 },
 "Grip of the Legion": {
  "icon": "inv_gauntlets_03",
  "id": 31972,
  "kind": "spell",
  "name": "Grip of the Legion"
 },
 "Gurtogg Bloodboil": {
  "icon": null,
  "id": 22948,
  "kind": "npc",
  "name": "Gurtogg Bloodboil"
 },
 "Généraux Coilskar": {
  "icon": null,
  "id": 22873,
  "kind": "npc",
  "name": "Coilskar General"
 },
 "High Warlord Naj'entus": {
  "icon": null,
  "id": 22887,
  "kind": "npc",
  "name": "High Warlord Naj'entus"
 },
 "Icebolt": {
  "icon": "spell_frost_frostbolt02",
  "id": 31249,
  "kind": "spell",
  "name": "Icebolt"
 },
 "Illidan Stormrage": {
  "icon": null,
  "id": 22917,
  "kind": "npc",
  "name": "Illidan Stormrage"
 },
 "Illidari Council": {
  "icon": null,
  "id": 23426,
  "kind": "npc",
  "name": "The Illidari Council"
 },
 "Impaling Spine": {
  "icon": "spell_frost_iceshard",
  "id": 39837,
  "kind": "spell",
  "name": "Impaling Spine"
 },
 "Jaina Portvaillant": {
  "icon": null,
  "id": 4968,
  "kind": "npc",
  "name": "Lady Jaina Proudmoore"
 },
 "Kaz'rogal": {
  "icon": null,
  "id": 17888,
  "kind": "npc",
  "name": "Kaz'rogal"
 },
 "Lady Malande": {
  "icon": null,
  "id": 22951,
  "kind": "npc",
  "name": "Lady Malande"
 },
 "Maiev": {
  "icon": null,
  "id": 21699,
  "kind": "npc",
  "name": "Maiev Shadowsong"
 },
 "Mark of Kaz'rogal": {
  "icon": "spell_shadow_soulleech_3",
  "id": 31447,
  "kind": "spell",
  "name": "Mark of Kaz'rogal"
 },
 "Marques des Illidari": {
  "icon": "spell_shadow_metamorphosis",
  "id": 32897,
  "kind": "item",
  "name": "Mark of the Illidari"
 },
 "Mind Control": {
  "icon": "spell_shadow_shadowworddominate",
  "id": 605,
  "kind": "spell",
  "name": "Mind Control"
 },
 "Mot de pouvoir : Bouclier": {
  "icon": "spell_holy_powerwordshield",
  "id": 17,
  "kind": "spell",
  "name": "Power Word: Shield"
 },
 "Mother Shahraz": {
  "icon": null,
  "id": 22947,
  "kind": "npc",
  "name": "Mother Shahraz"
 },
 "Médaillon JcJ": {
  "icon": "inv_jewelry_trinketpvp_01",
  "kind": "search",
  "name": "Médaillon JcJ",
  "q": "Medallion of the Horde"
 },
 "Needle Spine": {
  "icon": "spell_frost_icestorm",
  "id": 39835,
  "kind": "spell",
  "name": "Needle Spine"
 },
 "Nécromanciens ténébreux": {
  "icon": null,
  "id": 17899,
  "kind": "npc",
  "name": "Shadowy Necromancer"
 },
 "Parasitic Shadowfiend": {
  "icon": "spell_shadow_soulleech_3",
  "id": 41917,
  "kind": "spell",
  "name": "Parasitic Shadowfiend"
 },
 "Promenade Sentinel": {
  "icon": null,
  "id": 23394,
  "kind": "npc",
  "name": "Promenade Sentinel"
 },
 "Rage Winterchill": {
  "icon": null,
  "id": 17767,
  "kind": "npc",
  "name": "Rage Winterchill"
 },
 "Renvoi de sort (Spell Reflect)": {
  "icon": "ability_warrior_shieldreflection",
  "id": 23920,
  "kind": "spell",
  "name": "Spell Reflection"
 },
 "Rune Shield": {
  "icon": "spell_arcane_blast",
  "id": 41431,
  "kind": "spell",
  "name": "Rune Shield"
 },
 "Saber Lash": {
  "icon": "inv-sword_53",
  "id": 40810,
  "kind": "spell",
  "name": "Saber Lash"
 },
 "Sentinelle de la promenade": {
  "icon": null,
  "id": 23394,
  "kind": "npc",
  "name": "Promenade Sentinel"
 },
 "Shade of Akama": {
  "icon": null,
  "id": 22841,
  "kind": "npc",
  "name": "Shade of Akama"
 },
 "Shadow of Death": {
  "icon": "spell_arcane_prismaticcloak",
  "id": 40251,
  "kind": "spell",
  "name": "Shadow of Death"
 },
 "Shadowy Constructs": {
  "icon": null,
  "id": 23111,
  "kind": "npc",
  "name": "Shadowy Construct"
 },
 "Howl of Azgalor": {
  "icon": "spell_shadow_impphaseshift",
  "id": 31344,
  "kind": "spell",
  "name": "Howl of Azgalor"
 },
 "Soothsayers": {
  "icon": null,
  "id": 22876,
  "kind": "npc",
  "name": "Coilskar Soothsayer"
 },
 "Soul Drain": {
  "icon": "spell_shadow_teleport",
  "id": 41303,
  "kind": "spell",
  "name": "Soul Drain"
 },
 "Soul Scream": {
  "icon": "spell_shadow_coneofsilence",
  "id": 41545,
  "kind": "spell",
  "name": "Soul Scream"
 },
 "Spell Reflect": {
  "icon": "ability_warrior_shieldreflection",
  "id": 23920,
  "kind": "spell",
  "name": "Spell Reflection"
 },
 "Spellsteal": {
  "icon": "spell_arcane_arcane02",
  "id": 30449,
  "kind": "spell",
  "name": "Spellsteal"
 },
 "Spirit Chains": {
  "icon": "spell_frost_chainsofice",
  "id": 40175,
  "kind": "spell",
  "name": "Spirit Chains"
 },
 "Spirit Lance": {
  "icon": "spell_frost_frostbolt",
  "id": 40157,
  "kind": "spell",
  "name": "Spirit Lance"
 },
 "Spirit Shock": {
  "icon": "spell_arcane_massdispel",
  "id": 41426,
  "kind": "spell",
  "name": "Spirit Shock"
 },
 "Spirit Volley": {
  "icon": "spell_frost_icestorm",
  "id": 40314,
  "kind": "spell",
  "name": "Spirit Volley"
 },
 "Supremus": {
  "icon": null,
  "id": 22898,
  "kind": "npc",
  "name": "Supremus"
 },
 "Tears of the Goddess": {
  "icon": "spell_arcane_arcane01",
  "id": 24494,
  "kind": "item",
  "name": "Tears of the Goddess"
 },
 "Teron Gorefiend": {
  "icon": null,
  "id": 22871,
  "kind": "npc",
  "name": "Teron Gorefiend"
 },
 "Thrall": {
  "icon": null,
  "id": 4949,
  "kind": "npc",
  "name": "Thrall"
 },
 "Tidal Shield": {
  "icon": "spell_nature_crystalball",
  "id": 39872,
  "kind": "spell",
  "name": "Tidal Shield"
 },
 "Totem de séisme": {
  "icon": "spell_nature_tremortotem",
  "id": 8143,
  "kind": "spell",
  "name": "Tremor Totem"
 },
 "Towering Infernals": {
  "icon": null,
  "id": 17818,
  "kind": "npc",
  "name": "Towering Infernal"
 },
 "Tyrande": {
  "icon": null,
  "id": 7999,
  "kind": "npc",
  "name": "Tyrande Whisperwind"
 },
 "Unholy Frenzy": {
  "icon": "spell_shadow_unholyfrenzy",
  "id": 31626,
  "kind": "spell",
  "name": "Unholy Frenzy"
 },
 "Veras": {
  "icon": null,
  "id": 22952,
  "kind": "npc",
  "name": "Veras Darkshadow"
 },
 "Volcanos": {
  "icon": null,
  "id": 23085,
  "kind": "npc",
  "name": "Supremus Volcano"
 },
 "Wyrms de givre": {
  "icon": null,
  "id": 17907,
  "kind": "npc",
  "name": "Frost Wyrm"
 },
 "Zerevor": {
  "icon": null,
  "id": 22950,
  "kind": "npc",
  "name": "High Nethermancer Zerevor"
 },
 "Évasion": {
  "icon": "spell_shadow_shadowward",
  "id": 26669,
  "kind": "spell",
  "name": "Evasion"
 },
 "Bloodlust": {
  "icon": "spell_nature_bloodlust",
  "id": 2825,
  "kind": "spell",
  "name": "Bloodlust"
 },
 "Heroism": {
  "icon": "ability_shaman_heroism",
  "id": 32182,
  "kind": "spell",
  "name": "Heroism"
 },
 "Lesser Doomguard": {
  "icon": null,
  "id": 17864,
  "kind": "npc",
  "name": "Lesser Doomguard"
 },
 "Judgement of Command": {
  "icon": "ability_warrior_innerrage",
  "id": 41470,
  "kind": "spell",
  "name": "Judgement of Command"
 },
 "Seal of Command": {
  "icon": "ability_warrior_innerrage",
  "id": 41469,
  "kind": "spell",
  "name": "Seal of Command"
 },
 "Molten Punch": {
  "icon": "spell_fire_felimmolation",
  "id": 40126,
  "kind": "spell",
  "name": "Molten Punch"
 },
 "Volcanic Geyser": {
  "icon": "spell_fire_volcano",
  "id": 40118,
  "kind": "spell",
  "name": "Volcanic Geyser"
 },
 "Sinful Beam": {
  "icon": "spell_shadow_shadowbolt",
  "id": 40827,
  "kind": "spell",
  "name": "Sinful Beam"
 },
 "Sinister Beam": {
  "icon": "spell_shadow_shadowbolt",
  "id": 40859,
  "kind": "spell",
  "name": "Sinister Beam"
 },
 "Vile Beam": {
  "icon": "spell_shadow_shadowbolt",
  "id": 40860,
  "kind": "spell",
  "name": "Vile Beam"
 },
 "Wicked Beam": {
  "icon": "spell_shadow_shadowbolt",
  "id": 40861,
  "kind": "spell",
  "name": "Wicked Beam"
 },
 "Silencing Shriek": {
  "icon": "spell_shadow_impphaseshift",
  "id": 40823,
  "kind": "spell",
  "name": "Silencing Shriek"
 },
 "Shadow Demon": {
  "icon": null,
  "id": 23375,
  "kind": "npc",
  "name": "Shadow Demon"
 },
 "Shadow Demons": {
  "icon": null,
  "id": 23375,
  "kind": "npc",
  "name": "Shadow Demon"
 },
 "Cage Trap": {
  "icon": "classic_temp",
  "id": 40761,
  "kind": "spell",
  "name": "Cage Trap"
 },
 "Medallion of Karabor": {
  "icon": "inv_jewelry_amulet_04",
  "id": 32649,
  "kind": "item",
  "name": "Medallion of Karabor"
 },
 "Night's End": {
  "icon": "inv_misc_cape_20",
  "id": 32420,
  "kind": "item",
  "name": "Night's End"
 },
 "Glyph of Shadow Warding": {
  "icon": "spell_shadow_sealofkings",
  "id": 29199,
  "kind": "item",
  "name": "Glyph of Shadow Warding"
 },
 "Shadow Armor Kit": {
  "icon": "spell_shadow_antishadow",
  "id": 29483,
  "kind": "item",
  "name": "Shadow Armor Kit"
 },
 "Shadesteel Bracers": {
  "icon": "inv_bracer_13",
  "id": 32403,
  "kind": "item",
  "name": "Shadesteel Bracers"
 },
 "Shadesteel Girdle": {
  "icon": "inv_belt_30",
  "id": 32401,
  "kind": "item",
  "name": "Shadesteel Girdle"
 },
 "Shadesteel Greaves": {
  "icon": "inv_pants_plate_21",
  "id": 32404,
  "kind": "item",
  "name": "Shadesteel Greaves"
 },
 "Shadesteel Sabots": {
  "icon": "inv_boots_chain_08",
  "id": 32402,
  "kind": "item",
  "name": "Shadesteel Sabots"
 },
 "Prismatic Sphere": {
  "icon": "inv_enchant_prismaticsphere",
  "id": 22460,
  "kind": "item",
  "name": "Prismatic Sphere"
 },
 "Major Shadow Protection Potion": {
  "icon": "inv_potion_123",
  "id": 22846,
  "kind": "item",
  "name": "Major Shadow Protection Potion"
 },
 "Heart of Darkness": {
  "icon": "spell_shadow_demonictactics",
  "id": 32428,
  "kind": "item",
  "name": "Heart of Darkness"
 },
 "Juno's Shadow": {
  "icon": "inv_misc_cape_20",
  "id": 17061,
  "kind": "item",
  "name": "Juno's Shadow"
 },
 "Prayer of Shadow Protection": {
  "icon": "spell_holy_prayerofshadowprotection",
  "id": 39374,
  "kind": "spell",
  "name": "Prayer of Shadow Protection"
 },
 "Shadow Resistance Aura": {
  "icon": "spell_shadow_sealofkings",
  "id": 27151,
  "kind": "spell",
  "name": "Shadow Resistance Aura"
 },
 "Enchant Cloak - Greater Shadow Resistance": {
  "icon": "spell_holy_greaterheal",
  "id": 34006,
  "kind": "spell",
  "name": "Enchant Cloak - Greater Shadow Resistance"
 },
 "Void Sphere": {
  "icon": "inv_enchant_voidsphere",
  "id": 22459,
  "kind": "item",
  "name": "Void Sphere"
 }
};

const WOWHEAD_SCOPED = {
 "hyjal": {
 "Cleave": {
  "icon": "ability_warrior_cleave",
  "id": 31345,
  "kind": "spell",
  "name": "Cleave"
 },
 "Doom": {
  "icon": "ability_creature_cursed_02",
  "id": 31347,
  "kind": "spell",
  "name": "Doom"
 },
 "Fear": {
  "icon": "spell_shadow_deathscream",
  "id": 31970,
  "kind": "spell",
  "name": "Fear"
 },
 "Frost Nova": {
  "icon": "spell_frost_frostnova",
  "id": 31250,
  "kind": "spell",
  "name": "Frost Nova"
 },
 "Rain of Fire": {
  "icon": "spell_shadow_rainoffire",
  "id": 31340,
  "kind": "spell",
  "name": "Rain of Fire"
 },
 "Sleep": {
  "icon": "spell_nature_sleep",
  "id": 31298,
  "kind": "spell",
  "name": "Sleep"
 },
 "War Stomp": {
  "icon": "ability_warstomp",
  "id": 31480,
  "kind": "spell",
  "name": "War Stomp"
 }
},
 "bt": {
 "Blaze": {
  "icon": "spell_fire_felfire",
  "id": 40610,
  "kind": "spell",
  "name": "Blaze"
 },
 "Blizzard": {
  "icon": "spell_frost_icestorm",
  "id": 41482,
  "kind": "spell",
  "name": "Blizzard"
 },
 "Bloodboil": {
  "icon": "spell_shadow_bloodboil",
  "id": 42005,
  "kind": "spell",
  "name": "Bloodboil"
 },
 "Consecration": {
  "icon": "spell_holy_innerfire",
  "id": 41541,
  "kind": "spell",
  "name": "Consecration"
 },
 "Consécration": {
  "icon": "spell_holy_innerfire",
  "id": 41541,
  "kind": "spell",
  "name": "Consecration"
 },
 "Deaden": {
  "icon": "spell_shadow_soulleech_1",
  "id": 41410,
  "kind": "spell",
  "name": "Deaden"
 },
 "Eye Blast": {
  "icon": "classic_temp",
  "id": 39908,
  "kind": "spell",
  "name": "Eye Blast"
 },
 "Fel Rage": {
  "icon": "classic_spell_fire_elementaldevastation",
  "id": 40604,
  "kind": "spell",
  "name": "Fel Rage"
 },
 "Hateful Strike": {
  "icon": "classic_temp",
  "id": 41926,
  "kind": "spell",
  "name": "Hateful Strike"
 },
 "Molten Flame": {
  "icon": "spell_fire_felfire",
  "id": 40265,
  "kind": "spell",
  "name": "Molten Flame"
 },
 "Spite": {
  "icon": "spell_shadow_demonictactics",
  "id": 41377,
  "kind": "spell",
  "name": "Spite"
 }
}
};
