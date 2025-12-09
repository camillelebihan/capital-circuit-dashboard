const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.icon');
const filterButtons = document.querySelectorAll('.pill');
const regionSelect = document.getElementById('regionSelect');
const dealCountEl = document.getElementById('dealCount');
const dealValueEl = document.getElementById('dealValue');
const medianTicketEl = document.getElementById('medianTicket');
const investorCountEl = document.getElementById('investorCount');
const dealDeltaEl = document.getElementById('dealDelta');
const dealListEl = document.getElementById('dealList');
const sparkline = document.getElementById('sparkline');

const sampleDeals = [
  { name: 'Helio Robotics', value: 52, type: 'vc', region: 'americas', stage: 'Series B', investor: 'Arc Light Partners' },
  { name: 'BlueMesh Cloud', value: 120, type: 'pe', region: 'emea', stage: 'Growth', investor: 'Northbridge Equity' },
  { name: 'Qubit Forge', value: 18, type: 'vc', region: 'apac', stage: 'Seed', investor: 'Neon Ventures' },
  { name: 'OrbitEdge AI', value: 80, type: 'pe', region: 'americas', stage: 'Buyout', investor: 'Silver Ridge' },
  { name: 'NovaGrid Energy Tech', value: 45, type: 'vc', region: 'emea', stage: 'Series A', investor: 'Brightspark Capital' },
  { name: 'PulseStack Security', value: 33, type: 'vc', region: 'apac', stage: 'Series A', investor: 'LayerZero Labs' },
  { name: 'Streamline DevOps', value: 67, type: 'pe', region: 'global', stage: 'Minority', investor: 'Summit River' },
];

let sparkData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 12) + 6);

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
  filteredDeals.slice(0, 6).forEach((deal) => {
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
  ctx.strokeStyle = '#9cafef';
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

function applyFilters() {
  const activeType = document.querySelector('.pill.active').dataset.filter;
  const region = regionSelect.value;
  const filtered = sampleDeals.filter((deal) => {
    const matchesType = activeType === 'all' ? true : deal.type === activeType;
    const matchesRegion = region === 'global' ? true : deal.region === region;
    return matchesType && matchesRegion;
  });

  renderSummary(filtered);
  renderDeals(filtered);
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('theme-light');
  themeIcon.textContent = isLight ? themeIcon.dataset.light : themeIcon.dataset.dark;
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

function tickData() {
  sparkData = [...sparkData.slice(1), Math.floor(Math.random() * 10) + 6];
  drawSparkline();
  applyFilters();
}

function init() {
  drawSparkline();
  applyFilters();
  setInterval(tickData, 3500);
}

init();
