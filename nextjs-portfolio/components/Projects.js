import styles from '../styles/Projects.module.css'

export default function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNumber}>03.</span> Some Things I've Built
        </h2>
        <div className={styles.projectsGrid}>
          {/* Featured Project 1 */}
          <div className={`${styles.project} ${styles.featured}`}>
            <div className={styles.projectContent}>
              <p className={styles.projectOverline}>Featured Project</p>
              <h3 className={styles.projectTitle}>
                <a href="#" target="_blank" rel="noopener noreferrer">Project Name 1</a>
              </h3>
              <div className={styles.projectDescription}>
                <p>
                  A web app for visualizing personalized data. View your top artists,
                  top tracks, recently played tracks, and detailed audio information about each track.
                  Create and save new playlists.
                </p>
              </div>
              <ul className={styles.projectTechList}>
                <li>React</li>
                <li>Node.js</li>
                <li>Express</li>
                <li>API</li>
              </ul>
            </div>
            <div className={styles.projectImage}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://via.placeholder.com/700x400" alt="Project 1" />
              </a>
            </div>
          </div>

          {/* Featured Project 2 */}
          <div className={`${styles.project} ${styles.featured} ${styles.reverse}`}>
            <div className={styles.projectContent}>
              <p className={styles.projectOverline}>Featured Project</p>
              <h3 className={styles.projectTitle}>
                <a href="#" target="_blank" rel="noopener noreferrer">Project Name 2</a>
              </h3>
              <div className={styles.projectDescription}>
                <p>
                  A minimal, dark blue theme for VS Code, with syntax highlighting optimized
                  for accessibility. Carefully crafted with colors that are easy on the eyes.
                </p>
              </div>
              <ul className={styles.projectTechList}>
                <li>VS Code</li>
                <li>Extension</li>
                <li>Publishing</li>
              </ul>
            </div>
            <div className={styles.projectImage}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src="https://via.placeholder.com/700x400" alt="Project 2" />
              </a>
            </div>
          </div>

          {/* Other Projects Title */}
          <h3 className={styles.otherProjectsTitle}>Other Noteworthy Projects</h3>
          <div className={styles.otherProjectsGrid}>
            <div className={styles.projectCard}>
              <h4 className={styles.projectCardTitle}>Integrating Algolia Search</h4>
              <p className={styles.projectCardDescription}>
                A lightweight wrapper around Algolia Search API to use in client-side projects.
              </p>
              <ul className={styles.projectCardTech}>
                <li>Algolia</li>
                <li>JavaScript</li>
                <li>API</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h4 className={styles.projectCardTitle}>Time to Have More Fun</h4>
              <p className={styles.projectCardDescription}>
                A single page web app for helping me choose where to travel, built with Next.js.
              </p>
              <ul className={styles.projectCardTech}>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>Vercel</li>
              </ul>
            </div>

            <div className={styles.projectCard}>
              <h4 className={styles.projectCardTitle}>Personal Portfolio v1</h4>
              <p className={styles.projectCardDescription}>
                First iteration of my personal website built with HTML, CSS, and JavaScript.
              </p>
              <ul className={styles.projectCardTech}>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
