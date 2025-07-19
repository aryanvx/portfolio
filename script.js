// Hey! This class handles switching between light and dark mode—gotta keep it comfy for your eyeballs.
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        // Check if user already picked a theme before, otherwise default to light.
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Set the theme right away based on saved preference
        this.setTheme(this.currentTheme);
        // When you click the button, toggle that theme up/down
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        // Dark mode means dark body bg, else light vibes
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Swap the little icon between sun and moon to match the mood
        const icon = this.themeToggle.querySelector('i');

        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            this.themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            this.themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }

        // Remember what user picked for next time they visit
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        // Flip it to the opposite vibe, light or dark, simple as that
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// This dude controls the hamburger menu—because mobile users should get love too.
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            // Click the burger to open/close menu
            this.hamburger.addEventListener('click', () => this.toggleMenu());
            // Clicking any nav link closes the menu—nice and neat
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            // If you click outside the menu or burger, it closes—cuz duh.
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        // Add or remove active class so menu slides in/out smoothly
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        // Close menu, remove active styling
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Smooth scrolling for when you click anchor links because once again—we left jumping around in 2005
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // For all anchor links starting with #
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault(); // No abrupt jumps
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Smoothly glide to that section
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Handles the contact form submission, making sure you get a friendly lil confirmation
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // Grab data from the form fields
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        // Pretend to send it off—real backend coming soon maybe? 🤞
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        // Clear the form so you can send another message if you want
        this.form.reset();
    }

    showMessage(message, type) {
        // If there’s already a message, ditch it so we don’t spam the page
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        // Make a new message div, style it, and pop it right after the form
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        this.form.insertAdjacentElement('afterend', messageDiv);
        // Message disappears after 5 seconds—don’t worry, you’ll see it first
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// This handles cool animations when stuff scrolls into view—because subtle is better than boring
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                this.observerOptions
            );
            // Watch these elements so they animate nicely when visible
            document.querySelectorAll('.project-card, .contact-method, .skill-category').forEach(el => {
                this.observer.observe(el);
            });
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class and then stop watching it—done and done
                entry.target.classList.add('animate-in');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// When the page loads, kick off all these little managers to keep things smooth
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new SmoothScroll();
    new NavbarScroll();
    new ContactForm();
    new ScrollAnimations();
});

// Just a placeholder if you want to do something when user switches tabs or hides page
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden now—you could pause stuff here if you want
    } else {
        // Page is visible again—resume stuff if needed
    }
});
