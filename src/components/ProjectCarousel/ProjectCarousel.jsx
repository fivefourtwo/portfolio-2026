import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@carbon/icons-react';
import buttonStyles from '../Button/Button.module.css';
import styles from './ProjectCarousel.module.css';

/* catalogic (project-carousel) */
import catalogic1 from '../../assets-new/catalogic-assets/project-carousel/key-visual.jpg?w=800;1200;1600&format=webp&as=img';
import catalogic2 from '../../assets-new/catalogic-assets/project-carousel/similarity-map-mockup.jpg?w=800;1200;1600&format=webp&as=img';
import catalogic3 from '../../assets-new/catalogic-assets/project-carousel/labels-mockup.jpg?w=800;1200;1600&format=webp&as=img';
import catalogic4 from '../../assets-new/catalogic-assets/project-carousel/tracks-mockup.jpg?w=800;1200;1600&format=webp&as=img';
import catalogic5 from '../../assets-new/catalogic-assets/project-carousel/analysis-mockup.jpg?w=800;1200;1600&format=webp&as=img';

/* teachsmartsteps */
import tss1 from '../../assets-new/teachsmartsteps-assets/tss-carousel/key-visual.jpg?w=800;1200;1600&format=webp&as=img';
import tss2 from '../../assets-new/teachsmartsteps-assets/tss-carousel/components.jpg?w=800;1200;1600&format=webp&as=img';
import tss3 from '../../assets-new/teachsmartsteps-assets/tss-carousel/editor-macbook.jpg?w=800;1200;1600&format=webp&as=img';
import tss4 from '../../assets-new/teachsmartsteps-assets/tss-carousel/output.jpg?w=800;1200;1600&format=webp&as=img';
import tss5 from '../../assets-new/teachsmartsteps-assets/tss-carousel/output-mockup.jpg?w=800;1200;1600&format=webp&as=img';

/* accessability */
import access1 from '../../assets-new/accessability-assets/accessability-carousel/key-visual.jpg?w=800;1200;1600&format=webp&as=img';
import access2 from '../../assets-new/accessability-assets/accessability-carousel/first-prototypes.jpg?w=800;1200;1600&format=webp&as=img';
import access3 from '../../assets-new/accessability-assets/accessability-carousel/3d-prototype-testing.jpg?w=800;1200;1600&format=webp&as=img';
import access4 from '../../assets-new/accessability-assets/accessability-carousel/3d-prototype.jpg?w=800;1200;1600&format=webp&as=img';
import access5 from '../../assets-new/accessability-assets/accessability-carousel/rendering.jpg?w=800;1200;1600&format=webp&as=img';

const IMAGES = {
  catalogic: [catalogic1, catalogic2, catalogic3, catalogic4, catalogic5],
  teachsmartsteps: [tss1, tss2, tss3, tss4, tss5],
  accessability: [access1, access2, access3, access4, access5],
};

const DATA = {
  catalogic: {
    title: 'Catalogic',
    description:
      'A visual management tool that helps DJs organize expanding music libraries according to their own mental models, enabling them to navigate and rediscover their collections spatially.',
    href: '/work/catalogic',
  },
  teachsmartsteps: {
    title: 'Teach Smart Steps',
    description:
      'A task generation tool that helps educators integrate media literacy into existing curricula, enabling them to deliver digital education without extra preparation or subject displacement.',
    href: '/work/teach-smart-steps',
  },
  accessability: {
    title: 'AccessAbility',
    description:
      'A modular controller system that enables electric wheelchair users to adapt the hardware to their specific motor requirements, separating the ergonomic interface from the technical core.',
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
  const loopOffset = 5 * step; // this is the total width of the carousel (triggering the loop-reset)
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

  /* Touch handlers for reliable horizontal swipe on physical iOS/Android devices */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      isDraggingRef.current = true;
      setIsDragging(true);
      dragStartXRef.current = e.touches[0].clientX;
      dragStartOffsetRef.current = scrollOffsetRef.current;
    };

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      e.preventDefault();
      const offset = loopOffsetRef.current;
      const delta = e.touches[0].clientX - dragStartXRef.current;
      let newOffset = dragStartOffsetRef.current - delta;
      newOffset = ((newOffset % offset) + offset) % offset;
      scrollOffsetRef.current = newOffset;
      dragStartXRef.current = e.touches[0].clientX;
      dragStartOffsetRef.current = newOffset;
      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(-${newOffset}px)`;
      }
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (e.button !== 0) return;
    /* Let touch gestures be handled by touch handlers for reliable mobile behavior */
    if (e.pointerType === 'touch') return;
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

  /* 3-set technique: left set (-1), middle (0), right (1) for seamless loop with left overflow */
  const loopedImages = [...images, ...images, ...images];

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
          style={{ width: `${3 * loopOffset}px` }}
        >
          {loopedImages.map((imgMeta, i) => {
            const setIndex = Math.floor(i / images.length) - 1;
            return (
              <img
                key={i}
                src={imgMeta.src}
                srcSet={imgMeta.srcset}
                sizes="(max-width: 480px) 569px, (max-width: 992px) 569px, 711px"
                width={imgMeta.w}
                height={imgMeta.h}
                alt=""
                aria-hidden="true"
                className={styles.image}
                style={{
                  left: `${(i % images.length) * step + setIndex * loopOffset}px`,
                }}
              />
            );
          })}
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
