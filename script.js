// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Add animation for mobile menu
            if (!mobileMenu.classList.contains('hidden')) {
                gsap.from(mobileMenu.children, {
                    y: -20,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animations with improved timing
gsap.timeline({ delay: 0.3 })
    .from('.hero-greeting', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' })
    .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' }, '-=0.5')
    .from('.hero-subtitle', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.6')
    .from('.hero-description', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
    .from('.hero-buttons', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.4')
    .from('.hero-stats', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3')
    .from('.scroll-indicator', { duration: 0.5, opacity: 0, ease: 'power2.out' }, '-=0.2');

// Enhanced scroll-triggered animations for sections (excluding hero)
    gsap.utils.toArray('section:not(#inicio)').forEach((section, index) => {
        const elements = section.querySelectorAll('h2, h3, p, .card-professional, .skill-item, .project-card');
        
        if (elements.length > 0) {
            gsap.set(elements, { opacity: 1, y: 0 }); // Ensure elements are visible by default
            
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power2.out'
            });
        }
    });

    // Skill bar animations
    gsap.utils.toArray('.skill-bar').forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            width: percentage + '%',
            duration: 1.2,
            ease: 'power2.out'
        });
    });

    // Simple navbar background change
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });

    // Simple scroll indicator animation
    gsap.to('.scroll-indicator', {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });

    // Initialize ScrollTrigger refresh
    ScrollTrigger.refresh();
});

// Simple scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scroll-to-top');
    if (scrollButton) {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});