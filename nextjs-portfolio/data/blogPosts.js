export const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-data-science',
    title: 'Getting Started with Data Science',
    excerpt: 'A beginner-friendly guide to starting your journey in data science, covering essential tools, languages, and concepts you need to know.',
    content: `
# Getting Started with Data Science

Data science is one of the most exciting fields in technology today. If you're looking to break into this field, here's what you need to know.

## What is Data Science?

Data science combines statistics, programming, and domain expertise to extract meaningful insights from data. It's used everywhere from Netflix recommendations to medical diagnoses.

## Essential Skills

### 1. Programming
Python is the most popular language for data science. It has excellent libraries like:
- **NumPy** - for numerical computations
- **Pandas** - for data manipulation
- **Matplotlib/Seaborn** - for visualization
- **Scikit-learn** - for machine learning

### 2. Statistics
Understanding statistical concepts is crucial:
- Probability distributions
- Hypothesis testing
- Regression analysis
- Correlation vs. causation

### 3. Data Visualization
Being able to communicate findings through charts and graphs is essential. Learn tools like:
- Matplotlib
- Seaborn
- Plotly
- Tableau

## Getting Started

1. **Learn Python basics** - Start with variables, loops, and functions
2. **Take online courses** - Platforms like Coursera, edX, and DataCamp offer great courses
3. **Practice with real datasets** - Kaggle has thousands of datasets to explore
4. **Build projects** - Apply what you learn to real-world problems

## Conclusion

Data science is a journey, not a destination. Start small, be consistent, and keep learning!
    `,
    date: 'January 15, 2024',
    readTime: '5 min read',
    tags: ['Data Science', 'Python', 'Beginner']
  },
  {
    id: 2,
    slug: 'machine-learning-fundamentals',
    title: 'Machine Learning Fundamentals',
    excerpt: 'Understanding the core concepts of machine learning, from supervised learning to neural networks, explained in simple terms.',
    content: `
# Machine Learning Fundamentals

Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed.

## Types of Machine Learning

### 1. Supervised Learning
The algorithm learns from labeled training data. Examples include:
- **Classification** - Predicting categories (spam vs. not spam)
- **Regression** - Predicting continuous values (house prices)

### 2. Unsupervised Learning
The algorithm finds patterns in unlabeled data:
- **Clustering** - Grouping similar items together
- **Dimensionality Reduction** - Simplifying data while preserving important information

### 3. Reinforcement Learning
The algorithm learns by interacting with an environment and receiving rewards or penalties.

## Key Concepts

### Training and Testing
- **Training set** - Data used to train the model
- **Test set** - Data used to evaluate the model
- **Validation set** - Data used to tune hyperparameters

### Overfitting vs. Underfitting
- **Overfitting** - Model performs well on training data but poorly on new data
- **Underfitting** - Model is too simple to capture patterns in the data

### Common Algorithms
- Linear Regression
- Decision Trees
- Random Forests
- Support Vector Machines
- Neural Networks

## Getting Started with ML

1. Understand the math basics (linear algebra, calculus, probability)
2. Learn Python and its ML libraries (scikit-learn, TensorFlow, PyTorch)
3. Start with simple algorithms before moving to deep learning
4. Practice on Kaggle competitions

Machine learning is transforming every industry. Start your journey today!
    `,
    date: 'January 10, 2024',
    readTime: '8 min read',
    tags: ['Machine Learning', 'AI', 'Tutorial']
  },
  {
    id: 3,
    slug: 'building-portfolio-with-nextjs',
    title: 'Building a Portfolio with Next.js',
    excerpt: 'Learn how to create a modern, fast, and SEO-friendly portfolio website using Next.js and React.',
    content: `
# Building a Portfolio with Next.js

A portfolio website is essential for showcasing your work and landing new opportunities. Here's how to build one with Next.js.

## Why Next.js?

Next.js offers several advantages for portfolio websites:
- **Server-Side Rendering (SSR)** - Better SEO
- **Static Site Generation (SSG)** - Lightning-fast performance
- **File-based routing** - Easy to organize pages
- **Built-in optimizations** - Images, fonts, and more

## Project Setup

\`\`\`bash
npx create-next-app@latest my-portfolio
cd my-portfolio
npm run dev
\`\`\`

## Essential Sections

### 1. Hero Section
Your hero section should include:
- Your name
- A brief tagline
- Call-to-action button

### 2. About Section
Tell visitors about yourself:
- Your background
- Skills and technologies
- What makes you unique

### 3. Projects Section
Showcase your best work:
- Project descriptions
- Technologies used
- Links to demos and code

### 4. Contact Section
Make it easy to reach you:
- Contact form or email link
- Social media links

## Styling Options

- **CSS Modules** - Scoped styles without conflicts
- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - CSS-in-JS solution

## Deployment

Deploy your portfolio for free on:
- **Vercel** - Best for Next.js projects
- **Netlify** - Great alternative
- **GitHub Pages** - For static exports

## Tips for a Great Portfolio

1. Keep it simple and focused
2. Make it mobile-responsive
3. Optimize for performance
4. Keep projects updated
5. Add a personal touch

Your portfolio is your digital business card. Make it count!
    `,
    date: 'January 5, 2024',
    readTime: '6 min read',
    tags: ['Next.js', 'React', 'Web Dev']
  }
]
