import * as FM from 'framer-motion';
import Header from '../../components/Header/Header';
import SectionHero from '../../components/SectionHero/SectionHero';
import SwitchComponentVar from '../../components/SwitchComponentVar/SwitchComponentVar';
import Footer from '../../components/Footer/Footer';
import styles from './WorkCatalogic.module.css';

const easeOut = [0.22, 1, 0.36, 1];
const sectionViewport = { once: true, amount: 0.15, margin: '0px 0px -48px 0px' };

const sectionRevealProps = (prefersReducedMotion, duration) =>
  prefersReducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: sectionViewport,
        transition: { duration, ease: easeOut },
      };

import analysisImg from '../../assets-new/catalogic-assets/analysis.png';
import descriptorsVideo from '../../assets-new/catalogic-assets/Descriptors-mockup.webm';
import tagsMockupVideo from '../../assets-new/catalogic-assets/Recommendations-mockup.webm';
import tagsMockupVideoAlt from '../../assets-new/alternative-videos/Recommendations-mockup-alt.mov';
import manualTaggingVideo from '../../assets-new/catalogic-assets/manual-tagging.webm';
import similarityMapVideo from '../../assets-new/catalogic-assets/Similarity-mockup.webm';
import similarityMapVideoAlt from '../../assets-new/alternative-videos/Similarity-mockup-alt.mov';
import xyModeVideo from '../../assets-new/catalogic-assets/XY-mockup.webm';
import xyModeVideoAlt from '../../assets-new/alternative-videos/XY-mockup-alt.mov';

const WorkCatalogic = () => {
  const prefersReducedMotion = FM.useReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.55;
  const reveal = sectionRevealProps(prefersReducedMotion, duration);

  return (
    <>
      <Header projectTitle="Catalogic" />
      <main className={styles.page}>
        <FM.motion.div className={styles.heroRevealWrap} {...reveal}>
          <SectionHero project="Catalogic" />
        </FM.motion.div>

        {/* The Shift from Curation to Administration */}
        <FM.motion.section className={styles.sectionShift} aria-labelledby="problem-heading" {...reveal}>
          <div className={styles.container}>
            <h2 id="problem-heading" className={styles.srOnly}>
              The Shift from Curation to Administration
            </h2>
            <p className={styles.problemHeadline}>
              The Shift from Curation to Administration
            </p>
            <p className={styles.problemBody}>
              The transition from physical media to digital files transformed
              DJing from curation to administration. While storage is infinite,
              the linear list interface remains static. Direct collaboration with
              professional and semi-professional DJs identified the &quot;invisible
              work&quot; of preparation as the primary bottleneck. As libraries
              scale, rigid file structures fail to support the associative
              mental models used to recall sound.
            </p>
          </div>
        </FM.motion.section>

        {/* Reconciling File Systems with Human Memory */}
        <FM.motion.section
          className={styles.sectionReconciling}
          aria-labelledby="reconciling-heading"
          {...reveal}
        >
          <div className={styles.container}>
            <h2 id="reconciling-heading" className={styles.srOnly}>
              Reconciling File Systems with Human Memory
            </h2>
            <p className={styles.reconcilingHeadline}>
              Reconciling File Systems with Human Memory
            </p>
            <p className={styles.reconcilingBody}>
              To address this disconnect, the project focuses on reconciling
              the static nature of file management with the dynamic nature of
              musical memory. The design process was guided by the following
              strategic question:
            </p>
          </div>
        </FM.motion.section>

        {/* Citation */}
        <FM.motion.section className={styles.sectionCitation} aria-labelledby="citation-heading" {...reveal}>
          <div className={styles.containerCitation}>
            <h2 id="citation-heading" className={styles.srOnly}>
              Strategic question
            </h2>
            <blockquote className={styles.quoteBlock}>
              <p className={styles.quoteText}>
                How might we enable DJs to organize by mental models and
                rediscover hidden connections?
              </p>
            </blockquote>
          </div>
        </FM.motion.section>

        {/* Catalogic title & description */}
        <FM.motion.section className={styles.sectionTitle} aria-labelledby="catalogic-title" {...reveal}>
          <div className={styles.container}>
            <div className={styles.titleBlock}>
              <h2 id="catalogic-title" className={styles.titleMain}>
                Catalogic
              </h2>
              <p className={styles.subtitle}>
                AI-powered music library management
              </p>
            </div>
            <p className={styles.description}>
              Catalogic is an AI-powered music library management tool that helps
              based on audio analysis and personalized tags. This enables DJs to
              navigate their collections using their mental models and spatial
              memory, allowing them to rediscover hidden connections.
            </p>
          </div>
        </FM.motion.section>

        {/* Audio Analysis */}
        <FM.motion.section className={styles.sectionAnalysis} aria-labelledby="analysis-heading" {...reveal}>
          <div className={styles.container}>
            <div className={styles.analysisImageWrap}>
              <img
                src={analysisImg}
                alt="Catalogic audio analysis interface showing track metadata and analyzed characteristics"
                className={styles.analysisImage}
              />
            </div>
            <h2 id="analysis-heading" className={styles.sectionHeading}>
              Audio Analysis as the foundation
            </h2>
            <p className={styles.sectionTextAnalysis}>
              The system analyzes over 500 characteristics. Standard metadata
              misses the nuance of a recording. By analyzing the audio signal,
              the system interprets the music&apos;s actual character. This creates
              a sonic profile which is the fundement for all smart features of
              Catalogic.
            </p>
          </div>
        </FM.motion.section>

        {/* Descriptors */}
        <FM.motion.section
          className={styles.sectionDescriptors}
          aria-labelledby="descriptors-heading"
          {...reveal}
        >
          <div className={styles.container}>
            <div className={styles.descriptorsImageWrap}>
              <video
                src={descriptorsVideo}
                className={styles.descriptorsImage}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Catalogic descriptors view showing energy, acousticness, danceability, instrumentalness"
              />
            </div>
            <h2 id="descriptors-heading" className={styles.descriptorsHeading}>
              Analysed characteristics provide immediate, granular descriptors
              for every track.
            </h2>
          </div>
        </FM.motion.section>

        {/* Dark block: A system that adapts to you + Tags mockup + Personalized Tags */}
        <FM.motion.section className={styles.sectionDark} aria-labelledby="adapts-heading" {...reveal}>
          <div className={styles.container}>
            <p className={styles.darkStatement} id="adapts-heading">
              A system that adapts to you,{' '}
              not the other way around.
            </p>
            <div className={styles.tagsMockupStyleWrapper}>
              <div className={styles.darkStyleElement} aria-hidden="true" />
              <div className={styles.tagsMockupWrap}>
                <video
                  className={styles.tagsMockupImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Catalogic My Tags interface showing personalized tag structure"
                >
                  <source src={tagsMockupVideoAlt} type="video/quicktime" />
                  <source src={tagsMockupVideo} type="video/webm" />
                </video>
              </div>
            </div>
            <h2 className={styles.tagsBlockHeading}>
              Personalized Tags for Adaptive Organization
            </h2>
            <p className={styles.tagsBlockText}>
              &quot;MyTags&quot; lets DJs build a personalized structure reflecting
              their mental models. Users define custom categories like
              &quot;Warmup&quot; or &quot;Peak Time&quot; instead of generic
              labels. The system analyzes and learns this to offer predictive
              recommendations. It eventually suggests relevant tags, automating
              organization without imposing external structure.
            </p>
          </div>
        </FM.motion.section>

        {/* Manual Tagging */}
        <FM.motion.section
          className={styles.sectionManualTagging}
          aria-labelledby="manual-tagging-heading"
          {...reveal}
        >
          <div className={styles.container}>
            <div className={styles.manualTaggingImageWrap}>
              <video
                src={manualTaggingVideo}
                className={styles.manualTaggingImage}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Manual tagging with automatically suggested tags in Catalogic"
              />
            </div>
            <h2 id="manual-tagging-heading" className={styles.manualTaggingHeading}>
              When manually tagging individual tracks, the most relevant tags are
              automatically suggested.
            </h2>
          </div>
        </FM.motion.section>

        {/* A new way to explore Music Libraries */}
        <FM.motion.section className={styles.sectionExplore} aria-labelledby="explore-title" {...reveal}>
          <div className={styles.containerExplore}>
            <h2 id="explore-title" className={styles.titleFullWidth}>
              A new way to explore Music Libraries
            </h2>
          </div>
        </FM.motion.section>

        {/* Similarity Map */}
        <FM.motion.section
          className={styles.sectionSimilarity}
          aria-labelledby="similarity-map-heading"
          {...reveal}
        >
          <div className={styles.container}>
            <div className={styles.similarityImageStyleWrapper}>
              <div className={styles.similarityStyleElement} aria-hidden="true" />
              <div className={styles.similarityImageWrap}>
                <video
                  className={styles.similarityImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Catalogic Similarity Map showing spatial organization of tracks"
                >
                  <source src={similarityMapVideoAlt} type="video/quicktime" />
                  <source src={similarityMapVideo} type="video/webm" />
                </video>
              </div>
              <div className={styles.similarityTextBlock}>
                <h2 id="similarity-map-heading" className={styles.sectionHeadingLight}>
                  Transfering the physical experience of spatial memory
                </h2>
                <p className={styles.sectionTextLight}>
                  Exploration of the map reveals the spatial organization of
                  sound clusters, allowing an intuitive understanding of where
                  distinct musical areas reside. The filter panel highlights
                  tracks based on specific features, while the confidence slider
                  adjusts the selection strictness. A high setting isolates the
                  most definitive matches.
                </p>
              </div>
            </div>
          </div>
        </FM.motion.section>

        {/* XY Mode */}
        <FM.motion.section className={styles.sectionXY} aria-labelledby="xy-mode-heading" {...reveal}>
          <div className={styles.xyContent}>
            <div className={styles.xyImageStyleWrapper}>
              <div className={styles.xyStyleElement} aria-hidden="true" />
              <div className={styles.xyImageWrap}>
                <video
                  className={styles.xyImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Catalogic XY Mode for mapping parameters to axes"
                >
                  <source src={xyModeVideoAlt} type="video/quicktime" />
                  <source src={xyModeVideo} type="video/webm" />
                </video>
              </div>
              <div className={styles.xyTextBlock}>
                <h2 id="xy-mode-heading" className={styles.sectionHeadingLight}>
                  Visualizing Sonic Gradients and Transitions
                </h2>
                <p className={styles.sectionTextLight}>
                  The XY Mode offers structured control for targeted set planning.
                  Users can map any two analyzed parameters directly onto the axes.
                  This reveals precise gradients and functional bridges between
                  distinct musical styles.
                </p>
              </div>
            </div>
          </div>
        </FM.motion.section>

        {/* Smart Crates (SwitchComponentVar) */}
        <FM.motion.section className={styles.sectionSwitch} aria-label="Smart Crates and views" {...reveal}>
          <SwitchComponentVar />
        </FM.motion.section>
      </main>
      <Footer />
    </>
  );
};

export default WorkCatalogic;
