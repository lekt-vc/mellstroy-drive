window.MELLDRIVE_MODELS = [
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

window.buildMellFleetUnits = function(isSubPage) {
    const units = [];
    let idCounter = 1;
    window.MELLDRIVE_MODELS.forEach((m, mIdx) => {
        m.plates.forEach((plate, copyIdx) => {
            units.push({
                id: idCounter++,
                modelId: m.modelId,
                copyNumber: copyIdx + 1,
                plate: plate,
                name: m.name,
                category: m.category,
                specs: m.specs,
                priceMin: m.priceMin,
                priceHour: m.priceHour,
                priceDay: m.priceDay,
                img: isSubPage ? ('../' + m.img) : m.img
            });
        });
    });
    return units;
};

window.mellCarPlaceholder = function(imgEl, title, category) {
    if (!imgEl || imgEl.dataset.fallbackApplied) return;
    imgEl.dataset.fallbackApplied = '1';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
        <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#181824"/>
                <stop offset="100%" stop-color="#0d0d14"/>
            </linearGradient>
        </defs>
        <rect width="800" height="450" fill="url(#g)"/>
        <rect x="24" y="24" width="752" height="402" rx="18" fill="none" stroke="#eab308" stroke-opacity="0.35" stroke-width="2"/>
        <text x="400" y="205" fill="#eab308" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" text-anchor="middle">${category.toUpperCase()} • MELLDRIVE</text>
        <text x="400" y="250" fill="#f4f4f8" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="800" text-anchor="middle">${title}</text>
        <text x="400" y="290" fill="#9ca3af" font-family="Segoe UI, Arial, sans-serif" font-size="16" text-anchor="middle">Фото ожидает загрузки в assets/img/cars/</text>
    </svg>`;
    imgEl.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};
