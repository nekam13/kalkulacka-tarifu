// Mobile Tariff Calculator JavaScript

// Tariff data
const tariffData = [
  {"operator": "T-Mobile", "typ": "Předplacený", "tarif": "Balíček 10 GB", "cena_kc": 235, "data_gb": 10, "volani": "4,50 Kč/min", "sms": "1,90 Kč", "zavazek": "ne", "studentsky": "ne", "poznamka": "Současný stav uživatele", "hodnoceni": 7},
  {"operator": "BLESKmobil", "typ": "Virtuální AKCE", "tarif": "ULTRA30", "cena_kc": 299, "data_gb": 60, "volani": "z kreditu", "sms": "z kreditu", "zavazek": "ne", "studentsky": "ne", "poznamka": "Akce do 30.9.2025, pak 30GB za 599 Kč", "hodnoceni": 9},
  {"operator": "Vodafone", "typ": "Student", "tarif": "#jetovtobě Basic+", "cena_kc": 487, "data_gb": 999, "volani": "neomezené", "sms": "neomezené", "zavazek": "ano", "studentsky": "ano", "poznamka": "Do 26 let, ISIC, 4 Mb/s", "hodnoceni": 9},
  {"operator": "T-Mobile", "typ": "Student", "tarif": "NextU 12 GB", "cena_kc": 495, "data_gb": 12, "volani": "neomezené", "sms": "neomezené", "zavazek": "ano", "studentsky": "ano", "poznamka": "Do 26 let", "hodnoceni": 8},
  {"operator": "O2", "typ": "Student", "tarif": "YOU 10 GB", "cena_kc": 499, "data_gb": 10, "volani": "neomezené", "sms": "neomezené", "zavazek": "ano", "studentsky": "ano", "poznamka": "Do 26 let, Max 5G", "hodnoceni": 8},
  {"operator": "BLESKmobil", "typ": "Virtuální", "tarif": "STAR", "cena_kc": 499, "data_gb": 12, "volani": "neomezené", "sms": "neomezené", "zavazek": "ne", "studentsky": "ne", "poznamka": "Síť O2", "hodnoceni": 8},
  {"operator": "Kaktus", "typ": "Virtuální", "tarif": "16 GB", "cena_kc": 350, "data_gb": 16, "volani": "100 min", "sms": "100", "zavazek": "ne", "studentsky": "ne", "poznamka": "Síť T-Mobile", "hodnoceni": 8},
  {"operator": "O2", "typ": "Neomezený", "tarif": "NEO+ Stříbrný", "cena_kc": 699, "data_gb": 999, "volani": "neomezené", "sms": "neomezené", "zavazek": "ano", "studentsky": "ne", "poznamka": "20 Mb/s rychlost", "hodnoceni": 8},
  {"operator": "T-Mobile", "typ": "Předplacený", "tarif": "Balíček 15 GB", "cena_kc": 399, "data_gb": 15, "volani": "4,50 Kč/min", "sms": "1,90 Kč", "zavazek": "ne", "studentsky": "ne", "poznamka": "10+5 GB", "hodnoceni": 8},
  {"operator": "Vodafone", "typ": "Student", "tarif": "#jetovtobě Super+", "cena_kc": 657, "data_gb": 999, "volani": "neomezené", "sms": "neomezené", "zavazek": "ano", "studentsky": "ano", "poznamka": "Do 26 let, ISIC, 20 Mb/s", "hodnoceni": 9}
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Setup event listeners
    setupEventListeners();

    // Initialize slider display
    updateDataValue();
});

function setupEventListeners() {
    const dataSlider = document.getElementById('dataSlider');
    const unlimitedData = document.getElementById('unlimitedData');

    // Data slider events
    dataSlider.addEventListener('input', updateDataValue);
    unlimitedData.addEventListener('change', toggleUnlimitedData);

    // Form validation
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('change', updateSearchButton);
    });
}

function updateDataValue() {
    const slider = document.getElementById('dataSlider');
    const valueDisplay = document.getElementById('dataValue');
    valueDisplay.textContent = slider.value;
}

function toggleUnlimitedData() {
    const slider = document.getElementById('dataSlider');
    const unlimitedCheckbox = document.getElementById('unlimitedData');

    if (unlimitedCheckbox.checked) {
        slider.disabled = true;
        slider.style.opacity = '0.5';
        document.getElementById('dataValue').textContent = '∞';
    } else {
        slider.disabled = false;
        slider.style.opacity = '1';
        updateDataValue();
    }
}

function updateSearchButton() {
    const button = document.querySelector('.search-button');
    button.style.opacity = '1';
    button.disabled = false;
}

function findBestTariffs() {
    // Get user preferences
    const preferences = getUserPreferences();

    // Filter and sort tariffs
    const filteredTariffs = filterTariffs(preferences);
    const sortedTariffs = sortTariffs(filteredTariffs, preferences);

    // Display results
    displayResults(sortedTariffs.slice(0, 5), preferences);
    displayComparisonTable(sortedTariffs.slice(0, 5));

    // Show results sections
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('comparisonSection').style.display = 'block';

    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

function getUserPreferences() {
    const unlimitedData = document.getElementById('unlimitedData').checked;
    const dataAmount = unlimitedData ? 999 : parseInt(document.getElementById('dataSlider').value);

    return {
        dataAmount: dataAmount,
        unlimitedData: unlimitedData,
        isStudent: document.getElementById('isStudent').checked,
        noContract: document.getElementById('noContract').checked,
        unlimitedCalls: document.getElementById('unlimitedCalls').checked,
        preferredOperator: document.getElementById('operatorSelect').value
    };
}

function filterTariffs(preferences) {
    return tariffData.filter(tariff => {
        // Data amount filter
        if (preferences.unlimitedData) {
            if (tariff.data_gb < 999) return false;
        } else {
            if (tariff.data_gb < preferences.dataAmount && tariff.data_gb < 999) return false;
        }

        // Student filter
        if (preferences.isStudent) {
            if (tariff.studentsky === "ne" && !tariff.poznamka.includes("student") && !tariff.poznamka.includes("ISIC")) {
                // Allow non-student tariffs but boost student ones in scoring
            }
        }

        // No contract filter
        if (preferences.noContract && tariff.zavazek === "ano") {
            return false;
        }

        // Unlimited calls filter
        if (preferences.unlimitedCalls && !tariff.volani.includes("neomezené")) {
            return false;
        }

        // Operator preference filter
        if (preferences.preferredOperator !== "all") {
            if (preferences.preferredOperator === "virtual") {
                if (!["BLESKmobil", "Kaktus", "ČEZ Mobil", "Emtéčko"].includes(tariff.operator)) {
                    return false;
                }
            } else if (tariff.operator !== preferences.preferredOperator) {
                return false;
            }
        }

        return true;
    });
}

function sortTariffs(tariffs, preferences) {
    return tariffs.sort((a, b) => {
        let scoreA = calculateScore(a, preferences);
        let scoreB = calculateScore(b, preferences);

        return scoreB - scoreA; // Higher score first
    });
}

function calculateScore(tariff, preferences) {
    let score = tariff.hodnoceni * 10; // Base score from rating

    // Price scoring (lower price = higher score)
    score += Math.max(0, 1000 - tariff.cena_kc) / 10;

    // Data amount scoring
    if (tariff.data_gb >= 999) {
        score += 50; // Bonus for unlimited
    } else {
        score += Math.min(tariff.data_gb, 100); // More data = higher score
    }

    // Student bonus
    if (preferences.isStudent && (tariff.studentsky === "ano" || tariff.poznamka.includes("ISIC"))) {
        score += 30;
    }

    // No contract bonus
    if (preferences.noContract && tariff.zavazek === "ne") {
        score += 20;
    }

    // Unlimited calls bonus
    if (preferences.unlimitedCalls && tariff.volani.includes("neomezené")) {
        score += 25;
    }

    // Special promotion bonus
    if (tariff.typ.includes("AKCE")) {
        score += 15;
    }

    return score;
}

function displayResults(tariffs, preferences) {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    tariffs.forEach((tariff, index) => {
        const card = createResultCard(tariff, index === 0, preferences);
        container.appendChild(card);
    });
}

function createResultCard(tariff, isBest, preferences) {
    const card = document.createElement('div');
    card.className = `result-card ${getOperatorClass(tariff.operator)} ${isBest ? 'best' : ''}`;

    const dataDisplay = tariff.data_gb >= 999 ? 'Neomezená' : `${tariff.data_gb} GB`;
    const savings = calculateSavings(tariff.cena_kc, preferences);

    card.innerHTML = `
        <div class="result-header">
            <div>
                <div class="result-operator">${tariff.operator}</div>
                <div class="result-tariff">${tariff.tarif}</div>
            </div>
            <div class="result-price">${tariff.cena_kc} Kč</div>
        </div>

        <div class="result-details">
            <div class="detail-item">
                <div class="detail-label">Data</div>
                <div class="detail-value">${dataDisplay}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Volání</div>
                <div class="detail-value">${tariff.volani}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">SMS</div>
                <div class="detail-value">${tariff.sms}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Závazek</div>
                <div class="detail-value">${tariff.zavazek === 'ano' ? 'Ano' : 'Ne'}</div>
            </div>
        </div>

        ${tariff.poznamka ? `<div class="result-notes">💡 ${tariff.poznamka}</div>` : ''}

        <div class="result-rating">
            <span class="stars">${generateStars(tariff.hodnoceni)}</span>
            <span>(${tariff.hodnoceni}/10)</span>
            ${savings ? `<span style="margin-left: auto; color: var(--success-color); font-weight: 600;">${savings}</span>` : ''}
        </div>

        ${isBest ? '<div style="background: var(--success-color); color: white; padding: 0.5rem; text-align: center; border-radius: var(--radius-sm); margin-top: 1rem; font-weight: 600;">🏆 Nejlepší doporučení</div>' : ''}
    `;

    return card;
}

function getOperatorClass(operator) {
    const operatorMap = {
        'T-Mobile': 'tmobile',
        'O2': 'o2',
        'Vodafone': 'vodafone',
        'BLESKmobil': 'blesk',
        'Kaktus': 'tmobile',
        'ČEZ Mobil': 'o2',
        'Emtéčko': 'o2'
    };
    return operatorMap[operator] || '';
}

function calculateSavings(price, preferences) {
    const currentPrice = 235; // Current T-Mobile price from user's screenshot
    const difference = currentPrice - price;

    if (difference > 0) {
        return `Úspora: ${difference} Kč/měs`;
    } else if (difference < 0) {
        return `+${Math.abs(difference)} Kč/měs`;
    }
    return null;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '★'.repeat(fullStars) + 
           (halfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

function displayComparisonTable(tariffs) {
    const tbody = document.querySelector('#comparisonTable tbody');
    tbody.innerHTML = '';

    tariffs.forEach(tariff => {
        const row = document.createElement('tr');
        const dataDisplay = tariff.data_gb >= 999 ? 'Neomezená' : `${tariff.data_gb} GB`;

        row.innerHTML = `
            <td><strong>${tariff.operator}</strong></td>
            <td>${tariff.tarif}</td>
            <td><strong>${tariff.cena_kc} Kč</strong></td>
            <td>${dataDisplay}</td>
            <td>${tariff.volani}</td>
            <td>${tariff.sms}</td>
            <td>${tariff.zavazek === 'ano' ? 'Ano' : 'Ne'}</td>
            <td>${generateStars(tariff.hodnoceni)} (${tariff.hodnoceni})</td>
        `;

        tbody.appendChild(row);
    });
}