// ========================================
// DIGIZION MEDIA - PREMIUM DARK MODE
// Main JavaScript File
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Digizion Media website initialized');
    
    // Initialize all features
    initMobileMenu();
    initAnimatedCounters();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    
    console.log('✅ All features loaded successfully');
});

// ========================================
// 1. MOBILE MENU
// ========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuBtn || !navMenu) {
        console.warn('⚠️ Mobile menu elements not found');
        return;
    }
    
    // Create backdrop
    let backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
    
    // Open menu
    function openMenu() {
        navMenu.classList.add('menu-open');
        backdrop.classList.add('show');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    }
    
    // Close menu
    function closeMenu() {
        navMenu.classList.remove('menu-open');
        backdrop.classList.remove('show');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
    
    // Toggle on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (navMenu.classList.contains('menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close on backdrop click
    backdrop.addEventListener('click', closeMenu);
    
    // Close on nav link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('menu-open')) {
            closeMenu();
        }
    });
    
    console.log('✅ Mobile menu initialized');
}

// ========================================
// 2. ANIMATED COUNTERS (Hero Stats)
// ========================================

function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.warn('⚠️ No stat counters found');
        return;
    }
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = setInterval(function() {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(updateCounter);
            }
            
            // Format number based on value
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else if (target < 10) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    console.log('✅ Animated counters initialized');
}

// ========================================
// 3. SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('menu-open')) {
                    const backdrop = document.querySelector('.menu-backdrop');
                    navMenu.classList.remove('menu-open');
                    if (backdrop) backdrop.classList.remove('show');
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll with offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('✅ Smooth scroll initialized');
}

// ========================================
// 4. CONTACT FORM HANDLING
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('⚠️ Contact form not found');
        return;
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formSuccess = document.getElementById('formSuccess');
        const formError = document.getElementById('formError');
        
        // Show loading state
        if (btnText && btnLoader) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
            submitBtn.disabled = true;
        }
        
        // Get form data
        const formData = new FormData(this);
        
        try {
            // Submit to Formspree (make sure to update YOUR_FORM_ID in HTML)
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success!
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                if (formError) formError.style.display = 'none';
                this.style.display = 'none';
                
                // Track with analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form Submitted'
                    });
                }
                
                console.log('✅ Form submitted successfully');
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('❌ Form error:', error);
            
            if (formError) {
                formError.style.display = 'block';
                formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            if (formSuccess) formSuccess.style.display = 'none';
            
            // Reset button
            if (btnText && btnLoader) {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        }
    });
    
    console.log('✅ Contact form initialized');
}

// ========================================
// 5. SCROLL ANIMATIONS (Fade in elements)
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.industry-card, .service-card, .comparison-row, .contact-method'
    );
    
    if (animatedElements.length === 0) {
        console.warn('⚠️ No elements to animate');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
    
    console.log(`✅ Scroll animations initialized for ${animatedElements.length} elements`);
}

// ========================================
// 6. NAVBAR SCROLL EFFECT
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) {
        console.warn('⚠️ Navbar not found');
        return;
    }
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        }
        
        // Hide navbar on scroll down, show on scroll up (optional)
        // Uncomment below if you want this behavior
        /*
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScroll = currentScroll;
    });
    
    console.log('✅ Navbar scroll effect initialized');
}

// ========================================
// 7. UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// 8. ENHANCED FEATURES (Optional)
// ========================================

// Add active state to nav links based on scroll position
window.addEventListener('scroll', debounce(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}, 100));

// ========================================
// 9. INDUSTRY CARD HOVER EFFECTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle tilt effect on hover
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ========================================
// 10. PERFORMANCE MONITORING (Development)
// ========================================

// Log page load performance
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
        
        // You can send this to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'page_load',
                'value': pageLoadTime,
                'event_category': 'Performance'
            });
        }
    }
});

// ========================================
// 11. ERROR HANDLING
// ========================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('❌ Global error:', e.message);
    // You can send errors to a logging service here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Unhandled promise rejection:', e.reason);
});

// ========================================
// 12. ANALYTICS TRACKING (When you add Google Analytics)
// ========================================

// Track button clicks
document.addEventListener('click', function(e) {
    // Track CTA button clicks
    if (e.target.classList.contains('btn-primary') || 
        e.target.closest('.btn-primary')) {
        
        const buttonText = e.target.textContent || e.target.closest('.btn-primary').textContent;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'Button',
                'event_label': buttonText.trim()
            });
        }
        
        console.log('📊 CTA clicked:', buttonText.trim());
    }
    
    // Track industry card clicks
    if (e.target.classList.contains('industry-card') || 
        e.target.closest('.industry-card')) {
        
        const industryCard = e.target.classList.contains('industry-card') ? 
                             e.target : e.target.closest('.industry-card');
        const industryName = industryCard.querySelector('h3').textContent;
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'industry_click', {
                'event_category': 'Navigation',
                'event_label': industryName
            });
        }
        
        console.log('📊 Industry clicked:', industryName);
    }
});

// Track WhatsApp button clicks
document.addEventListener('click', function(e) {
    const whatsappLink = e.target.closest('.whatsapp-float') || 
                        e.target.closest('a[href*="wa.me"]');
    
    if (whatsappLink) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': 'WhatsApp Button'
            });
        }
        
        console.log('📊 WhatsApp button clicked');
    }
});

// ========================================
// 13. BROWSER COMPATIBILITY CHECKS
// ========================================

// Check for modern browser features
function checkBrowserSupport() {
    const features = {
        'IntersectionObserver': 'IntersectionObserver' in window,
        'Fetch API': 'fetch' in window,
        'CSS Grid': CSS.supports('display', 'grid'),
        'CSS Custom Properties': CSS.supports('--test', '0')
    };
    
    console.log('🌐 Browser support:', features);
    
    // Warn if critical features are missing
    Object.keys(features).forEach(feature => {
        if (!features[feature]) {
            console.warn(`⚠️ ${feature} not supported - some features may not work`);
        }
    });
}

checkBrowserSupport();

// ========================================
// 14. ACCESSIBILITY ENHANCEMENTS
// ========================================

// Add keyboard navigation for industry cards
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        
        if (focused.classList.contains('industry-card')) {
            e.preventDefault();
            focused.click();
        }
    }
});

// Add focus visible indicators
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
});

// ========================================
// 15. DEVELOPMENT HELPERS
// ========================================

// Console styling for development
const devMode = window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';

if (devMode) {
    console.log(
        '%c🚀 Digizion Media - Developer Mode',
        'background: linear-gradient(135deg, #6C63FF 0%, #00D9FF 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;'
    );
    
    console.log(
        '%cWebsite by Digizion Media | Premium Dark Mode Theme',
        'color: #6C63FF; font-size: 12px;'
    );
}

// Quick access to common elements (for debugging)
window.digizion = {
    navbar: document.querySelector('.navbar'),
    hero: document.querySelector('.hero'),
    contactForm: document.getElementById('contactForm'),
    version: '1.0.0',
    theme: 'dark-premium'
};

console.log('🎨 Digizion object available in console:', window.digizion);

// ========================================
// 16. LAZY LOADING (For future images)
// ========================================

// When you add images, this will lazy load them
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    console.log(`✅ Lazy loading initialized for ${images.length} images`);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// ========================================
// END OF MAIN JAVASCRIPT
// ========================================

console.log('✨ Digizion Media website fully loaded and interactive!');
