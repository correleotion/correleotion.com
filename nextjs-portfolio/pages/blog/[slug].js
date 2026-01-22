import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { blogPosts } from '../../data/blogPosts'
import styles from '../../styles/BlogPost.module.css'

export default function BlogPost({ post }) {
  const router = useRouter()

  if (router.isFallback || !post) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{post.title} - Thanakorn Sin-on</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.date}>{post.date}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.readTime}>{post.readTime}</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.tags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </header>

          <div className={styles.content}>
            <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
          </div>

          <footer className={styles.footer}>
            <Link href="/blog" className={styles.backBtn}>
              ← Back to all articles
            </Link>
          </footer>
        </article>
      </main>
    </>
  )
}

function formatContent(content) {
  return content
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[huplo])/gm, '<p>')
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<[huplo])/g, '$1')
    .replace(/(<\/[huplo][^>]*>)<\/p>/g, '$1')
}

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
