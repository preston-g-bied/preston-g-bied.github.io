// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Animation for elements coming into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Animation for skill bars
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueBar = entry.target.querySelector('.skill-value');
                if (valueBar) {
                    const dataValue = valueBar.getAttribute('data-value');
                    valueBar.style.width = dataValue + '%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Typed.js effect for hero section
const initTypeEffect = () => {
    if (document.querySelector('.typed-text')) {
        try {
            const typed = new Typed('.typed-text', {
                strings: [
                    'intelligent solutions',
                    'actionable insights',
                    'predictive models',
                    'innovative applications'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                onStringTyped: function() {
                    // Force height recalculation to prevent layout issues
                    const heroDesc = document.querySelector('.hero-description');
                    if (heroDesc) {
                        heroDesc.style.minHeight = '30px';
                    }
                }
            });
        } catch (error) {
            console.error("Error initializing Typed.js:", error);
        }
    }
};

// Project filtering functionality
const initProjectFilters = () => {
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
};

// Scroll to top button functionality
const initScrollToTop = () => {
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
};

// Contact form handling
const initContactForm = () => {
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
                } else {
                    input.classList.remove('error');
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
    }
};

// Sticky navigation on scroll
const initStickyNav = () => {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (nav && hero) {
        // Store original nav position for reference
        const navOriginalPosition = nav.offsetTop;
        
        window.addEventListener('scroll', () => {
            const heroBottom = hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
            
            if (window.scrollY > heroBottom) {
                // Make nav sticky only when scrolled past hero
                if (!nav.classList.contains('sticky')) {
                    nav.classList.add('sticky');
                    document.body.style.paddingTop = nav.offsetHeight + 'px';
                }
            } else {
                // Return nav to original position in hero
                nav.classList.remove('sticky');
                document.body.style.paddingTop = '0';
            }
            
            // Ensure hero content stays visible when scrolling back up
            if (window.scrollY < hero.offsetHeight) {
                heroContent.style.opacity = '1';
                heroContent.style.visibility = 'visible';
            }
        });
    }
};

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const nav = document.querySelector('nav');
        
        if (targetElement) {
            const navHeight = nav.classList.contains('sticky') ? nav.offsetHeight : 0;
            
            window.scrollTo({
                top: targetElement.offsetTop - navHeight, 
                behavior: 'smooth'
            });
        }
    });
});

// Error handling wrapper
const safeExecute = (fn, name) => {
    try {
        fn();
    } catch (error) {
        console.error(`Error in ${name}:`, error);
    }
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Add 'animate-on-scroll' class to elements you want to animate
        const elementsToAnimate = [
            '.project-card',
            '.skill-category',
            '.timeline-item',
            '.contact-item'
        ];
        
        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-on-scroll');
            });
        });
        
        // Initialize animations and interactive elements with error handling
        safeExecute(animateOnScroll, 'animateOnScroll');
        safeExecute(animateSkillBars, 'animateSkillBars');
        safeExecute(initTypeEffect, 'initTypeEffect');
        safeExecute(initProjectFilters, 'initProjectFilters');
        safeExecute(initScrollToTop, 'initScrollToTop');
        safeExecute(initContactForm, 'initContactForm');
        safeExecute(initStickyNav, 'initStickyNav');
        
        // Handle project card hover animations more smoothly
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const image = card.querySelector('.project-image img');
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const image = card.querySelector('.project-image img');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
        
        // Handle skill tag hover effect
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
    } catch (error) {
        console.error("Error in initialization:", error);
    }
});