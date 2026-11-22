import Copy from '../Copy/Copy'
import { NOTES, PATHS, VIEW_H, VIEW_W } from './sketchShapes'
import styles from './HeroSketch.module.css'

// The hand-drawn wireframe, with roughjs. Its own chunk, loaded lazily by HeroSketch.

// Handwritten labels in the sketch. Literal IDs, so the draft scripts can find where they appear.
const NOTE_TEXT = {
  'exp.hero.note.map': <Copy id="exp.hero.note.map" />,
  'exp.hero.note.tags': <Copy id="exp.hero.note.tags" />,
  'exp.hero.note.filters': <Copy id="exp.hero.note.filters" />,
}

const SketchLayer = () => (
  <div className={styles.sketch} aria-hidden="true">
    <svg className={styles.svg} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" focusable="false">
      {PATHS.map((p) => (
        <path
          key={p.key}
          d={p.d}
          className={`${styles[p.tone]} ${p.filled ? styles.fill : styles.stroke}`}
          strokeWidth={p.filled ? undefined : p.width}
        />
      ))}
    </svg>
    {NOTES.map((note) => (
      <span key={note.id} className={styles.note} style={{ left: `${note.x}%`, top: `${note.y}%` }}>
        {NOTE_TEXT[note.id]}
      </span>
    ))}
  </div>
)

export default SketchLayer
