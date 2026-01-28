const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];

function revealOnScroll(){
  const els = $$(".fade-in");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add("show");
    });
  }, {threshold: 0.12});
  els.forEach(el=>io.observe(el));
}
revealOnScroll();

function runTransitionAndGo(url){
  const t = $("#transition");
  if(!t){ window.location.href = url; return; }
  t.classList.add("show");
  setTimeout(()=> window.location.href = url, 420);
}

const cars = [
  {
    id: "911",
    name: "Porsche 911 Carrera",
    price: "от 78 900 000 ₸",
    tag: "ICON",
    img: "Photoroom_20260123_202719.PNG",
    desc:
      "911 — легенда дизайна и точности. Чистые линии, идеальная посадка, баланс мощности и контроля. Это автомобиль, который ощущается как продолжение водителя."
  },
  {
    id: "taycan",
    name: "Porsche Taycan",
    price: "от 64 500 000 ₸",
    tag: "ELECTRIC",
    img: "Photoroom_20260123_202737.PNG",
    desc:
      "Taycan — электрическая скорость в премиальной тишине. Моментальный отклик, высокий комфорт, современный интерьер и технологичный характер."
  },
  {
    id: "cayenne",
    name: "Porsche Cayenne",
    price: "от 58 300 000 ₸",
    tag: "SUV",
    img: "Photoroom_20260123_202754.PNG",
    desc:
      "Cayenne — универсальность без компромиссов. Спортивная посадка, мощная динамика, практичный салон и уверенность на любом покрытии."
  }
];

(function initCatalog(){
  const grid = $("#catalogGrid");
  if(!grid) return;

  grid.innerHTML = cars.map(c => `
    <article class="card fade-in" data-id="${c.id}">
      <img src="${c.img}" alt="${c.name}">
      <h3>${c.name}</h3>
      <div class="meta">
        <span class="tag">${c.tag}</span>
        <span class="price">${c.price}</span>
      </div>
    </article>
  `).join("");

  revealOnScroll();

  $$("#catalogGrid .card").forEach(card=>{
    card.addEventListener("click", ()=>{
      const id = card.dataset.id;
      localStorage.setItem("porsche_selected", id);
      runTransitionAndGo("details.html");
    });
  });
})();

(function initDetails(){
  const wrap = $("#details");
  if(!wrap) return;

  const id = localStorage.getItem("porsche_selected") || "911";
  const car = cars.find(x=>x.id===id) || cars[0];

  $("#dName").textContent = car.name;
  $("#dDesc").textContent = car.desc;
  $("#dPrice").textContent = car.price;

  $("#dImg").src = car.img;
  $("#dImg").alt = car.name;

  window.addEventListener("mousemove", (e)=>{
    const img = $("#dImg");
    if(!img) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 6;
    const y = (e.clientY / window.innerHeight - 0.5) * 6;
    img.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
  });
})();

(function initHome(){
  const btn = $("#toCatalog");
  const anchor = $("#catalogAnchor");
  if(btn && anchor){
    btn.addEventListener("click", ()=> anchor.scrollIntoView({behavior:"smooth"}));
  }

  const hint = $("#scrollHint");
  if(hint){
    window.addEventListener("scroll", ()=>{
      const y = window.scrollY || 0;
      hint.style.opacity = y > 40 ? "0" : "1";
    });
  }
})();