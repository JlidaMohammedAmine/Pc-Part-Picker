/* ================= DATA (real product names) ================= */
const data = {
  cpu:[
    {id:"i3_12100", n:"Intel i3-12100", p:1200, socket:"LGA1700", w:60},
    {id:"i5_12400", n:"Intel i5-12400", p:1800, socket:"LGA1700", w:65},
    {id:"i7_12700", n:"Intel i7-12700K", p:3200, socket:"LGA1700", w:125},
    {id:"i9_12900", n:"Intel i9-12900K", p:5200, socket:"LGA1700", w:125},
    {id:"r3_4100",  n:"Ryzen 3 4100", p:1000, socket:"AM4", w:65},
    {id:"r5_5600",  n:"Ryzen 5 5600", p:1700, socket:"AM4", w:65},
    {id:"r7_5800x", n:"Ryzen 7 5800X", p:2800, socket:"AM4", w:105},
    {id:"r7_7700",  n:"Ryzen 7 7700X", p:3800, socket:"AM5", w:105},
    {id:"r9_7950x", n:"Ryzen 9 7950X", p:7200, socket:"AM5", w:170}
  ],
  mb:[
    {id:"b460", n:"MSI B460 (LGA1200 DDR4)", p:1100, socket:"LGA1200", ram:"DDR4", w:20},
    {id:"b660", n:"MSI B660 (LGA1700 DDR4)", p:1400, socket:"LGA1700", ram:"DDR4", w:25},
    {id:"z690", n:"ASUS Z690 (LGA1700 DDR5)", p:2200, socket:"LGA1700", ram:"DDR5", w:30},
    {id:"x570", n:"Gigabyte X570 (AM4 DDR4)", p:1800, socket:"AM4", ram:"DDR4", w:30},
    {id:"b550", n:"Gigabyte B550 (AM4 DDR4)", p:1300, socket:"AM4", ram:"DDR4", w:22},
    {id:"x670", n:"ASRock X670 (AM5 DDR5)", p:2600, socket:"AM5", ram:"DDR5", w:35},
    {id:"x470", n:"ASUS X470 (AM4 DDR4)", p:1400, socket:"AM4", ram:"DDR4", w:25},
    {id:"z790", n:"MSI Z790 (LGA1700 DDR5)", p:3000, socket:"LGA1700", ram:"DDR5", w:35}
  ],
  gpu:[
    {id:"gtx1650", n:"GTX 1650", p:2000, w:75},
    {id:"rtx3050", n:"RTX 3050", p:3200, w:130},
    {id:"rtx3060", n:"RTX 3060", p:3500, w:170},
    {id:"rtx3070", n:"RTX 3070", p:4800, w:220},
    {id:"rtx4070", n:"RTX 4070", p:6500, w:200},
    {id:"rx6600",  n:"RX 6600 XT", p:3000, w:160},
    {id:"rx6700",  n:"RX 6700 XT", p:4200, w:230},
    {id:"rx7800",  n:"RX 7800 XT", p:7000, w:260},
    {id:"rx7900",  n:"RX 7900 XT", p:8500, w:300}
  ],
  ram:[
    {id:"8ddr4",  n:"8GB DDR4",  p:400,  type:"DDR4", w:3},
    {id:"16ddr4", n:"16GB DDR4", p:700,  type:"DDR4", w:5},
    {id:"32ddr4", n:"32GB DDR4", p:1200, type:"DDR4", w:7},
    {id:"16ddr5", n:"16GB DDR5", p:1200, type:"DDR5", w:6},
    {id:"32ddr5", n:"32GB DDR5", p:2000, type:"DDR5", w:8},
    {id:"64ddr5", n:"64GB DDR5", p:3800, type:"DDR5", w:10}
  ],
  storage:[
    {id:"ssd500",  n:"NVMe SSD 500GB", p:600,  w:4},
    {id:"ssd1",    n:"NVMe SSD 1TB",   p:900,  w:5},
    {id:"ssd2",    n:"NVMe SSD 2TB",   p:1600, w:6},
    {id:"hdd1",    n:"HDD 1TB",        p:400,  w:7},
    {id:"hdd2",    n:"HDD 2TB",        p:700,  w:7},
    {id:"sshddcombo", n:"1TB SSD + 2TB HDD", p:1400, w:12}
  ],
  psu:[
    {id:"550", p:"550W Bronze", p:550, psuW:550},
    {id:"650", n:"650W Bronze", p:700,  psuW:650},
    {id:"750", n:"750W Gold",   p:1000, psuW:750},
    {id:"850", n:"850W Gold",   p:1400, psuW:850},
    {id:"1000", n:"1000W Platinum", p:2000, psuW:1000}
  ],
  case:[
    {id:"nzxt",    n:"NZXT H510",       p:700,  w:0},
    {id:"corsair", n:"Corsair 4000D",   p:800,  w:0},
    {id:"lianli",  n:"Lian Li O11",     p:1400, w:0},
    {id:"coolermaster", n:"Cooler Master NR600", p:600, w:0},
    {id:"phanteks", n:"Phanteks Eclipse P400A", p:900, w:0},
    {id:"fractal",  n:"Fractal Design Meshify C", p:850, w:0}
  ]
};



/* ================= HELPERS ================= */
function getBrand(name){
  const s = (name || "").toLowerCase();
  if(s.includes("intel")) return "Intel";
  if(s.includes("ryzen")) return "AMD";
  if(s.includes("msi")) return "MSI";
  if(s.includes("asus")) return "ASUS";
  if(s.includes("gigabyte")) return "Gigabyte";
  if(s.includes("asrock")) return "ASRock";
  if(s.includes("rtx")) return "NVIDIA";
  if(s.includes("rx")) return "AMD Radeon";
  if(s.includes("nzxt")) return "NZXT";
  if(s.includes("corsair")) return "Corsair";
  if(s.includes("lian li")) return "Lian Li";
  if(s.includes("ddr4")) return "DDR4";
  if(s.includes("ddr5")) return "DDR5";
  return "Other";
}

function badgeFor(partKey, item){
  if(partKey === "cpu") return item.socket || getBrand(item.n);
  if(partKey === "mb") return `${item.socket || ""} ${item.ram || ""}`.trim();
  if(partKey === "ram") return item.type || getBrand(item.n);
  if(partKey === "psu") return `${item.psuW || 0}W`;
  return getBrand(item.n);
}

function wattsFor(partKey, item){
  if(partKey === "psu") return `${item.psuW || 0}W`;
  return item.w ? `${item.w}W` : "—";
}

/* ================= STATE ================= */
const STORAGE_KEY = "pcpartshub_state_full_v1";

const state = {
  selected: { cpu:null, mb:null, gpu:null, ram:null, storage:null, psu:null, case:null }
};

let activeRow = null;
let activePartKey = null;

/* ================= DOM ================= */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalGrid = document.getElementById("modalGrid");
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const maxPriceInput = document.getElementById("maxPriceInput");
const sortSelect = document.getElementById("sortSelect");
const resultsMeta = document.getElementById("resultsMeta");

const totalEl = document.getElementById("totalEl");
const compatBox = document.getElementById("compatBox");
const powerBox = document.getElementById("powerBox");
const budgetInput = document.getElementById("budgetInput");

/* ================= MODAL OPEN/CLOSE ================= */
function openModal(btn){
  activeRow = btn.closest(".row");
  activePartKey = activeRow.dataset.part;

  modalTitle.textContent = `Select ${activePartKey.toUpperCase()}`;

  // reset controls (keep sane defaults)
  searchInput.value = "";
  maxPriceInput.value = "";
  sortSelect.value = "rec";

  populateBrandFilter();
  renderModalList(true);

  modal.style.display = "flex";
  // focus search for speed
  setTimeout(()=>searchInput.focus(), 0);
}

function closeModal(){
  modal.style.display = "none";
  activeRow = null;
  activePartKey = null;
}

document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

/* ================= FILTERS ================= */
function populateBrandFilter(){
  const items = data[activePartKey] || [];
  const brands = Array.from(new Set(items.map(i => getBrand(i.n)))).sort();
  brandFilter.innerHTML =
    `<option value="__all">All brands</option>` +
    brands.map(b => `<option value="${b}">${b}</option>`).join("");
  brandFilter.value = "__all";
}

function applyFilters(items){
  const q = searchInput.value.trim().toLowerCase();
  const b = brandFilter.value;
  const maxP = Number(maxPriceInput.value || 0);
  const sort = sortSelect.value;

  let out = items.slice();

  if(q) out = out.filter(i => (i.n || "").toLowerCase().includes(q));
  if(b !== "__all") out = out.filter(i => getBrand(i.n) === b);
  if(maxP > 0) out = out.filter(i => Number(i.p || 0) <= maxP);

  if(sort === "plh") out.sort((a,c)=>(a.p||0)-(c.p||0));
  if(sort === "phl") out.sort((a,c)=>(c.p||0)-(a.p||0));
  return out;
}

/* ================= STAGGER ANIMATION ================= */
function animateCardsStagger(){
  const cards = Array.from(modalGrid.querySelectorAll(".card"));
  // trigger reflow to restart animations cleanly
  // eslint-disable-next-line no-unused-expressions
  modalGrid.offsetHeight;

  cards.forEach((card, idx)=>{
    const delay = 30 * idx; // ms stagger
    card.style.animation = `cardIn 260ms ease-out forwards`;
    card.style.animationDelay = `${delay}ms`;
  });
}

/* ================= RENDER MODAL LIST ================= */
function renderModalList(animate){
  const items = data[activePartKey] || [];
  const filtered = applyFilters(items);

  resultsMeta.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;

  modalGrid.innerHTML = "";

  filtered.forEach((item)=>{
    const brand = getBrand(item.n);
    const badge = badgeFor(activePartKey, item);
    const watts = wattsFor(activePartKey, item);

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="name">${item.n}</div>
      <div class="sub">${activePartKey.toUpperCase()} • ${brand}</div>
      <div class="bottom">
        <span class="badge">${badge || "—"}</span>
        <div style="text-align:right">
          <div class="price2">${item.p} DH</div>
          <div class="sub" style="margin-top:2px">${watts}</div>
        </div>
      </div>
    `;
    card.addEventListener("click", ()=>selectItem(item));
    modalGrid.appendChild(card);
  });

  // stagger animation after DOM is filled
  if(animate) requestAnimationFrame(animateCardsStagger);
}

/* Live filter events */
searchInput.addEventListener("input", ()=>renderModalList(true));
brandFilter.addEventListener("change", ()=>renderModalList(true));
maxPriceInput.addEventListener("input", ()=>renderModalList(true));
sortSelect.addEventListener("change", ()=>renderModalList(true));

/* ================= SELECT ITEM ================= */
function selectItem(item){
  if(!activePartKey || !activeRow) return;

  state.selected[activePartKey] = item;

  // update row UI
  activeRow.querySelector(".choose").textContent = item.n;
  const priceEl = document.getElementById(activePartKey + "P");
  if(priceEl) priceEl.textContent = `${item.p} DH`;

  const rm = activeRow.querySelector(".remove-btn");
  if(rm) rm.classList.add("show");

  recalc();
  closeModal();
}

/* ================= REMOVE PER PART ================= */
function removeSelected(ev, partKey){
  ev.stopPropagation();
  state.selected[partKey] = null;

  const row = document.querySelector(`.row[data-part="${CSS.escape(partKey)}"]`);
  if(row){
    row.querySelector(".choose").textContent = "Choose";
    const rm = row.querySelector(".remove-btn");
    if(rm) rm.classList.remove("show");
  }

  const priceEl = document.getElementById(partKey + "P");
  if(priceEl) priceEl.textContent = "—";

  recalc();
  compatBox.textContent = "Compatibility: —";
}

/* ================= TOTAL + POWER ================= */
function recalc(){
  let total = 0;
  let drawW = 0;

  Object.entries(state.selected).forEach(([k,v])=>{
    if(!v) return;
    total += Number(v.p || 0);

    // PSU is capacity, not draw
    if(k === "psu") return;
    drawW += Number(v.w || 0);
  });

  totalEl.textContent = `${total} DH`;
  powerBox.textContent = `Power: ${drawW ? drawW + " W" : "—"}`;
}

/* ================= CHECK COMPATIBILITY ================= */
function checkCompatibility(){
  const cpu = state.selected.cpu;
  const mb  = state.selected.mb;
  const ram = state.selected.ram;
  const psu = state.selected.psu;

  let drawW = 0;
  Object.entries(state.selected).forEach(([k,v])=>{
    if(!v) return;
    if(k === "psu") return;
    drawW += Number(v.w || 0);
  });

  let total = 0;
  Object.values(state.selected).forEach(v=>{ if(v) total += Number(v.p||0); });

  const budget = Number(budgetInput.value || 0);
  const issues = [];

  if(cpu && mb && cpu.socket && mb.socket && cpu.socket !== mb.socket){
    issues.push("CPU and Motherboard socket mismatch");
  }

  if(mb && ram && mb.ram && ram.type && mb.ram !== ram.type){
    issues.push("RAM type incompatible");
  }

  if(psu && psu.psuW && drawW > psu.psuW * 0.85){
    issues.push("PSU insufficient (no headroom)");
  }

  if(budget && total > budget){
    issues.push("Over budget");
  }

  compatBox.textContent =
    issues.length ? `Issues:\n- ${issues.join("\n- ")}` : "Compatibility: Compatible ✓";
}

/* ================= SAVE / LOAD / CLEAR ================= */
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  alert("Saved");
}

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) return;

  try{
    const saved = JSON.parse(raw);
    if(!saved || !saved.selected) return;

    state.selected = saved.selected;

    Object.keys(state.selected).forEach((k)=>{
      const v = state.selected[k];
      const row = document.querySelector(`.row[data-part="${CSS.escape(k)}"]`);
      const priceEl = document.getElementById(k + "P");

      if(!row) return;

      if(v){
        row.querySelector(".choose").textContent = v.n;
        if(priceEl) priceEl.textContent = `${v.p} DH`;
        const rm = row.querySelector(".remove-btn");
        if(rm) rm.classList.add("show");
      }else{
        row.querySelector(".choose").textContent = "Choose";
        if(priceEl) priceEl.textContent = "—";
        const rm = row.querySelector(".remove-btn");
        if(rm) rm.classList.remove("show");
      }
    });

    recalc();
  }catch(e){
    // ignore corrupted storage
  }
}

function clearAll(){
  Object.keys(state.selected).forEach(k => state.selected[k] = null);

  document.querySelectorAll(".row").forEach(r=>{
    r.querySelector(".choose").textContent = "Choose";
    const rm = r.querySelector(".remove-btn");
    if(rm) rm.classList.remove("show");
  });

  ["cpu","mb","gpu","ram","storage","psu","case"].forEach(k=>{
    const priceEl = document.getElementById(k + "P");
    if(priceEl) priceEl.textContent = "—";
  });

  totalEl.textContent = "0 DH";
  compatBox.textContent = "Compatibility: —";
  powerBox.textContent = "Power: —";
}

/* ================= EVENTS ================= */
document.getElementById("checkBtn").addEventListener("click", checkCompatibility);
document.getElementById("saveBtn").addEventListener("click", saveState);
document.getElementById("clearBtn").addEventListener("click", clearAll);

// ESC closes modal
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape" && modal.style.display === "flex") closeModal();
});

/* ================= INIT ================= */
loadState();
recalc();