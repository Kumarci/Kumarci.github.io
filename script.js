// Efek sederhana: header berubah saat halaman di-scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
        navbar.style.background = 'rgba(10,10,10,0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(10,10,10,0.85)';
    }
});

// ===== Partikel Bokeh =====
const particleContainer = document.createElement('div');
particleContainer.className = 'particles';
document.body.appendChild(particleContainer);

const particleCount = 24;
for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = Math.random() * 20 + 12 + 's';
    p.style.animationDelay = Math.random() * 15 + 's';
    particleContainer.appendChild(p);
}

// ===== Scroll Reveal untuk SEMUA elemen animasi =====
const revealEls = document.querySelectorAll('.card, .section-title, .section-text, .gallery-item, .contact-btn');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

revealEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
});

// ===== Text hero masuk halus saat load =====
const heroTitle = document.querySelector('.hero-name');
const heroTag = document.querySelector('.hero-tagline');
const heroBtn = document.querySelector('.hero .btn');

setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';

    heroTag.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
    heroTag.style.opacity = '1';

    heroBtn.style.transition = 'opacity 1s ease 0.4s, transform 1s ease 0.4s';
    heroBtn.style.opacity = '1';
}, 200);

// ===== Tombol Scroll ke Atas =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Karakter ikuti cursor =====
const robotScene = document.querySelector('.scene:not(.scene-cat)');
const catScene = document.querySelector('.scene-cat');

const isMobile = window.matchMedia('(max-width: 600px)').matches;

if (robotScene && catScene && !isMobile) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        const rotY = x * 18;
        const rotX = -y * 10;

        robotScene.style.transform = `perspective(900px) rotateY(${-rotY}deg) rotateX(${rotX}deg)`;
        catScene.style.transform = `perspective(900px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    });

    robotScene.style.transition = 'transform 0.25s ease-out';
    catScene.style.transition = 'transform 0.25s ease-out';
}
