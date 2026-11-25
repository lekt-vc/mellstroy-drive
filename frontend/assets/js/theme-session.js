(function() {
    if (window.__mellThemeSessionInit) return;
    window.__mellThemeSessionInit = true;

    const THEME_KEY = 'melldrive_theme';
    const SESSION_KEY = 'melldrive_active_session_v1';
    const ACCOUNT_COOKIE = 'melldrive_account_cookie';
    const DB_KEY = 'melldrive_accounts_db_v1';

    function setCookie(name, value, days) {
        const maxAge = days > 0 ? `; max-age=${days * 86400}` : '; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/${maxAge}; SameSite=Lax`;
    }

    function getCookie(name) {
        const target = encodeURIComponent(name) + '=';
        const parts = document.cookie.split(';');
        for (let i = 0; i < parts.length; i++) {
            const p = parts[i].trim();
            if (p.indexOf(target) === 0) {
                return decodeURIComponent(p.substring(target.length));
            }
        }
        return null;
    }

    // Чистим устаревший демо-аккаунт, если остался в localStorage
    try {
        const rawDb = localStorage.getItem(DB_KEY);
        if (rawDb) {
            const parsedDb = JSON.parse(rawDb);
            if (Array.isArray(parsedDb)) {
                const cleaned = parsedDb.filter(a => a && a.email && a.email.toLowerCase() !== 'demo@melldrive.ru');
                if (cleaned.length !== parsedDb.length) localStorage.setItem(DB_KEY, JSON.stringify(cleaned));
            }
        }
    } catch (e) {}

    function getSavedTheme() {
        const fromLs = localStorage.getItem(THEME_KEY);
        if (fromLs === 'light' || fromLs === 'dark') return fromLs;
        const fromCookie = getCookie(THEME_KEY);
        if (fromCookie === 'light' || fromCookie === 'dark') return fromCookie;
        return 'dark';
    }

    function applyTheme(mode) {
        const isLight = mode === 'light';
        document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark');
        document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
        if (document.body) {
            document.body.classList.toggle('light-theme', isLight);
        }
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        setCookie(THEME_KEY, isLight ? 'light' : 'dark', 30);
        document.querySelectorAll('.theme-toggle, #themeToggle').forEach(btn => {
            btn.textContent = isLight ? '☀️' : '🌙';
            btn.setAttribute('aria-label', isLight ? 'Включить тёмную тему' : 'Включить светлую тему');
            btn.title = isLight ? 'Переключить на тёмную тему' : 'Переключить на светлую тему';
        });
    }

    // Восстанавливаем сессию из куки только если нет явного выхода
    try {
        const sessRaw = localStorage.getItem(SESSION_KEY);
        if (sessRaw) {
            const sess = JSON.parse(sessRaw);
            if (sess && sess.loggedIn === true && sess.email) {
                setCookie(ACCOUNT_COOKIE, JSON.stringify({
                    email: sess.email,
                    name: sess.name || '',
                    license: sess.license || ''
                }), 14);
            } else {
                setCookie(ACCOUNT_COOKIE, '', 0);
            }
        } else {
            const cookieAcc = getCookie(ACCOUNT_COOKIE);
            if (cookieAcc) {
                const parsedCookie = JSON.parse(cookieAcc);
                if (parsedCookie && parsedCookie.email) {
                    const db = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
                    const found = Array.isArray(db) ? db.find(u => u.email === parsedCookie.email) : null;
                    if (found) {
                        localStorage.setItem(SESSION_KEY, JSON.stringify({
                            loggedIn: true,
                            accountId: found.id,
                            name: found.name,
                            email: found.email,
                            phone: found.phone,
                            license: found.license,
                            licenseConfirmed: found.licenseConfirmed
                        }));
                    } else {
                        setCookie(ACCOUNT_COOKIE, '', 0);
                    }
                }
            }
        }
    } catch (e) {}

    window.mellLogout = function() {
        localStorage.removeItem(SESSION_KEY);
        setCookie(ACCOUNT_COOKIE, '', 0);
        const isInPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
        window.location.href = isInPages ? '../index.html' : 'index.html';
    };

    applyTheme(getSavedTheme());

    const headerActions = document.querySelector('header .header__actions');
    if (headerActions && !headerActions.querySelector('.theme-toggle')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-toggle';
        btn.id = 'themeToggle';
        btn.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        headerActions.prepend(btn);
    }

    document.addEventListener('click', (e) => {
        const toggle = e.target.closest('.theme-toggle, #themeToggle');
        if (!toggle) return;
        const isLight = document.documentElement.getAttribute('data-theme') === 'light' || document.body.classList.contains('light-theme');
        applyTheme(isLight ? 'dark' : 'light');
    });

    let loggedIn = false;
    try {
        const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        loggedIn = Boolean(s && s.loggedIn === true && s.email);
    } catch (e) {}

    if (!loggedIn) {
        document.querySelectorAll('header a[href*="profile.html"]').forEach(a => {
            const li = a.closest('li');
            if (li) li.remove();
            else a.remove();
        });
    } else {
        // BUG-052: заменяем кнопку «Войти» в шапке на «Выйти»
        document.querySelectorAll('header .header__actions a[href*="login.html"]').forEach(a => {
            const outBtn = document.createElement('button');
            outBtn.type = 'button';
            outBtn.className = 'btn btn--outline btn--sm';
            outBtn.textContent = 'Выйти';
            outBtn.addEventListener('click', () => window.mellLogout());
            a.replaceWith(outBtn);
        });
    }

    let isAdmin = false;
    try {
        const adm = JSON.parse(localStorage.getItem('melldrive_admin_session_v1') || 'null');
        isAdmin = Boolean(adm && adm.isAdmin === true);
    } catch (e) {}

    if (!isAdmin) {
        document.querySelectorAll('header a[href*="admin.html"]').forEach(a => {
            const li = a.closest('li');
            if (li) li.remove();
            else a.remove();
        });
    }

    // Обновляем счётчик автопарка в пункте меню «Автопарк (N)»
    if (typeof window.buildMellFleetUnits === 'function') {
        const totalUnits = window.buildMellFleetUnits(false).length;
        document.querySelectorAll('header a[href*="catalog.html"]').forEach(a => {
            if (/Автопарк/i.test(a.textContent)) {
                a.textContent = `Автопарк (${totalUnits})`;
            }
        });
    }
})();

/* MELLDRIVE_HEADER_SNOW_JS_START */
(function() {
    if (window.__mellHeaderSnowInit) return;
    window.__mellHeaderSnowInit = true;

    function initHeaderSnow() {
        const header = document.querySelector('header.header');
        if (!header || header.querySelector('.header-snow-canvas')) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'header-snow-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        header.prepend(canvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let flakes = [];

        function createFlake(randomY) {
            return {
                x: Math.random() * width,
                y: randomY ? Math.random() * height : -4,
                r: 1.1 + Math.random() * 2.1,
                vy: 0.35 + Math.random() * 0.75,
                vx: (Math.random() - 0.5) * 0.45,
                phase: Math.random() * Math.PI * 2,
                alpha: 0.35 + Math.random() * 0.55
            };
        }

        function resize() {
            const rect = header.getBoundingClientRect();
            width = Math.max(1, Math.floor(rect.width));
            height = Math.max(1, Math.floor(rect.height));
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const targetCount = Math.max(28, Math.min(95, Math.floor(width / 16)));
            while (flakes.length < targetCount) flakes.push(createFlake(true));
            if (flakes.length > targetCount) flakes.length = targetCount;
        }

        resize();
        window.addEventListener('resize', resize);
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(resize).observe(header);
        }

        function tick() {
            ctx.clearRect(0, 0, width, height);
            const isLight = document.documentElement.getAttribute('data-theme') === 'light' ||
                            (document.body && document.body.classList.contains('light-theme'));
            const rgb = isLight ? '17, 24, 39' : '255, 255, 255';

            for (let i = 0; i < flakes.length; i++) {
                const f = flakes[i];
                f.phase += 0.025;
                f.y += f.vy;
                f.x += f.vx + Math.sin(f.phase) * 0.25;

                if (f.y - f.r > height) {
                    f.y = -f.r;
                    f.x = Math.random() * width;
                }
                if (f.x < -f.r) f.x = width + f.r;
                if (f.x > width + f.r) f.x = -f.r;

                const opacity = isLight ? (f.alpha * 0.72).toFixed(2) : f.alpha.toFixed(2);
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${opacity})`;
                ctx.fill();
            }
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderSnow);
    } else {
        initHeaderSnow();
    }
})();
/* MELLDRIVE_HEADER_SNOW_JS_END */
