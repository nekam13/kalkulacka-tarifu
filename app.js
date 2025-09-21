// Mobile Tariff Calculator JavaScript (clean build)

// ============ DATA ============
const tariffData = [
  // T-Mobile — předplacené a akce
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Balíček 10 GB", cena_kc: 235, data_gb: 10, volani: "4,50 Kč/min", sms: "1,90 Kč", zavazek: "ne", studentsky: "ne", poznamka: "Současný stav uživatele", hodnoceni: 7, variantDesc: "Twist datový balíček s automatickou obnovou po 30 dnech."},
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Balíček 15 GB", cena_kc: 399, data_gb: 15, volani: "4,50 Kč/min", sms: "1,90 Kč", zavazek: "ne", studentsky: "ne", poznamka: "10+5 GB", hodnoceni: 8, variantDesc: "Vyšší objem dat pro náročnější používání bez závazku."},
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Den neomezeně", cena_kc: 69, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Jednodenní neomezená data – hodí se na cestování a akce."},
  {operator: "T-Mobile", typ: "Předplacený", tarif: "Týden neomezeně", cena_kc: 249, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Týdenní neomezené surfování bez závazku."},

  // T-Mobile — tarify
  {operator: "T-Mobile", typ: "Student", tarif: "NextU 12 GB", cena_kc: 495, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 8, variantDesc: "Studentský tarif s 12 GB a neomezeným voláním/SMS."},
  {operator: "T-Mobile", typ: "Klasický", tarif: "Next 12 GB", cena_kc: 745, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "Pořád online po vyčerpání", hodnoceni: 6, variantDesc: "Standardní tarif s garantovaným připojením i po vyčerpání."},
  {operator: "T-Mobile", typ: "Neomezený", tarif: "Next neomezeně (4 Mb/s)", cena_kc: 705, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "4 Mb/s", hodnoceni: 7, variantDesc: "Cenově dostupná neomezenka s omezenou rychlostí."},

  // O2 — tarify + data
  {operator: "O2", typ: "Student", tarif: "YOU 10 GB", cena_kc: 499, data_gb: 10, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "Do 26 let", hodnoceni: 8, variantDesc: "Studentský tarif pro mladé – 10 GB a neomezené volání/SMS."},
  {operator: "O2", typ: "Datový", tarif: "Data+ 30 GB", cena_kc: 649, data_gb: 30, volani: "3,50 Kč/min", sms: "1,50 Kč", zavazek: "ano", studentsky: "ne", poznamka: "Pouze data", hodnoceni: 7, variantDesc: "Datový tarif pro tablety/modemy, volání se platí dle spotřeby."},
  {operator: "O2", typ: "Neomezený", tarif: "NEO+ Stříbrný (20 Mb/s)", cena_kc: 699, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "20 Mb/s", hodnoceni: 8, variantDesc: "Neomezenka s rychlostním limitem pro většinu aktivit."},
  {operator: "O2", typ: "Klasický", tarif: "NEO+ Bronzový 12 GB", cena_kc: 749, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "12 GB s neomezeným voláním a SMS."},

  // Vodafone — tarify + akce
  {operator: "Vodafone", typ: "Student", tarif: "#jetovtobě Basic+ (4 Mb/s)", cena_kc: 487, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "ISIC", hodnoceni: 9, variantDesc: "Studentská neomezenka s rychlostí 4 Mb/s."},
  {operator: "Vodafone", typ: "Student", tarif: "#jetovtobě Super+ (20 Mb/s)", cena_kc: 657, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ano", poznamka: "ISIC", hodnoceni: 9, variantDesc: "Rychlejší studentská neomezenka s 20 Mb/s."},
  {operator: "Vodafone", typ: "Neomezený", tarif: "Red Basic+ (4 Mb/s)", cena_kc: 697, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "4 Mb/s", hodnoceni: 7, variantDesc: "Dostupná neomezenka s limitem rychlosti."},
  {operator: "Vodafone", typ: "Předplacený", tarif: "Den neomezeně", cena_kc: 79, data_gb: 999, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Jednodenní neomezená data ve Vodafonu."},

  // BLESKmobil — virtuál
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "ULTRA30 60 GB (akce)", cena_kc: 299, data_gb: 60, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "Akce do limitu", hodnoceni: 9, variantDesc: "Masivní porce dat bez závazku, ideální pro šetření."},
  {operator: "BLESKmobil", typ: "Virtuální", tarif: "STAR 12 GB", cena_kc: 499, data_gb: 12, volani: "neomezené", sms: "neomezené", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Vyvážený balíček pro pravidelné používání."},

  // Kaktus — virtuál
  {operator: "Kaktus", typ: "Virtuální", tarif: "10 GB (akce)", cena_kc: 250, data_gb: 10, volani: "z kreditu", sms: "z kreditu", zavazek: "ne", studentsky: "ne", poznamka: "Akční cena", hodnoceni: 8, variantDesc: "Levný datový balíček na předplacence."},
  {operator: "Kaktus", typ: "Virtuální", tarif: "16 GB", cena_kc: 350, data_gb: 16, volani: "100 min", sms: "100", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 8, variantDesc: "Větší dávka dat s balíčkem minut a SMS."},

  // ČEZ Mobil — virtuál
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "8 GB", cena_kc: 549, data_gb: 8, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Základní tarif s neomezeným voláním a 8 GB."},
  {operator: "ČEZ Mobil", typ: "Virtuální", tarif: "Neomezený", cena_kc: 699, data_gb: 999, volani: "neomezené", sms: "neomezené", zavazek: "ano", studentsky: "ne", poznamka: "", hodnoceni: 7, variantDesc: "Neomezená data v síti O2 pod značkou ČEZ."},

  // Emtéčko — virtuál
  {operator: "Emtéčko", typ: "Virtuální", tarif: "MAXI 10 GB", cena_kc: 359, data_gb: 10, volani: "300 min v síti", sms: "300 v síti", zavazek: "ne", studentsky: "ne", poznamka: "", hodnoceni: 6, variantDesc: "Cenově dostupný balíček pro méně náročné."},
];

// ============ UI INIT ============
document.addEventListener('DOMContentLoaded', function () {
  setupEventListeners();
  updateDataValue();
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
    slider.disabled = true; slider.style.opacity = '0.5';
    const val = document.getElementById('dataValue'); if (val) val.textContent = '∞';
  } else {
    slider.disabled = false; slider.style.opacity = '1'; updateDataValue();
  }
}

function updateSearchButton() {
  const button = document.querySelector('.search-button');
  if (button) { button.style.opacity = '1'; button.disabled = false; }
}

// ============ FILTER + SCORE ============
function findBestTariffs() {
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
    if (p.unlimitedData) { if (t.data_gb < 999) return false; } else { if (t.data_gb < p.dataAmount && t.data_gb < 999) return false; }
    if (p.noContract && t.zavazek === 'ano') return false;
    if (p.unlimitedCalls && !String(t.volani).includes('neomezené')) return false;
    if (p.preferredOperator !== 'all') {
      if (p.preferredOperator === 'virtual') {
        if (!['BLESKmobil','Kaktus','ČEZ Mobil','Emtéčko'].includes(t.operator)) return false;
      } else if (t.operator !== p.preferredOperator) return false;
    }
    return true;
  });
}

function sortTariffs(list, p) {
  return list.slice().sort((a,b)=> score(b,p)-score(a,p));
}

function score(t, p){
  let s = (t.hodnoceni||7) * 10;
  s += Math.max(0, 1000 - (t.cena_kc||0)) / 10;
  s += (t.data_gb >= 999) ? 50 : Math.min(t.data_gb||0, 100);
  if (p.isStudent && (t.studentsky === 'ano' || String(t.poznamka).includes('ISIC'))) s += 30;
  if (p.noContract && t.zavazek === 'ne') s += 20;
  if (p.unlimitedCalls && String(t.volani).includes('neomezené')) s += 25;
  if (String(t.typ).includes('AKCE')) s += 15;
  return s;
}

// ============ RESULTS RENDER ============
function displayResults(tariffs, prefs) {
  const c = document.getElementById('resultsContainer'); if (!c) return; c.innerHTML='';
  tariffs.forEach((t,i)=> c.appendChild(createResultCard(t, i===0, prefs)) );
}

function createResultCard(t, isBest, prefs){
  const card = document.createElement('div');
  card.className = `result-card ${getOperatorClass(t.operator)} ${isBest ? 'best' : ''}`;
  const dataText = (t.data_gb>=999?'Neomezená':`${t.data_gb} GB`);
  const sav = calcSavingsText(t.cena_kc);
  card.innerHTML = `
    <div class="result-header">
      <div>
        <div class="result-operator">${t.operator}</div>
        <div class="result-tariff">${t.tarif}</div>
      </div>
      <div class="result-price">${t.cena_kc} Kč</div>
    </div>
    <div class="result-details">
      <div class="detail-item"><div class="detail-label">Data</div><div class="detail-value">${dataText}</div></div>
      <div class="detail-item"><div class="detail-label">Volání</div><div class="detail-value">${t.volani}</div></div>
      <div class="detail-item"><div class="detail-label">SMS</div><div class="detail-value">${t.sms}</div></div>
      <div class="detail-item"><div class="detail-label">Závazek</div><div class="detail-value">${t.zavazek==='ano'?'Ano':'Ne'}</div></div>
    </div>
    ${t.variantDesc ? `<div class="result-notes">ℹ️ ${t.variantDesc}</div>` : ''}
    ${t.poznamka ? `<div class="result-notes">💡 ${t.poznamka}</div>` : ''}
    <div class="result-rating"><span class="stars">${generateStars(t.hodnoceni||7)}</span><span>(${t.hodnoceni||7}/10)</span>${sav?`<span style="margin-left:auto;color:var(--success-color);font-weight:600;">${sav}</span>`:''}</div>
    ${isBest ? '<div style="background:var(--success-color);color:#fff;padding:0.5rem;text-align:center;border-radius:8px;margin-top:0.5rem;font-weight:600;">🏆 Nejlepší doporučení</div>' : ''}
  `;
  return card;
}

function calcSavingsText(price){
  const current = 235; // reference
  const diff = current - (price||0);
  if (diff>0) return `Úspora: ${diff} Kč/měs`;
  if (diff<0) return `+${Math.abs(diff)} Kč/měs`;
  return '';
}

function displayComparisonTable(tariffs){
  const tbody = document.querySelector('#comparisonTable tbody'); if (!tbody) return; tbody.innerHTML = '';
  tariffs.forEach(t=>{
    const tr = document.createElement('tr');
    const dataText = (t.data_gb>=999?'Neomezená':`${t.data_gb} GB`);
    tr.innerHTML = `
      <td><strong>${t.operator}</strong></td>
      <td>${t.tarif}</td>
      <td><strong>${t.cena_kc} Kč</strong></td>
      <td>${dataText}</td>
      <td>${t.volani}</td>
      <td>${t.sms}</td>
      <td>${t.zavazek==='ano'?'Ano':'Ne'}</td>
      <td>${generateStars(t.hodnoceni||7)} (${t.hodnoceni||7})</td>
    `;
    tbody.appendChild(tr);
  });
}

function generateStars(r){
  const full = Math.floor((r||7)/2); const empty = 5-full; return '★'.repeat(full)+'☆'.repeat(empty);
}

// ============ OPERATOR DETAIL ============
function getQueryParam(name){ try{ return new URL(window.location.href).searchParams.get(name);}catch(e){return null;} }

function getOperatorClass(op){
  const map = {'T-Mobile':'tmobile','O2':'o2','Vodafone':'vodafone','BLESKmobil':'blesk','Kaktus':'tmobile','ČEZ Mobil':'o2','Emtéčko':'o2'};
  return map[op]||'';
}

let operatorsProfiles = {};
fetch('data/operators.json').then(r=>r.ok?r.json():{}).then(d=>{operatorsProfiles=d||{}; if(document.getElementById('operatorTariffs')) renderOperatorDetail();}).catch(()=>{});

function renderOperatorDetail(){
  const op = getQueryParam('op'); if(!op) return;
  const title = document.getElementById('operatorTitle'); if (title) title.textContent = op;
  const info = document.getElementById('operatorInfo');
  const list = document.getElementById('operatorTariffs'); if(!info||!list) return;

  const meta = (operatorsProfiles && operatorsProfiles[op]) || {desc:'Informace nejsou k dispozici.', type:'—', network:'—', color:''};
  info.classList.add('result-card', meta.color||'');
  const all = tariffData.filter(t=>t.operator===op);
  info.innerHTML = `
    <div class="result-tariff">Přehled operátora</div>
    <p class="result-notes">${meta.desc}</p>
    <div class="result-details">
      <div class="detail-item"><div class="detail-label">Typ</div><div class="detail-value">${meta.type}</div></div>
      <div class="detail-item"><div class="detail-label">Síť</div><div class="detail-value">${meta.network}</div></div>
      <div class="detail-item"><div class="detail-label">Tarifů v databázi</div><div class="detail-value">${all.length}</div></div>
    </div>
    ${meta.pros?`<div class="result-notes"><strong>Výhody:</strong> ${meta.pros.join(', ')}</div>`:''}
    ${meta.cons?`<div class="result-notes"><strong>Nevýhody:</strong> ${meta.cons.join(', ')}</div>`:''}
  `;

  const cta = document.getElementById('ctaButtons'); const links = meta.links||{}; const linksSection = document.getElementById('linksSection');
  if (cta && (links.cenik||links.pokryti||links.eshop)){
    cta.innerHTML='';
    if (links.cenik) cta.innerHTML += `<a class="accent" href="${links.cenik}" target="_blank" rel="noopener">📄 Ceník</a>`;
    if (links.pokryti) cta.innerHTML += `<a class="secondary" href="${links.pokryti}" target="_blank" rel="noopener">🗺️ Pokrytí</a>`;
    if (links.eshop) cta.innerHTML += `<a href="${links.eshop}" target="_blank" rel="noopener">🛒 E‑shop</a>`;
    if (linksSection) linksSection.style.display='block';
  }

  const renderList = (items)=>{
    list.innerHTML='';
    items.forEach(t=>{
      const dataText = (t.data_gb>=999?'Neomezená':`${t.data_gb} GB`);
      const card = document.createElement('div'); card.className = `result-card ${getOperatorClass(t.operator)}`;
      card.innerHTML = `
        <div class="result-header"><div><div class="result-operator">${t.operator}</div><div class="result-tariff">${t.tarif}</div></div><div class="result-price">${t.cena_kc} Kč</div></div>
        <div class="result-details">
          <div class="detail-item"><div class="detail-label">Data</div><div class="detail-value">${dataText}</div></div>
          <div class="detail-item"><div class="detail-label">Volání</div><div class="detail-value">${t.volani}</div></div>
          <div class="detail-item"><div class="detail-label">SMS</div><div class="detail-value">${t.sms}</div></div>
          <div class="detail-item"><div class="detail-label">Závazek</div><div class="detail-value">${t.zavazek==='ano'?'Ano':'Ne'}</div></div>
        </div>
        ${t.variantDesc?`<div class="result-notes">ℹ️ ${t.variantDesc}</div>`:''}
        ${t.poznamka?`<div class="result-notes">💡 ${t.poznamka}</div>`:''}
      `;
      list.appendChild(card);
    });
  }

  renderList(all);
  const search = document.getElementById('tariffSearch');
  if (search){ search.addEventListener('input', ()=>{ const q = search.value.toLowerCase(); renderList(all.filter(t=>`${t.tarif} ${t.cena_kc}`.toLowerCase().includes(q))); }); }
}
