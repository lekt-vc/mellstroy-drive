const STORAGE_KEY = 'melldrive_cms_v2';

const DEFAULT_CMS = {
    texts: {
        badge: 'Мгновенная аренда без залога • 24/7',
        heroTitle: 'Каршеринг <span class="text-gradient">MELLDRIVE</span> для города и трассы',
        heroSubtitle: 'Выбирайте авто от эконома до спорткаров за пару кликов, рассчитывайте тариф онлайн и управляйте поездками в личном кабинете.',
        catalogTitle: 'Популярные авто в парке'
    },
    cars: [
        { id: 1, name: 'Hyundai Solaris', category: 'Эконом', specs: 'АКПП • Бензин • Кондиционер', priceMin: 11.5, priceDay: 2400, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/2018_Hyundai_Accent_%28Solaris%29_front_3.13.18.jpg/960px-2018_Hyundai_Accent_%28Solaris%29_front_3.13.18.jpg' },
        { id: 2, name: 'Haval Jolion 4WD', category: 'Комфорт', specs: 'Робот • Полный привод • Камеры 360', priceMin: 15.5, priceDay: 3500, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Haval_Jolion_China_%282%29.jpg/960px-Haval_Jolion_China_%282%29.jpg' },
        { id: 3, name: 'Tesla Model 3', category: 'Электро', specs: 'Автопилот • Запас 490 км • Премиум', priceMin: 25.0, priceDay: 6900, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Red_Front.jpg/960px-2019_Tesla_Model_3_Performance_AWD_Red_Front.jpg' },
        { id: 4, name: 'BMW M5 Competition', category: 'Спорт', specs: 'АКПП • 625 л.с. • 0-100 за 3.3 с', priceMin: 55.0, priceDay: 39000, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/BMW_M5_F90_Competition_IMG_3602.jpg/960px-BMW_M5_F90_Competition_IMG_3602.jpg' },
        { id: 5, name: 'Mercedes-Maybach S 580', category: 'Бизнес', specs: 'АКПП • 503 л.с. • Полный привод', priceMin: 75.0, priceDay: 55000, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mercedes-Maybach_S_580_4MATIC_X223_IMG_4266.jpg/960px-Mercedes-Maybach_S_580_4MATIC_X223_IMG_4266.jpg' },
        { id: 6, name: 'Porsche 911 Turbo S', category: 'Спорт', specs: 'PDK • 650 л.с. • 0-100 за 2.7 с', priceMin: 90.0, priceDay: 72000, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Porsche_911_Turbo_S_%28992%29_%E2%80%93_f_26072021.jpg/960px-Porsche_911_Turbo_S_%28992%29_%E2%80%93_f_26072021.jpg' }
    ]
};

function loadCms() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                texts: { ...DEFAULT_CMS.texts, ...(parsed.texts || {}) },
                cars: Array.isArray(parsed.cars) && parsed.cars.length ? parsed.cars : [...DEFAULT_CMS.cars]
            };
        }
    } catch (e) {}
    return { texts: { ...DEFAULT_CMS.texts }, cars: [...DEFAULT_CMS.cars] };
}

let cmsState = loadCms();
let activeCategory = 'all';
let isEditMode = false;

function saveCms() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsState));
}

function applyCmsTexts() {
    document.querySelectorAll('[data-cms]').forEach(el => {
        const key = el.getAttribute('data-cms');
        if (cmsState.texts[key] !== undefined) {
            el.innerHTML = cmsState.texts[key];
        }
        el.contentEditable = isEditMode ? 'true' : 'false';
    });
}

function renderFilters() {
    const wrap = document.getElementById('homeFilters');
    if (!wrap) return;
    const cats = ['all', ...new Set(cmsState.cars.map(c => c.category))];
    wrap.innerHTML = cats.map(cat => `
        <button type="button" class="filter-pill ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
            ${cat === 'all' ? 'Все авто' : cat}
        </button>
    `).join('');

    wrap.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCategory = btn.dataset.cat;
            renderFilters();
            renderCars();
        });
    });
}

function renderCars() {
    const grid = document.getElementById('homeCarsGrid');
    if (!grid) return;

    const list = activeCategory === 'all'
        ? cmsState.cars
        : cmsState.cars.filter(c => c.category === activeCategory);

    grid.innerHTML = list.map(car => `
        <article class="car-card">
            <div class="car-card__badge">${car.category}</div>
            <img class="car-card__img" src="${car.img}" alt="${car.name}">
            <div class="car-card__body">
                <h3 class="car-card__title">${car.name}</h3>
                <div class="car-card__specs">${car.specs}</div>
                <div class="car-card__pricing">
                    <span class="car-card__price">${Number(car.priceMin).toFixed(2)} ₽ / мин</span>
                    <span class="car-card__price-sub">или ${Number(car.priceDay).toLocaleString('ru-RU')} ₽ / сутки</span>
                </div>
                <div style="display:flex; gap:8px; margin-top:10px;">
                    <a href="pages/car.html?id=${car.id}" class="btn btn--primary btn--block">Забронировать</a>
                    ${isEditMode ? `<button type="button" class="btn btn--danger btn--sm" onclick="removeCar(${car.id})">✕</button>` : ''}
                </div>
            </div>
        </article>
    `).join('');
}

window.removeCar = function(id) {
    cmsState.cars = cmsState.cars.filter(c => Number(c.id) !== Number(id));
    if (!cmsState.cars.length) cmsState.cars = [...DEFAULT_CMS.cars];
    saveCms();
    renderFilters();
    renderCars();
};

document.addEventListener('DOMContentLoaded', () => {
    applyCmsTexts();
    renderFilters();
    renderCars();

    const toggleEditorBtn = document.getElementById('toggleEditorBtn');
    toggleEditorBtn?.addEventListener('click', () => {
        if (isEditMode) {
            document.querySelectorAll('[data-cms]').forEach(el => {
                cmsState.texts[el.getAttribute('data-cms')] = el.innerHTML;
            });
            saveCms();
        }
        isEditMode = !isEditMode;
        document.body.classList.toggle('edit-mode', isEditMode);
        toggleEditorBtn.textContent = isEditMode ? 'Сохранить и выйти' : 'Редактор';
        applyCmsTexts();
        renderCars();
    });

    document.getElementById('resetCmsBtn')?.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        cmsState = { texts: { ...DEFAULT_CMS.texts }, cars: [...DEFAULT_CMS.cars] };
        activeCategory = 'all';
        applyCmsTexts();
        renderFilters();
        renderCars();
    });

    const modal = document.getElementById('addCarModal');
    document.getElementById('openAddCarBtn')?.addEventListener('click', () => modal?.classList.add('open'));
    document.getElementById('closeAddCarBtn')?.addEventListener('click', () => modal?.classList.remove('open'));

    document.getElementById('addCarForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('newCarName').value.trim();
        const category = document.getElementById('newCarCategory').value;
        const specs = document.getElementById('newCarSpecs').value.trim();
        const priceMin = Number(document.getElementById('newCarMin').value) || 15;
        const priceDay = Number(document.getElementById('newCarDay').value) || 3500;
        if (!name || !specs) return;

        const nextId = Math.max(0, ...cmsState.cars.map(c => Number(c.id) || 0)) + 1;
        cmsState.cars.push({
            id: nextId,
            name,
            category,
            specs,
            priceMin,
            priceDay,
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Porsche_911_Turbo_S_%28992%29_%E2%80%93_f_26072021.jpg/960px-Porsche_911_Turbo_S_%28992%29_%E2%80%93_f_26072021.jpg'
        });
        saveCms();
        renderFilters();
        renderCars();
        e.target.reset();
        modal?.classList.remove('open');
    });

    document.getElementById('themeToggle')?.addEventListener('click', (e) => {
        document.body.classList.toggle('light-theme');
        e.target.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });

    document.getElementById('burgerBtn')?.addEventListener('click', () => {
        document.getElementById('mainNav')?.classList.toggle('open');
    });
});

