/* ========================================
   DIGIZION MEDIA - MARKETING DETECTIVES
   Main JavaScript File
   ======================================== */

// ========================================
// MOBILE MENU TOGGLE
// ========================================

/* ========================================
   UPDATED MOBILE MENU & DROPDOWN
   Add to your script.js (replace mobile menu section)
   ======================================== */

// ========================================
// MOBILE MENU TOGGLE - FIXED VERSION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');
    const body = document.body;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            
            // Toggle icon
            if (menuIcon) {
                if (navMenu.classList.contains('active')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = 'auto';
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = 'auto';
                if (menuIcon) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            });
        });
    }

    // ========================================
    // DROPDOWN MENU - MOBILE
    // ========================================
    
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close dropdowns when window resizes
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});

// ========================================
// STICKY NAVIGATION
// ========================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});


// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);


// ========================================
// TYPING ANIMATION FOR MYSTERY QUESTIONS
// ========================================

const mysteryQuestions = document.querySelectorAll('.mystery-q');

if (mysteryQuestions.length > 0) {
    let currentQuestionIndex = 0;
    
    function typeQuestion(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        element.style.opacity = '1';
        
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                
                // Wait 2 seconds then fade out and show next question
                setTimeout(() => {
                    element.style.opacity = '0';
                    setTimeout(() => {
                        currentQuestionIndex = (currentQuestionIndex + 1) % mysteryQuestions.length;
                        typeQuestion(
                            mysteryQuestions[currentQuestionIndex],
                            mysteryQuestions[currentQuestionIndex].getAttribute('data-text') || mysteryQuestions[currentQuestionIndex].textContent
                        );
                    }, 500);
                }, 2000);
            }
        }, speed);
    }
    
    // Store original text and hide all questions except first
    mysteryQuestions.forEach((q, index) => {
        q.setAttribute('data-text', q.textContent);
        if (index !== 0) {
            q.style.opacity = '0';
        }
    });
    
    // Start typing animation
    setTimeout(() => {
        typeQuestion(mysteryQuestions[0], mysteryQuestions[0].textContent);
    }, 1000);
}


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll('.reveal-on-scroll');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on page load


// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when visible
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCountersOnScroll() {
    if (countersAnimated) return;
    
    statNumbers.forEach(stat => {
        const elementTop = stat.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            countersAnimated = true;
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        }
    });
}

window.addEventListener('scroll', animateCountersOnScroll);
animateCountersOnScroll();


// ========================================
// FAQ ACCORDION
// ========================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = null;
                }
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    }
});


// ========================================
// FORM SUBMISSION HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Submit to FormSubmit.co
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Send to Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Mystery Analysis Request'
                    });
                }
                
                // Reset form
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Show error message
            contactForm.style.display = 'none';
            formError.style.display = 'block';
            
            // Scroll to error message
            formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Reset button state
            btnText.style.display = 'flex';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}


// ========================================
// PRICING TOGGLE (Monthly/Quarterly)
// ========================================

const pricingToggles = document.querySelectorAll('.pricing-toggle');

pricingToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const isMonthly = toggle.classList.contains('monthly');
        
        // Update active state
        document.querySelectorAll('.pricing-toggle').forEach(t => t.classList.remove('active'));
        toggle.classList.add('active');
        
        // Update prices
        document.querySelectorAll('.price-value').forEach(price => {
            const monthlyPrice = price.getAttribute('data-monthly');
            const quarterlyPrice = price.getAttribute('data-quarterly');
            
            if (isMonthly) {
                price.textContent = monthlyPrice;
                price.parentElement.querySelector('.price-period').textContent = '/month';
            } else {
                price.textContent = quarterlyPrice;
                price.parentElement.querySelector('.price-period').textContent = '/quarter';
            }
        });
    });
});


// ========================================
// CASE FILE MODALS
// ========================================

const caseCards = document.querySelectorAll('.case-card');
const modals = document.querySelectorAll('.case-modal');
const modalCloses = document.querySelectorAll('.modal-close');

caseCards.forEach(card => {
    card.addEventListener('click', () => {
        const caseId = card.getAttribute('data-case');
        const modal = document.querySelector(`[data-modal="${caseId}"]`);
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    });
});

// Close modal on background click
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});


// ========================================
// FLOATING WHATSAPP BUTTON
// ========================================

const whatsappBtn = document.querySelector('.whatsapp-float');

if (whatsappBtn) {
    // Show after 3 seconds
    setTimeout(() => {
        whatsappBtn.classList.add('show');
    }, 3000);
    
    // Pulse animation every 10 seconds
    setInterval(() => {
        whatsappBtn.classList.add('pulse');
        setTimeout(() => {
            whatsappBtn.classList.remove('pulse');
        }, 1000);
    }, 10000);
}


// ========================================
// LAZY LOADING FOR IMAGES
// ========================================

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));


// ========================================
// CLUE FLOATING ANIMATION
// ========================================

const clues = document.querySelectorAll('.clue');

clues.forEach((clue, index) => {
    // Random starting position
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    clue.style.left = randomX + '%';
    clue.style.top = randomY + '%';
    
    // Random animation delay
    clue.style.animationDelay = (index * 0.5) + 's';
});


// ========================================
// TESTIMONIAL SLIDER (if testimonials exist)
// ========================================

const testimonialSlider = document.querySelector('.testimonials-slider');

if (testimonialSlider) {
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Show first slide
    showSlide(0);
    
    // Add navigation buttons if they exist
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
}


// ========================================
// PERFORMANCE: Debounce scroll events
// ========================================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(highlightNavLink, 10));
window.addEventListener('scroll', debounce(revealOnScroll, 10));


// ========================================
// CONSOLE MESSAGE (Easter Egg)
// ========================================

console.log('%c🔍 DIGIZION MEDIA - Marketing Detectives', 'font-size: 20px; font-weight: bold; color: #6366F1;');
console.log('%cLooking for clues in the code? We like that! 🕵️‍♂️', 'font-size: 14px; color: #EC4899;');
console.log('%cInterested in working with us? Visit: https://www.digizionmedia.in', 'font-size: 12px; color: #10B981;');


// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .mystery-questions, .hero-subtitle, .hero-description, .hero-cta');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 200);
});


// ========================================
// COOKIE CONSENT (Optional)
// ========================================

const cookieConsent = document.querySelector('.cookie-consent');
const cookieAccept = document.querySelector('.cookie-accept');

if (cookieConsent && cookieAccept) {
    // Check if user already accepted
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.classList.remove('show');
    });
}


// ========================================
// EMAIL PROTECTION
// ========================================

// Decode email addresses on page load
document.addEventListener('DOMContentLoaded', () => {
    const encodedEmails = document.querySelectorAll('[data-email]');
    encodedEmails.forEach(el => {
        const email = atob(el.getAttribute('data-email'));
        el.href = `mailto:${email}`;
        el.textContent = email;
    });
});


// ========================================
// ANALYTICS TRACKING
// ========================================

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'event_category': 'CTA',
                'event_label': btn.textContent.trim()
            });
        }
    });
});

// Track service card clicks
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        if (typeof gtag !== 'undefined') {
            const serviceName = card.querySelector('h3').textContent;
            gtag('event', 'service_view', {
                'event_category': 'Services',
                'event_label': serviceName
            });
        }
    });
});


// ========================================
// UTILITY FUNCTIONS
// ========================================

// Detect if user is on mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Get scroll percentage
function getScrollPercentage() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return (scrollTop / documentHeight) * 100;
}

// Animate element on scroll into view
function animateOnScroll(element, animationClass) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(element);
}

// Export for use in other scripts if needed
window.DigizionUtils = {
    isMobile,
    getScrollPercentage,
    animateOnScroll,
    debounce
};