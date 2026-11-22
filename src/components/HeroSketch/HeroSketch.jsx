import { lazy, Suspense, useEffect, useRef } from 'react'
import { copy } from '../Copy/entries'
import styles from './HeroSketch.module.css'
import ui from '../../assets-new/catalogic-assets/hero-sketch/similarity-map-ui.jpg?w=720;1080;1440&format=webp&as=img'

// Prototype (exp/hero-sketch): a hand-drawn wireframe of the Catalogic map view on top of the
// built screen. The cursor reveals the screen through a soft circle; scrolling wipes the whole
// sketch into the screen. Touch: dragging reveals, scrolling wipes. Reduced motion: a static
// half sketch, half screen, with no listeners (see the CSS).
//
// Loading: the sketch (roughjs and the path data) is its own lazy chunk, so the headline renders
// first. The screen image loads right away with high priority: Chrome counts it for LCP even
// while it is fully masked, so loading it late would make LCP late.
const SketchLayer = lazy(() => import('./SketchLayer'))

// Scroll distance, as a share of the viewport height, over which the wipe runs from sketch to screen.
const WIPE_RANGE = 0.3
// Easing of the circle towards the pointer, the same factor as the hero grid spotlight.
const FOLLOW = 0.14

const HeroSketch = () => {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame = 0
    let scrollFrame = 0
    let hasPos = false
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const tick = () => {
      cx += (tx - cx) * FOLLOW
      cy += (ty - cy) * FOLLOW
      root.style.setProperty('--sketch-x', `${cx.toFixed(1)}px`)
      root.style.setProperty('--sketch-y', `${cy.toFixed(1)}px`)
      frame = Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(tick) : 0
    }

    const moveTo = (clientX, clientY) => {
      const rect = root.getBoundingClientRect()
      tx = clientX - rect.left
      ty = clientY - rect.top
      if (!hasPos) {
        cx = tx
        cy = ty
        hasPos = true
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const start = (clientX, clientY) => {
      moveTo(clientX, clientY)
      root.setAttribute('data-active', '')
    }
    const stop = () => root.removeAttribute('data-active')

    const onPointerEnter = (e) => e.pointerType !== 'touch' && start(e.clientX, e.clientY)
    const onPointerMove = (e) => e.pointerType !== 'touch' && moveTo(e.clientX, e.clientY)
    const onPointerLeave = (e) => e.pointerType !== 'touch' && stop()
    const onTouchStart = (e) => start(e.touches[0].clientX, e.touches[0].clientY)
    const onTouchMove = (e) => moveTo(e.touches[0].clientX, e.touches[0].clientY)

    const updateWipe = () => {
      scrollFrame = 0
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * WIPE_RANGE)))
      root.style.setProperty('--sketch-p', p.toFixed(3))
    }
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateWipe)
    }

    updateWipe()
    root.addEventListener('pointerenter', onPointerEnter)
    root.addEventListener('pointermove', onPointerMove)
    root.addEventListener('pointerleave', onPointerLeave)
    root.addEventListener('touchstart', onTouchStart, { passive: true })
    root.addEventListener('touchmove', onTouchMove, { passive: true })
    root.addEventListener('touchend', stop, { passive: true })
    root.addEventListener('touchcancel', stop, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      root.removeEventListener('pointerenter', onPointerEnter)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
      root.removeEventListener('touchstart', onTouchStart)
      root.removeEventListener('touchmove', onTouchMove)
      root.removeEventListener('touchend', stop)
      root.removeEventListener('touchcancel', stop)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
      if (scrollFrame) cancelAnimationFrame(scrollFrame)
    }
  }, [])

  return (
    <div className={styles.root} ref={rootRef}>
      <Suspense fallback={null}>
        <SketchLayer />
      </Suspense>
      <div className={styles.built}>
        <img
          className={styles.image}
          src={ui.src}
          srcSet={ui.srcset}
          sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 992px) calc(100vw - 48px), 672px"
          width={ui.w}
          height={ui.h}
          alt={copy('exp.hero.alt')}
          fetchPriority="high"
          decoding="async"
          draggable="false"
        />
      </div>
    </div>
  )
}

export default HeroSketch
