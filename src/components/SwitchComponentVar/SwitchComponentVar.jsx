import { useState } from 'react';
import styles from './SwitchComponentVar.module.css';

import smartCratesImg from '../../assets-new/catalogic-assets/smart-crates.png';
import artistViewImg from '../../assets-new/catalogic-assets/artist-view.png';
import labelViewImg from '../../assets-new/catalogic-assets/label-view.png';

const VIEW_DATA = {
  'smart-crates': {
    title: 'Smart Crates',
    description:
      'Smart Crates use semantic metadata and custom rules to auto-populate containers upon import, eliminating manual assignment.',
    image: smartCratesImg,
    imageAlt: 'Smart Crates view of Catalogic',
  },
  'artist-view': {
    title: 'Artist view',
    description:
      "Maps a producer's sonic range via semantic metadata to isolate specific acoustic profiles.",
    image: artistViewImg,
    imageAlt: 'Artist view of Catalogic',
  },
  'label-view': {
    title: 'Label view',
    description:
      'Evaluates imprint aesthetics via semantic metadata to filter tonally aligned tracks.',
    image: labelViewImg,
    imageAlt: 'Label view of Catalogic',
  },
};

const TABS = [
  { id: 'smart-crates', label: 'Smart Crates' },
  { id: 'artist-view', label: 'Artists' },
  { id: 'label-view', label: 'Labels' },
];

const SwitchComponentVar = () => {
  const [activeView, setActiveView] = useState('smart-crates');
  const data = VIEW_DATA[activeView];

  return (
    <section
      className={styles.section}
      aria-labelledby="switch-title"
      aria-describedby="switch-description"
    >
      <div className={styles.imageWrapper}>
        <img
          src={data.image}
          alt={data.imageAlt}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.tabsWrapper}>
        <div
          className={styles.tabList}
          role="tablist"
          aria-label="Catalogic view switcher"
        >
          {TABS.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="switch-content"
                id={`tab-${tab.id}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                onClick={() => setActiveView(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="switch-content"
        className={styles.contentWrapper}
        role="tabpanel"
        aria-labelledby={`tab-${activeView}`}
      >
        <h2 id="switch-title" className={styles.title}>
          {data.title}
        </h2>
        <p id="switch-description" className={styles.description}>
          {data.description}
        </p>
      </div>
    </section>
  );
};

export default SwitchComponentVar;
