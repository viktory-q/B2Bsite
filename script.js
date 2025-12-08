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
    
    renderCases(caseStudies);
    updateCasesCount(caseStudies.length);
    
    openFiltersBtn.addEventListener('click', () => {
        filterModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
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
            const industryMatch = currentFilters.industry.length === 0 || 
                                 currentFilters.industry.some(filter => 
                                     caseItem.industry.includes(filter));
            
            const resultMatch = currentFilters.result.length === 0 || 
                               currentFilters.result.includes(caseItem.result);
            
            const complexityMatch = currentFilters.complexity.length === 0 || 
                                   currentFilters.complexity.includes(caseItem.complexity);
            
            const metricsMatch = currentFilters.metrics.length === 0 || 
                               currentFilters.metrics.some(filter => 
                                   caseItem.metrics.includes(filter));
            
            return industryMatch && resultMatch && complexityMatch && metricsMatch;
        });
    }
    
    function resetFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        currentFilters = {
            industry: [],
            result: [],
            complexity: [],
            metrics: []
        };
        
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
    
    let complexityClass = 'complexity-medium';
    if (caseItem.complexity === 'Низкая') complexityClass = 'complexity-low';
    if (caseItem.complexity === 'Сложная') complexityClass = 'complexity-high';
    
    const metricsHTML = caseItem.metrics.map(metric => 
        `<span class="metric-tag" data-metric="${metric}" title="${metricDefinitions[metric] || metric}">${metric}</span>`
    ).join('');
    
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
    
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('metric-tag')) {
            window.location.href = `case-detail.html?id=${caseItem.id}`;
        }
    });
    
    addMetricTooltips(card);
    
    return card;
}

function addMetricTooltips(element) {
    const metricTags = element.querySelectorAll('.metric-tag');
    
    metricTags.forEach(tag => {
        const metric = tag.getAttribute('data-metric');
        const definition = metricDefinitions[metric];
        
        if (definition) {
            tag.addEventListener('mouseenter', (e) => {
                showTooltip(e.target, definition);
            });
            
            tag.addEventListener('mouseleave', () => {
                hideTooltip();
            });
        }
    });
}

let tooltip = null;

function showTooltip(element, text) {
    hideTooltip();
    
    tooltip = document.createElement('div');
    tooltip.className = 'metric-tooltip';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
}

function hideTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}
    
    function updateCasesCount(count) {
        casesCount.textContent = `Найдено кейсов: ${count}`;
    }
});

