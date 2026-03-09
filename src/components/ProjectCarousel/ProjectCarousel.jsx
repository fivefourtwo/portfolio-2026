import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@carbon/icons-react';
import buttonStyles from '../Button/Button.module.css';
import styles from './ProjectCarousel.module.css';

/* catalogic (project-carousel) */
import catalogic1 from '../../assets-new/catalogic-assets/project-carousel/key-visual.jpg';
import catalogic2 from '../../assets-new/catalogic-assets/project-carousel/similarity-map-mockup.jpg';
import catalogic3 from '../../assets-new/catalogic-assets/project-carousel/labels-mockup.jpg';
import catalogic4 from '../../assets-new/catalogic-assets/project-carousel/tracks-mockup.jpg';
import catalogic5 from '../../assets-new/catalogic-assets/project-carousel/analysis-mockup.jpg';

/* teachsmartsteps */
import tss1 from '../../assets-new/teachsmartsteps-assets/tss-carousel/key-visual.jpg';
import tss2 from '../../assets-new/teachsmartsteps-assets/tss-carousel/components.jpg';
import tss3 from '../../assets-new/teachsmartsteps-assets/tss-carousel/editor-macbook.jpg';
import tss4 from '../../assets-new/teachsmartsteps-assets/tss-carousel/output.jpg';
import tss5 from '../../assets-new/teachsmartsteps-assets/tss-carousel/output-mockup.jpg';

/* accessability */
import access1 from '../../assets-new/accessability-assets/accessability-carousel/key-visual.jpg';
import access2 from '../../assets-new/accessability-assets/accessability-carousel/first-prototypes.jpg';
import access3 from '../../assets-new/accessability-assets/accessability-carousel/3d-prototype-testing.jpg';
import access4 from '../../assets-new/accessability-assets/accessability-carousel/3d-prototype.jpg';
import access5 from '../../assets-new/accessability-assets/accessability-carousel/rendering.jpg';

const IMAGES = {
  catalogic: [catalogic1, catalogic2, catalogic3, catalogic4, catalogic5],
  teachsmartsteps: [tss1, tss2, tss3, tss4, tss5],
  accessability: [access1, access2, access3, access4, access5],
};

const DATA = {
  catalogic: {
    title: 'Catalogic',
    description:
      'Catalogic is an AI-powered music library management tool that helps based on audio analysis and personalized tags. This enables DJs to navigate their collections using their mental models and spatial memory, allowing them to rediscover hidden connections.',
    href: '/work/catalogic',
  },
  teachsmartsteps: {
    title: 'Teach Smart Steps',
    description:
      'Teach Smart Steps generates educationally meaningful tasks that integrate media literacy into lessons without displacing the primary subject matter. This enables educators to incorporate digital education into their daily schedule without requiring additional lesson time.',
    href: '/work/teach-smart-steps',
  },
  accessability: {
    title: 'AccessAbility',
    description:
      'A concept for a modular controller for electric wheelchairs. By separating the technical basis from the ergonomic interface, the hardware can be adapted to the specific motor skills of the individual.',
    href: '/work/accessability',
  },
};

const IMAGE_GAP = 24; /* always 24px at all breakpoints */
const IMAGE_WIDTH_DESKTOP = 711;
const IMAGE_WIDTH_TABLET_MOBILE = 569;
const BP_TABLET = 992;
const BASE_SPEED = 1.0; /* px per frame at 60fps – reduced for slower loop */

function getImageWidth() {
  return typeof window !== 'undefined' && window.innerWidth <= BP_TABLET
    ? IMAGE_WIDTH_TABLET_MOBILE
    : IMAGE_WIDTH_DESKTOP;
}

const ProjectCarousel = ({ variant }) => {
  const images = IMAGES[variant];
  const { title, description, href } = DATA[variant];
  const isAccessability = variant === 'accessability';

  const stripRef = useRef(null);
  const containerRef = useRef(null);
  const scrollOffsetRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const [imageWidth, setImageWidth] = useState(IMAGE_WIDTH_DESKTOP);
  const step = imageWidth + IMAGE_GAP;
  const loopOffset = 5 * step;
  const loopOffsetRef = useRef(loopOffset);

  useEffect(() => {
    loopOffsetRef.current = loopOffset;
  }, [loopOffset]);

  /* Sync layout with CSS breakpoints and clamp scroll on resize */
  useEffect(() => {
    const update = () => {
      const w = getImageWidth();
      setImageWidth((prev) => {
        if (prev === w) return prev;
        scrollOffsetRef.current = scrollOffsetRef.current % (5 * (w + IMAGE_GAP));
        return w;
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* Auto-scroll animation loop */
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId;
    const tick = () => {
      const offset = loopOffsetRef.current;
      if (!isDraggingRef.current && !isHovered) {
        scrollOffsetRef.current =
          (scrollOffsetRef.current + BASE_SPEED) % offset;
        if (stripRef.current) {
          stripRef.current.style.transform = `translateX(-${scrollOffsetRef.current}px)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isHovered]);

  /* Horizontal trackpad/mouse wheel scroll */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (e.deltaX === 0) return;
      e.preventDefault();
      const offset = loopOffsetRef.current;
      let newOffset = scrollOffsetRef.current + e.deltaX;
      newOffset = ((newOffset % offset) + offset) % offset;
      scrollOffsetRef.current = newOffset;
      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(-${newOffset}px)`;
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = scrollOffsetRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const offset = loopOffsetRef.current;
    const delta = e.clientX - dragStartXRef.current;
    /* Drag right = reveal content from left = decrease offset */
    let newOffset = dragStartOffsetRef.current - delta;
    newOffset = ((newOffset % offset) + offset) % offset;
    scrollOffsetRef.current = newOffset;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = newOffset;
    if (stripRef.current) {
      stripRef.current.style.transform = `translateX(-${newOffset}px)`;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  /* Duplicate images for seamless looping */
  const loopedImages = [...images, ...images];

  return (
    <article className={styles.carousel}>
      <div
        ref={containerRef}
        className={styles.imageStrip}
        aria-hidden="true"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          ref={stripRef}
          className={styles.imageStripInner}
          style={{ width: `${2 * loopOffset}px` }}
        >
          {loopedImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              className={styles.image}
              style={{
                left: `${(i % 5) * step + Math.floor(i / 5) * loopOffset}px`,
              }}
            />
          ))}
        </div>
      </div>

      <h2 className={styles.title}>{title}</h2>
      <p
        className={styles.description}
        data-variant={isAccessability ? 'accessability' : undefined}
      >
        {description}
      </p>

      <Link
        to={href}
        className={`${buttonStyles.button} ${buttonStyles.large}`}
        aria-label={`View ${title} case study`}
      >
        <span className={buttonStyles.label}>View Project</span>
        <ArrowRight size={20} aria-hidden />
      </Link>
    </article>
  );
};

export default ProjectCarousel;
