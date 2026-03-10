import Header from '../../components/Header/Header';
import SectionHero from '../../components/SectionHero/SectionHero';
import CarouselComponentVar from '../../components/CarouselComponentVar/CarouselComponentVar';
import Footer from '../../components/Footer/Footer';
import styles from './WorkAccessAbility.module.css';

import controlModuleImg from '../../assets-new/accessability-assets/controle-module.png';
import baseImg from '../../assets-new/accessability-assets/base.png';
import systemMockupImg from '../../assets-new/accessability-assets/system-mockup.png';

import access1 from '../../assets-new/accessability-assets/accessability-carousel/key-visual.jpg';
import access2 from '../../assets-new/accessability-assets/accessability-carousel/first-prototypes.jpg';
import access3 from '../../assets-new/accessability-assets/accessability-carousel/3d-prototype-testing.jpg';
import access4 from '../../assets-new/accessability-assets/accessability-carousel/3d-prototype.jpg';
import access5 from '../../assets-new/accessability-assets/accessability-carousel/rendering.jpg';

const CAROUSEL_ITEMS = [
  { src: access1, alt: 'AccessAbility modular wheelchair controller key visual', caption: 'Modular design concept for individualized wheelchair control.' },
  { src: access2, alt: 'First physical prototypes of the AccessAbility control system', caption: 'Early prototypes exploring form and ergonomics.' },
  { src: access3, alt: '3D prototype testing with user feedback', caption: 'User testing with 3D-printed prototypes.' },
  { src: access4, alt: 'Refined 3D prototype of the control module', caption: 'Refined 3D prototype before final manufacturing.' },
  { src: access5, alt: 'Final rendering of the AccessAbility system', caption: 'Final product rendering of the modular system.' },
];

const WorkAccessAbility = () => {
  return (
    <>
      <Header projectTitle="AccessAbility" />
      <main className={styles.page}>
        <SectionHero project="AccessAbility" />

        <section
          className={styles.sectionLimitations}
          aria-labelledby="limitations-heading"
        >
          <div className={styles.container}>
            <h2 id="limitations-heading" className={styles.sectionHeading}>
              Limitations of Standardized Hardware
            </h2>
            <p className={styles.sectionBody}>
              Wheelchair users have very individual needs and many different
              limitations. Current control systems have one thing in common: they
              are only suitable for a certain target group. But in reality
              everyone has a different impairment and everyone has different
              scenarios and needs for use.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionRequirements}
          aria-labelledby="requirements-heading"
        >
          <div className={styles.container}>
            <h2 id="requirements-heading" className={styles.sectionHeading}>
              Establishing the System Requirements
            </h2>
            <p className={styles.sectionBody}>
              Collaboration with a medical professional and wheelchair users made
              it possible to tailor the product directly to end users. Their
              experience with the individual needs of people with disabilities
              led to specific requirements for the solution.
            </p>
          </div>
        </section>

        {/* Citation */}
        <section className={styles.sectionCitation} aria-labelledby="citation-heading">
          <div className={styles.containerCitation}>
            <h2 id="citation-heading" className={styles.srOnly}>
              How Might We question
            </h2>
            <blockquote className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                How might we make the control system individualizable to meet the needs in different situations?
              </p>
            </blockquote>
          </div>
        </section>

        <section
          className={styles.sectionProblemIntro}
          aria-labelledby="problem-intro-heading"
        >
          <div className={styles.container}>
            <h2 id="problem-intro-heading" className={styles.srOnly}>
              Problem statement
            </h2>
            <p className={styles.problemIntro}>
              Resolving these conflicting demands proved impossible with a
              traditional static design. Integrating standard functions while
              fully customizing the physical interface required a structural
              separation of components.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionTitle}
          aria-labelledby="accessability-title"
        >
          <div className={styles.container}>
            <div className={styles.titleBlock}>
              <h2 id="accessability-title" className={styles.titleMain}>
                AccessAbility
              </h2>
              <p className={styles.subtitle}>
                Modular controlled Electric Wheelchairs
              </p>
            </div>
            <p className={styles.description}>
              The new approach is based on a modular design. By separating the
              technical basis from the ergonomic interface, the hardware can be
              adapted to the specific motor skills of the individual. This
              adaptable framework enables medical consultants to configure
              exactly the physical setup required for a specific physiological
              condition.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionWithGradient}
          aria-labelledby="control-module-heading"
        >
          <div className={styles.container}>
            <div className={styles.controlModuleImageStyleWrapper}>
              <div className={styles.gradientStyleElementControlModule} aria-hidden="true" />
              <div className={styles.imageFull}>
                <img
                  src={controlModuleImg}
                  alt="AccessAbility interchangeable control module with threaded steering mount for joystick attachments"
                  className={`${styles.sectionImage} ${styles.controlModuleImage}`}
                />
              </div>
            </div>
            <h2 id="control-module-heading" className={styles.sectionHeading}>
              The Interchangeable Control Module
            </h2>
            <p className={styles.sectionBody}>
              The control module centralizes essential power, battery, and
              directional indicator functions to minimize finger movement. A
              threaded steering mount allows specialists to easily swap joystick
              attachments to accommodate specific grip strengths and hand
              postures.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionWithGradient}
          aria-labelledby="adaptable-base-heading"
        >
          <div className={styles.container}>
            <div className={styles.adaptableBaseImageStyleWrapper}>
              <div className={styles.gradientStyleElementAdaptableBase} aria-hidden="true" />
              <div className={styles.imageFull}>
                <img
                  src={baseImg}
                  alt="AccessAbility adaptable system base supporting the arm and stabilizing the hand"
                  className={styles.sectionImage}
                />
              </div>
            </div>
            <h2 id="adaptable-base-heading" className={styles.sectionHeading}>
              The Adaptable System Base
            </h2>
            <p className={styles.sectionBody}>
              The system base supports the arm and stabilizes the hand. Medical
              consultants match specific base geometries to individual
              impairments. Soft leather ensures prolonged comfort, while an
              integrated thumb slider controls turn signals safely. The
              symmetrical design allows left or right-side installation.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionWithGradient}
          aria-labelledby="application-heading"
        >
          <div className={styles.container}>
            <h2 id="application-heading" className={styles.applicationHeading}>
              Application for Custom Hardware Configuration
            </h2>
            <p className={styles.applicationBody}>
              To manage configuration complexity, a digital service application
              guides medical staff through user assessments. The software
              translates these physical metrics into precise manufacturing
              parameters, guaranteeing a highly individualized hardware fit.
            </p>
            <div className={styles.applicationImageStyleWrapper}>
              <div className={styles.gradientStyleElementApplication} aria-hidden="true" />
              <div className={styles.applicationImage}>
                <img
                  src={systemMockupImg}
                  alt="AccessAbility digital service application for custom hardware configuration"
                  className={styles.sectionImage}
                />
              </div>
            </div>
          </div>
        </section>

        <CarouselComponentVar
          items={CAROUSEL_ITEMS}
          headline="Theoretical models required constant validation through physical prototypes."
        />
      </main>
      <Footer />
    </>
  );
};

export default WorkAccessAbility;
