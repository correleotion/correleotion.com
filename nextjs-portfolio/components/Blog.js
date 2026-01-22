import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import { blogPosts } from '../data/blogPosts'

export default function Blog() {
  return (
    <section className={styles.section} id="blog">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionNumber}>04.</span> Latest Articles
        </h2>
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.blogCard}>
              <div className={styles.cardHeader}>
                <span className={styles.date}>{post.date}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
              <h3 className={styles.cardTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
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
        <div className={styles.viewAllContainer}>
          <Link href="/blog" className={styles.viewAllBtn}>
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
