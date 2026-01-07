// ========================================
// WAIT FOR PAGE TO LOAD - SINGLE EVENT LISTENER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Page loaded, initializing all features...');
    
    // ========================================
    // 1. MOBILE MENU
    // ========================================
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn && navMenu) {
        console.log('✅ Mobile menu elements found');
        
        // Create backdrop
        let backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        document.body.appendChild(backdrop);
        
        // Open menu function
        function openMenu() {
            console.log('📂 Opening menu...');
            navMenu.classList.add('menu-open');
            backdrop.classList.add('show');
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        }
        
        // Close menu function
        function closeMenu() {
            console.log('📁 Closing menu...');
            navMenu.classList.remove('menu-open');
            backdrop.classList.remove('show');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔘 Menu button clicked');
            
            if (navMenu.classList.contains('menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when backdrop clicked
        backdrop.addEventListener('click', function() {
            console.log('🌑 Backdrop clicked');
            closeMenu();
        });
        
        // Close menu when nav link clicked
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                console.log('🔗 Nav link clicked');
                closeMenu();
                
                // Smooth scroll to section
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    setTimeout(function() {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300); // Wait for menu to close
                }
            });
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('menu-open')) {
                closeMenu();
            }
        });
        
        console.log('✅ Mobile menu initialized');
    } else {
        console.error('❌ Mobile menu elements not found!');
    }
    
    // ========================================
    // 2. FAQ ACCORDION
    // ========================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
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
            }
        });
        console.log('✅ FAQ accordion initialized');
    }
    
    // ========================================
    // 3. SCROLL ANIMATIONS
    // ========================================
    
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
    
    const animatedElements = document.querySelectorAll('.service-card, .why-card, .testimonial-card, .case-study');
    
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
        console.log('✅ Scroll animations initialized');
    }
    
    // ========================================
    // 4. CONTACT FORM
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Show loading
            if (btnText && btnLoader) {
                btnText.style.display = 'none';
                btnLoader.style.display = 'inline-flex';
                submitBtn.disabled = true;
            }
            
            const formData = new FormData(this);
            
            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    document.getElementById('formSuccess').style.display = 'block';
                    document.getElementById('formError').style.display = 'none';
                    this.style.display = 'none';
                    
                    document.getElementById('formSuccess').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                console.error('Form error:', error);
                document.getElementById('formError').style.display = 'block';
                document.getElementById('formSuccess').style.display = 'none';
                
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
    // 5. LEAD MAGNET FORM
    // ========================================
    
    const leadMagnetForm = document.getElementById('leadMagnetForm');
    
    if (leadMagnetForm) {
        leadMagnetForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                document.getElementById('leadSuccess').style.display = 'block';
                this.style.display = 'none';
                
            } catch (error) {
                alert('Sorry, something went wrong. Please email us at hello@digizionmedia.in');
                submitBtn.innerHTML = '<i class="fas fa-download"></i> Download Free Checklist';
                submitBtn.disabled = false;
            }
        });
        console.log('✅ Lead magnet form initialized');
    }
    
    console.log('🎉 All features initialized successfully!');
});

// ========================================
// NAVBAR SHADOW ON SCROLL (Outside DOMContentLoaded)
// ========================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// ========================================
// SMOOTH SCROLL FOR NON-NAV LINKS
// ========================================

window.addEventListener('load', function() {
    // Only for links that are NOT in the nav menu (to avoid conflicts)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not(.nav-link)');
    
    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
