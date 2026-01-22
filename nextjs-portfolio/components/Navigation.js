import { useState } from 'react'
import styles from '../styles/Navigation.module.css'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <a href="#" className={styles.logo}>YourName</a>
        <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.active : ''}`}>
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#experience" className={styles.navLink}>Experience</a>
          <a href="#projects" className={styles.navLink}>Projects</a>
          <a href="#blog" className={styles.navLink}>Blog</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          <a href="resume.pdf" className={`${styles.navLink} ${styles.resumeBtn}`} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
