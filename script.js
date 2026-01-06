// ========================================
// MOBILE MENU TOGGLE
// ========================================

// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the mobile menu button
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    // Get the navigation menu
    const navMenu = document.querySelector('.nav-menu');
    
    // When someone clicks the hamburger button
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            // Toggle the menu visibility
            navMenu.classList.toggle('active');
            
            // Change the icon between hamburger and X
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
});

// ========================================
// CONTACT FORM HANDLING
// ========================================

// Get the contact form
const contactForm = document.getElementById('contactForm');

// When someone submits the form
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Prevent the default form submission
        e.preventDefault();
        
        // Get all form values
        const formData = {
            name: document.getElementById('name').value,
            school: document.getElementById('school').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // For now, we'll just show an alert
        // Later, we'll connect this to an email service
        alert(`Thank you, ${formData.name}! We've received your message and will contact you within 24 hours at ${formData.phone}.`);
        
        // Reset the form
        contactForm.reset();
        
        // In the next phase, we'll add real form submission here
        // that sends the data to your email
    });
}

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