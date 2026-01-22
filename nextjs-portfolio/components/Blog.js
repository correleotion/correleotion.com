import styles from '../styles/Blog.module.css'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-data-science',
    title: 'Getting Started with Data Science',
    excerpt: 'A beginner-friendly guide to starting your journey in data science, covering essential tools, languages, and concepts you need to know.',
    date: 'January 15, 2024',
    readTime: '5 min read',
    tags: ['Data Science', 'Python', 'Beginner']
  },
  {
    id: 2,
    slug: 'machine-learning-fundamentals',
    title: 'Machine Learning Fundamentals',
    excerpt: 'Understanding the core concepts of machine learning, from supervised learning to neural networks, explained in simple terms.',
    date: 'January 10, 2024',
    readTime: '8 min read',
    tags: ['Machine Learning', 'AI', 'Tutorial']
  },
  {
    id: 3,
    slug: 'building-portfolio-with-nextjs',
    title: 'Building a Portfolio with Next.js',
    excerpt: 'Learn how to create a modern, fast, and SEO-friendly portfolio website using Next.js and React.',
    date: 'January 5, 2024',
    readTime: '6 min read',
    tags: ['Next.js', 'React', 'Web Dev']
  }
]

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
