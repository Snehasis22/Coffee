// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1500);
});

// Navigation Bar Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Update active nav link
    updateActiveNavLink();
    window.addEventListener('hashchange', updateActiveNavLink);
});

// Update active navigation link based on current page
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentHash = window.location.hash || '#home';

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentHash) {
            link.classList.add('active');
        }
    });

    // Update nav selector position
    updateNavSelector();
}

// Update navigation selector position
function updateNavSelector() {
    const activeLink = document.querySelector('.nav-link.active');
    const selector = document.querySelector('.nav-selector');

    if (activeLink && selector) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.nav-menu').getBoundingClientRect();

        selector.style.width = `${linkRect.width}px`;
        selector.style.left = `${linkRect.left - navRect.left}px`;
    }
}

// Page Navigation
function showProduct(productId) {
    // Show page transition
    const transition = document.getElementById('page-transition');
    transition.classList.add('active');

    setTimeout(() => {
        const hero = document.getElementById('hero');
        const hazelnut = document.getElementById('hazelnut');
        const classic = document.getElementById('classic');

        hero.style.display = 'none';
        if (productId === 'hazelnut') {
            hazelnut.classList.add('active');
            classic.classList.remove('active');
            createParticles('hazelnut-particles');
            window.location.hash = '#hazelnut';
        } else {
            classic.classList.add('active');
            hazelnut.classList.remove('active');
            createParticles('classic-particles');
            window.location.hash = '#classic';
        }

        // Update navigation
        updateActiveNavLink();

        // Hide transition
        setTimeout(() => {
            transition.classList.remove('active');
        }, 500);

        window.scrollTo(0, 0);
    }, 500);
}

function showHero() {
    // Show page transition
    const transition = document.getElementById('page-transition');
    transition.classList.add('active');

    setTimeout(() => {
        document.getElementById('hero').style.display = 'flex';
        document.getElementById('hazelnut').classList.remove('active');
        document.getElementById('classic').classList.remove('active');
        window.location.hash = '#home';

        // Update navigation
        updateActiveNavLink();

        // Hide transition
        setTimeout(() => {
            transition.classList.remove('active');
        }, 500);
    }, 500);
}

// Particle Effect
function createParticles(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles('hazelnut-particles');
    createParticles('classic-particles');
});

// Add scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.product-info, .product-image, .features, .flavor-notes, .marketing-copy');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);
