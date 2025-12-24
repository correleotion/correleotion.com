import styles from '../styles/About.module.css'

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNumber}>01.</span> About Me
        </h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>
              Hello! I'm Leo, and I enjoy creating things that live on the internet.
              My interest in web development started back in [year] when I decided to try
              building my first website — turns out hacking together a custom page taught me
              a lot about HTML & CSS!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at{' '}
              <a href="#" className={styles.inlineLink}>an advertising agency</a>,{' '}
              <a href="#" className={styles.inlineLink}>a start-up</a>, and{' '}
              <a href="#" className={styles.inlineLink}>a huge corporation</a>.
              My main focus these days is building accessible, inclusive products and digital
              experiences for a variety of clients.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className={styles.skillsList}>
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Node.js</li>
              <li>TypeScript</li>
              <li>Python</li>
              <li>Next.js</li>
            </ul>
          </div>
          <div className={styles.aboutImage}>
            <div className={styles.imageWrapper}>
              <img src="https://via.placeholder.com/300x300" alt="Thanakorn Sin-on" className={styles.profileImg} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
