window.MELLDRIVE_MODELS_KEY = 'melldrive_fleet_models_v3';

window.MELLDRIVE_DEFAULT_MODELS = [
    // Эконом
    {
        modelId: 'priora',
        name: 'Lada Priora',
        category: 'Эконом',
        specs: 'МКПП • 1.6 л (98 л.с.) • Кондиционер',
        priceMin: 9,
        priceHour: 500,
        priceDay: 10000,
        img: 'assets/img/cars/priora.jpg',
        plates: ['А101МР77', 'В102МР77', 'Е103МР190']
    },
    {
        modelId: 'vaz-2107',
        name: 'ВАЗ 2107',
        category: 'Эконом',
        specs: 'МКПП • Классика • Задний привод',
        priceMin: 6,
        priceHour: 300,
        priceDay: 7000,
        img: 'assets/img/cars/2107.jpg',
        plates: ['К207ТТ77', 'М208ТТ190', 'Н209ТТ777']
    },
    {
        modelId: 'vaz-2114',
        name: 'ВАЗ 2114',
        category: 'Эконом',
        specs: 'МКПП • 1.6 л • Передний привод',
        priceMin: 8,
        priceHour: 400,
        priceDay: 11000,
        img: 'assets/img/cars/2114.jpg',
        plates: ['О214АА77', 'Р215АА190', 'С216АА777']
    },
    {
        modelId: 'granta-sport',
        name: 'Lada Granta Sport',
        category: 'Эконом',
        specs: 'МКПП • 118 л.с. • Спорт-подвеска',
        priceMin: 9,
        priceHour: 500,
        priceDay: 10000,
        img: 'assets/img/cars/granta-sport.jpg',
        plates: ['Т301СП77', 'У302СП190', 'Х303СП777']
    },

    // Комфорт
    {
        modelId: 'rapid',
        name: 'Skoda Rapid',
        category: 'Комфорт',
        specs: 'АКПП • 1.6 л • Климат-контроль',
        priceMin: 12,
        priceHour: 600,
        priceDay: 16000,
        img: 'assets/img/cars/rapid.jpg',
        plates: ['А401КМ77', 'В402КМ190', 'Е403КМ777']
    },
    {
        modelId: 'solaris',
        name: 'Hyundai Solaris',
        category: 'Комфорт',
        specs: 'АКПП • 1.6 л • Подогрев сидений и руля',
        priceMin: 13,
        priceHour: 700,
        priceDay: 18000,
        img: 'assets/img/cars/solaris.jpg',
        plates: ['К411КМ77', 'М412КМ190', 'Н413КМ777']
    },
    {
        modelId: 'haval-jolion',
        name: 'Haval Jolion',
        category: 'Комфорт',
        specs: 'Робот • 1.5 Turbo • Камеры 360°',
        priceMin: 12,
        priceHour: 600,
        priceDay: 16000,
        img: 'assets/img/cars/haval-jolion.jpg',
        plates: ['О421КМ77', 'Р422КМ190', 'С423КМ777']
    },
    {
        modelId: 'omoda-c5',
        name: 'Omoda C5',
        category: 'Комфорт',
        specs: 'Вариатор • 1.5 Turbo • Панорама и CarPlay',
        priceMin: 12,
        priceHour: 600,
        priceDay: 16000,
        img: 'assets/img/cars/omoda-c5.jpg',
        plates: ['Т431КМ77', 'У432КМ190', 'Х433КМ777']
    },
    {
        modelId: 'geely-coolray',
        name: 'Geely Coolray',
        category: 'Комфорт',
        specs: 'Робот • 150 л.с. • Спорт-режим',
        priceMin: 11,
        priceHour: 550,
        priceDay: 15000,
        img: 'assets/img/cars/geely-coolray.jpg',
        plates: ['А441КМ77', 'В442КМ190', 'Е443КМ777']
    },

    // Суприм
    {
        modelId: 'audi-rs7',
        name: 'Audi RS7',
        category: 'Суприм',
        specs: 'АКПП • V8 600 л.с. • Quattro',
        priceMin: 40,
        priceHour: 2200,
        priceDay: 55000,
        img: 'assets/img/cars/audi-rs7.jpg',
        plates: ['А701СУ77', 'В702СУ190', 'Е703СУ777']
    },
    {
        modelId: 'bmw-m8',
        name: 'BMW M8',
        category: 'Суприм',
        specs: 'АКПП • V8 625 л.с. • M xDrive',
        priceMin: 40,
        priceHour: 2200,
        priceDay: 55000,
        img: 'assets/img/cars/bmw-m8.jpg',
        plates: ['К801СУ77', 'М802СУ190', 'Н803СУ777']
    },
    {
        modelId: 'porsche-911-turbo-s',
        name: 'Porsche 911 Turbo S',
        category: 'Суприм',
        specs: 'PDK • 650 л.с. • 0–100 за 2.7 с',
        priceMin: 45,
        priceHour: 2600,
        priceDay: 60000,
        img: 'assets/img/cars/porsche-911.jpg',
        plates: ['О911СУ77', 'Р912СУ190', 'С913СУ777']
    },
    {
        modelId: 'mercedes-e63-amg',
        name: 'Mercedes E63 AMG',
        category: 'Суприм',
        specs: 'АКПП • V8 612 л.с. • 4MATIC+',
        priceMin: 35,
        priceHour: 2000,
        priceDay: 50000,
        img: 'assets/img/cars/mercedes-e63.jpg',
        plates: ['Т631СУ77', 'У632СУ190', 'Х633СУ777']
    }
];

window.escapeHtml = function(val) {
    return String(val == null ? '' : val)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

window.normalizePlate = function(plate) {
    const map = {
        A: 'А', B: 'В', E: 'Е', K: 'К', M: 'М', H: 'Н',
        O: 'О', P: 'Р', C: 'С', T: 'Т', Y: 'У', X: 'Х'
    };
    return String(plate || '')
        .trim()
        .toUpperCase()
        .replace(/[\s\-]+/g, '')
        .replace(/[ABEKMHOPCTYX]/g, ch => map[ch] || ch);
};

window.getMellModels = function() {
    try {
        const raw = localStorage.getItem(window.MELLDRIVE_MODELS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length) return parsed;
        }
    } catch (e) {}
    return window.MELLDRIVE_DEFAULT_MODELS.map(m => ({ ...m, plates: [...m.plates] }));
};

window.saveMellModels = function(models) {
    localStorage.setItem(window.MELLDRIVE_MODELS_KEY, JSON.stringify(models));
};

window.resetMellModels = function() {
    const fresh = window.MELLDRIVE_DEFAULT_MODELS.map(m => ({ ...m, plates: [...m.plates] }));
    window.saveMellModels(fresh);
    return fresh;
};

window.MELLDRIVE_MODELS = window.getMellModels();

window.resolveCarImgPath = function(src, isSubPage) {
    if (!src) return isSubPage ? '../assets/img/cars/solaris.jpg' : 'assets/img/cars/solaris.jpg';
    if (/^(https?:|data:)/i.test(src)) return src;
    if (isSubPage) return src.startsWith('../') ? src : ('../' + src.replace(/^\/+/, ''));
    return src.replace(/^\.\.\//, '');
};

window.buildMellFleetUnits = function(isSubPage) {
    const models = window.getMellModels();
    const units = [];
    let idCounter = 1;
    models.forEach(m => {
        const plates = Array.isArray(m.plates) && m.plates.length ? m.plates : ['М001МД77'];
        plates.forEach((plate, copyIdx) => {
            units.push({
                id: idCounter++,
                modelId: m.modelId,
                copyNumber: copyIdx + 1,
                plate: window.normalizePlate(plate),
                name: m.name,
                category: m.category,
                specs: m.specs,
                priceMin: Number(m.priceMin),
                priceHour: Number(m.priceHour),
                priceDay: Number(m.priceDay),
                img: window.resolveCarImgPath(m.img, isSubPage)
            });
        });
    });
    return units;
};

window.getActiveBookingForPlate = function(plate) {
    const target = window.normalizePlate(plate);
    if (!target) return null;
    try {
        const list = JSON.parse(localStorage.getItem('melldrive_bookings_v1') || '[]');
        if (!Array.isArray(list)) return null;
        return list.find(b => b && b.status === 'Активна' && window.normalizePlate(b.plate) === target) || null;
    } catch (e) {
        return null;
    }
};

window.mellCarPlaceholder = function(imgEl, title, category) {
    if (!imgEl || imgEl.dataset.fallbackApplied) return;
    imgEl.dataset.fallbackApplied = '1';
    const safeTitle = window.escapeHtml(title);
    const safeCat = window.escapeHtml(String(category || '').toUpperCase());
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
        <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#1a1a28"/>
                <stop offset="100%" stop-color="#0d0d14"/>
            </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#g)"/>
        <text x="400" y="195" fill="#eab308" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" text-anchor="middle">${safeCat} • MELLDRIVE</text>
        <text x="400" y="245" fill="#f4f4f8" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="800" text-anchor="middle">${safeTitle}</text>
        <text x="400" y="290" fill="#9ca3af" font-family="Segoe UI, Arial, sans-serif" font-size="16" text-anchor="middle">Фото ожидает загрузки в assets/img/cars/</text>
    </svg>`;
    imgEl.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

/* MELLDRIVE_RATING_HELPER_START */
window.getModelRatingStats = function(modelId, carId) {
    let reviews = [];
    try {
        const raw = localStorage.getItem('melldrive_reviews_v1');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) reviews = parsed;
        }
    } catch (e) {}

    const matched = reviews.filter(r =>
        r &&
        r.status === 'Опубликован' &&
        ((modelId && r.modelId === modelId) || (carId != null && String(r.carId) === String(carId)))
    );

    if (!matched.length) {
        return { count: 0, avg: 0 };
    }
    const sum = matched.reduce((acc, item) => acc + Math.min(5, Math.max(1, Number(item.rating) || 5)), 0);
    return {
        count: matched.length,
        avg: Number((sum / matched.length).toFixed(1))
    };
};
/* MELLDRIVE_RATING_HELPER_END */

/* MELLDRIVE_MINUTE_BILLING_START */
window.formatDurationHms = function(totalSeconds) {
    const sec = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const pad = n => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};

window.calcLiveMinuteBooking = function(booking, nowMs) {
    if (!booking || !booking.isMinuteTariff) {
        return {
            isMinute: false,
            total: Number(booking && booking.total) || 0,
            elapsedSec: 0,
            billedMinutes: 0,
            formattedTime: ''
        };
    }

    const start = Number(booking.startedAtMs) || Date.now();
    const isFinished = booking.status !== 'Активна';
    const end = isFinished
        ? (Number(booking.endedAtMs) || start)
        : (Number(nowMs) || Date.now());

    const elapsedSec = Math.max(0, Math.floor((end - start) / 1000));
    const billedMinutes = isFinished && booking.billedMinutes
        ? Number(booking.billedMinutes)
        : Math.max(1, Math.ceil(elapsedSec / 60));

    const rateMin = Number(booking.priceMin) || 0;
    const extras = Number(booking.extrasCost) || 0;
    let total = billedMinutes * rateMin + extras;

    if (booking.promoCode === 'MELL10') total = total * 0.9;
    if (booking.promoCode === 'START300') total = Math.max(0, total - 300);

    return {
        isMinute: true,
        total: Math.round(total),
        elapsedSec,
        billedMinutes,
        formattedTime: window.formatDurationHms(elapsedSec)
    };
};

window.finalizeBookingRecord = function(booking, newStatus) {
    if (!booking) return booking;
    if (booking.isMinuteTariff && booking.status === 'Активна' && newStatus !== 'Активна') {
        const now = Date.now();
        const live = window.calcLiveMinuteBooking(booking, now);
        booking.endedAtMs = now;
        booking.endedAt = new Date(now).toLocaleString('ru-RU');
        booking.elapsedSeconds = live.elapsedSec;
        booking.billedMinutes = live.billedMinutes;
        booking.total = live.total;
        booking.tariff = `Поминутный (${live.billedMinutes} мин • ${live.formattedTime})`;
    }
    booking.status = newStatus;
    return booking;
};
/* MELLDRIVE_MINUTE_BILLING_END */
