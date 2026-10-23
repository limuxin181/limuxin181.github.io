import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initNavigation();
    initScrollSpy();
    initHeroOrbit();
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

// =========================
// Home software orbit
// =========================

function initHeroOrbit() {
  const stage = document.getElementById('hero-orbit')
  if (!stage) return

  const icons = [...stage.querySelectorAll('.orbit-icon')]
  const total = icons.length
  const frontAngle = Math.PI / 2
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const starColors = ['#8cecff', '#ffffff', '#b684ff', '#43d9ff', '#dfc7ff']
  const starCount = 260

  stage.querySelectorAll('.orbit-path').forEach((path) => {
    for (let index = 0; index < starCount; index += 1) {
      const angle = (index / starCount) * Math.PI * 2
      const radius = 49 + ((((index * 29) % 17) - 8) * 0.28)
      const isBrightStar = index % 37 === 0
      const size = isBrightStar ? 3.2 : 0.65 + ((index * 17) % 9) * 0.24
      const opacity = isBrightStar ? 0.96 : 0.28 + ((index * 13) % 8) * 0.08
      const star = document.createElement('span')

      star.className = 'orbit-star'
      star.style.setProperty('--star-x', `${50 + Math.cos(angle) * radius}%`)
      star.style.setProperty('--star-y', `${50 + Math.sin(angle) * radius}%`)
      star.style.setProperty('--star-size', `${size}px`)
      star.style.setProperty('--star-color', starColors[index % starColors.length])
      star.style.setProperty('--star-opacity', opacity.toFixed(2))
      star.style.setProperty('--star-dim-opacity', (opacity * 0.3).toFixed(2))
      star.style.setProperty('--star-mid-opacity', (opacity * 0.58).toFixed(2))
      star.style.setProperty('--star-duration', `${2.4 + ((index * 19) % 17) * 0.18}s`)
      star.style.setProperty('--star-delay', `${-((index * 11) % 23) * 0.17}s`)
      path.appendChild(star)
    }
  })

  let rotation = frontAngle
  let targetRotation = null
  let selectedIcon = icons[0] || null
  let paused = false
  let focusUntil = performance.now() + 1600
  let previousTime = performance.now()

  const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= Math.PI * 2
    while (angle < -Math.PI) angle += Math.PI * 2
    return angle
  }

  icons.forEach((icon, index) => {
    icon.dataset.orbitAngle = String((index / total) * Math.PI * 2)

    icon.addEventListener('click', () => {
      const baseAngle = Number(icon.dataset.orbitAngle)
      const desiredRotation = frontAngle - baseAngle
      const shortestTurn = normalizeAngle(desiredRotation - rotation)

      targetRotation = rotation + shortestTurn
      selectedIcon?.classList.remove('is-focused')
      selectedIcon = icon
      selectedIcon.classList.add('is-focused')
      focusUntil = Number.POSITIVE_INFINITY
    })
  })

  selectedIcon?.classList.add('is-focused')

  stage.addEventListener('mouseenter', () => {
    paused = true
  })

  stage.addEventListener('mouseleave', () => {
    paused = false
    if (targetRotation === null) focusUntil = performance.now() + 1400
  })

  document.addEventListener('visibilitychange', () => {
    previousTime = performance.now()
  })

  function renderOrbit(time) {
    const delta = Math.min(time - previousTime, 40)
    previousTime = time

    if (targetRotation !== null) {
      const remaining = targetRotation - rotation
      rotation += remaining * Math.min(1, delta * 0.012)

      if (Math.abs(remaining) < 0.0015) {
        rotation = targetRotation
        targetRotation = null
        focusUntil = time + 1800
      }
    } else if (!paused && time > focusUntil && !reducedMotion) {
      rotation += delta * 0.000085
    }

    const width = stage.clientWidth
    const height = stage.clientHeight
    const radiusX = width * (width < 520 ? 0.43 : 0.425)
    const radiusY = height * (width < 520 ? 0.23 : 0.27)

    icons.forEach((icon) => {
      const angle = Number(icon.dataset.orbitAngle) + rotation
      const cosine = Math.cos(angle)
      const depth = Math.sin(angle)
      const depthRatio = (depth + 1) / 2
      const x = cosine * radiusX
      const y = depth * radiusY + x * -0.12
      const z = depth * 175
      const selectedBoost = icon === selectedIcon ? 0.16 : 0
      const scale = 0.58 + depthRatio * 0.48 + selectedBoost

      icon.style.setProperty('--orbit-x', `${x.toFixed(2)}px`)
      icon.style.setProperty('--orbit-y', `${y.toFixed(2)}px`)
      icon.style.setProperty('--orbit-z', `${z.toFixed(2)}px`)
      icon.style.setProperty('--orbit-scale', scale.toFixed(3))
      icon.style.zIndex = String(Math.round(8 + depthRatio * 84))
      icon.style.opacity = String((0.46 + depthRatio * 0.54).toFixed(3))
    })

    requestAnimationFrame(renderOrbit)
  }

  requestAnimationFrame(renderOrbit)
}
