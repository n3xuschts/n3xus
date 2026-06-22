// ===== PARTICLES GENERATION =====
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 1.5;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 8;
        const opacity = Math.random() * 0.5 + 0.1;

        particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${posX}%;
                    animation-delay: ${delay}s;
                    animation-duration: ${duration}s;
                    opacity: ${opacity};
                `;

        container.appendChild(particle);
    }
}

// ===== SET CURRENT DATE =====
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// ===== TOAST NOTIFICATION =====
function showToast(message, duration = 3500) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        // Hide after duration
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

// ===== HANDLE DOWNLOAD CLICKS =====
function handleDownloadClicks() {
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const card = this.closest('.engine-card');
            const engineName = card ? card.querySelector('h3').textContent : 'Engine';

            // Show toast notification
            showToast(`🚀 ${engineName} download started! Extract the .zip and run the .exe file.`);

            // Add a brief ripple effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Log download (simulated)
            console.log(`[VoidCheats] Download initiated: ${engineName} - ${this.href}`);
        });
    });
}

// ===== ADD HOVER SOUND EFFECT TO CARDS (visual only, no audio) =====
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.engine-card');

    cards.forEach((card) => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.card-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                }
            }
        });
    });
}

// ===== ADD SCROLL-REVEAL ANIMATIONS =====
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe engine cards
    document.querySelectorAll('.engine-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe feature items
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.4s ease ${index * 0.08}s`;
        observer.observe(item);
    });

    // Observe steps
    document.querySelectorAll('.step').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = `all 0.4s ease ${index * 0.1}s`;
        observer.observe(step);
    });
}

// ===== CLIPBOARD COPY FOR LINKS (optional utility) =====
function addCopyOnRightClick() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach((btn) => {
        btn.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            navigator.clipboard
                .writeText(url)
                .then(() => {
                    showToast('📋 Link copied to clipboard!');
                })
                .catch(() => {
                    showToast('⚠️ Failed to copy link.');
                });
        });
    });
}

// ===== CONSOLE EASTER EGG =====
function consoleEasterEgg() {
    console.log(`
    ╔══════════════════════════════════════╗
    ║         🚀 VOIDCHEATS 🚀           ║
    ║    #1 Free Roblox Executors        ║
    ║    Trusted by 500,000+ Users       ║
    ║    All Engines 100% Undetected     ║
    ╚══════════════════════════════════════╝
      `);
}

// ===== KEYBOARD SHORTCUT (press 'D' to scroll to downloads) =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'd' && e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const enginesSection = document.querySelector('.engines-section');
            if (enginesSection) {
                enginesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showToast('⚡ Scrolled to download section!');
            }
        }
    });
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    setCurrentDate();
    handleDownloadClicks();
    addCardHoverEffects();
    initSmoothScroll();
    initScrollReveal();
    addCopyOnRightClick();
    initKeyboardShortcuts();
    consoleEasterEgg();

    // Show initial welcome toast
    setTimeout(() => {
        showToast('👋 Welcome to VoidCheats! All engines are online & undetected.', 4000);
    }, 1500);
});

// ===== HANDLE PAGE VISIBILITY CHANGE =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '💜 Come back to VoidCheats!';
    } else {
        document.title = 'VoidCheats - #1 Free Roblox Executors';
        // Refresh particles when returning
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer && particlesContainer.children.length === 0) {
            createParticles();
        }
    }
});

// ===== SERVICE WORKER REGISTRATION READY (for potential PWA) =====
// Left as a placeholder for future enhancement
console.log('[VoidCheats] Site fully loaded and ready.');
console.log('[VoidCheats] Tip: Right-click any download button to copy the link!');
console.log('[VoidCheats] Tip: Press Ctrl+D to quickly jump to the download section!');
