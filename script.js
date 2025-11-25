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
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

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
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        // Pretend to send it off—real backend coming soon maybe? 🤞
        this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.form.reset();
    }

    showMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        this.form.insertAdjacentElement('afterend', messageDiv);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

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
            document.querySelectorAll('.project-card, .contact-method, .skill-category').forEach(el => {
                this.observer.observe(el);
            });
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new SmoothScroll();
    new NavbarScroll();
    new ContactForm();
    new ScrollAnimations();
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
    } else {
    }
});

class ElectricBorder {
  constructor(element) {
    this.element = element;
    this.filterId = `turbulent-displace-${Math.random().toString(36).substr(2, 9)}`;
    this.speed = parseFloat(element.dataset.speed) || 1;
    this.chaos = parseFloat(element.dataset.chaos) || 1;
    this.thickness = parseFloat(element.dataset.thickness) || 2;
    
    this.init();
  }

  init() {
    const content = this.element.innerHTML;
    this.element.innerHTML = '';
    
    const svg = this.createSVG();
    this.element.appendChild(svg);
    
    const layers = this.createLayers();
    this.element.appendChild(layers);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'eb-content';
    contentDiv.innerHTML = content;
    this.element.appendChild(contentDiv);
    
    this.element.classList.add('electric-border-wrapper');
    
    this.element.style.setProperty('--eb-border-width', `${this.thickness}px`);
    
    this.updateAnimation();
    
    const resizeObserver = new ResizeObserver(() => this.updateAnimation());
    resizeObserver.observe(this.element);
  }

  createSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('eb-svg');
    svg.setAttribute('aria-hidden', 'true');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = this.createFilter();
    defs.appendChild(filter);
    svg.appendChild(defs);
    
    this.svg = svg;
    return svg;
  }

  createFilter() {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', this.filterId);
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    filter.setAttribute('x', '-200%');
    filter.setAttribute('y', '-200%');
    filter.setAttribute('width', '500%');
    filter.setAttribute('height', '500%');

    // Turbulence 1
    const turb1 = this.createTurbulence('noise1', '1');
    const offset1 = this.createOffset('offsetNoise1', 'dy', '700; 0');
    
    // Turbulence 2
    const turb2 = this.createTurbulence('noise2', '1');
    const offset2 = this.createOffset('offsetNoise2', 'dy', '0; -700');
    
    // Turbulence 3
    const turb3 = this.createTurbulence('noise3', '2');
    const offset3 = this.createOffset('offsetNoise3', 'dx', '490; 0');
    
    // Turbulence 4
    const turb4 = this.createTurbulence('noise4', '2');
    const offset4 = this.createOffset('offsetNoise4', 'dx', '0; -490');

    // Composites
    const comp1 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    comp1.setAttribute('in', 'offsetNoise1');
    comp1.setAttribute('in2', 'offsetNoise2');
    comp1.setAttribute('result', 'part1');

    const comp2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
    comp2.setAttribute('in', 'offsetNoise3');
    comp2.setAttribute('in2', 'offsetNoise4');
    comp2.setAttribute('result', 'part2');

    const blend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');
    blend.setAttribute('in', 'part1');
    blend.setAttribute('in2', 'part2');
    blend.setAttribute('mode', 'color-dodge');
    blend.setAttribute('result', 'combinedNoise');

    const displace = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
    displace.setAttribute('in', 'SourceGraphic');
    displace.setAttribute('in2', 'combinedNoise');
    displace.setAttribute('scale', String(30 * this.chaos));
    displace.setAttribute('xChannelSelector', 'R');
    displace.setAttribute('yChannelSelector', 'B');
    this.displacementMap = displace;

    filter.appendChild(turb1);
    filter.appendChild(offset1);
    filter.appendChild(turb2);
    filter.appendChild(offset2);
    filter.appendChild(turb3);
    filter.appendChild(offset3);
    filter.appendChild(turb4);
    filter.appendChild(offset4);
    filter.appendChild(comp1);
    filter.appendChild(comp2);
    filter.appendChild(blend);
    filter.appendChild(displace);

    return filter;
  }

  createTurbulence(result, seed) {
    const turb = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
    turb.setAttribute('type', 'turbulence');
    turb.setAttribute('baseFrequency', '0.02');
    turb.setAttribute('numOctaves', '10');
    turb.setAttribute('result', result);
    turb.setAttribute('seed', seed);
    return turb;
  }

  createOffset(result, attr, values) {
    const offset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
    offset.setAttribute('result', result);
    
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('attributeName', attr);
    animate.setAttribute('values', values);
    animate.setAttribute('dur', `${6 / this.speed}s`);
    animate.setAttribute('repeatCount', 'indefinite');
    animate.setAttribute('calcMode', 'linear');
    
    offset.appendChild(animate);
    return offset;
  }

  createLayers() {
    const layers = document.createElement('div');
    layers.className = 'eb-layers';
    
    const stroke = document.createElement('div');
    stroke.className = 'eb-stroke';
    stroke.style.filter = `url(#${this.filterId})`;
    this.stroke = stroke;
    
    const glow1 = document.createElement('div');
    glow1.className = 'eb-glow-1';
    
    const glow2 = document.createElement('div');
    glow2.className = 'eb-glow-2';
    
    const bgGlow = document.createElement('div');
    bgGlow.className = 'eb-background-glow';
    
    layers.appendChild(stroke);
    layers.appendChild(glow1);
    layers.appendChild(glow2);
    layers.appendChild(bgGlow);
    
    return layers;
  }

  updateAnimation() {
    const width = Math.max(1, Math.round(this.element.clientWidth));
    const height = Math.max(1, Math.round(this.element.clientHeight));
    
    const animates = this.svg.querySelectorAll('animate');
    const dyAnims = Array.from(animates).filter(a => a.getAttribute('attributeName') === 'dy');
    const dxAnims = Array.from(animates).filter(a => a.getAttribute('attributeName') === 'dx');
    
    if (dyAnims[0]) dyAnims[0].setAttribute('values', `${height}; 0`);
    if (dyAnims[1]) dyAnims[1].setAttribute('values', `0; -${height}`);
    if (dxAnims[0]) dxAnims[0].setAttribute('values', `${width}; 0`);
    if (dxAnims[1]) dxAnims[1].setAttribute('values', `0; -${width}`);
    
    animates.forEach(a => {
      try {
        a.beginElement();
      } catch (e) {

      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.dataset.speed = '1';
    card.dataset.chaos = '0.5';
    card.dataset.thickness = '2';
    new ElectricBorder(card);
  });
  
  document.querySelectorAll('.blog-card').forEach(card => {
    card.dataset.speed = '1';
    card.dataset.chaos = '0.5';
    card.dataset.thickness = '2';
    new ElectricBorder(card);
  });
});