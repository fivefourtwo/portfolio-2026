import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './About.module.css'
import profileImage from '../../assets-new/aboutme.jpg?w=800;1200;1600&format=webp&as=img'

const EDUCATION = [
  {
    institution: 'Hochschule für Gestaltung Schwäbisch Gmünd',
    degree: 'Interaction Design B.A.',
    period: '10/2021-08/2025',
  },
  {
    institution: 'Technical High School',
    degree: 'Design and Media Technology',
    period: '09/2018 – 07/2021',
  },
  {
    institution: 'Heidtech Heidenheim',
    degree: 'Vocational school for metal technology',
    period: '09/2016 – 07/2018',
  },
]

const PROFESSIONAL_EXPERIENCE = [
  {
    company: 'Teleclinic GmbH | Remote',
    role: 'Working student as a UX/UI Designer',
    period: '04/2025 - 08/2025',
  },
  {
    company: 'zweigrad | Hamburg',
    role: 'Internship as UX/UI Designer',
    period: '03/2024 - 08/2024',
  },
]

const About = () => {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.section} aria-labelledby="about-heading">
          <div className={styles.content}>
            <h1 id="about-heading" className={styles.headline}>
              About me
            </h1>
            <p className={styles.bio}>
            I’m a designer focused on creating clear, intuitive digital products with 
            real value for users. I’m drawn to complex problems, structured thinking, 
            and design processes shaped by prototyping, testing, and iteration. 
            I enjoy working with new technologies and tools as part of that process, 
            always with the goal of creating thoughtful, accessible experiences where 
            usability and visual quality go hand in hand.
            </p>
            <div className={styles.imageWrapper}>
              <img
                src={profileImage.src}
                srcSet={profileImage.srcset}
                sizes="(max-width: 480px) 100vw, (max-width: 992px) 100vw, 50vw"
                width={profileImage.w}
                height={profileImage.h}
                alt="Portrait of Fabrice Rio"
                className={styles.profileImage}
              />
            </div>
          </div>
        </section>

        <section
          className={styles.sectionEducation}
          aria-labelledby="education-heading"
        >
          <div className={styles.sectionContent}>
            <h2 id="education-heading" className={styles.sectionHeading}>
              Education
            </h2>
            <ul className={styles.entryList} aria-label="Education">
              {EDUCATION.map((item, index) => (
                <li key={index} className={styles.entryItem}>
                  <div className={styles.entryBlock}>
                    <p className={styles.entryTitle}>{item.institution}</p>
                    <p className={styles.entrySubtitle}>{item.degree}</p>
                    <p className={styles.entrySubtitle}>{item.period}</p>
                  </div>
                  {index < EDUCATION.length - 1 && (
                    <hr className={styles.divider} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={styles.sectionExperience}
          aria-labelledby="professional-experience-heading"
        >
          <div className={styles.sectionContent}>
            <h2
              id="professional-experience-heading"
              className={styles.sectionHeading}
            >
              Professional Experience
            </h2>
            <ul className={styles.entryList} aria-label="Professional experience">
              {PROFESSIONAL_EXPERIENCE.map((item, index) => (
                <li key={index} className={styles.entryItem}>
                  <div className={styles.entryBlock}>
                    <p className={styles.entryTitle}>{item.company}</p>
                    <p className={styles.entrySubtitle}>{item.role}</p>
                    <p className={styles.entrySubtitle}>{item.period}</p>
                  </div>
                  {index < PROFESSIONAL_EXPERIENCE.length - 1 && (
                    <hr className={styles.divider} aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default About
