import styles from '../styles/Contact.module.css'

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
          <span className={styles.sectionNumber}>05.</span> What's Next?
        </h2>
        <h2 className={styles.contactTitle}>Get In Touch</h2>
        <p className={styles.contactDescription}>
          I'm currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <a href="mailto:thanakorn.sinon@gmail.com" className={styles.btn}>Say Hello</a>
      </div>
    </section>
  )
}
