// ========================================
// MOBILE MENU TOGGLE (UPDATED)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle menu when hamburger is clicked
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            navMenu.classList.toggle('active');
            
            // Change icon between hamburger and X
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close menu when clicking outside (on backdrop)
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnToggle = mobileMenuToggle.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ========================================

// Get all links that start with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to it smoothly
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATION (Elements fade in as you scroll)
// ========================================

// This makes elements appear as you scroll down
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

// Add animation to service cards and why cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .why-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// NAVBAR BACKGROUND CHANGE ON SCROLL
// ========================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});


// ========================================
// FAQ ACCORDION FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
});

// ========================================
// ENHANCED CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get button elements
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(this);
        
        try {
            // Submit to Formspree
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success! Show success message
                document.getElementById('formSuccess').style.display = 'block';
                document.getElementById('formError').style.display = 'none';
                this.style.display = 'none';
                
                // Scroll to success message
                document.getElementById('formSuccess').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Optional: Send to Google Analytics if you set it up
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'Contact',
                        'event_label': 'Contact Form Submitted'
                    });
                }
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            // Error - show error message
            console.error('Form error:', error);
            document.getElementById('formError').style.display = 'block';
            document.getElementById('formSuccess').style.display = 'none';
            
            // Reset button
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Scroll to error message
            document.getElementById('formError').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
}

// ========================================
// LEAD MAGNET FORM HANDLING
// ========================================

const leadMagnetForm = document.getElementById('leadMagnetForm');

if (leadMagnetForm) {
    leadMagnetForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Here you would send to your email service
            // For now, we'll simulate success
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            document.getElementById('leadSuccess').style.display = 'block';
            this.style.display = 'none';
            
            // Optional: Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'lead_magnet_download', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Checklist Download'
                });
            }
            
        } catch (error) {
            alert('Sorry, something went wrong. Please email us at hello@digizionmedia.in to get the checklist.');
            submitBtn.innerHTML = '<i class="fas fa-download"></i> Download Free Checklist';
            submitBtn.disabled = false;
        }
    });
}



