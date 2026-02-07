// CSS Carnival — Midnight Neon Edition
;(() => {
    'use strict';

    // --- DOM refs ---
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const playBtn = $('#playBtn');
    const pauseBtn = $('#pauseBtn');
    const resetBtn = $('#resetBtn');
    const themeBtn = $('#themeBtn');
    const speedSlider = $('#speedSlider');
    const particlesEl = $('#particles');

    let isPaused = false;
    let isDayTheme = false;

    // --- Particles ---
    function spawnParticles(count = 20) {
        if (!particlesEl) return;
        const colors = ['var(--neon-cyan)', 'var(--neon-magenta)', 'var(--neon-yellow)', 'var(--neon-violet)'];
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = 2 + Math.random() * 4;
            const x = Math.random() * 100;
            const dur = 4 + Math.random() * 8;
            const delay = Math.random() * dur;
            const color = colors[Math.floor(Math.random() * colors.length)];
            Object.assign(p.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + '%',
                background: color,
                boxShadow: `0 0 ${size * 2}px ${color}`,
                animationDuration: dur + 's',
                animationDelay: '-' + delay + 's',
            });
            particlesEl.appendChild(p);
        }
    }

    // --- Toast ---
    function toast(text, variant = 'cyan') {
        const existing = $('.toast');
        if (existing) existing.remove();

        const el = document.createElement('div');
        el.className = `toast toast--${variant}`;
        el.textContent = text;
        document.body.appendChild(el);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => el.classList.add('show'));
        });

        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.remove(), 400);
        }, 2500);
    }

    // --- Reveal on Scroll ---
    function initReveal() {
        const cards = $$('.reveal');
        if (!cards.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        cards.forEach(card => observer.observe(card));
    }

    // --- Speed Control ---
    function updateSpeed(val) {
        document.documentElement.style.setProperty('--speed', val);
    }

    // --- Controls ---
    function setActiveBtn(btn) {
        $$('.dock-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function play() {
        document.body.classList.remove('paused');
        isPaused = false;
        setActiveBtn(playBtn);
        toast('PLAY', 'cyan');
    }

    function pause() {
        document.body.classList.add('paused');
        isPaused = true;
        setActiveBtn(pauseBtn);
        toast('PAUSED', 'magenta');
    }

    function reset() {
        document.body.classList.add('paused');
        setTimeout(() => {
            document.body.classList.remove('paused');
            isPaused = false;
            setActiveBtn(playBtn);
            toast('RESET', 'yellow');
        }, 80);
    }

    function toggleTheme() {
        isDayTheme = !isDayTheme;
        document.body.classList.toggle('theme-day', isDayTheme);
        toast(isDayTheme ? 'DAY MODE' : 'NIGHT MODE', isDayTheme ? 'yellow' : 'cyan');
    }

    // --- Event Listeners ---
    playBtn?.addEventListener('click', play);
    pauseBtn?.addEventListener('click', pause);
    resetBtn?.addEventListener('click', reset);
    themeBtn?.addEventListener('click', toggleTheme);

    speedSlider?.addEventListener('input', (e) => {
        updateSpeed(e.target.value);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        switch (e.key.toLowerCase()) {
            case ' ':
                e.preventDefault();
                isPaused ? play() : pause();
                break;
            case 'r':
                e.preventDefault();
                reset();
                break;
            case 't':
                e.preventDefault();
                toggleTheme();
                break;
        }
    });

    // Ride card hover interaction
    $$('.ride-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.ride-name')?.textContent || '';
            toast(name + ' — ACTIVE', 'cyan');
        });
    });

    // Easter egg: rapid title clicks
    const title = $('.neon-title');
    let clickCount = 0;
    let clickTimer;

    title?.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);

        if (clickCount >= 5) {
            clickCount = 0;
            document.body.style.animation = 'none';
            // Rainbow flash
            const letters = $$('.neon-letter');
            letters.forEach((l, i) => {
                l.style.transition = 'color .2s';
                l.style.color = `hsl(${i * 33}, 100%, 60%)`;
                setTimeout(() => { l.style.color = ''; l.style.transition = ''; }, 2000);
            });
            toast('RAINBOW MODE', 'magenta');
        }

        clickTimer = setTimeout(() => { clickCount = 0; }, 3000);
    });

    // --- Init ---
    spawnParticles(25);
    initReveal();

    // Welcome toast
    setTimeout(() => {
        toast('SYSTEM READY — 按空格暂停 | T切换主题', 'cyan');
    }, 800);
})();
