(function() {
    const THEME_KEY = 'melldrive_theme';
    const SESSION_KEY = 'melldrive_active_session_v1';
    const ACCOUNT_COOKIE = 'melldrive_account_cookie';

    function setCookie(name, value, days) {
        const maxAge = days ? `; max-age=${days * 86400}` : '';
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

    function getSavedTheme() {
        const fromCookie = getCookie(THEME_KEY);
        if (fromCookie === 'light' || fromCookie === 'dark') return fromCookie;
        const fromLs = localStorage.getItem(THEME_KEY);
        if (fromLs === 'light' || fromLs === 'dark') return fromLs;
        return 'dark';
    }

    function applyTheme(mode) {
        const isLight = mode === 'light';
        document.body.classList.toggle('light-theme', isLight);
        setCookie(THEME_KEY, isLight ? 'light' : 'dark', 30);
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        document.querySelectorAll('.theme-toggle, #themeToggle').forEach(btn => {
            btn.textContent = isLight ? '☀️' : '🌙';
            btn.setAttribute('aria-label', isLight ? 'Тёмная тема' : 'Светлая тема');
        });
    }

    // Синхронизация куки аккаунта
    try {
        const sessRaw = localStorage.getItem(SESSION_KEY);
        if (sessRaw) {
            const sess = JSON.parse(sessRaw);
            if (sess && sess.loggedIn && sess.email) {
                setCookie(ACCOUNT_COOKIE, JSON.stringify({
                    email: sess.email,
                    name: sess.name || '',
                    license: sess.license || ''
                }), 14);
            } else {
                setCookie(ACCOUNT_COOKIE, '', -1);
            }
        } else {
            const cookieAcc = getCookie(ACCOUNT_COOKIE);
            if (cookieAcc) {
                const parsedCookie = JSON.parse(cookieAcc);
                if (parsedCookie && parsedCookie.email) {
                    const db = JSON.parse(localStorage.getItem('melldrive_accounts_db_v1') || '[]');
                    const found = db.find(u => u.email === parsedCookie.email);
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
                    }
                }
            }
        }
    } catch (e) {}

    applyTheme(getSavedTheme());

    // Гарантируем наличие кнопки смены темы в шапке на всех страницах
    const headerActions = document.querySelector('header .header__actions');
    if (headerActions && !headerActions.querySelector('.theme-toggle')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'theme-toggle';
        btn.id = 'themeToggle';
        btn.title = 'Переключить тему';
        btn.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        headerActions.prepend(btn);
    }

    document.querySelectorAll('.theme-toggle, #themeToggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextMode = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(nextMode);
        });
    });

    // Скрываем Кабинет и Админку для неавторизованных пользователей
    let loggedIn = false;
    try {
        const s = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
        loggedIn = Boolean(s && s.loggedIn === true && s.email);
    } catch (e) {}

    if (!loggedIn) {
        document.querySelectorAll('a[href*="profile.html"]').forEach(a => {
            const li = a.closest('li');
            if (li) li.remove();
            else a.remove();
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

    window.mellLogout = function() {
        localStorage.removeItem(SESSION_KEY);
        setCookie(ACCOUNT_COOKIE, '', -1);
        const isInPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
        window.location.href = isInPages ? '../index.html' : 'index.html';
    };
})();
