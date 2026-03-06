import { Fragment } from 'react';
import styles from './SectionHero.module.css';

import keyVisualCatalogic from '../../assets-new/catalogic-assets/key-visual.jpg';
import keyVisualTeachSmartSteps from '../../assets-new/teachsmartsteps-assets/key-visual.jpg';
import keyVisualAccessAbility from '../../assets-new/accessability-assets/key-visual.jpg';

const PROJECTS = {
  Catalogic: {
    context:
      'AI-powered tool for cataloging and managing music libraries for DJs',
    team: 'Jannik Aßfalg & Fabrice Rio',
    projectContext: 'Bachelor thesis',
    myRole: 'Research, Concept, Visual Design, Prototyping, Testing',
    duration: '20 Weeks',
    year: '2025',
    keyVisual: keyVisualCatalogic,
    keyVisualAlt: 'Catalogic project key visual',
  },
  TeachSmartSteps: {
    context:
      'A flexible task-generation tool that helps primary school teachers integrate media literacy into everyday teaching.',
    team: 'Lea Hafebier, Nina Hielscher & me',
    projectContext: '6th semester project, Lean Design',
    myRole: 'Ideation, Research, Concept, Prototyping',
    duration: '8 Weeks',
    year: '2024/25',
    keyVisual: keyVisualTeachSmartSteps,
    keyVisualAlt: 'TeachSmartSteps project key visual',
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

const SectionHero = ({ project }) => {
  const data = PROJECTS[project];

  if (!data) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="project-context">
      <img
        src={data.keyVisual}
        alt={data.keyVisualAlt}
        className={styles.keyVisual}
      />
      <p id="project-context" className={styles.context}>
        {data.context}
      </p>
      <div className={styles.infoBlock}>
        <hr className={styles.divider} aria-hidden="true" />
        {INFO_ROWS.map(({ key, label }) => (
          <Fragment key={key}>
            <div className={styles.infoRow}>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{data[key]}</span>
            </div>
            <hr className={styles.divider} aria-hidden="true" />
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default SectionHero;
