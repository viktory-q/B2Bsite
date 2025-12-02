// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const casesContainer = document.getElementById('casesContainer');
    const openFiltersBtn = document.getElementById('openFilters');
    const filterModal = document.getElementById('filterModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const casesCount = document.getElementById('casesCount');
    
    // Текущие фильтры
    let currentFilters = {
        industry: [],
        result: [],
        complexity: [],
        metrics: []
    };
    
    // Инициализация
    renderCases(caseStudies);
    updateCasesCount(caseStudies.length);
    
    // Открытие модального окна
    openFiltersBtn.addEventListener('click', () => {
        filterModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие модального окна
    closeModalBtn.addEventListener('click', closeModal);
    filterModal.addEventListener('click', (e) => {
        if (e.target === filterModal) {
            closeModal();
        }
    });
    
    // Применение фильтров
    applyFiltersBtn.addEventListener('click', () => {
        collectFilters();
        const filteredCases = filterCases();
        renderCases(filteredCases);
        updateCasesCount(filteredCases.length);
        closeModal();
    });
    
    // Сброс фильтров
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Функции
    function closeModal() {
        filterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function collectFilters() {
        currentFilters = {
            industry: getCheckedValues('industry'),
            result: getCheckedValues('result'),
            complexity: getCheckedValues('complexity'),
            metrics: getCheckedValues('metrics')
        };
    }
    
    function getCheckedValues(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }
    
    function filterCases() {
        return caseStudies.filter(caseItem => {
            // Проверка по направлению деятельности
            const industryMatch = currentFilters.industry.length === 0 || 
                                 currentFilters.industry.some(filter => 
                                     caseItem.industry.includes(filter));
            
            // Проверка по результату
            const resultMatch = currentFilters.result.length === 0 || 
                               currentFilters.result.includes(caseItem.result);
            
            // Проверка по сложности
            const complexityMatch = currentFilters.complexity.length === 0 || 
                                   currentFilters.complexity.includes(caseItem.complexity);
            
            // Проверка по метрикам
            const metricsMatch = currentFilters.metrics.length === 0 || 
                               currentFilters.metrics.some(filter => 
                                   caseItem.metrics.includes(filter));
            
            return industryMatch && resultMatch && complexityMatch && metricsMatch;
        });
    }
    
    function resetFilters() {
        // Сброс чекбоксов
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Сброс фильтров
        currentFilters = {
            industry: [],
            result: [],
            complexity: [],
            metrics: []
        };
        
        // Показать все кейсы
        renderCases(caseStudies);
        updateCasesCount(caseStudies.length);
        closeModal();
    }
    
    function renderCases(cases) {
        casesContainer.innerHTML = '';
        
        if (cases.length === 0) {
            casesContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Кейсы не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            `;
            return;
        }
        
        cases.forEach(caseItem => {
            const caseCard = createCaseCard(caseItem);
            casesContainer.appendChild(caseCard);
        });
    }
    
    function createCaseCard(caseItem) {
        const card = document.createElement('div');
        card.className = 'case-card';
        
        // Определяем класс для бейджа сложности
        let complexityClass = 'complexity-medium';
        if (caseItem.complexity === 'Низкая') complexityClass = 'complexity-low';
        if (caseItem.complexity === 'Сложная') complexityClass = 'complexity-high';
        
        // Форматируем метрики
        const metricsHTML = caseItem.metrics.map(metric => 
            `<span class="metric-tag">${metric}</span>`
        ).join('');
        
        // Создаем HTML карточки
        card.innerHTML = `
            <h3>${caseItem.title}</h3>
            <p><strong>Компания:</strong> ${caseItem.company}</p>
            <p><strong>Направление:</strong> ${caseItem.industry.join(', ')}</p>
            <div>
                <strong>Метрики:</strong>
                <div class="metrics-tags">${metricsHTML}</div>
            </div>
            <p><strong>Результат:</strong> ${caseItem.result}</p>
            <p><strong>Сложность:</strong> 
                <span class="complexity-badge ${complexityClass}">${caseItem.complexity}</span>
            </p>
            <p style="margin-top: auto; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                <strong>Описание:</strong> ${caseItem.shortDescription}
            </p>
        `;
        
        // Добавляем клик для просмотра деталей
        card.addEventListener('click', () => {
            window.location.href = `case-detail.html?id=${caseItem.id}`;
        });
        
        return card;
    }
    
    function updateCasesCount(count) {
        casesCount.textContent = `Найдено кейсов: ${count}`;
    }
});