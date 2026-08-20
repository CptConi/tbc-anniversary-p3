# Not So Bad — Phase 3 Raid Guide

Static guide for **Battle for Mount Hyjal** and **Black Temple** (TBC Anniversary, Phase 3).
Built for the guild *Not So Bad* — Thunderstrike FR (PvE).

Live content is in French; code and docs are in English.

## Stack

Plain HTML + CSS + JS. No build step, no dependencies, no framework.

| File | Purpose |
| --- | --- |
| `index.html` | Page shell: header, tabs, toolbar, intro panel, footer |
| `data.js` | **All guide content.** Edit this to update strategies |
| `wowhead.js` | Entity → Wowhead TBC registry (generated, see below) |
| `app.js` | Rendering, themes, tabs, search, role filter, localStorage, deep links |
| `styles.css` | Three themes, all driven by the same token set |
| `vercel.json` | Static headers + clean URLs |
| `og-image.png` | 1200×630 link preview card (generated, see below) |
| `tools/og-image.html` | Source for that card |

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

**Do not open `index.html` via `file://`** — a `file://` page has a null origin, so the
embedded YouTube player refuses to load (*"Erreur 153 — erreur de configuration du lecteur
vidéo"*). Everything else works, and the play button falls back to opening YouTube in a new
tab, but use the local server for the real thing.

## Deploy

**Vercel** — no framework preset needed:

```sh
npx vercel --prod
```

Or push to GitHub and import the repo on vercel.com. Build command: none. Output directory: `.` (root).

Works identically on Netlify, Cloudflare Pages, or GitHub Pages.

## Features

- **Four themes** — Horde (default), Alliance, Dark Modern, Light Modern. Horde and
  Alliance both take their palette from Blizzard's own WoW site — Horde uses the warm
  near-black / gold `#f8b700` / rust red of the front page, Alliance the blue-slate token
  set (`#0a0d15`, `#151c28`, primary `#38a8ff`) — and both set uppercase Montserrat
  headings; that font is only fetched for those two themes. The choice persists and is
  applied before first paint, so there is no flash. Change `DEFAULT_THEME` in `app.js`
  (and the matching literal in the inline `<head>` script) to move the default.
- **Wowhead links and tooltips** — every bolded spell, NPC, and item gets a small icon
  linking to its Wowhead TBC page, and hovering it shows the real Wowhead tooltip in French
  (Wowhead's own Power Tooltips script). Entities Wowhead has no icon for (NPCs) fall back
  to a round (i); `WH_STYLE = 'info'` in `app.js` forces that badge everywhere, and
  `WH_LOCALE = ''` switches links and tooltips back to English. See *Wowhead registry* below.
- **Three tabs** — Préparation / Mont Hyjal / Temple Noir. Active tab persists.
- **Collapsible boss sections**, open/closed state persisted in `localStorage`.
- **Deep links** — every section has an `id`. `#/illidan-stormrage` style anchors switch
  to the right tab, expand the section, and scroll to it. The 🔗 button copies the link.
- **Live search** — accent-insensitive, highlights matches, auto-expands hits,
  shows per-tab result counts.
- **Role filter** — Tank / Heal / Mêlée / Distance. Hides instruction blocks that don't
  apply to you; shared context blocks (abilities, phases) always stay visible. Archetype
  blocks are separated by a hairline rule drawn as the *lower* block's `border-top`, so a
  filtered-out block takes its divider with it and no stray rule is left behind.
- **Expand / collapse all** per tab.
- **Prep checklist** with progress bar, persisted per browser.
- **Lazy YouTube** — thumbnail facade at half width, iframe only loads on click and jumps
  to the exact timestamp. *Afficher plus grand* expands it to the full container width.
- **Countdown** to the Phase 3 unlock.
- **Print stylesheet** — all tabs expanded, chrome stripped.

## Wowhead registry

`wowhead.js` maps entity names to Wowhead TBC entries. `app.js` walks the rendered DOM
and appends one icon link after every `<strong>` whose text matches a key — so `data.js`
stays free of link markup and adding a new strategy line links itself automatically.

Two tables:

- `WOWHEAD` — the global map.
- `WOWHEAD_SCOPED.hyjal` / `.bt` — overrides that win inside that raid's panel.
  These exist because generic names resolve to the *player* spell globally: searching
  "Cleave" returns the warrior ability, not Kaz'rogal's. The scoped entries were picked
  by spell-ID window (Hyjal encounter spells sit around 30000–33500, Black Temple around
  38500–43500), which is what separates e.g. Supremus' Hateful Strike (41926) from
  Patchwerk's (28308).

Tooltips come from `https://wow.zamimg.com/js/tooltips.js` with every link rewrite
(`colorLinks`, `iconizeLinks`, `renameLinks`) turned off — the icon and label stay ours.
The script scans the document once on load, so `decorateWowhead` calls `$WowheadPower
.refreshLinks()` (debounced) after every render and every search rebuild. If the script
is blocked the links still work as plain links.

Both tables were generated from Wowhead's own TBC-scoped search API, not typed by hand.
Entities that could not be resolved unambiguously were left out on purpose — no icon is
better than a wrong link.

To add one, append an entry:

```js
"Nom affiché en gras": { "kind": "spell", "id": 40251, "name": "Shadow of Death", "icon": "spell_shadow_shadowfiend" }
```

`kind` is `spell`, `npc`, `item`, or `search` (which takes `q` instead of `id`).
`icon` is the Wowhead icon slug; omit it and a plain marker is drawn instead
(NPCs have no icon on Wowhead).

## Link preview

Pasting the URL in Discord, Slack or Signal renders a card: the two-line
`og:description` (the newline inside the attribute is deliberate — those clients
keep it), the Horde-themed `og-image.png`, and a left accent bar taken from
`theme-color`, which tracks the Horde background.

`og:image` is root-relative (`/og-image.png`) because the deployment domain is not
baked into the repo; those clients resolve it against the page URL. If a stricter
crawler ever refuses it, replace it with the absolute `https://…` URL.

To regenerate the card after editing `tools/og-image.html`:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=8000 \
  --screenshot=og-image.png "file://$PWD/tools/og-image.html"
```

Keep it full-colour: quantising to a 256-colour palette drops it to ~42 KB but
bands the gold glow visibly.

Note that Discord caches previews for a long time — an old embed can linger after
a deploy.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| `/` | Focus search |
| `Esc` | Clear search (while focused) |
| `E` | Expand all in current tab |
| `C` | Collapse all in current tab |
| `←` `→` | Switch tab (when a tab is focused) |

## Editing content

Everything lives in `data.js`.

- `PREP_CHECKLIST` — checklist rows on the intro tab
- `INTRO_BLOCKS` — preparation sections
- `RAIDS` — the two raids and their sections

A section looks like this:

```js
{
  id: 'rage-winterchill',        // used as the URL anchor
  kind: 'boss',                  // 'boss' | 'trash'
  num: 1,
  name: 'Rage Winterchill',
  tagline: "Gestion de l'Icebolt et placement en cercle",
  video: { vid: VID_HYJAL, t: 160 },   // t = seconds into the video
  blocks: [
    { title: 'Capacités importantes', items: ['…'] },            // no role => always visible
    { title: 'Tanks', role: 'tank', items: ['…'] },
    { title: 'DPS Mêlée & Distance', role: ['melee', 'ranged'], items: ['…'] },
  ],
}
```

Items are strings (inline HTML allowed: `<strong>`, `<em>`, `<span class="warn">`)
or `{ t: 'lead text', sub: ['nested', 'bullets'] }`.

Roles: `tank`, `heal`, `melee`, `ranged`.

Changing `P3_RELEASE_UTC` retargets the countdown.

Theme tokens all live at the top of `styles.css` — `:root`, `[data-theme="light"]`, and
`[data-theme="horde"]` each define the same names. Component rules never hardcode a color,
so adding a fourth theme means adding one more token block.

## Sources

Strategies condensed from [World of Warcraft Curios](https://www.youtube.com/@WoWCurios):

- [Battle for Mount Hyjal — Classic TBC](https://www.youtube.com/watch?v=6uQEOw76utQ)
- [The ONLY Black Temple Guide You'll Ever Need — Classic TBC](https://www.youtube.com/watch?v=cvMTW85NQJU)

---

Made with ♥ by **Reconi** for **Not So Bad**, FR Thunderstrike PvE. For the Horde.
