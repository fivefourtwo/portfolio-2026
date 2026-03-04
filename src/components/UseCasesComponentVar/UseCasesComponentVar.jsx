import { useState } from 'react';
import styles from './UseCasesComponentVar.module.css';

import setupDetailed from '../../assets/teachsmartsteps-assets/setup-detailed.png';
import overviewDetailed from '../../assets/teachsmartsteps-assets/overview-detailed.png';
import startDetailed from '../../assets/teachsmartsteps-assets/start-detailed.png';
import setupPreview from '../../assets/teachsmartsteps-assets/setup-preview.png';
import overviewPreview from '../../assets/teachsmartsteps-assets/overview-preview.png';
import startPreview from '../../assets/teachsmartsteps-assets/start-preview.png';

const VARIANTS = {
  guided: {
    mainImage: setupDetailed,
    mainImageAlt: 'Guided Definition setup interface',
    caption: (
      <>
        <strong>Guided Definition</strong> Reduces cognitive load by breaking
        down complex prompt parameters into a linear, step-by-step sequence.
      </>
    ),
    previewImage: setupPreview,
    previewLabel: 'Guided Definition',
  },
  competence: {
    mainImage: overviewDetailed,
    mainImageAlt: 'Competence-Driven Structure overview interface',
    caption: (
      <>
        <strong>Competence-Driven Structure</strong> Prioritizes the learning
        goal, ensuring the generated task aligns strictly with media literacy
        requirements.
      </>
    ),
    previewImage: overviewPreview,
    previewLabel: 'Competence-Driven',
  },
  iterative: {
    mainImage: startDetailed,
    mainImageAlt: 'Iterative Refinement start interface',
    caption: (
      <>
        <strong>Iterative Refinement</strong> Generates a baseline assignment
        immediately, shifting the user&apos;s role from creator to editor.
      </>
    ),
    previewImage: startPreview,
    previewLabel: 'Iterative Refinement',
  },
};

const UseCasesComponentVar = () => {
  const [activeVariant, setActiveVariant] = useState('guided');
  const current = VARIANTS[activeVariant];

  return (
    <section
      className={styles.section}
      aria-labelledby="usecases-title"
      aria-describedby="usecases-caption"
    >
      <h2 id="usecases-title" className={styles.title}>
        Flexible for the optimal task: Three approaches for individual needs
      </h2>

      <div className={styles.mainImageWrapper}>
        <img
          src={current.mainImage}
          alt={current.mainImageAlt}
          className={styles.mainImage}
        />
      </div>

      <aside className={styles.previews} aria-label="Variant preview thumbnails">
        {Object.entries(VARIANTS).map(([key, { previewImage, previewLabel }]) => {
          const isActive = activeVariant === key;
          const labelId = `preview-label-${key}`;

          if (isActive) {
            return (
              <div
                key={key}
                className={styles.previewItem}
                aria-current="true"
                aria-label={`${previewLabel} (selected)`}
              >
                <img
                  src={previewImage}
                  alt=""
                  aria-hidden="true"
                  className={styles.previewImage}
                />
                <span id={labelId} className={styles.previewLabelActive}>
                  {previewLabel}
                </span>
              </div>
            );
          }

          return (
            <button
              key={key}
              type="button"
              className={styles.previewButton}
              onClick={() => setActiveVariant(key)}
              aria-label={`Show ${previewLabel} variant`}
              aria-pressed="false"
            >
              <img
                src={previewImage}
                alt=""
                aria-hidden="true"
                className={styles.previewImage}
              />
              <span id={labelId} className={styles.previewLabelInactive}>
                {previewLabel}
              </span>
            </button>
          );
        })}
      </aside>

      <p id="usecases-caption" className={styles.caption}>
        {current.caption}
      </p>
    </section>
  );
};

export default UseCasesComponentVar;
