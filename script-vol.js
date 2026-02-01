/* ============================================
   ECHOES OF BEIGN - VOLUME PAGES JS
   Efectos cinematográticos para vol1/vol2
   ============================================ */

// -------------------- CANVAS BACKGROUND EFFECTS --------------------
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

// Partículas de fondo
let bgParticles = [];

class BackgroundParticle {
    constructor() {
        this.x = Math.random() * bgCanvas.width;
        this.y = Math.random() * bgCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > bgCanvas.width) this.x = 0;
        if (this.x < 0) this.x = bgCanvas.width;
        if (this.y > bgCanvas.height) this.y = 0;
        if (this.y < 0) this.y = bgCanvas.height;
    }
    
    draw() {
        bgCtx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fill();
    }
}

// Crear partículas
for (let i = 0; i < 50; i++) {
    bgParticles.push(new BackgroundParticle());
}

function animateBackground() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    
    bgParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateBackground);
}

animateBackground();

// -------------------- PARALLAX CON MOUSE --------------------
const sections = document.querySelectorAll('.fullpage-section');

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    
    sections.forEach(section => {
        const layers = section.querySelectorAll('.parallax-bg');
        
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 15;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
    });
});

// -------------------- NAVEGACIÓN FLOTANTE SCROLL --------------------
const floatingNav = document.querySelector('.floating-nav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        floatingNav.classList.add('scrolled');
    } else {
        floatingNav.classList.remove('scrolled');
    }
    
    // Actualizar link activo
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
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

// -------------------- SMOOTH SCROLL PARA ANCLAS --------------------
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// -------------------- TRACKLIST INTERACTIONS --------------------
const trackItems = document.querySelectorAll('.track-item');

trackItems.forEach(track => {
    track.addEventListener('click', () => {
        const trackNumber = track.dataset.track;
        
        // Aquí podrías integrar Spotify embed o reproductor
        console.log(`Playing track ${trackNumber}`);
        
        // Efecto visual
        trackItems.forEach(t => t.style.opacity = '0.5');
        track.style.opacity = '1';
        
        setTimeout(() => {
            trackItems.forEach(t => t.style.opacity = '1');
        }, 2000);
    });
    
    // Efecto parallax en hover
    track.addEventListener('mouseenter', (e) => {
        const cover = track.querySelector('.track-cover img');
        cover.style.transform = 'scale(1.1) rotate(2deg)';
        cover.style.transition = 'transform 0.4s ease';
    });
    
    track.addEventListener('mouseleave', (e) => {
        const cover = track.querySelector('.track-cover img');
        cover.style.transform = 'scale(1) rotate(0deg)';
    });
});

// -------------------- SCROLL REVEAL ANIMATIONS --------------------
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos a animar
const animatedElements = document.querySelectorAll('.concept-text, .about-text, .merch-item, .track-item');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// -------------------- HERO ALBUM COVER PARALLAX --------------------
const albumCover = document.querySelector('.album-cover-hero img');

if (albumCover) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        const heroHeight = heroSection.clientHeight;
        
        if (scrolled < heroHeight) {
            const parallaxSpeed = scrolled * 0.3;
            albumCover.style.transform = `translateY(${parallaxSpeed}px) scale(${1 - (scrolled / heroHeight) * 0.2})`;
            albumCover.style.opacity = 1 - (scrolled / heroHeight);
        }
    });
}

// -------------------- TRACKLIST SCROLL PROGRESS --------------------
const tracklistContainer = document.querySelector('.tracklist-container');

if (tracklistContainer) {
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'tracklist-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .tracklist-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .tracklist-progress.visible {
            opacity: 1;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #d4af37, #FFD700);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(progressStyle);
    document.body.appendChild(progressBar);
    
    tracklistContainer.addEventListener('scroll', () => {
        const scrollPercentage = (tracklistContainer.scrollTop / (tracklistContainer.scrollHeight - tracklistContainer.clientHeight)) * 100;
        progressBar.querySelector('.progress-fill').style.width = scrollPercentage + '%';
        
        if (tracklistContainer.scrollTop > 50) {
            progressBar.classList.add('visible');
        } else {
            progressBar.classList.remove('visible');
        }
    });
}

// -------------------- RESIZE HANDLER --------------------
window.addEventListener('resize', () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
});

// -------------------- LOADING ANIMATION --------------------
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// -------------------- VOLUME SWITCH EFFECT --------------------
const volumeSwitch = document.querySelector('.volume-switch');

if (volumeSwitch) {
    volumeSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = volumeSwitch.getAttribute('href');
        
        // Fade out effect
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 800);
    });
}

// -------------------- MERCH ITEM 3D TILT --------------------
const merchItems = document.querySelectorAll('.merch-item');

merchItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// -------------------- CONCEPT VISUAL ROTATION --------------------
const visualElement = document.querySelector('.visual-element');

if (visualElement) {
    let rotation = 0;
    
    function rotateVisual() {
        rotation += 0.1;
        visualElement.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotateVisual);
    }
    
    rotateVisual();
}

// -------------------- SCROLL INDICATOR HIDE --------------------
const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.6';
        }
    });
}