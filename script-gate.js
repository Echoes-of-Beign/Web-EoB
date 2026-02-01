/* ============================================
   ECHOES OF BEIGN - GATE SCREEN JS
   Efectos cinematográticos para selección
   ============================================ */

// -------------------- CANVAS HUMO/NIEBLA --------------------
const canvas = document.getElementById('smokeCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Partículas de humo
let smokeParticles = [];

class SmokeParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.1 + 0.05;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
    }
    
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Crear partículas
for (let i = 0; i < 15; i++) {
    smokeParticles.push(new SmokeParticle());
}

function animateSmoke() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    smokeParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateSmoke);
}

animateSmoke();

// -------------------- PARALLAX CON MOUSE --------------------
const volumeSides = document.querySelectorAll('.volume-side');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    volumeSides.forEach(side => {
        const layers = side.querySelectorAll('.parallax-layer');
        
        layers.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            const moveX = (mouseX - 0.5) * depth;
            const moveY = (mouseY - 0.5) * depth;
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});

// -------------------- PARTÍCULAS FLOTANTES --------------------
volumeSides.forEach(side => {
    const particlesContainer = side.querySelector('.particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posición aleatoria
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Animación aleatoria
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        particle.style.animation = `floatParticle ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
});

// Estilos para partículas (inyectados dinámicamente)
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particle {
        position: absolute;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.4);
        pointer-events: none;
        filter: blur(1px);
    }
    
    .vol2-side .particle {
        background: rgba(255, 215, 0, 0.5);
    }
    
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyle);

// -------------------- HOVER EXPANSIÓN INTERACTIVA --------------------
volumeSides.forEach(side => {
    const overlay = side.querySelector('.volume-overlay');
    
    side.addEventListener('mouseenter', () => {
        overlay.style.opacity = '0.3';
    });
    
    side.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0.6';
    });
});

// -------------------- CLICK PARA NAVEGAR --------------------
volumeSides.forEach(side => {
    side.addEventListener('click', () => {
        const volume = side.dataset.volume;
        
        // Transición líquida antes de navegar
        side.style.width = '100%';
        side.style.transition = 'width 1.2s cubic-bezier(0.65, 0, 0.35, 1)';
        
        // Fade out del otro lado
        const otherSide = side.classList.contains('vol1-side') 
            ? document.querySelector('.vol2-side')
            : document.querySelector('.vol1-side');
        
        otherSide.style.opacity = '0';
        otherSide.style.transition = 'opacity 1s ease';
        
        // Fade out logo central
        document.querySelector('.central-logo').style.opacity = '0';
        
        // Navegar después de la animación
        setTimeout(() => {
            window.location.href = `${volume}.html`;
        }, 1200);
    });
});

// -------------------- RESIZE CANVAS --------------------
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// -------------------- EFECTO DE ENTRADA INICIAL --------------------
window.addEventListener('load', () => {
    document.querySelector('.vol1-side').style.opacity = '0';
    document.querySelector('.vol2-side').style.opacity = '0';
    document.querySelector('.central-logo').style.opacity = '0';
    
    setTimeout(() => {
        document.querySelector('.vol1-side').style.transition = 'opacity 1.5s ease';
        document.querySelector('.vol1-side').style.opacity = '1';
    }, 200);
    
    setTimeout(() => {
        document.querySelector('.vol2-side').style.transition = 'opacity 1.5s ease';
        document.querySelector('.vol2-side').style.opacity = '1';
    }, 400);
    
    setTimeout(() => {
        document.querySelector('.central-logo').style.transition = 'opacity 2s ease';
        document.querySelector('.central-logo').style.opacity = '0.9';
    }, 800);
});