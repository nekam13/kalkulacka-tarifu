// Mobile Tariff Calculator - Bundle Version
// Loads data from external JSON files

let tariffData = [];
let operatorsProfiles = {};
let operatorArticles = {};

// ============ DATA LOADING ============
async function loadAllData() {
  try {
    // Load tariffs
    const tariffsResponse = await fetch('data/tariffs.json');
    if (tariffsResponse.ok) {
      tariffData = await tariffsResponse.json();
      console.log(`✅ Loaded ${tariffData.length} tariffs`);
    }

    // Load operators profiles
    const operatorsResponse = await fetch('data/operators.json');
    if (operatorsResponse.ok) {
      operatorsProfiles = await operatorsResponse.json();
      console.log(`✅ Loaded operators profiles`);
    }

    // Load operator articles
    const articlesResponse = await fetch('data/operator-articles.json');
    if (articlesResponse.ok) {
      operatorArticles = await articlesResponse.json();
      console.log(`✅ Loaded operator articles`);
    }

    console.log(`🚀 All data loaded successfully!`);

    // Initialize page based on current location
    if (document.getElementById('operatorTariffs')) {
      renderOperatorDetail();
    }

  } catch (error) {
    console.error('❌ Error loading data:', error);
    // Fallback to minimal functionality
    tariffData = [
      {"operator": "T-Mobile", "typ": "Předplacený", "tarif": "Balíček 10 GB", "cena_kc": 235, "data_gb": 10, "volani": "4,50 Kč/min", "sms": "1,90 Kč", "zavazek": "ne", "studentsky": "ne", "poznamka": "Současný stav uživatele", "hodnoceni": 7, "variantDesc": "Twist datový balíček", "validita": "30 dní", "tags": ["bez závazku"]}
    ];
  }
}

// ============ UTILITY FUNCTIONS ============
function computeValidity(t) {
  if (t.validita) return t.validita;
  const n = String(t.tarif || '').toLowerCase();
  if (/(den|day)/.test(n)) return '24 hodin';
  if (/(týden|tyden|week)/.test(n)) return '7 dní';
  if (/víkend|vikend/.test(n)) return 'víkend';
  if (/měsíc|mesic|month/.test(n)) return '30 dní';
  if (String(t.typ || '').toLowerCase().includes('předplacen')) return '30 dní';
  if (t.zavazek === 'ano') return 'měsíčně';
  return '30 dní';
}

function computeRenewal(t) {
  const v = computeValidity(t);
  if (v === '24 hodin') return 'jednorázový';
  if (v === '7 dní') return 'jednorázový';
  if (v === 'víkend') return 'jednorázový';
  if (v === '30 dní') return 'automatická obnova každých 30 dní';
  if (v === 'měsíčně') return 'měsíční fakturace';
  return 'automatická obnova';
}

function getOperatorClass(op) {
  const map = { 
    'T-Mobile': 'tmobile', 
    'O2': 'o2', 
    'Vodafone': 'vodafone', 
    'BLESKmobil': 'blesk', 
    'Kaktus': 'tmobile', 
    'ČEZ Mobil': 'o2', 
    'Emtéčko': 'o2' 
  };
  return map[op] || '';
}

function generateStars(r) {
  const full = Math.floor((r || 7) / 2);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}

// ============ DOM INITIALIZATION ============
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  updateDataValue();
  loadAllData(); // Load all JSON data
});

function setupEventListeners() {
  const dataSlider = document.getElementById('dataSlider');
  const unlimitedData = document.getElementById('unlimitedData');
  if (dataSlider) dataSlider.addEventListener('input', updateDataValue);
  if (unlimitedData) unlimitedData.addEventListener('change', toggleUnlimitedData);
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('change', updateSearchButton));
}

function updateDataValue() {
  const slider = document.getElementById('dataSlider');
  const val = document.getElementById('dataValue');
  if (slider && val) val.textContent = slider.value;
}

function toggleUnlimitedData() {
  const slider = document.getElementById('dataSlider');
  const unlimitedCheckbox = document.getElementById('unlimitedData');
  if (!slider || !unlimitedCheckbox) return;

  if (unlimitedCheckbox.checked) {
    slider.disabled = true;
    slider.style.opacity = '0.5';
    const val = document.getElementById('dataValue');
    if (val) val.textContent = '∞';
  } else {
    slider.disabled = false;
    slider.style.opacity = '1';
    updateDataValue();
  }
}

function updateSearchButton() {
  const button = document.querySelector('.search-button');
  if (button) {
    button.style.opacity = '1';
    button.disabled = false;
  }
}

// ============ MAIN CALCULATOR ============
function findBestTariffs() {
  if (tariffData.length === 0) {
    alert('Data se ještě načítají, zkuste za chvilku...');
    return;
  }

  const prefs = getUserPreferences();
  const filtered = filterTariffs(prefs);
  const sorted = sortTariffs(filtered, prefs);
  displayResults(sorted.slice(0, 5), prefs);
  displayComparisonTable(sorted.slice(0, 5));

  const rs = document.getElementById('resultsSection');
  const cs = document.getElementById('comparisonSection');
  if (rs) rs.style.display = 'block';
  if (cs) cs.style.display = 'block';
  if (rs) rs.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getUserPreferences() {
  const unlimitedData = document.getElementById('unlimitedData')?.checked || false;
  const slider = document.getElementById('dataSlider');
  const dataAmount = unlimitedData ? 999 : (slider ? parseInt(slider.value) : 10);

  return {
    dataAmount,
    unlimitedData,
    isStudent: document.getElementById('isStudent')?.checked || false,
    noContract: document.getElementById('noContract')?.checked || false,
    unlimitedCalls: document.getElementById('unlimitedCalls')?.checked || false,
    preferredOperator: document.getElementById('operatorSelect')?.value || 'all',
  };
}

function filterTariffs(p) {
  return tariffData.filter(t => {
    if (p.unlimitedData) {
      if (t.data_gb < 999) return false;
    } else {
      if (t.data_gb < p.dataAmount && t.data_gb < 999) return false;
    }
    if (p.noContract && t.zavazek === 'ano') return false;
    if (p.unlimitedCalls && !String(t.volani).includes('neomezené')) return false;
    if (p.preferredOperator !== 'all') {
      if (p.preferredOperator === 'virtual') {
        if (!['BLESKmobil', 'Kaktus', 'ČEZ Mobil', 'Emtéčko'].includes(t.operator)) return false;
      } else if (t.operator !== p.preferredOperator) return false;
    }
    return true;
  });
}

function sortTariffs(list, p) {
  return list.slice().sort((a, b) => score(b, p) - score(a, p));
}

function score(t, p) {
  let s = (t.hodnoceni || 7) * 10;
  s += Math.max(0, 1000 - (t.cena_kc || 0)) / 10;
  s += (t.data_gb >= 999) ? 50 : Math.min(t.data_gb || 0, 100);
  if (p.isStudent && (t.studentsky === 'ano' || String(t.poznamka).includes('ISIC'))) s += 30;
  if (p.noContract && t.zavazek === 'ne') s += 20;
  if (p.unlimitedCalls && String(t.volani).includes('neomezené')) s += 25;
  if (String(t.typ).includes('AKCE') || (t.tags && t.tags.includes('akce'))) s += 15;
  return s;
}

// ============ RESULTS DISPLAY ============
function displayResults(tariffs, prefs) {
  const c = document.getElementById('resultsContainer');
  if (!c) return;
  c.innerHTML = '';
  tariffs.forEach((t, i) => c.appendChild(createResultCard(t, i === 0, prefs)));
}

function createResultCard(t, isBest, prefs) {
  const card = document.createElement('div');
  card.className = `result-card ${getOperatorClass(t.operator)} ${isBest ? 'best' : ''}`;
  const dataText = (t.data_gb >= 999 ? 'Neomezená' : `${t.data_gb} GB`);
  const sav = calcSavingsText(t.cena_kc);
  const tagsHtml = (t.tags && t.tags.length) ? `<div class="result-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';

  card.innerHTML = `
    <div class="result-header">
      <div>
        <div class="result-operator">${t.operator}</div>
        <div class="result-tariff">${t.tarif}</div>
      </div>
      <div class="result-price">${t.cena_kc} Kč</div>
    </div>
    ${tagsHtml}
    <div class="result-details">
      <div class="detail-item"><div class="detail-label">Data</div><div class="detail-value">${dataText}</div></div>
      <div class="detail-item"><div class="detail-label">Volání</div><div class="detail-value">${t.volani}</div></div>
      <div class="detail-item"><div class="detail-label">SMS</div><div class="detail-value">${t.sms}</div></div>
      <div class="detail-item"><div class="detail-label">Závazek</div><div class="detail-value">${t.zavazek === 'ano' ? 'Ano' : 'Ne'}</div></div>
      <div class="detail-item"><div class="detail-label">Platnost</div><div class="detail-value">${computeValidity(t)}</div></div>
      <div class="detail-item"><div class="detail-label">Obnova</div><div class="detail-value">${computeRenewal(t)}</div></div>
    </div>
    ${t.variantDesc ? `<div class="result-notes">ℹ️ ${t.variantDesc}</div>` : ''}
    ${t.poznamka ? `<div class="result-notes">💡 ${t.poznamka}</div>` : ''}
    <div class="result-rating"><span class="stars">${generateStars(t.hodnoceni || 7)}</span><span>(${t.hodnoceni || 7}/10)</span>${sav ? `<span style="margin-left:auto;color:var(--success-color);font-weight:600;">${sav}</span>` : ''}</div>
    ${isBest ? '<div style="background:var(--success-color);color:#fff;padding:0.5rem;text-align:center;border-radius:8px;margin-top:0.5rem;font-weight:600;">🏆 Nejlepší doporučení</div>' : ''}
  `;
  return card;
}

function calcSavingsText(price) {
  const current = 235;
  const diff = current - (price || 0);
  if (diff > 0) return `Úspora: ${diff} Kč/měs`;
  if (diff < 0) return `+${Math.abs(diff)} Kč/měs`;
  return '';
}

function displayComparisonTable(tariffs) {
  const tbody = document.querySelector('#comparisonTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  tariffs.forEach(t => {
    const tr = document.createElement('tr');
    const dataText = (t.data_gb >= 999 ? 'Neomezená' : `${t.data_gb} GB`);
    tr.innerHTML = `
      <td><strong>${t.operator}</strong></td>
      <td>${t.tarif}</td>
      <td><strong>${t.cena_kc} Kč</strong></td>
      <td>${dataText}</td>
      <td>${t.volani}</td>
      <td>${t.sms}</td>
      <td>${t.zavazek === 'ano' ? 'Ano' : 'Ne'}</td>
      <td>${generateStars(t.hodnoceni || 7)} (${t.hodnoceni || 7})</td>
    `;
    tbody.appendChild(tr);
  });
}

// ============ OPERATOR DETAIL PAGES ============
function getQueryParam(name) {
  try {
    return new URL(window.location.href).searchParams.get(name);
  } catch (e) {
    return null;
  }
}

function renderOperatorDetail() {
  const op = getQueryParam('op');
  if (!op) return;

  const title = document.getElementById('operatorTitle');
  if (title) title.textContent = op;

  const info = document.getElementById('operatorInfo');
  const list = document.getElementById('operatorTariffs');
  if (!info || !list) return;

  const meta = (operatorsProfiles && operatorsProfiles[op]) || { 
    desc: 'Informace nejsou k dispozici.', 
    type: '—', 
    network: '—', 
    color: '' 
  };
  const article = (operatorArticles && operatorArticles[op]) || { content: '' };

  info.classList.add('result-card', meta.color || '');
  const all = tariffData.filter(t => t.operator === op);

  info.innerHTML = `
    <div class="result-tariff">Přehled operátora</div>
    <p class="result-notes">${meta.desc}</p>
    ${article.content ? `<div class="operator-article">${article.content}</div>` : ''}
    <div class="result-details">
      <div class="detail-item"><div class="detail-label">Typ</div><div class="detail-value">${meta.type}</div></div>
      <div class="detail-item"><div class="detail-label">Síť</div><div class="detail-value">${meta.network}</div></div>
      <div class="detail-item"><div class="detail-label">Tarifů v databázi</div><div class="detail-value">${all.length}</div></div>
    </div>
    ${meta.pros ? `<div class="result-notes"><strong>Výhody:</strong> ${meta.pros.join(', ')}</div>` : ''}
    ${meta.cons ? `<div class="result-notes"><strong>Nevýhody:</strong> ${meta.cons.join(', ')}</div>` : ''}
  `;

  const cta = document.getElementById('ctaButtons');
  const links = meta.links || {};
  const linksSection = document.getElementById('linksSection');
  if (cta && (links.cenik || links.pokryti || links.eshop)) {
    cta.innerHTML = '';
    if (links.cenik) cta.innerHTML += `<a class="accent" href="${links.cenik}" target="_blank" rel="noopener">📄 Ceník</a>`;
    if (links.pokryti) cta.innerHTML += `<a class="secondary" href="${links.pokryti}" target="_blank" rel="noopener">🗺️ Pokrytí</a>`;
    if (links.eshop) cta.innerHTML += `<a href="${links.eshop}" target="_blank" rel="noopener">🛒 E‑shop</a>`;
    if (linksSection) linksSection.style.display = 'block';
  }

  renderTariffList(all, links);
  setupSearch(all, links);
  setupTagFilters(all, links);
}

function renderTariffList(items, links) {
  const list = document.getElementById('operatorTariffs');
  if (!list) return;

  list.innerHTML = '';
  items.forEach(t => {
    const dataText = (t.data_gb >= 999 ? 'Neomezená' : `${t.data_gb} GB`);
    const tagsHtml = (t.tags && t.tags.length) ? `<div class="result-tags">${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : '';
    const card = document.createElement('div');
    card.className = `result-card ${getOperatorClass(t.operator)}`;
    card.innerHTML = `
      <div class="result-header">
        <div>
          <div class="result-operator">${t.operator}</div>
          <div class="result-tariff">${t.tarif}</div>
        </div>
        <div class="result-price">${t.cena_kc} Kč</div>
      </div>
      ${tagsHtml}
      <div class="result-details">
        <div class="detail-item"><div class="detail-label">Data</div><div class="detail-value">${dataText}</div></div>
        <div class="detail-item"><div class="detail-label">Volání</div><div class="detail-value">${t.volani}</div></div>
        <div class="detail-item"><div class="detail-label">SMS</div><div class="detail-value">${t.sms}</div></div>
        <div class="detail-item"><div class="detail-label">Závazek</div><div class="detail-value">${t.zavazek === 'ano' ? 'Ano' : 'Ne'}</div></div>
        <div class="detail-item"><div class="detail-label">Platnost</div><div class="detail-value">${computeValidity(t)}</div></div>
        <div class="detail-item"><div class="detail-label">Obnova</div><div class="detail-value">${computeRenewal(t)}</div></div>
      </div>
      ${t.variantDesc ? `<div class="result-notes">ℹ️ ${t.variantDesc}</div>` : ''}
      ${t.poznamka ? `<div class="result-notes">💡 ${t.poznamka}</div>` : ''}
      <div class="cta-buttons">
        ${links.cenik ? `<a href="${links.cenik}" target="_blank" rel="noopener">📋 Objednat</a>` : ''}
      </div>
    `;
    list.appendChild(card);
  });
}

function setupSearch(allTariffs, links) {
  const search = document.getElementById('tariffSearch');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      const filtered = allTariffs.filter(t => 
        `${t.tarif} ${t.cena_kc} ${(t.tags || []).join(' ')}`.toLowerCase().includes(q)
      );
      renderTariffList(filtered, links);
    });
  }
}

function setupTagFilters(allTariffs, links) {
  const uniqueTags = [...new Set(allTariffs.flatMap(t => t.tags || []))];
  if (uniqueTags.length === 0) return;

  const search = document.getElementById('tariffSearch');
  const searchContainer = search?.parentElement;
  if (!searchContainer) return;

  // Remove existing filter buttons
  const existing = searchContainer.querySelector('.tag-filters');
  if (existing) existing.remove();

  const filterButtons = document.createElement('div');
  filterButtons.className = 'tag-filters';
  filterButtons.innerHTML = `
    <button class="tag-filter active" data-filter="all">Všechny</button>
    ${uniqueTags.map(tag => `<button class="tag-filter" data-filter="${tag}">${tag}</button>`).join('')}
  `;

  searchContainer.appendChild(filterButtons);

  filterButtons.addEventListener('click', (e) => {
    if (e.target.classList.contains('tag-filter')) {
      document.querySelectorAll('.tag-filter').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const filter = e.target.dataset.filter;
      const filtered = filter === 'all' ? allTariffs : allTariffs.filter(t => t.tags && t.tags.includes(filter));
      renderTariffList(filtered, links);
    }
  });
}
