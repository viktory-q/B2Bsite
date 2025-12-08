const metricDefinitions = {
    "MQL": "Marketing Qualified Lead - лид, который соответствует критериям маркетинга",
    "Brand Recall": "Способность потребителей вспомнить бренд без подсказок",
    "SQL": "Sales Qualified Lead - лид, готовый к продажам",
    "Win Rate": "Процент выигранных сделок от общего числа",
    "Sales Cycle": "Время от первого контакта до закрытия сделки",
    "Average Deal Size": "Средний размер сделки",
    "NPS": "Net Promoter Score - индекс лояльности клиентов",
    "Customer Retention Rate": "Процент удержанных клиентов",
    "CPM": "Cost Per Mille - стоимость 1000 показов",
    "CTR": "Click-Through Rate - процент кликов",
    "CPL": "Cost Per Lead - стоимость лида",
    "LTV": "Lifetime Value - пожизненная ценность клиента",
    "Search Lift": "Рост поисковых запросов по бренду",
    "Visit Lift": "Рост посещаемости сайта",
    "Target Lift Reach": "Охват целевой аудитории",
    "Impressions": "Количество показов рекламы",
    "Frequency": "Средняя частота показов на пользователя",
    "Video Views": "Количество просмотров видео",
    "Website Visitors": "Посетители веб-сайта",
    "Time to Response": "Время ответа на заявку",
    "Lead-to-Customer Rate": "Конверсия лидов в клиентов",
    "Repeat Purchase Rate": "Процент повторных покупок",
    "Revenue Growth": "Рост выручки",
    "Profit Growth": "Рост прибыли",
    "ROI/ROMI": "Return on Investment/Marketing Investment",
    "Cost Reduction": "Сокращение затрат",
    "Implementation Complexity": "Сложность внедрения",
    "Process Automation Level": "Уровень автоматизации процессов",
    "Integration Scope": "Объем интеграций",
    "Reach": "Охват аудитории"
};

document.addEventListener('DOMContentLoaded', function() {
    const casesContainer = document.getElementById('casesContainer');
    const openFiltersBtn = document.getElementById('openFilters');
    const filterModal = document.getElementById('filterModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const casesCount = document.getElementById('casesCount');
    
    let currentFilters = {
        industry: [],
        result: [],
        complexity: [],
        metrics: []
    };
    
    let tooltip = null;
    
    renderCases(caseStudies);
    updateCasesCount(caseStudies.length);
    
    openFiltersBtn.addEventListener('click', () => {
        filterModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        addTooltipsToFilterMetrics();
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    filterModal.addEventListener('click', (e) => {
        if (e.target === filterModal) {
            closeModal();
        }
    });
    
    applyFiltersBtn.addEventListener('click', () => {
        collectFilters();
        const filteredCases = filterCases();
        renderCases(filteredCases);
        updateCasesCount(filteredCases.length);
        closeModal();
    });
    
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    function closeModal() {
        filterModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        hideTooltip();
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
        const checkboxes = document.querySelectorAll(`input
