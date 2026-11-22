const STORAGE_KEY = 'melldrive_cms_v2';

const DEFAULT_CMS = {
    logoDataUrl: '',
    texts: {
        siteName: 'MELLDRIVE',
        heroBadge: '⚡ Мгновенное бронирование в один клик',
        heroTitle: 'Свобода движения с MELLDRIVE',
        heroSubtitle: 'Поминутная и суточная аренда премиум- и городских авто. Бензин, страховка КАСКО и парковка уже учтены.',
        stat1Val: 'от 10 ₽/мин',
        stat1Lbl: 'Поминутный тариф',
        stat2Val: '0 ₽',
        stat2Lbl: 'Депозит в городе',
        stat3Val: '24/7',
        stat3Lbl: 'Поддержка водителей',
        catalogTitle: 'Автопарк MELLDRIVE',
        catalogSubtitle: 'Включите «Редактор», чтобы менять авто, фото, цены и характеристики без правки файлов',
        t1Title: 'Минутный',
        t1Desc: 'Короткие поездки по городу без лишних переплат',
        t1Price: 'от 10 ₽ / мин',
        t2Title: 'Часовые пакеты',
        t2Desc: 'Поездки по делам, встречам и закупкам',
        t2Price: 'от 450 ₽ / час',
        t3Title: 'Суточный',
        t3Desc: 'Поездки на целый день или выходные',
        t3Price: 'от 2 100 ₽ / сутки',
        footerBrand: 'MELLDRIVE',
        footerPhone: 'Телефон: +7 (800) 555-35-35',
        footerEmail: 'E-mail: support@melldrive.ru'
    },
    cars: [
        {
            id: 1,
            name: 'Hyundai Solaris',
            category: 'Эконом',
            specs: 'АКПП • Бензин • Кондиционер',
            priceMin: 11.5,
            priceDay: 2400,
            img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            name: 'Haval Jolion 4WD',
            category: 'Комфорт',
            specs: 'Робот • Полный привод • Камеры 360',
            priceMin: 15.5,
            priceDay: 3500,
            img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            name: 'Tesla Model 3',
            category: 'Электро',
            specs: 'Автопилот • Запас 490 км • Премиум',
            priceMin: 25.0,
            priceDay: 6900,
            img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            name: 'BMW M5 Competition',
            category: 'Спорт',
            specs: 'АКПП • 625 л.с. • 0-100 за 3.3 с',
            priceMin: 55.0,
            priceDay: 39000,
            img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
        }
    ]
};

let cmsData = loadCmsData();
let editorActive = false;

function loadCmsData() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                logoDataUrl: parsed.logoDataUrl || '',
                texts: { ...DEFAULT_CMS.texts, ...(parsed.texts || {}) },
                cars: Array.isArray(parsed.cars) && parsed.cars.length ? parsed.cars : structuredClone(DEFAULT_CMS.cars)
            };
        }
    } catch (e) {
        console.warn('Ошибка чтения localStorage:', e);
    }
    return structuredClone(DEFAULT_CMS);
}

function saveCmsData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
    } catch (e) {
        alert('Файл слишком большой для localStorage. Выберите фото меньшего размера или укажите ссылку.');
    }
}

function renderSiteContent() {
    const logoImg = document.getElementById('brandLogoImg');
    if (logoImg) {
        if (cmsData.logoDataUrl) {
            logoImg.src = cmsData.logoDataUrl;
            logoImg.classList.remove('hidden');
        } else {
            logoImg.classList.add('hidden');
            logoImg.removeAttribute('src');
        }
    }

    document.querySelectorAll('[data-edit]').forEach(el => {
        const key = el.getAttribute('data-edit');
        if (cmsData.texts[key] !== undefined) {
            el.textContent = cmsData.texts[key];
        }
    });

    if (cmsData.texts.siteName) {
        document.title = `${cmsData.texts.siteName} — Современный каршеринг | Аренда авто`;
    }
}

function refreshCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    if (!select) return;
    const currentVal = select.value;
    const categories = [...new Set(cmsData.cars.map(c => c.category).filter(Boolean))];
    select.innerHTML = '<option value="all">Все категории</option>' +
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    if (categories.includes(currentVal)) select.value = currentVal;
}

function renderCarsGrid() {
    const grid = document.getElementById('popularCarsGrid');
    if (!grid) return;

    refreshCategoryFilter();
    const catVal = document.getElementById('categoryFilter')?.value || 'all';
    const sortVal = document.getElementById('priceSort')?.value || 'default';

    let list = [...cmsData.cars];
    if (catVal !== 'all') list = list.filter(c => c.category === catVal);
    if (sortVal === 'asc') list.sort((a, b) => Number(a.priceDay) - Number(b.priceDay));
    if (sortVal === 'desc') list.sort((a, b) => Number(b.priceDay) - Number(a.priceDay));

    if (!list.length) {
        grid.innerHTML = '<p style="color: var(--text-muted);">По выбранному фильтру машин пока нет.</p>';
        return;
    }

    grid.innerHTML = list.map(car => `
        <article class="car-card">
            <div class="car-card__badge">${car.category}</div>
            <img class="car-card__img" src="${car.img}" alt="${car.name}" onerror="this.src='https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'">
            <div class="car-card__body">
                <h3 class="car-card__title">${car.name}</h3>
                <div class="car-card__specs">${car.specs}</div>
                <div class="car-card__pricing">
                    <span class="car-card__price">${Number(car.priceMin).toFixed(2)} ₽ / мин</span>
                    <span class="car-card__price-sub">или ${Number(car.priceDay).toLocaleString('ru-RU')} ₽ / сутки</span>
                </div>
                <button type="button" class="btn btn--primary btn--block" onclick="alert('Бронь активирована для: ${car.name} (${car.priceMin} ₽/мин)')">Забронировать</button>
                <div class="car-card__admin-btns editor-only">
                    <button type="button" class="btn btn--secondary btn--sm" style="flex:1;" onclick="openEditCar(${car.id})">✏️ Изменить</button>
                    <button type="button" class="btn btn--danger btn--sm" onclick="deleteCar(${car.id})">🗑️</button>
                </div>
            </div>
        </article>
    `).join('');
}

// Клик по логотипу: в режиме редактора не перекидывает наверх/страницу, даёт править текст
document.getElementById('brandLogoLink')?.addEventListener('click', (e) => {
    if (editorActive) {
        e.preventDefault();
        document.getElementById('brandNameText')?.focus();
    }
});

// Переключение режима редактора
const toggleEditorBtn = document.getElementById('toggleEditorBtn');
toggleEditorBtn?.addEventListener('click', () => {
    editorActive = !editorActive;
    document.body.classList.toggle('live-editor-on', editorActive);
    toggleEditorBtn.textContent = editorActive ? '✅ Выйти из редактора' : '✏️ Редактор';
    document.querySelectorAll('[data-edit]').forEach(el => {
        el.contentEditable = editorActive ? 'true' : 'false';
    });
});

// Автосохранение редактируемых текстов
document.querySelectorAll('[data-edit]').forEach(el => {
    el.addEventListener('input', () => {
        const key = el.getAttribute('data-edit');
        cmsData.texts[key] = el.textContent.trim();
        if (key === 'siteName') {
            document.title = `${cmsData.texts.siteName} — Современный каршеринг | Аренда авто`;
        }
        saveCmsData();
    });
});

// Загрузка логотипа с компьютера (из панели редактора и быстрой кнопки у логотипа)
function handleLogoUpload(inputEl) {
    inputEl?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            cmsData.logoDataUrl = reader.result;
            saveCmsData();
            renderSiteContent();
        };
        reader.readAsDataURL(file);
    });
}
handleLogoUpload(document.getElementById('logoFileInput'));
handleLogoUpload(document.getElementById('logoFileQuickInput'));

document.getElementById('clearLogoBtn')?.addEventListener('click', () => {
    cmsData.logoDataUrl = '';
    saveCmsData();
    renderSiteContent();
});

// Модалка добавления / редактирования авто
const carEditModal = document.getElementById('carEditModal');
const carEditForm = document.getElementById('carEditForm');

document.getElementById('openAddCarModalBtn')?.addEventListener('click', () => {
    document.getElementById('carModalHeading').textContent = 'Добавить автомобиль';
    carEditForm.reset();
    document.getElementById('editCarId').value = '';
    carEditModal.classList.remove('hidden');
});

document.getElementById('closeCarModalBtn')?.addEventListener('click', () => {
    carEditModal.classList.add('hidden');
});

window.openEditCar = function(id) {
    const car = cmsData.cars.find(c => c.id === id);
    if (!car) return;
    document.getElementById('carModalHeading').textContent = 'Редактировать автомобиль';
    document.getElementById('editCarId').value = car.id;
    document.getElementById('editCarName').value = car.name;
    document.getElementById('editCarCategory').value = car.category;
    document.getElementById('editCarSpecs').value = car.specs;
    document.getElementById('editCarPriceMin').value = car.priceMin;
    document.getElementById('editCarPriceDay').value = car.priceDay;
    document.getElementById('editCarFile').value = '';
    document.getElementById('editCarUrl').value = car.img.startsWith('data:') ? '' : car.img;
    carEditModal.classList.remove('hidden');
};

window.deleteCar = function(id) {
    if (!confirm('Удалить автомобиль?')) return;
    cmsData.cars = cmsData.cars.filter(c => c.id !== id);
    saveCmsData();
    renderCarsGrid();
};

carEditForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const idVal = document.getElementById('editCarId').value;
    const fileInput = document.getElementById('editCarFile');
    const urlInput = document.getElementById('editCarUrl').value.trim();

    const commitCar = (finalImg) => {
        const existing = idVal ? cmsData.cars.find(c => c.id == idVal) : null;
        const payload = {
            id: idVal ? Number(idVal) : Date.now(),
            name: document.getElementById('editCarName').value.trim(),
            category: document.getElementById('editCarCategory').value.trim(),
            specs: document.getElementById('editCarSpecs').value.trim(),
            priceMin: Number(document.getElementById('editCarPriceMin').value),
            priceDay: Number(document.getElementById('editCarPriceDay').value),
            img: finalImg || (existing ? existing.img : 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80')
        };
        if (existing) Object.assign(existing, payload);
        else cmsData.cars.push(payload);
        saveCmsData();
        renderCarsGrid();
        carEditModal.classList.add('hidden');
    };

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = () => commitCar(reader.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        commitCar(urlInput);
    }
});

// Экспорт, импорт и сброс
document.getElementById('exportConfigBtn')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(cmsData, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'melldrive_config.json';
    a.click();
});

document.getElementById('importConfigInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const parsed = JSON.parse(reader.result);
            cmsData = {
                logoDataUrl: parsed.logoDataUrl || '',
                texts: { ...DEFAULT_CMS.texts, ...(parsed.texts || {}) },
                cars: Array.isArray(parsed.cars) && parsed.cars.length ? parsed.cars : structuredClone(DEFAULT_CMS.cars)
            };
            saveCmsData();
            renderSiteContent();
            renderCarsGrid();
            alert('Конфигурация загружена!');
        } catch {
            alert('Некорректный JSON-файл.');
        }
    };
    reader.readAsText(file);
});

document.getElementById('resetConfigBtn')?.addEventListener('click', () => {
    if (!confirm('Сбросить все локальные изменения и вернуть изначальный вид?')) return;
    localStorage.removeItem(STORAGE_KEY);
    cmsData = structuredClone(DEFAULT_CMS);
    renderSiteContent();
    renderCarsGrid();
});

// Заглушка для ссылок ещё не созданных страниц
const stubModal = document.getElementById('stubModal');
document.querySelectorAll('[data-stub]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('stubModalText').textContent =
            `Раздел «${el.getAttribute('data-stub')}» запланирован в следующих этапах практики и будет подключён на этапе многостраничной вёрстки и бэкенда.`;
        stubModal.classList.remove('hidden');
    });
});
document.getElementById('closeStubModalBtn')?.addEventListener('click', () => stubModal.classList.add('hidden'));

// Фильтры, тема, бургер
document.getElementById('categoryFilter')?.addEventListener('change', renderCarsGrid);
document.getElementById('priceSort')?.addEventListener('change', renderCarsGrid);

document.getElementById('themeToggle')?.addEventListener('click', (e) => {
    document.body.classList.toggle('light-theme');
    e.target.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
});

document.getElementById('burgerBtn')?.addEventListener('click', () => {
    document.getElementById('mainNav')?.classList.toggle('open');
});

renderSiteContent();
renderCarsGrid();
