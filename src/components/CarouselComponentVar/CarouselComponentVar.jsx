import React, { useState, useRef, useCallback } from 'react';
import styles from './CarouselComponentVar.module.css';

/* Figma node 4-586: active 1000×563, inactive 773×435, gap 40, inactive top 64px */
const CAROUSEL_ACTIVE_WIDTH = 1000;
const CAROUSEL_INACTIVE_WIDTH = 773;
const CAROUSEL_GAP = 40;
const CAROUSEL_INACTIVE_LEFT_STEP = CAROUSEL_INACTIVE_WIDTH + CAROUSEL_GAP;
const CAROUSEL_FIRST_RIGHT_OFFSET = CAROUSEL_ACTIVE_WIDTH + CAROUSEL_GAP;

/* Tablet/mobile scroll gallery: gap between cards (0 = full-width cards) */
const MOBILE_GALLERY_GAP = 0;

function getCarouselSlideLeft(i, activeIndex) {
  if (i === activeIndex) return 0;
  if (i < activeIndex) return (i - activeIndex) * CAROUSEL_INACTIVE_LEFT_STEP;
  return CAROUSEL_FIRST_RIGHT_OFFSET + (i - activeIndex - 1) * CAROUSEL_INACTIVE_LEFT_STEP;
}

export default function CarouselComponentVar({
  items = [],
  headline,
  paddingTop = 60,
  paddingBottom = 120,
  gap = 40,
}) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const safeIndex = Math.min(carouselIndex, Math.max(0, items.length - 1));
  const scrollRef = useRef(null);
  const cardRef = useRef(null);

  const nextSlide = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, items.length - 1));
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleScroll = useCallback(() => {
    const scrollEl = scrollRef.current;
    const cardEl = cardRef.current;
    if (!scrollEl || !cardEl || items.length === 0) return;
    const cardWidth = cardEl.getBoundingClientRect().width;
    const step = cardWidth + MOBILE_GALLERY_GAP;
    const index = Math.round(scrollEl.scrollLeft / step);
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    setCarouselIndex(clamped);
  }, [items.length]);

  const goToSlide = useCallback(
    (index) => {
      const scrollEl = scrollRef.current;
      const cardEl = cardRef.current;
      if (!scrollEl || !cardEl) return;
      const cardWidth = cardEl.getBoundingClientRect().width;
      const step = cardWidth + MOBILE_GALLERY_GAP;
      scrollEl.scrollTo({ left: index * step, behavior: 'smooth' });
      setCarouselIndex(index);
    },
    []
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.sectionOverflowVisible}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <div className={styles.sectionGrid} style={{ rowGap: `${gap}px` }}>
        {headline && (
          <p className={`${styles.col2Span6} ${styles.headline}`}>
            {headline}
          </p>
        )}
        <div className={styles.col2Span10}>
          {/* Desktop: visible only above 992px */}
          <div className={`${styles.carousel} ${styles.carouselDesktop}`}>
            {items.map((img, idx) => {
              const isActive = idx === safeIndex;
              const left = getCarouselSlideLeft(idx, safeIndex);
              return (
                <img
                  key={idx}
                  className={`${styles.carouselSlide} ${isActive ? styles.carouselSlideActive : styles.carouselSlideInactive}`}
                  style={{ left: `${left}px`, zIndex: isActive ? 1 : 0 }}
                  src={img.src}
                  alt={img.alt ?? ''}
                />
              );
            })}
            {safeIndex > 0 && (
              <button
                type="button"
                className={styles.carouselButtonPrev}
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {safeIndex < items.length - 1 && (
              <button
                type="button"
                className={styles.carouselButtonNext}
                onClick={nextSlide}
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Tablet/mobile: visible only at ≤992px (Figma node 605-10050) */}
          <div
            className={styles.carouselMobile}
            aria-label="Image carousel"
          >
            <div className={styles.galleryPadding}>
              <div
                ref={scrollRef}
                className={styles.galleryScroll}
                onScroll={handleScroll}
                role="group"
                aria-label="Gallery"
              >
                {items.map((img, idx) => (
                  <figure
                    key={idx}
                    ref={idx === 0 ? cardRef : undefined}
                    className={styles.galleryCard}
                  >
                    <img
                      src={img.src}
                      alt={img.alt ?? ''}
                      className={styles.galleryCardImg}
                    />
                  </figure>
                ))}
              </div>
            </div>
            <div
              className={styles.indicators}
              role="tablist"
              aria-label="Carousel slides"
            >
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === safeIndex}
                  aria-label={`Slide ${idx + 1} of ${items.length}`}
                  className={styles.indicatorDot}
                  data-active={idx === safeIndex}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
        <p className={`${styles.col2Span5} ${styles.carouselCaption}`}>
          {items[safeIndex]?.caption ?? ''}
        </p>
      </div>
    </div>
  );
}
