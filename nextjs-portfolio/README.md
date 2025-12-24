# Portfolio Website - Next.js

Personal portfolio website of Thanakorn Sin-on, built with Next.js and React.

## Tech Stack

- **Next.js** - React framework for production
- **React** - UI library
- **CSS Modules** - Scoped CSS styling
- **JavaScript** - Programming language

## Features

- Responsive design (mobile & desktop)
- Smooth scrolling navigation
- Interactive tabs for experience section
- Mobile menu toggle
- Modern animations
- SEO-friendly with Next.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
nextjs-portfolio/
├── components/          # React components
│   ├── Navigation.js
│   ├── Hero.js
│   ├── About.js
│   ├── Experience.js
│   ├── Projects.js
│   ├── Contact.js
│   └── Footer.js
├── pages/              # Next.js pages
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── styles/             # CSS files
│   ├── globals.css
│   └── *.module.css
└── public/             # Static assets
```

## Deployment

This project can be easily deployed on:

- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any hosting platform that supports Node.js

## License

ISC
