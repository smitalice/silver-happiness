// 1. TERMINAL INTERACTIF
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        let reply = '';
        if (cmd === 'help') reply = 'Commandes : skills, projects, contact, clear';
        else if (cmd === 'skills') reply = 'Windows Server, Linux Debian, Active Directory, Cisco, Docker.';
        else if (cmd === 'projects') reply = '1. Active Directory | 2. Câblage | 3. Docker Wisemapping';
        else if (cmd === 'contact') reply = 'LinkedIn: Alice Smit | GitHub: smitalice';
        else if (cmd === 'clear') { terminalOutput.innerHTML = ''; return; }
        else if (cmd === '') return;
        else reply = `Commande inconnue: "${cmd}". Tapez help.`;

        terminalOutput.innerHTML += `<div style="margin-top:0.3rem;"><span style="color:var(--accent-green);">alice@sisr:~$</span> ${cmd}</div><div style="color:var(--text-muted); font-size:0.85rem;">${reply}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// 2. THÈME CLAIR / SOMBRE
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon'; themeText.textContent = 'Sombre';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun'; themeText.textContent = 'Clair';
    }
});

// 3. BOUTON RETOUR HAUT & CONFETTI
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('party-btn').addEventListener('click', () => confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 } }));

// 4. CONSTELLATIONS & PAILLETTES
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mousePos = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', (e) => { mousePos.x = e.clientX; mousePos.y = e.clientY; });
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
    }
    update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
    }
}

for (let i = 0; i < 50; i++) particles.push(new Particle());

function animateConstellations() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateConstellations);
}
animateConstellations();

// 5. APPARITION FLUIDE DES SECTIONS (FADE-IN)
const observerOptions = {
    root: null,
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});