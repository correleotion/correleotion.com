import styles from '../styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <p className={styles.heroGreeting}>Hi, my name is</p>
        <h1 className={styles.heroName}>Thanakorn Sin-on</h1>
        <h2 className={styles.heroTitle}>I build things for the web.</h2>
        <p className={styles.heroDescription}>
          I'm a passionate student with a burning desire to become a Data Scientist.
          Currently, I'm focused on learning machine learning, data analysis, and turning data into meaningful insights.
        </p>
        <div className={styles.heroCta}>
          <a href="#contact" className={styles.btn}>Get In Touch</a>
        </div>
      </div>
    </section>
  )
}
