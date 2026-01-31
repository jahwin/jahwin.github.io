// ===== MAIN SCRIPT =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ANIMATED COUNTER FOR STATS =====
    function animateCounter(element, target, duration = 2000, showPlus = false) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (showPlus ? '+' : '');
        }, 16);
    }

    // Trigger counters when they come into view
    const statNumbers = document.querySelectorAll('.stat-number, .stat-big, .stat-big-number');
    let countersStarted = false;

    const observerOptions = {
        threshold: 0.3
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (target) {
                        // Check if element should show '+' sign
                        const showPlus = stat.classList.contains('stat-number') || stat.classList.contains('stat-big');
                        animateCounter(stat, target, 2000, showPlus);
                    }
                });
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats, .hero-stats-modern');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // ===== SCROLL ANIMATIONS =====
    const scrollElements = document.querySelectorAll('.about-content, .skills-category, .timeline-item, .contact-content');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scroll-animate', 'active');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 80)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check for elements already in view
    handleScrollAnimation();

    // ===== PIE CHART ANIMATION =====
    const pieChartSegments = document.querySelectorAll('.chart-segment-1, .chart-segment-2, .chart-segment-3');
    let chartAnimated = false;

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartAnimated) {
                chartAnimated = true;
                pieChartSegments.forEach(segment => {
                    segment.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
                });
            }
        });
    }, observerOptions);

    const statPieChart = document.querySelector('.stat-pie-chart');
    if (statPieChart) {
        chartObserver.observe(statPieChart);
    }

    // ===== SKILL BARS ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
            }
        });
    }, observerOptions);

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // ===== STAT CARD PROFILE NAVIGATION =====
    const statArrowButtons = document.querySelectorAll('.stat-arrow-btn');
    const statNavDots = document.querySelectorAll('.dot-btn');

    statArrowButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Add pulse effect
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    statNavDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            statNavDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Contact form removed - using direct contact methods instead

    // ===== GRADIENT ORB MOVEMENT =====
    const orbs = document.querySelectorAll('.gradient-orb');

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.02;
            const x = (window.innerWidth / 2 - mouseX) * speed;
            const y = (window.innerHeight / 2 - mouseY) * speed;

            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // ===== SMOOTH REVEAL ON PAGE LOAD =====
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    // ===== PARALLAX EFFECT FOR HERO IMAGE =====
    const heroImage = document.querySelector('.profile-image');

    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }

    // ===== TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement) =====
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a delay
        setTimeout(() => {
            typeWriter();
        }, 1000);
    }

    // ===== INTERSECTION OBSERVER FOR TIMELINE ITEMS =====
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });

    // ===== SOCIAL LINKS ANIMATION =====
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });

    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== THEME DETECTION =====
    // Detect user's preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
        console.log('Dark mode detected - you can add dark theme classes here if needed');
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(function () {
        // Scroll-dependent functions here
    }));

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Keyboard navigation support (reserved for future use)

    // ===== CONSOLE MESSAGE =====
    console.log('%c👋 Hello! Thanks for checking out my portfolio!', 'font-size: 16px; color: #6366f1; font-weight: bold;');
    console.log('%c🚀 Built with vanilla HTML, CSS, and JavaScript', 'font-size: 14px; color: #64748b;');
    console.log('%c📧 Contact me at: ajahwin@gmail.com', 'font-size: 14px; color: #64748b;');

});

// ===== LOADING PERFORMANCE =====
// Preload critical resources
window.addEventListener('load', function () {
    // Mark page as fully loaded
    document.body.classList.add('loaded');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
    console.error('An error occurred:', e.error);
});

// ===== SERVICE WORKER (Optional - for PWA features) =====
if ('serviceWorker' in navigator) {
    // Uncomment if you want to add PWA functionality
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}
