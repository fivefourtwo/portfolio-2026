import styles from './ViewportBottomBlur.module.css'

// Progressive blur layers from the screenshot — each layer covers more of the
// strip and blurs more strongly, stacking to create a smooth blur fade.
const LAYERS = [
  { blur: 23.7,  maskStop: 88.3 },
  { blur: 22.83, maskStop: 76.8 },
  { blur: 21.38, maskStop: 66   },
  { blur: 19.42, maskStop: 55.9 },
  { blur: 16.97, maskStop: 47   },
  { blur: 14.11, maskStop: 39.3 },
  { blur: 10.9,  maskStop: 33.2 },
  { blur: 7.42,  maskStop: 28.7 },
  { blur: 3.75,  maskStop: 25.9 },
  { blur: 0,     maskStop: 25   },
]

const ViewportBottomBlur = () => (
  <div className={styles.root} aria-hidden="true">
    {LAYERS.map(({ blur, maskStop }) => (
      <div
        key={blur}
        className={styles.layer}
        style={{
          backdropFilter: `blur(${blur}px)`,
          WebkitBackdropFilter: `blur(${blur}px)`,
          mask: `linear-gradient(transparent 0%, transparent ${maskStop}%, black 100%)`,
          WebkitMask: `linear-gradient(transparent 0%, transparent ${maskStop}%, black 100%)`,
        }}
      />
    ))}
  </div>
)

export default ViewportBottomBlur
