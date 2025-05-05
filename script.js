document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and X
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
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the current item
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Add animation class to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Testimonial slider functionality
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonials.length;
    
    // Only initialize slider if we have more than 3 testimonials
    if (totalSlides > 3 && window.innerWidth < 992) {
        // Hide all slides except the first one
        testimonials.forEach((slide, index) => {
            if (index > 0) {
                slide.style.display = 'none';
            }
        });
        
        // Create navigation dots
        const sliderNav = document.createElement('div');
        sliderNav.className = 'slider-nav';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.dataset.slide = i;
            sliderNav.appendChild(dot);
        }
        
        document.querySelector('.testimonials-slider').after(sliderNav);
        
        // Add click event to dots
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', function() {
                const slide = parseInt(this.dataset.slide);
                showSlide(slide);
            });
        });
        
        // Auto advance slides every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 5000);
        
        function showSlide(slideIndex) {
            testimonials.forEach((slide, index) => {
                slide.style.display = index === slideIndex ? 'block' : 'none';
            });
            
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.className = index === slideIndex ? 'dot active' : 'dot';
            });
            
            currentSlide = slideIndex;
        }
    }
    
    // Add CSS styles for mobile nav and slider nav
    const style = document.createElement('style');
    style.textContent = `
        @media screen and (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            
            .nav-links.active li {
                margin: 10px 0;
            }
        }
        
        .slider-nav {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #ccc;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .dot.active {
            background-color: var(--primary-color);
        }
        
        .animated {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});