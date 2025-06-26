document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer (if element exists)
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Accordion functionality for proposal requirements
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        if (header && content) {
            header.addEventListener('click', () => {
                // Close other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherIcon = otherItem.querySelector('.toggle-icon i');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Update icon
                const icon = header.querySelector('.toggle-icon i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a, .hero a.btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    // Add visible class to CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item, .process-step, .accordion-item, .decision-card, .enrollment-step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: calc(var(--animation-order) * 0.1s);
        }
        
        section.visible .timeline-item,
        section.visible .process-step,
        section.visible .accordion-item,
        section.visible .decision-card,
        section.visible .enrollment-step {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Set animation order for elements
    const setAnimationOrder = function() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const processSteps = document.querySelectorAll('.process-step');
        const accordionItems = document.querySelectorAll('.accordion-item');
        const decisionCards = document.querySelectorAll('.decision-card');
        const enrollmentSteps = document.querySelectorAll('.enrollment-step');
        
        [timelineItems, processSteps, accordionItems, decisionCards, enrollmentSteps].forEach(items => {
            items.forEach((item, index) => {
                item.style.setProperty('--animation-order', index + 1);
            });
        });
    };
    
    setAnimationOrder();
    animateOnScroll(); // Initial check for elements in viewport
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile menu toggle functionality
    const createMobileMenu = function() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Only create mobile menu if it doesn't exist and window width is less than 768px
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-toggle')) {
            const mobileMenuToggle = document.createElement('div');
            mobileMenuToggle.className = 'mobile-menu-toggle';
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            header.querySelector('.container').appendChild(mobileMenuToggle);
            
            // Add mobile styles
            const mobileStyle = document.createElement('style');
            mobileStyle.textContent = `
                @media (max-width: 768px) {
                    nav {
                        display: none;
                        width: 100%;
                    }
                    
                    nav.active {
                        display: block;
                    }
                    
                    nav ul {
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    nav ul li {
                        margin: 10px 0;
                    }
                    
                    .mobile-menu-toggle {
                        display: block;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                }
            `;
            document.head.appendChild(mobileStyle);
            
            // Toggle menu on click
            mobileMenuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
                
                const icon = this.querySelector('i');
                if (nav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target) && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});