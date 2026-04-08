import { Fragment } from 'react';
import Button from '../Button/Button';
import styles from './SectionHero.module.css';

import keyVisualCatalogic from '../../assets-new/catalogic-assets/key-visual.jpg?w=800;1200;1600&format=webp&as=img';
import keyVisualTeachSmartSteps from '../../assets-new/teachsmartsteps-assets/key-visual.jpg?w=800;1200;1600&format=webp&as=img';
import keyVisualAccessAbility from '../../assets-new/accessability-assets/key-visual.jpg?w=800;1200;1600&format=webp&as=img';

const PROJECTS = {
  Catalogic: {
    context:
      'AI-powered tool for cataloging and managing music libraries for DJs',
    team: 'Jannik Aßfalg, Fabrice Rio',
    projectContext: 'Bachelor thesis',
    myRole: 'Research, Concept, Visual Design, Prototyping, Testing',
    duration: '20 Weeks',
    year: '2025',
    keyVisual: keyVisualCatalogic,
    keyVisualAlt: 'Catalogic project key visual',
    repositoryUrl: 'https://github.com/fivefourtwo/catalogic',
  },
  TeachSmartSteps: {
    context:
      'A flexible task-generation tool that helps primary school teachers integrate media literacy into everyday teaching.',
    team: 'Lea Hafebier, Nina Hielscher, Fabrice Rio',
    projectContext: '6th semester project, Lean Design',
    myRole: 'Ideation, Research, Concept, Prototyping',
    duration: '8 Weeks',
    year: '2024/25',
    keyVisual: keyVisualTeachSmartSteps,
    keyVisualAlt: 'TeachSmartSteps project key visual',
    repositoryUrl: 'https://github.com/fivefourtwo/teach-smart-steps',
  },
  AccessAbility: {
    context:
      'A concept for a modular controller for electric wheelchairs that adapts to individual motor skills.',
    team: 'Jun Wang, Anton Stallbörger, Fabrice Rio',
    projectContext: '4th semester project, Interface',
    myRole: 'Rendering, Prototyping, Testing, Documentation',
    duration: '4 Weeks',
    year: '2024/25',
    keyVisual: keyVisualAccessAbility,
    keyVisualAlt: 'AccessAbility project key visual',
  },
};

const INFO_ROWS = [
  { key: 'team', label: 'Team' },
  { key: 'projectContext', label: 'Context' },
  { key: 'myRole', label: 'My Role' },
  { key: 'duration', label: 'Duration' },
  { key: 'year', label: 'Year' },
];

const INFO_LEFT_KEYS = ['team', 'projectContext', 'myRole'];
const INFO_RIGHT_KEYS = ['duration', 'year'];

const SectionHero = ({ project }) => {
  const data = PROJECTS[project];

  if (!data) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="project-context">
      <img
        src={data.keyVisual.src}
        srcSet={data.keyVisual.srcset}
        sizes="(max-width: 480px) 100vw, (max-width: 992px) 100vw, 75vw"
        width={data.keyVisual.w}
        height={data.keyVisual.h}
        alt={data.keyVisualAlt}
        className={styles.keyVisual}
      />
      <div className={styles.contextColumn}>
        <p id="project-context" className={styles.context}>
          {data.context}
        </p>
        {data.repositoryUrl ? (
          <Button
            variant="large"
            href={data.repositoryUrl}
            largeLabel="View repository"
            className={styles.repositoryButton}
            target="_blank"
            rel="noopener noreferrer"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            }
          />
        ) : null}
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.infoBlockLeft}>
          <hr className={styles.divider} aria-hidden="true" />
          {INFO_LEFT_KEYS.map((key, index) => {
            const { label } = INFO_ROWS.find((r) => r.key === key);
            const isLastLeft = index === INFO_LEFT_KEYS.length - 1;
            return (
              <Fragment key={key}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}>{data[key]}</span>
                </div>
                {!isLastLeft && <hr className={styles.divider} aria-hidden="true" />}
              </Fragment>
            );
          })}
        </div>
        <div className={styles.infoBlockRight}>
          <hr className={styles.divider} aria-hidden="true" />
          {INFO_RIGHT_KEYS.map((key) => {
            const { label } = INFO_ROWS.find((r) => r.key === key);
            return (
              <Fragment key={key}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>{label}</span>
                  <span className={styles.value}>{data[key]}</span>
                </div>
                <hr className={styles.divider} aria-hidden="true" />
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
