// ===== Navbar berubah saat scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.style.background = 'rgba(0,0,0,0.92)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.6)';
    } else {
        navbar.style.background = 'rgba(0,0,0,0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// ===== Partikel Bokeh =====
const particleContainer = document.createElement('div');
particleContainer.className = 'particles';
document.body.appendChild(particleContainer);

const particleCount = 22;
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

// ===== Kinetic Typewriter Nama =====
const nameText = 'DHENZAIN';
const typeEl = document.getElementById('typewriter');
let charIdx = 0;

function typeWriter() {
    if (charIdx < nameText.length) {
        typeEl.textContent = nameText.slice(0, charIdx + 1);
        charIdx++;
        setTimeout(typeWriter, 140);
    }
}
setTimeout(typeWriter, 600);

// ===== Parallax (hero + banner) =====
const parallaxEls = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const img = el.firstElementChild || null;
        if (!img) return;
        const speed = 0.25;
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        img.style.transform = `translateY(${offset}px) scale(1.05)`;
    });
});

// ===== Scroll Reveal (staggered) =====
const revealEls = document.querySelectorAll(
    '.section-title, .section-text, .about-photo, .banner, .gallery-item, .contact-btn'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const idx = Array.prototype.indexOf.call(parent.children, entry.target);
            const delay = Math.min(idx * 90, 400);
            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.filter = 'none';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
    revealObserver.observe(el);
});

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightboxCap.textContent = item.dataset.cap || '';
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    });
});

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

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
