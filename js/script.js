// Theme toggle functionality
const themeSwitch = document.getElementById('theme-switch');
const htmlRoot = document.documentElement;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    htmlRoot.classList.add('dark-theme');
    themeSwitch.checked = true;
} else if (savedTheme === 'light') {
    htmlRoot.classList.remove('dark-theme');
    themeSwitch.checked = false;
} else {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlRoot.classList.add('dark-theme');
        themeSwitch.checked = true;
    }
}

// Theme toggle event handler
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        htmlRoot.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlRoot.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a navigation link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For now, we'll just log it to the console and show an alert
        console.log({
            name,
            email,
            subject,
            message
        });
        
        // Show success message
        alert('Thanks for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Clients carousel responsive adjustment
function adjustClientsTrack() {
    const clientsTrack = document.querySelector('.clients-track');
    if (clientsTrack) {
        // Get the number of client items
        const clientItems = document.querySelectorAll('.client-item');
        const uniqueClientCount = clientItems.length / 2; // Divide by 2 because we duplicated them
        
        // Get the width of a client item including padding
        const clientItemWidth = 180; // This should match the CSS
        
        // Update the track width based on the number of clients
        clientsTrack.style.width = `${clientItemWidth * clientItems.length}px`;
        
        // Update the animation keyframes endpoint
        const styleSheet = document.styleSheets[0];
        for (let i = 0; i < styleSheet.cssRules.length; i++) {
            const rule = styleSheet.cssRules[i];
            if (rule.name === 'scroll') {
                // Found the animation keyframes
                for (let j = 0; j < rule.cssRules.length; j++) {
                    const keyframe = rule.cssRules[j];
                    if (keyframe.keyText === '100%') {
                        // Found the 100% keyframe
                        keyframe.style.transform = `translateX(calc(-${clientItemWidth}px * ${uniqueClientCount}))`;
                        break;
                    }
                }
                break;
            }
        }
    }
}

// Adjust on page load and window resize
window.addEventListener('load', adjustClientsTrack);
window.addEventListener('resize', adjustClientsTrack);

// Animation for skills section
const skillItems = document.querySelectorAll('.skill-item');

if (skillItems.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    skillItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Animation for project cards
const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Scroll to top button functionality
window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// Typed.js effect for hero section (if available)
if (typeof Typed !== 'undefined') {
    const typed = new Typed('#typed-text', {
        strings: ['Software Developer', 'Web Developer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}
