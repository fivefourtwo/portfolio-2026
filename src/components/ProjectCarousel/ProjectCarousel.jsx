import { Link } from 'react-router-dom';
import { ArrowRight } from '@carbon/icons-react';
import buttonStyles from '../Button/Button.module.css';
import styles from './ProjectCarousel.module.css';

/* catalogic */
import catalogic1 from '../../assets/catalogic-assets/catalogic-carousel/key-visual.png';
import catalogic2 from '../../assets/catalogic-assets/catalogic-carousel/similarity-map-pro-display.png';
import catalogic3 from '../../assets/catalogic-assets/catalogic-carousel/my-tags-macbook.png';
import catalogic4 from '../../assets/catalogic-assets/catalogic-carousel/my-tags-screen.png';
import catalogic5 from '../../assets/catalogic-assets/catalogic-carousel/components.png';

/* teachsmartsteps */
import tss1 from '../../assets/teachsmartsteps-assets/tss-carousel/key-visual.png';
import tss2 from '../../assets/teachsmartsteps-assets/tss-carousel/components.png';
import tss3 from '../../assets/teachsmartsteps-assets/tss-carousel/editor-macbook.png';
import tss4 from '../../assets/teachsmartsteps-assets/tss-carousel/output.png';
import tss5 from '../../assets/teachsmartsteps-assets/tss-carousel/output-mockup.png';

/* accessability */
import access1 from '../../assets/accessability-assets/accessability-carousel/key-visual.png';
import access2 from '../../assets/accessability-assets/accessability-carousel/first-prototypes.png';
import access3 from '../../assets/accessability-assets/accessability-carousel/3d-prototype-testing.png';
import access4 from '../../assets/accessability-assets/accessability-carousel/3d-prototype.png';
import access5 from '../../assets/accessability-assets/accessability-carousel/rendering.png';

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

const ProjectCarousel = ({ variant }) => {
  const images = IMAGES[variant];
  const { title, description, href } = DATA[variant];
  const isAccessability = variant === 'accessability';

  return (
    <article className={styles.carousel}>
      <div className={styles.imageStrip}>
        <div className={styles.imageStripInner}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              className={styles.image}
              style={{ left: ['-488px', '247px', '982px', '1717px', '2452px'][i] }}
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
