import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initNavigation();
    initScrollSpy();
});

// Create starry background
function initStars() {
    const container = document.getElementById('stars-container');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random opacity and animation delay
        const opacity = Math.random() * 0.8 + 0.2;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;

        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;

        container.appendChild(star);
    }
}

// Navigation logic (Smooth Scroll)
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Scroll to section smoothly, adjusting for fixed header
                const headerOffset = 80; // Height of the fixed navbar
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Spy to highlight active tabs
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBtns = document.querySelectorAll('.nav-link-btn');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset to trigger earlier
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Update Top Navigation
        navLinks.forEach(link => {
            link.classList.remove('active', 'text-white');
            if (link.getAttribute('data-target') === current) {
                link.classList.add('active', 'text-white');
            }
        });

        // Update Button Group
        navBtns.forEach(btn => {
            btn.classList.remove('border-neon-blue', 'bg-white/10');
            if (btn.getAttribute('data-target') === current) {
                btn.classList.add('border-neon-blue', 'bg-white/10');
            }
        });
    });
}

// Figma Modal Logic
window.openFigmaModal = (url) => {
    const modal = document.getElementById('figma-modal');
    const modalContent = document.getElementById('figma-modal-content');
    const iframe = document.getElementById('figma-iframe');
    const loader = document.getElementById('figma-loader');
    
    // Use the passed URL or a default if none provided
    const figmaUrl = url || "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FnXu1TMmaqyMabxtMxQpqNF%2F%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%25E9%2593%25BE%25E6%258E%25A5%3Fnode-id%3D0-1%26t%3D8FulV5WSNsqKMdgW-1";

    // Open modal animations
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalContent.classList.remove('scale-95');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    // Load iframe
    iframe.src = figmaUrl;
    iframe.onload = () => {
        iframe.classList.remove('opacity-0');
        if (loader) loader.style.display = 'none';
    };
};

window.closeFigmaModal = () => {
    const modal = document.getElementById('figma-modal');
    const modalContent = document.getElementById('figma-modal-content');
    const iframe = document.getElementById('figma-iframe');
    const loader = document.getElementById('figma-loader');
    
    // Close modal animations
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalContent.classList.add('scale-95');
    document.body.style.overflow = ''; // Restore scrolling

    // Reset iframe after animation finishes to stop playing videos/audio
    setTimeout(() => {
        iframe.src = '';
        iframe.classList.add('opacity-0');
        if (loader) loader.style.display = 'flex';
    }, 500);
};

// =========================
// Campus 3D Carousel
// =========================

const campusCards = document.querySelectorAll('.campus-card')
const campusDots = document.querySelectorAll('.campus-dot')

let campusCurrentIndex = 0
let campusTimer = null

function updateCampusCarousel(index) {
  campusCurrentIndex = index

  const total = campusCards.length

  campusCards.forEach((card, i) => {
    card.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2', 'hidden-card')

    const diff = (i - campusCurrentIndex + total) % total

    if (diff === 0) {
      card.classList.add('active')
    } else if (diff === 1) {
      card.classList.add('next-1')
    } else if (diff === 2) {
      card.classList.add('next-2')
    } else if (diff === total - 1) {
      card.classList.add('prev-1')
    } else if (diff === total - 2) {
      card.classList.add('prev-2')
    } else {
      card.classList.add('hidden-card')
    }
  })

  campusDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === campusCurrentIndex)
  })
}

function startCampusAutoPlay() {
  campusTimer = setInterval(() => {
    const nextIndex = (campusCurrentIndex + 1) % campusCards.length
    updateCampusCarousel(nextIndex)
  }, 3200)
}

function stopCampusAutoPlay() {
  clearInterval(campusTimer)
}

campusCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    updateCampusCarousel(index)
  })
})

campusDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateCampusCarousel(index)
  })
})

const campusSection = document.querySelector('#campus')

if (campusSection) {
  campusSection.addEventListener('mouseenter', stopCampusAutoPlay)
  campusSection.addEventListener('mouseleave', startCampusAutoPlay)
}

updateCampusCarousel(0)
startCampusAutoPlay()