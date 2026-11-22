import rough from 'roughjs'

// Hand-drawn wireframe of the Catalogic map view, traced over the still in
// similarity-map-ui.jpg. Coordinates are in a 1000 × 625 box, the same 16:10 ratio as the
// image, so every sketched region sits on top of the region it stands for.
// The generator is seeded, so the sketch is identical on every load.

export const VIEW_W = 1000
export const VIEW_H = 625

const gen = rough.generator()
const base = { seed: 7, roughness: 0.9, bowing: 0.8, strokeWidth: 1.2, stroke: 'currentColor' }

// Seeded PRNG (mulberry32) for the dot cloud and small wobbles.
const prng = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const shapes = []
let seed = 1
const add = (tone, drawable) => shapes.push({ tone, drawable })
const opts = (extra) => ({ ...base, seed: seed++, ...extra })

const rect = (x, y, w, h, tone = 'pencil', extra) => add(tone, gen.rectangle(x, y, w, h, opts(extra)))
const line = (x1, y1, x2, y2, tone = 'pencil', extra) => add(tone, gen.line(x1, y1, x2, y2, opts(extra)))
const circle = (x, y, d, tone = 'pencil', extra) => add(tone, gen.circle(x, y, d, opts(extra)))
const roundRect = (x, y, w, h, r, tone = 'pencil', extra) => {
  const d = `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`
  add(tone, gen.path(d, opts(extra)))
}
// A line of text, drawn as a slightly wobbly stroke.
const text = (x1, x2, y, tone = 'soft', extra) => line(x1, y, x2, y, tone, { roughness: 1.4, bowing: 2, ...extra })
const check = (x, y, size = 10, tone = 'soft', extra) => rect(x, y - size / 2, size, size, tone, extra)

// Window and sidebar
roundRect(3, 3, 994, 619, 24, 'pencil', { strokeWidth: 1.5 })
line(161, 4, 161, 621)
circle(19, 18, 8)
circle(33, 18, 8)
circle(47, 18, 8)

// Library
text(14, 44, 41.5, 'soft', { strokeWidth: 0.9 })
rect(15, 50.5, 131, 17.5, 'soft')
;[
  [59, 60],
  [76.5, 58],
  [94.5, 61],
  [112.5, 58],
].forEach(([y, end]) => {
  circle(25, y, 7, 'soft')
  text(35, end, y)
})

// Crates
text(14, 44, 135.5, 'soft', { strokeWidth: 0.9 })
;[
  [153, 95],
  [170.5, 90],
].forEach(([y, end]) => {
  rect(20, y - 3.5, 9, 7, 'soft')
  text(35, end, y)
})

// My tags
text(14, 43, 327, 'soft', { strokeWidth: 0.9 })
;[
  [345, 64],
  [367.5, 101],
  [479, 68],
].forEach(([y, end]) => {
  add('soft', gen.polygon([[21, y + 4], [25, y - 4], [29, y + 4]], opts()))
  text(36, end, y, 'pencil')
  line(122, y - 2, 126, y + 2, 'soft')
  line(126, y + 2, 130, y - 2, 'soft')
})
;[
  [385, 88],
  [403, 99],
  [420.5, 82],
  [438, 75],
  [456, 80],
  [496.5, 92],
  [514.5, 87],
  [532, 97],
  [550, 73],
  [567.5, 74],
].forEach(([y, end]) => {
  rect(32, y - 3, 8, 6, 'soft')
  text(45, end, y)
})
line(4, 599.5, 160, 599.5, 'soft')
add('pencil', gen.linearPath([[15, 604], [29, 604], [17, 609], [31, 609], [19, 614], [33, 614]], opts()))
text(38, 79, 609, 'pencil', { strokeWidth: 1.6 })

// Tabs
text(177, 210, 16)
text(221, 236, 16, 'pencil', { strokeWidth: 1.8 })

// View toggle, confidence panel, lasso button
roundRect(933.5, 33, 54, 20, 4)
line(960.5, 35, 960.5, 51, 'soft')
text(968, 980, 43, 'pencil', { strokeWidth: 1.6 })
roundRect(809.5, 64, 178, 48, 6)
line(819, 82, 824, 86, 'soft')
line(824, 86, 819, 90, 'soft')
text(840, 891, 78.5, 'pencil', { strokeWidth: 1.6 })
rect(954.5, 71, 25.5, 14, 'soft')
text(840, 850, 95.5, 'soft', { strokeWidth: 0.9 })
line(854, 95.5, 954, 95.5, 'soft')
line(854, 95.5, 904, 95.5, 'accent', { strokeWidth: 1.8 })
circle(904, 95.5, 8, 'accent', { fill: 'currentColor', fillStyle: 'solid' })
text(958, 977, 95.5, 'soft', { strokeWidth: 0.9 })
roundRect(967.5, 122, 20, 20, 4)
circle(977.5, 132, 9, 'soft', { strokeLineDash: [2, 2] })

// The 2D map: a dot cloud with a sparse middle, shaped like the one in the still.
const rand = prng(42)
const dots = []
const cx = 559
const cy = 220
for (let tries = 0; dots.length < 240 && tries < 6000; tries++) {
  const a = rand() * Math.PI * 2
  const ring = rand() < 0.85
  const r = ring ? 0.45 + 0.55 * Math.sqrt(rand()) : 0.15 + 0.3 * rand()
  const wobble = 1 + 0.06 * Math.sin(3 * a + 1) + 0.04 * Math.cos(5 * a)
  const x = cx + Math.cos(a) * 238 * r * wobble
  const y = cy + Math.sin(a) * 168 * r * wobble
  if (dots.some(([dx, dy]) => (dx - x) ** 2 + (dy - y) ** 2 < 11 ** 2)) continue
  dots.push([x, y])
}
dots.forEach(([x, y]) => circle(x, y, 5, 'dot', { fill: 'currentColor', fillStyle: 'solid', stroke: 'none', roughness: 0.5 }))

// The highlighted cluster on the right (Hard Techno in the still), circled.
add(
  'accent',
  gen.curve(
    [
      [652, 70], [735, 92], [800, 160], [814, 250], [787, 333], [726, 394],
      [655, 388], [638, 330], [627, 250], [620, 160], [656, 72],
    ],
    opts({ roughness: 1.2, strokeWidth: 1.3 }),
  ),
)

// Search field and active filter chip
roundRect(174.5, 392, 162, 17.5, 4)
circle(185, 400.5, 6, 'soft')
text(194, 245, 400.5, 'soft', { strokeWidth: 0.9 })
roundRect(342.5, 393.5, 65, 15, 7, 'accent')
text(349, 391, 401, 'accent')
line(397, 398, 403, 404, 'accent', { strokeWidth: 0.9 })
line(403, 398, 397, 404, 'accent', { strokeWidth: 0.9 })

// Filter panel with three columns
roundRect(174.5, 419.5, 813, 190, 8, 'pencil', { strokeWidth: 1.4 })
line(571.5, 422.5, 590.5, 422.5, 'soft', { strokeWidth: 1.6 })

const column = ({ drop, search, rows, box, textX, ends, countX, selected }) => {
  roundRect(drop[0], 430.5, drop[1], 17, 4)
  circle(drop[0] + 9, 439, 7, 'soft')
  text(drop[0] + 17, drop[0] + drop[1] - 16, 439, 'pencil', { strokeWidth: 1.6 })
  roundRect(search[0], 430.5, search[1], 17, 4, 'soft')
  circle(search[0] + 9, 439, 6, 'soft')
  text(search[0] + 18, search[0] + 70, 439, 'soft', { strokeWidth: 0.9 })
  rows.forEach((y, i) => {
    const isSelected = i === selected
    if (isSelected) roundRect(box - 5, y - 9, countX[1] - box + 9, 18, 4, 'soft')
    check(box, y, 10, isSelected ? 'accent' : 'soft', isSelected ? { fill: 'currentColor', fillStyle: 'hachure', hachureGap: 2.5 } : undefined)
    text(textX, ends[i], y, isSelected ? 'pencil' : 'soft')
    text(countX[0], countX[1], y, 'soft', { strokeWidth: 0.9 })
  })
}

const rowsA = [464.5, 483, 501.5, 520, 538.5, 557, 575.5, 593.5]
const rowsB = [459.5, 478, 496.5, 515, 533.5, 552, 570.5, 588.5]
column({ drop: [184.5, 69], search: [259.5, 189], rows: rowsA, box: 190.5, textX: 209, ends: [241, 250, 237, 226, 227, 226, 247, 236], countX: [430, 445] })
column({ drop: [470, 69], search: [545, 168.5], rows: rowsB, box: 475, textX: 494, ends: [534, 516, 512, 535, 532, 532, 534, 508], countX: [694, 709], selected: 6 })
column({ drop: [734.5, 68], search: [808.5, 169], rows: rowsA, box: 740, textX: 758.5, ends: [786, 792, 781, 777, 782, 773, 777, 775], countX: [955, 973.5] })

// Annotation arrows (orange, like the handwritten notes). Labels are HTML on top, see NOTES.
const arrow = (points) => {
  add('accent', gen.curve(points, opts({ roughness: 0.8, strokeWidth: 1.4 })))
  const [x1, y1] = points[points.length - 2]
  const [x2, y2] = points[points.length - 1]
  const angle = Math.atan2(y2 - y1, x2 - x1)
  ;[0.5, -0.5].forEach((spread) => {
    const a = angle + Math.PI + spread
    line(x2, y2, x2 + Math.cos(a) * 10, y2 + Math.sin(a) * 10, 'accent', { strokeWidth: 1.4, roughness: 0.5 })
  })
}

// Where each handwritten label sits (top-left corner, in % of the box) and what its arrow
// points at. The label text comes from src/content/home.js.
export const NOTES = [
  { id: 'exp.hero.note.map', x: 17.8, y: 9.6 },
  { id: 'exp.hero.note.tags', x: 2.2, y: 34.4 },
  { id: 'exp.hero.note.filters', x: 82.6, y: 44.8 },
]
arrow([[205, 104], [238, 146], [312, 172]])
arrow([[44, 252], [34, 286], [30, 316]])
arrow([[862, 316], [872, 368], [826, 413]])

// Flatten to SVG path data once. Fill paths and stroke paths are kept apart so CSS can colour
// them by tone.
export const PATHS = shapes.flatMap(({ tone, drawable }, i) =>
  gen
    .toPaths(drawable)
    .map((p, j) => ({
      key: `${i}-${j}`,
      tone,
      d: p.d,
      filled: p.stroke === 'none' && p.fill !== 'none',
      width: p.strokeWidth,
      empty: p.stroke === 'none' && p.fill === 'none',
    }))
    .filter((p) => !p.empty),
)
