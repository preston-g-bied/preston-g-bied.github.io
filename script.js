// Initialize all functions once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for all anchor links
    initSmoothScrolling();
    
    // Initialize animations for all elements
    initAnimations();
    
    // Initialize typed.js effect for hero text
    initTypeEffect();
    
    // Initialize project filtering functionality
    initProjectFilters();
    
    // Initialize scroll-to-top button
    initScrollToTop();
    
    // Initialize contact form validation
    initContactForm();
    
    // Add hover effects 
    initHoverEffects();

    enhancedSmoothScrolling();
    enhancedAnimations();
    highlightActiveSection();
});

// Smooth scrolling for links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initAnimations() {
    // Set up animation for elements coming into view
    const elementsToAnimate = [
        '.project-card',
        '.skill-category',
        '.timeline-item',
        '.contact-item'
    ];
    
    // Add animation class to elements
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
        });
    });
    
    // Set up intersection observer for animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all elements with the animation class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScroll.observe(element);
    });
    
    // Animate skill bars when they come into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueBar = entry.target.querySelector('.skill-value');
                if (valueBar) {
                    const dataValue = valueBar.getAttribute('data-value');
                    setTimeout(() => {
                        valueBar.style.width = dataValue + '%';
                    }, 100);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Typed.js effect for hero section
function initTypeEffect() {
    const typedElement = document.querySelector('.typed-text');
    
    if (typedElement) {
        try {
            new Typed('.typed-text', {
                strings: [
                    'intelligent solutions',
                    'actionable insights',
                    'predictive models',
                    'innovative apps' // Shortened from "applications" to avoid cutoff
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                autoInsertCss: true
            });
        } catch (error) {
            console.error("Error initializing Typed.js:", error);
        }
    }
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) {
        return; // Exit if elements don't exist
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter projects with a smoother animation
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else if (card.classList.contains(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll to top button functionality
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                    input.style.borderColor = '#dc3545';
                } else {
                    input.classList.remove('error');
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (valid) {
                // Here you would normally send the form data to your backend
                // For now, just show a success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
        
        // Clear error styling on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.remove('error');
                    input.style.borderColor = '#e0e0e0';
                }
            });
        });
    }
}

// Add hover effects for various elements
function initHoverEffects() {
    // Project card image hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Skill tag hover effect
    document.querySelectorAll('.skill-tags span').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px)';
            tag.style.boxShadow = '0 5px 15px rgba(74, 111, 255, 0.2)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
            tag.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Tech stack tag hover effect
    document.querySelectorAll('.tech-stack span').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.backgroundColor = '#4a6fff';
            tag.style.color = 'white';
            tag.style.transform = 'translateY(-2px)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.backgroundColor = '#f0f4ff';
            tag.style.color = '#4a6fff';
            tag.style.transform = 'translateY(0)';
        });
    });
}

// Enhanced scroll animation
function enhancedSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add offset for better positioning (adjust as needed)
                const offset = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced animations with intersection observer
function enhancedAnimations() {
    // Different animation styles for different elements
    const animationStyles = {
        '.project-card': { delay: 100, duration: 800, distance: '40px' },
        '.skill-category': { delay: 100, duration: 800, distance: '30px' },
        '.timeline-item': { delay: 150, duration: 800, distance: '30px' },
        '.contact-item': { delay: 100, duration: 600, distance: '20px' }
    };
    
    // Set up animation for elements coming into view with better timing
    Object.entries(animationStyles).forEach(([selector, style]) => {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.transitionDuration = `${style.duration}ms`;
            el.style.transitionDelay = `${index * style.delay}ms`;
            el.style.transform = `translateY(${style.distance})`;
        });
    });
    
    // Enhanced observer with better thresholds
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transform = 'translateY(0)';
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with the animation class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScroll.observe(element);
    });
}

// Function to highlight the active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.footer-nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });
}