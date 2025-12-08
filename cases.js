const caseStudies = [
    {
        id: 1,
        title: "«СпецГрузТранс»: внедрение CRM",
        company: "СпецГрузТранс",
        industry: ["Логистика"],
        metrics: ["MQL", "Brand Recall", "SQL"],
        result: "75% - 100%",
        complexity: "Средняя",
        shortDescription: "Внедрение CRM с полной перестройкой бизнес-процессов",
        fullDescription: "Компания «СпецГрузТранс» работает на рынке логистики России уже более десяти лет, специализируясь на B2B-грузоперевозках для бизнес-клиентов по всей стране. До недавнего времени основной рабочий инструмент был Excel, а клиентская база данных существовала в разрозненных файлах у нескольких менеджеров.",
        results: {
            mql: "+45%",
            brandRecall: "+35%",
            sql: "+90%",
            winRate: "45% vs 20%",
            salesCycle: "16 дней vs 32 дня",
            profit: "+40%"
        }
    },
    {
        id: 2,
        title: "Amazon Business: Рост осведомленности о бренде на 590 б.п.",
        company: "Amazon Business",
        industry: ["Электронная коммерция"],
        metrics: ["CPM", "CTR", "CPL", "LTV", "NPS"],
        result: "75% - 100%",
        complexity: "Средняя",
        shortDescription: "Комплексная кампания по повышению узнаваемости бренда",
        fullDescription: "Крупнейшая платформа электронной коммерции запустила целенаправленную кампанию по увеличению узнаваемости бренда среди B2B-клиентов с использованием таргетированной рекламы, контент-маркетинга и партнерских программ.",
        results: {
            brandAwareness: "+590 б.п.",
            ctr: "+22%",
            ltv: "+35%",
            nps: "+40"
        }
    },
    {
        id: 3,
        title: "P7-Офис. Как B2B-компания получила 40% дополнительных заявок",
        company: "P7-Офис",
        industry: ["IT"],
        metrics: ["Search Lift", "Visit Lift"],
        result: "75% - 100%",
        complexity: "Сложная",
        shortDescription: "Оптимизация поискового маркетинга для B2B-компании",
        fullDescription: "P7-Офис, российский разработчик офисного ПО, добился роста заявок на 40% за счет комплексной оптимизации поискового маркетинга, реструктуризации сайта и внедрения сквозной аналитики.",
        results: {
            searchTraffic: "+65%",
            conversions: "+40%",
            cpl: "-25%",
            roi: "+180%"
        }
    },
    {
        id: 4,
        title: "Увеличение заявок на 40% в B2B-логистике",
        company: "ЛогистПро",
        industry: ["Логистика"],
        metrics: ["Reach", "CTR", "CPL"],
        result: "50% - 75%",
        complexity: "Средняя",
        shortDescription: "Таргетированная рекламная кампания для логистической компании",
        fullDescription: "Компания по грузоперевозкам увеличила количество заявок на 40% через запуск таргетированной рекламы в соцсетях и поисковых системах с акцентом на B2B-аудиторию.",
        results: {
            leads: "+40%",
            ctr: "+18%",
            cpl: "-15%",
            reach: "+120%"
        }
    }
];
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
