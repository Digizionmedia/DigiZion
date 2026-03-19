// ========================================
// DIGIZION MEDIA - ULTRA INTERACTIVE VERSION
// All Animation Effects Included
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Digizion Media - Ultra Interactive Mode');
    
    // Initialize all features
    initMobileMenu();
    initTypingAnimation();
    initScrollProgress();
    initCursorEffects();
    init3DCardTilt();
    initParticles();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    initNavbarScroll();
    initFloatingButtons();
    initIndustryCardFlip();
    initParallaxBackground();
    
    console.log('✅ All interactive features loaded!');
});

// ========================================
// 1. TYPING ANIMATION (Hero Headline)
// ========================================

function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const words = [
        'Transform Your Business',
        'Grow Your Revenue',
        'Dominate Your Market',
        'Attract More Customers'
    ];
    
    const staticPart = '<br>With <span class="gradient-text">Data-Driven</span> Digital Marketing';
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        heroTitle.innerHTML = currentWord.substring(0, charIndex) + 
                             '<span class="typing-text"></span>' + 
                             staticPart;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing after 500ms
    setTimeout(type, 500);
    
    console.log('✅ Typing animation initialized');
}

// ========================================
// 2. SCROLL PROGRESS BAR
// ========================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });
    
    console.log('✅ Scroll progress bar initialized');
}

// ========================================
// 3. CUSTOM CURSOR EFFECTS
// ========================================

function initCursorEffects() {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follow for outline
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Expand on clickable elements
    const clickables = document.querySelectorAll('a, button, .industry-card, .service-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursorOutline.style.transform = 'scale(1.5)';
            cursorOutline.style.borderColor = '#FF3366';
        });
        
        el.addEventListener('mouseleave', function() {
            cursorOutline.style.transform = 'scale(1)';
            cursorOutline.style.borderColor = '#00C9FF';
        });
    });
    
    console.log('✅ Custom cursor effects initialized');
}

// ========================================
// 4. 3D CARD TILT EFFECT
// ========================================

function init3DCardTilt() {
    const cards = document.querySelectorAll('[data-tilt], .difference-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    console.log('✅ 3D card tilt initialized');
}

// ========================================
// 5. FLOATING PARTICLES
// ========================================

function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const colors = ['#FF3366', '#00C9FF', '#FFD700'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = startX + 'px';
        particle.style.background = color;
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }
    
    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 500);
    }
    
    // Continuously create new particles
    setInterval(createParticle, 1000);
    
    console.log('✅ Floating particles initialized');
}

// ========================================
// 6. MOBILE MENU
// ========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuBtn || !navMenu) return;
    
    let backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.appendChild(backdrop);
    
    function openMenu() {
        navMenu.classList.add('menu-open');
        backdrop.classList.add('show');
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navMenu.classList.remove('menu-open');
        backdrop.classList.remove('show');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        document.body.style.overflow = '';
    }
    
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
    
    backdrop.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navMenu.classList.contains('menu-open')) closeMenu();
    });
    
    console.log('✅ Mobile menu initialized');
}

// ========================================
// 7. SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
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
// 8. CONTACT FORM
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
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
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                document.getElementById('formSuccess').style.display = 'block';
                document.getElementById('formError').style.display = 'none';
                this.style.display = 'none';
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
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
// 9. SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.industry-card, .service-card, .difference-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
    
    console.log('✅ Scroll animations initialized');
}

// ========================================
// 10. NAVBAR SCROLL EFFECT
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(255, 51, 102, 0.3)';
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
        }
    });
    
    console.log('✅ Navbar scroll effect initialized');
}

// ========================================
// 11. FLOATING ACTION BUTTONS
// ========================================

function initFloatingButtons() {
    const floatingActions = document.createElement('div');
    floatingActions.className = 'floating-actions';
    floatingActions.innerHTML = `
        <div class="floating-btn" title="Scroll to Top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <i class="fas fa-arrow-up"></i>
        </div>
        <div class="floating-btn" title="Call Us" onclick="window.location.href='tel:+919876543210'">
            <i class="fas fa-phone"></i>
        </div>
    `;
    document.body.appendChild(floatingActions);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            floatingActions.style.opacity = '1';
            floatingActions.style.pointerEvents = 'auto';
        } else {
            floatingActions.style.opacity = '0';
            floatingActions.style.pointerEvents = 'none';
        }
    });
    
    console.log('✅ Floating action buttons initialized');
}

// ========================================
// 12. INDUSTRY CARD FLIP
// ========================================

function initIndustryCardFlip() {
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        // Double-click to flip (mobile-friendly)
        let clickCount = 0;
        let clickTimer = null;
        
        card.addEventListener('click', function(e) {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(function() {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                card.classList.toggle('flipped');
            }
        });
    });
    
    console.log('✅ Industry card flip initialized');
}

// ========================================
// 13. PARALLAX BACKGROUND
// ========================================

function initParallaxBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const parallaxBg = document.createElement('div');
    parallaxBg.className = 'parallax-bg';
    hero.insertBefore(parallaxBg, hero.firstChild);
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
    
    console.log('✅ Parallax background initialized');
}

// ========================================
// 14. ANALYTICS TRACKING
// ========================================

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary') || e.target.closest('.btn-primary')) {
        const buttonText = e.target.textContent || e.target.closest('.btn-primary').textContent;
        console.log('📊 CTA clicked:', buttonText.trim());
    }
});

console.log('✨ Digizion Media - Ultra Interactive Mode Ready!');