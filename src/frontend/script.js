// ===========================
// Mobile Menu Toggle
// ===========================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ===========================
// Smooth Scrolling
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if href is just '#'
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const targetElement = document.querySelector(href);

        if (targetElement) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Experience Tabs
// ===========================

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===========================
// Scroll-based Navigation Background
// ===========================

const nav = document.querySelector('.nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 0) {
        nav.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
    } else {
        nav.style.boxShadow = 'none';
    }

    // Optional: Hide nav on scroll down, show on scroll up
    // Uncomment if you want this behavior
    /*
    if (scrollTop > lastScrollTop && scrollTop > nav.offsetHeight) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    */

    lastScrollTop = scrollTop;
});

// ===========================
// Intersection Observer for Fade-in Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// ===========================
// Active Navigation Link on Scroll
// ===========================

const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinkItems);

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = nav.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        if (href && href.includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// ===========================
// Preloader (Optional)
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Dynamic Year for Copyright
// ===========================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text');
if (footerText && !footerText.textContent.includes(currentYear)) {
    footerText.textContent = `Built by Your Name © ${currentYear}`;
}

// ===========================
// Keyboard Navigation Accessibility
// ===========================

// Add keyboard support for tab navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// ===========================
// Project Card Click Handler
// ===========================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Only trigger if not clicking on a link
        if (!e.target.closest('a')) {
            const link = card.querySelector('.project-card-title a, .project-card-links a');
            if (link) {
                window.open(link.href, '_blank');
            }
        }
    });
});

// ===========================
// Console Easter Egg
// ===========================

console.log('%c Built with ❤️ ', 'background: #64ffda; color: #0a192f; font-size: 16px; padding: 10px;');
console.log('%c Interested in the code? Check out the GitHub repo! ', 'font-size: 12px; color: #64ffda;');
