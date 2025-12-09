const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.icon');
const filterButtons = document.querySelectorAll('.pill[data-filter]');
const regionSelect = document.getElementById('regionSelect');
const sortButtons = document.querySelectorAll('[data-sort]');
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

// Pulse references
const dealCountEl = document.getElementById('dealCount');
const dealValueEl = document.getElementById('dealValue');
const medianTicketEl = document.getElementById('medianTicket');
const investorCountEl = document.getElementById('investorCount');
const dealDeltaEl = document.getElementById('dealDelta');
const dealListEl = document.getElementById('dealList');
const sparkline = document.getElementById('sparkline');
const stageCanvas = document.getElementById('stageDonut');
const regionCanvas = document.getElementById('regionBars');
const growthCanvas = document.getElementById('growthLine');
const favoritesEl = document.getElementById('favorites');
const reportsEl = document.getElementById('reports');

// Companies references
const companySearch = document.getElementById('companySearch');
const companyFilters = document.querySelectorAll('[data-company-filter]');
const companyListEl = document.getElementById('companyList');
const fundListEl = document.getElementById('fundList');

// News references
const ownedNewsEl = document.getElementById('ownedNews');
const apiNewsEl = document.getElementById('apiNews');

// Learn references
const learnListEl = document.getElementById('learnList');
const videoListEl = document.getElementById('videoList');

let activeSort = 'recent';
let sparkData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 12) + 6);
let growthSeries = Array.from({ length: 12 }, () => Math.floor(Math.random() * 90) + 30);

const sampleDeals = [
  { name: 'Helio Robotics', value: 52, type: 'vc', region: 'americas', stage: 'Series B', investor: 'Arc Light Partners' },
  { name: 'BlueMesh Cloud', value: 120, type: 'pe', region: 'emea', stage: 'Growth', investor: 'Northbridge Equity' },
  { name: 'Qubit Forge', value: 18, type: 'vc', region: 'apac', stage: 'Seed', investor: 'Neon Ventures' },
  { name: 'OrbitEdge AI', value: 80, type: 'pe', region: 'americas', stage: 'Buyout', investor: 'Silver Ridge' },
  { name: 'NovaGrid Energy Tech', value: 45, type: 'vc', region: 'emea', stage: 'Series A', investor: 'Brightspark Capital' },
  { name: 'PulseStack Security', value: 33, type: 'vc', region: 'apac', stage: 'Series A', investor: 'LayerZero Labs' },
  { name: 'Streamline DevOps', value: 67, type: 'pe', region: 'global', stage: 'Minority', investor: 'Summit River' },
  { name: 'EdgeQuanta Photonics', value: 26, type: 'vc', region: 'americas', stage: 'Seed', investor: 'Signal Peak' },
  { name: 'AetherLink Compute', value: 95, type: 'pe', region: 'emea', stage: 'Growth', investor: 'Cobalt Grove' },
  { name: 'NanoWeave Chips', value: 140, type: 'pe', region: 'apac', stage: 'Buyout', investor: 'Constellation Capital' },
  { name: 'Terraform Robotics', value: 58, type: 'vc', region: 'global', stage: 'Series B', investor: 'HaloVentures' },
  { name: 'CloudJolt Observability', value: 22, type: 'vc', region: 'americas', stage: 'Series A', investor: 'FocalPoint Labs' },
];

const favorites = [
  { name: 'Frontier AI Safety', tag: 'PE · Americas', note: 'Follow-up diligence call Friday.' },
  { name: 'QuantumNet Grid', tag: 'VC · EMEA', note: 'Watch ARR trend + new CTO hire.' },
  { name: 'CloudMesh SASE', tag: 'VC · APAC', note: 'Saved for security infra thesis.' },
  { name: 'Helio Robotics', tag: 'VC · Robotics', note: 'Pinned from live feed.' },
];

const reports = [
  { title: 'State of Tech PE Q3', type: 'Report', time: 'Today · 9:12a' },
  { title: 'VC Deep-Dive: Applied AI Infra', type: 'Brief', time: 'Today · 8:00a' },
  { title: 'Latency Wars: Edge Cloud Consolidation', type: 'Article', time: 'Yesterday' },
];

const companies = [
  { name: 'LumenLayer', status: 'rising', metric: 'Growing 18% MoM · Series B', region: 'APAC' },
  { name: 'Voltrack Robotics', status: 'rising', metric: 'Pipeline +22% · Seed', region: 'Americas' },
  { name: 'CortexMesh', status: 'mature', metric: 'ARR $112M · Growth equity', region: 'EMEA' },
  { name: 'NeuraLinkage', status: 'rising', metric: 'AI infra · Series A', region: 'Global' },
  { name: 'SolarSynch', status: 'mature', metric: 'Infra · EBITDA positive', region: 'EMEA' },
];

const funds = [
  { name: 'Summit River Partners', focus: 'Growth PE · Cloud & DevOps', stat: '+2 portfolio adds this month' },
  { name: 'Neon Ventures', focus: 'VC · Applied AI & Robotics', stat: 'Lead investor in 3 rounds this quarter' },
  { name: 'Cobalt Grove Capital', focus: 'PE · Semiconductor supply chain', stat: 'New $1.2B fund just closed' },
  { name: 'Arc Light Partners', focus: 'VC · Climate tech', stat: 'Tracking 5 APAC prospects' },
];

const ownedNews = [
  { title: 'Capital Circuit Launches Frontier Tracker', source: 'Capital Circuit News', tag: 'Platform', time: '1h ago' },
  { title: 'Tech Deal Pace Holds Despite Rate Moves', source: 'Capital Circuit News', tag: 'Macro', time: '5h ago' },
];

const apiNews = [
  { title: 'AI Ops platform raises $70M Series C', source: 'API: TechCrunch', time: '10m ago' },
  { title: 'Edge robotics consolidator eyes roll-up', source: 'API: Reuters', time: '36m ago' },
  { title: 'SaaS infra multiples stabilize in Q4', source: 'API: Bloomberg', time: '1h ago' },
];

const learnItems = [
  { title: 'PE vs VC in tech: what changes?', detail: 'Explainers on ownership, timelines, and diligence.' },
  { title: 'How to read a term sheet', detail: 'Key clauses, investor rights, and founder protections.' },
  { title: 'Deal sourcing cadence', detail: 'Building repeatable pipelines with signals and alerts.' },
  { title: 'First 100 days in PE', detail: 'Value-creation levers, KPIs, and reporting rhythm.' },
];

const videos = [
  { title: 'Valuation 101 for students', length: '7:41', focus: 'Multiples & comps breakdown' },
  { title: 'How to diligence AI startups', length: '5:06', focus: 'Model risk, data moats, GTM' },
  { title: 'Portfolio monitoring basics', length: '6:12', focus: 'Dashboards, alerts, variance checks' },
];

function themeColor(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function formatCurrency(num) {
  return `$${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}M`;
}

function renderSummary(filteredDeals) {
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const median = filteredDeals
    .map((d) => d.value)
    .sort((a, b) => a - b)
    .at(Math.floor(filteredDeals.length / 2)) || 0;
  const investors = new Set(filteredDeals.map((d) => d.investor));

  dealCountEl.textContent = filteredDeals.length;
  dealValueEl.textContent = formatCurrency(totalValue);
  medianTicketEl.textContent = formatCurrency(median);
  investorCountEl.textContent = investors.size;
  dealDeltaEl.textContent = `+${(Math.random() * 3 + 1).toFixed(1)}% vs. last 30m`;
}

function renderDeals(filteredDeals) {
  dealListEl.innerHTML = '';
  const sorted = [...filteredDeals].sort((a, b) => {
    if (activeSort === 'value') return b.value - a.value;
    return b.timestamp - a.timestamp;
  });

  sorted.slice(0, 6).forEach((deal) => {
    const li = document.createElement('li');
    li.className = 'deal-item';
    li.innerHTML = `
      <div><strong>${deal.name}</strong><p class="muted">${deal.stage} · ${deal.region.toUpperCase()}</p></div>
      <div><span class="tag ${deal.type}">${deal.type.toUpperCase()}</span></div>
      <div><strong>${formatCurrency(deal.value)}</strong></div>
      <div class="muted">${deal.investor}</div>
    `;
    dealListEl.appendChild(li);
  });
}

function drawSparkline() {
  const ctx = sparkline.getContext('2d');
  const w = sparkline.width;
  const h = sparkline.height;
  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(...sparkData);
  const stepX = w / (sparkData.length - 1);

  ctx.beginPath();
  ctx.moveTo(0, h - (sparkData[0] / maxVal) * (h - 20) - 10);
  sparkData.forEach((val, idx) => {
    const x = idx * stepX;
    const y = h - (val / maxVal) * (h - 20) - 10;
    ctx.lineTo(x, y);
  });
  ctx.strokeStyle = themeColor('--accent');
  ctx.lineWidth = 3;
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, 'rgba(156, 175, 239, 0.35)');
  gradient.addColorStop(1, 'rgba(156, 175, 239, 0)');

  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
}

function drawStageDonut(stageCounts) {
  const ctx = stageCanvas.getContext('2d');
  const total = Object.values(stageCounts).reduce((sum, val) => sum + val, 0) || 1;
  ctx.clearRect(0, 0, stageCanvas.width, stageCanvas.height);

  const colors = ['#9cafef', '#c7e561', '#7ef1d1', '#f0a5ff', '#ffdf8a', '#93b5ff'];
  let start = -Math.PI / 2;
  let index = 0;

  Object.entries(stageCounts).forEach(([stage, count]) => {
    const slice = (count / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(stageCanvas.width / 2, stageCanvas.height / 2);
    ctx.arc(stageCanvas.width / 2, stageCanvas.height / 2, 90, start, start + slice);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    start += slice;
    index += 1;
  });

  ctx.beginPath();
  ctx.arc(stageCanvas.width / 2, stageCanvas.height / 2, 50, 0, Math.PI * 2);
  ctx.fillStyle = themeColor('--card') || '#0f1720';
  ctx.fill();

  ctx.fillStyle = themeColor('--text') || '#e7ecf7';
  ctx.font = 'bold 16px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('Stage mix', stageCanvas.width / 2, stageCanvas.height / 2 + 6);
}

function drawRegionBars(regionCounts) {
  const ctx = regionCanvas.getContext('2d');
  const regions = Object.keys(regionCounts);
  const values = Object.values(regionCounts);
  const maxVal = Math.max(...values, 1);

  ctx.clearRect(0, 0, regionCanvas.width, regionCanvas.height);
  const barWidth = 40;
  const gap = 22;
  regions.forEach((region, idx) => {
    const x = idx * (barWidth + gap) + 24;
    const height = (regionCounts[region] / maxVal) * 140;
    const y = regionCanvas.height - height - 30;

    const barGradient = ctx.createLinearGradient(0, y, 0, y + height);
    barGradient.addColorStop(0, themeColor('--accent'));
    barGradient.addColorStop(1, themeColor('--accent-2'));
    ctx.fillStyle = barGradient;
    ctx.fillRect(x, y, barWidth, height);

    ctx.fillStyle = themeColor('--text') || '#e7ecf7';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(region.toUpperCase(), x + barWidth / 2, regionCanvas.height - 12);
  });
}

function drawGrowthLine() {
  const ctx = growthCanvas.getContext('2d');
  const w = growthCanvas.width;
  const h = growthCanvas.height;
  ctx.clearRect(0, 0, w, h);
  const maxVal = Math.max(...growthSeries, 1);
  const stepX = w / (growthSeries.length - 1);
  const lineColor = themeColor('--accent-2') || '#7ef1d1';

  ctx.beginPath();
  growthSeries.forEach((val, idx) => {
    const x = idx * stepX;
    const y = h - (val / maxVal) * (h - 40) - 20;
    if (idx === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = lineColor;
  growthSeries.forEach((val, idx) => {
    const x = idx * stepX;
    const y = h - (val / maxVal) * (h - 40) - 20;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

function applyFilters() {
  const activeType = (document.querySelector('.pill[data-filter].active') || filterButtons[0]).dataset.filter;
  const region = regionSelect.value;
  const filtered = sampleDeals.filter((deal) => {
    const matchesType = activeType === 'all' ? true : deal.type === activeType;
    const matchesRegion = region === 'global' ? true : deal.region === region;
    return matchesType && matchesRegion;
  });

  renderSummary(filtered);
  renderDeals(filtered);

  const stageCounts = filtered.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + 1;
    return acc;
  }, {});
  drawStageDonut(stageCounts);

  const regionCounts = filtered.reduce((acc, deal) => {
    acc[deal.region] = (acc[deal.region] || 0) + 1;
    return acc;
  }, { americas: 0, emea: 0, apac: 0, global: 0 });
  drawRegionBars(regionCounts);
}

function renderFavorites() {
  favoritesEl.innerHTML = '';
  favorites.forEach((fav) => {
    const li = document.createElement('li');
    li.className = 'chip';
    li.innerHTML = `<strong>${fav.name}</strong><span class="muted">${fav.tag}</span><span class="muted">${fav.note}</span>`;
    favoritesEl.appendChild(li);
  });
}

function renderReports() {
  reportsEl.innerHTML = '';
  reports.forEach((report) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${report.title}</strong><p class="muted">${report.type} · ${report.time}</p>`;
    reportsEl.appendChild(li);
  });
}

function renderCompanies() {
  if (!companyListEl) return;
  const query = companySearch.value.toLowerCase();
  const activeFilter = (document.querySelector('.pill[data-company-filter].active') || companyFilters[0]).dataset.companyFilter;

  const filtered = companies.filter((company) => {
    const matchesText = company.name.toLowerCase().includes(query) || company.metric.toLowerCase().includes(query);
    const matchesStatus = activeFilter === 'all' ? true : company.status === activeFilter;
    return matchesText && matchesStatus;
  });

  companyListEl.innerHTML = '';
  filtered.forEach((company) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${company.name}</strong><p class="muted">${company.metric} · ${company.region}</p>`;
    companyListEl.appendChild(li);
  });
}

function renderFunds() {
  fundListEl.innerHTML = '';
  funds.forEach((fund) => {
    const li = document.createElement('li');
    li.className = 'fund-card';
    li.innerHTML = `<div><strong>${fund.name}</strong><p class="fund-metric">${fund.focus}</p></div><span class="badge alt">${fund.stat}</span>`;
    fundListEl.appendChild(li);
  });
}

function renderNewsLists() {
  ownedNewsEl.innerHTML = '';
  ownedNews.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong><p class="muted">${item.source} · ${item.tag} · ${item.time}</p>`;
    ownedNewsEl.appendChild(li);
  });

  apiNewsEl.innerHTML = '';
  apiNews.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong><p class="muted">${item.source} · ${item.time}</p>`;
    apiNewsEl.appendChild(li);
  });
}

function renderLearn() {
  learnListEl.innerHTML = '';
  learnItems.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.title}</strong><p class="muted">${item.detail}</p>`;
    learnListEl.appendChild(li);
  });

  videoListEl.innerHTML = '';
  videos.forEach((clip) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${clip.title}</strong><p class="muted">${clip.focus} · ${clip.length}</p>`;
    videoListEl.appendChild(li);
  });
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('theme-light');
  themeIcon.textContent = isLight ? themeIcon.dataset.light : themeIcon.dataset.dark;
  drawSparkline();
  drawGrowthLine();
  applyFilters();
}

themeToggle.addEventListener('click', toggleTheme);

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});

regionSelect.addEventListener('change', applyFilters);

sortButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    sortButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeSort = btn.dataset.sort;
    applyFilters();
  });
});

companyFilters.forEach((btn) => {
  btn.addEventListener('click', () => {
    companyFilters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCompanies();
  });
});

companySearch?.addEventListener('input', renderCompanies);

function tickData() {
  sparkData = [...sparkData.slice(1), Math.floor(Math.random() * 10) + 6];
  growthSeries = [...growthSeries.slice(1), Math.floor(Math.random() * 90) + 30];
  drawSparkline();
  drawGrowthLine();
  applyFilters();
}

function showPage(target) {
  pages.forEach((page) => page.classList.toggle('active', page.dataset.page === target));
  navButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.page === target));
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => showPage(btn.dataset.page));
});

// Mock API hooks – swap with real endpoints
async function fetchDealsFromApi() {
  return Promise.resolve(sampleDeals);
}

async function fetchNewsFromApi() {
  return Promise.resolve(apiNews);
}

async function init() {
  sampleDeals.forEach((deal, idx) => {
    deal.timestamp = Date.now() - idx * 60000;
  });

  drawSparkline();
  drawGrowthLine();
  renderFavorites();
  renderReports();
  renderCompanies();
  renderFunds();
  renderNewsLists();
  renderLearn();
  applyFilters();

  // Wire placeholders to real APIs here
  fetchDealsFromApi().then(() => applyFilters());
  fetchNewsFromApi().then(() => renderNewsLists());

  setInterval(tickData, 3500);
}

init();
