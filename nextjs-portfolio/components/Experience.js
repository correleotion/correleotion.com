import { useState } from 'react'
import styles from '../styles/Experience.module.css'

export default function Experience() {
  const [activeTab, setActiveTab] = useState('job1')

  const jobs = {
    job1: {
      company: 'Company 1',
      title: 'Software Engineer',
      date: 'January 2022 - Present',
      details: [
        'Write modern, performant, maintainable code for a diverse array of client and internal projects',
        'Work with a variety of different languages, platforms, frameworks, and content management systems',
        'Communicate with multi-disciplinary teams of engineers, designers, producers, and clients on a daily basis'
      ]
    },
    job2: {
      company: 'Company 2',
      title: 'Frontend Developer',
      date: 'June 2020 - December 2021',
      details: [
        'Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery',
        'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
        'Clients included JetBlue, Lovesac, U.S. Cellular, and more'
      ]
    },
    job3: {
      company: 'Company 3',
      title: 'Web Developer Intern',
      date: 'May 2019 - August 2019',
      details: [
        'Developed and styled interactive web pages for learning modules',
        'Worked alongside a team of developers to create and maintain learning platforms',
        'Interfaced with user experience designers and other developers to ensure cohesive integration'
      ]
    }
  }

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNumber}>02.</span> Where I've Worked
        </h2>
        <div className={styles.experienceContainer}>
          <div className={styles.jobTabs}>
            {Object.keys(jobs).map((jobKey) => (
              <button
                key={jobKey}
                className={`${styles.tabButton} ${activeTab === jobKey ? styles.active : ''}`}
                onClick={() => setActiveTab(jobKey)}
              >
                {jobs[jobKey].company}
              </button>
            ))}
          </div>
          <div className={styles.jobContent}>
            {Object.entries(jobs).map(([jobKey, job]) => (
              <div
                key={jobKey}
                className={`${styles.tabContent} ${activeTab === jobKey ? styles.active : ''}`}
              >
                <h3 className={styles.jobTitle}>
                  {job.title} <span className={styles.jobCompany}>@ {job.company}</span>
                </h3>
                <p className={styles.jobDate}>{job.date}</p>
                <ul className={styles.jobDetails}>
                  {job.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
