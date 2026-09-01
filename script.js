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
    p.style.animationDuration = Math.random() * 24 + 18 + 's';
    p.style.animationDelay = Math.random() * 20 + 's';
    particleContainer.appendChild(p);
}

// ===== Scroll Reveal untuk SEMUA elemen animasi (staggered) =====
const revealEls = document.querySelectorAll(
    '.card, .section-title, .section-text, .gallery-item, .contact-btn'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Stagger: delay sesuai urutan elemen dalam container-nya
            const idx = Array.prototype.indexOf.call(entry.target.parentElement.children, entry.target);
            const delay = Math.min(idx * 90, 400);
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.dataset.revealed = 'true';
        }
    });
}, { threshold: 0.12 });

revealEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
    revealObserver.observe(el);
});

// ===== Text hero masuk halus saat load =====
const heroTitle = document.querySelector('.hero-name');
const heroTag = document.querySelector('.hero-tagline');
const heroBio = document.querySelector('.hero-bio');
const heroSocials = document.querySelector('.hero-socials');

setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';

    heroTag.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';
    heroTag.style.opacity = '1';

    if (heroBio) {
        heroBio.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
        heroBio.style.opacity = '1';
        heroBio.style.transform = 'translateY(0)';
    }

    if (heroSocials) {
        heroSocials.style.transition = 'opacity 1s ease 0.5s, transform 1s ease 0.5s';
        heroSocials.style.opacity = '1';
        heroSocials.style.transform = 'translateY(0)';
    }
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

// Cursor-follow untuk objek 3D sekarang ditangani di hologram.js
