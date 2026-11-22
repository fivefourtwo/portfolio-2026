// Copy entries for the Home page (src/pages/Landing). Format and rules: scripts/draft-gate.mjs.
// Only the owner edits `text` and approves an entry.

const HERO_IMAGE = 'src/assets-new/catalogic-assets/hero-sketch/similarity-map-ui.jpg'

export default [
  // Prototype exp/hero-sketch (not for merge). Text is left empty for the copywriter.
  {
    id: 'exp.hero.note.map',
    text: '',
    status: 'draft',
    sources: [HERO_IMAGE],
    note: 'Prototype exp/hero-sketch. Handwritten label (Caveat) in the sketch. Its arrow points at the 2D map, the dot cloud in the middle of the screen. A short factual label of that UI region, no claim.',
  },
  {
    id: 'exp.hero.note.tags',
    text: '',
    status: 'draft',
    sources: [HERO_IMAGE],
    note: 'Prototype exp/hero-sketch. Handwritten label in the left sidebar of the sketch. Its arrow points down at the MY TAGS list. Sidebar is narrow: about 60 px wide at 390 px viewport, so one or two short words.',
  },
  {
    id: 'exp.hero.note.filters',
    text: '',
    status: 'draft',
    sources: [HERO_IMAGE],
    note: 'Prototype exp/hero-sketch. Handwritten label right of the map. Its arrow points down at the filter panel with the three columns (genres, styles, moods). A short factual label of that UI region, no claim.',
  },
  {
    id: 'exp.hero.hint.pointer',
    text: '',
    status: 'draft',
    sources: [],
    note: 'Prototype exp/hero-sketch. Small hint under the piece, shown on devices with a mouse or trackpad. Tells the visitor that moving the cursor over the sketch shows the built screen, and that scrolling turns the whole sketch into it. Hidden under reduced motion.',
  },
  {
    id: 'exp.hero.hint.touch',
    text: '',
    status: 'draft',
    sources: [],
    note: 'Prototype exp/hero-sketch. Same hint for touch devices: dragging over the sketch or scrolling shows the built screen. Hidden under reduced motion.',
  },
  {
    id: 'exp.hero.alt',
    text: '',
    status: 'draft',
    sources: [HERO_IMAGE],
    note: 'Prototype exp/hero-sketch. Alt text of the built screen: a still from the Catalogic similarity video (map view: sidebar with library, crates and MY TAGS; 2D dot map with one style highlighted in orange; filter columns for genres, styles, moods). One factual sentence, at most 125 characters. Until filled, the image renders with alt="".',
  },
]
