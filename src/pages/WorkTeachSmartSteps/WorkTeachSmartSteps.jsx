import Header from '../../components/Header/Header';
import SectionHero from '../../components/SectionHero/SectionHero';
import UseCasesComponentVar from '../../components/UseCasesComponentVar/UseCasesComponentVar';
import Footer from '../../components/Footer/Footer';
import styles from './WorkTeachSmartSteps.module.css';

import systemFunctionalityImg from '../../assets-new/teachsmartsteps-assets/system-functionality.png.jpg';
import autoFillVideo from '../../assets-new/teachsmartsteps-assets/auto-fill-mockup.webm';
import editorVideo from '../../assets-new/teachsmartsteps-assets/editor-mockup.webm';
import outputPdfImg from '../../assets-new/teachsmartsteps-assets/output-pdf.png';

const WorkTeachSmartSteps = () => {
  return (
    <>
      <Header projectTitle="Teach Smart Steps" />
      <main className={styles.page}>
        <SectionHero project="TeachSmartSteps" />

        <section className={styles.section} aria-labelledby="disparity-heading">
          <div className={styles.container}>
            <h2 id="disparity-heading" className={styles.sectionHeading}>
              The Disparity Between Digital Access and Critical Literacy
            </h2>
            <p className={styles.sectionBody}>
              Today&apos;s children are growing up in a world where the real and
              digital worlds are intertwined. YouTube, TikTok, WhatsApp, the
              internet is omnipresent. The safe and thoughtful use of digital
              content has long since become an essential skill. We believe that
              media education should not only take place when problems arise, but
              preventively, right from the start.
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="barriers-heading">
          <div className={styles.container}>
            <h2 id="barriers-heading" className={styles.sectionHeading}>
              Systemic Barriers to Media Literacy Integration
            </h2>
            <p className={styles.sectionBody}>
              Educators drive change but struggle with static resources that fail
              to match digital evolution. Time constraints further complicate
              media literacy integration.
            </p>
          </div>
        </section>

        <section className={styles.sectionTitle} aria-labelledby="title-heading">
          <div className={styles.container}>
            <div className={styles.titleBlock}>
              <h2 id="title-heading" className={styles.titleMain}>
                Teach Smart Steps
              </h2>
              <p className={styles.subtitle}>Adaptive Media Education</p>
            </div>
            <p className={styles.description}>
              Teach Smart Steps generates educationally meaningful tasks that
              integrate media literacy into lessons without displacing the
              primary subject matter. This enables educators to incorporate
              digital education into their daily schedule without requiring
              additional lesson time.
            </p>
          </div>
        </section>

        <UseCasesComponentVar />

        <section
          className={styles.section}
          aria-labelledby="structuring-heading"
        >
          <div className={styles.container}>
            <div className={styles.imageFull}>
              <img
                src={systemFunctionalityImg}
                alt="Teach Smart Steps system functionality flow showing task generation phases from input to lesson plan"
                className={styles.sectionImage}
              />
            </div>
            <h2 id="structuring-heading" className={styles.sectionHeading}>
              Structuring the educational intent from input to lesson plan
            </h2>
            <p className={styles.sectionBody}>
              The application functions as an intermediary between the
              educator&apos;s intent and the generative capabilities of the Large
              Language Model (LLM). The process is governed by a three-stage
              architectural flow designed to minimize hallucination and maximize
              pedagogical relevance.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionAutofill}
          aria-labelledby="autofill-heading"
        >
          <div className={styles.autofillStyleElement} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.imageFull}>
              <video
                src={autoFillVideo}
                className={styles.sectionImage}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Automated fill interface pre-filling configuration parameters based on semantic context"
              />
            </div>
            <h2 id="autofill-heading" className={styles.sectionHeading}>
              Mitigating Decision Fatigue Through Contextual Auto-Completion
            </h2>
            <p className={styles.sectionBody}>
              Having to define every parameter can lead to decision fatigue. To
              avoid that, the system provides an Auto-Fill. When a user provides
              a partial input the system analyzes the semantic context to
              extrapolate the missing variables. Fewer user constraints result in
              greater generative variance.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionEditor}
          aria-labelledby="editor-heading"
        >
          <div className={styles.editorStyleElement} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.imageFull}>
              <video
                src={editorVideo}
                className={styles.sectionImage}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Task editing interface for granular refinement of didactic and student materials"
              />
            </div>
            <h2 id="editor-heading" className={styles.sectionHeading}>
              An Editor for Granular Refinement of Didactic and Student
              Materials
            </h2>
            <p className={styles.sectionBody}>
              The generation process is designed to produce a high-quality
              draft, but the final pedagogical responsibility remains with the
              teacher. The interface supports granular refinement. Rewriting
              instructions, adjusting vocabulary, or swapping out specific
              modules. Ensuring the final resource is not just algorithmically
              correct, but contextually appropriate for the specific class.
            </p>
          </div>
        </section>

        <section
          className={styles.sectionOutput}
          aria-labelledby="output-heading"
        >
          <div className={styles.outputStyleElement} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.imageFull}>
              <div className={styles.outputImageWrapper}>
                <img
                  src={outputPdfImg}
                  alt="Ready-to-use PDF worksheet with competency-focused exercises and didactic guide"
                  className={styles.sectionImage}
                />
              </div>
            </div>
            <h2 id="output-heading" className={styles.sectionHeading}>
              Easy implementation in class thanks to ready-made didactic Guide
            </h2>
            <p className={styles.sectionBody}>
              At the end, the teacher receives a two-part lesson package:
              competency-focused exercises for immediate classroom use and a
              Didactic Guide that acts as the teacher&apos;s script for
              preparation and execution.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WorkTeachSmartSteps;
