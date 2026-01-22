import Head from 'next/head'
import Link from 'next/link'
import { blogPosts } from '../../data/blogPosts'
import styles from '../../styles/BlogPage.module.css'

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog - Thanakorn Sin-on</title>
        <meta name="description" content="Articles about data science, machine learning, and web development" />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>← Back to Home</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Blog</h1>
            <p className={styles.subtitle}>Thoughts on data science, machine learning, and web development</p>
          </header>

          <div className={styles.blogGrid}>
            {blogPosts.map((post) => (
              <article key={post.id} className={styles.blogCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.date}>{post.date}</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                </div>
                <h2 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardTags}>
                  {post.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
