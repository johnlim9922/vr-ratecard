const projects = [["project1.html", "校园鼓艺班", "Campus Drum Program", "RM240/月", "系统课程", "校园鼓艺班，面向学校的校内课程，帮助学生提升专注力与团队合作。", "1x/Rate Card_card 2.jpg"], 
["project2.html", "总部课程（大班）", "Children Interest Drum - Large", "RM320/月", "系统课程", "面向儿童的兴趣大班，50人规模，启发节奏感与群体合作。", "1x/Rate Card_card 7.jpg"], 
["project3.html", "总部课程（小班）", "Caring Kids Drum - Small", "RM640/月", "系统课程", "小班制（5人），为有特殊需要的儿童提供更细致的教学支持。", "1x/Rate Card_card 8.jpg"], 
["project4.html", "企业团建鼓艺班", "Corporate Team Drumming", "RM880/人", "成人课程", "为企业设计的团建课程，通过鼓艺提升团队凝聚力与沟通。", "1x/Rate Card_card 9.jpg"], 
["project5.html", "线上课程 - 《鼓手Online！成长配套》", "Online Course - Drummer Online", "RM699", "兴趣课程", "线上视频教学+工具包，适合所有年龄与兴趣学员。", "1x/Rate Card_card 3.jpg"], 
["project7.html", "线下复训班 - 《进阶鼓手！实战配套》", "Offline Retrain - Advanced Drummer", "RM1,999 / 每月RM166.58", "兴趣课程", "一年4次复训（线上+线下），帮助学员巩固与进阶。", "1x/Rate Card_card 4.jpg"], 
["project8.html", "IP鼓艺班 - 《鼓艺达人！IP养成配套》", "IP Drum Class - IP Growth", "RM2,999 / 每月RM249.91", "兴趣课程", "月付模式并参与IP短视频拍摄，押金可通过表演费抵扣。", "1x/Rate Card_card 5.jpg"], 
["project9.html", "大师班 - 技职培训及创业陪跑计划", "Masterclass - Vocational & Coaching", "RM9,999 / 每月RM833.25", "成人课程", "面向成年人与毕业生的技职培训与创业陪跑计划。", "1x/Rate Card_card 6.jpg"], 
["project10.html", "VR加盟", "Local Franchise", "RM19,999 - RM109,999", "合作加盟", "区域加盟模式，适合个体创业者开设分校。", "1x/Rate Card_card 10.jpg"], 
["project13.html", "守艺人-社会回馈计划", "Spark Igniter", "RM300,000", "税务减免赞助", "赞助文化项目，享有MOTEC与LHDN的税务优惠（视当地条款）。", "1x/Rate Card_card 11.jpg"], 
["project16.html", "鼓面赞助配套", "Drum Sponsorship Package", "RM1,800", "税务减免赞助", "面向学校与社区的小额赞助配套，帮助扩展课程覆盖面。", "1x/Rate Card_card 14.jpg"]];

function el(id){ return document.getElementById(id); }

function buildIndex(){
  const grid = el('grid');
  grid.innerHTML = '';
  projects.forEach((p, idx) => {
    const [filename, title_cn, title_en, price, category, desc_cn] = p;
    const card = document.createElement('a');
    card.className = 'card';
    card.href = filename;
    card.dataset.category = category;
    const imgSrc = p[6] || ('data:image/svg+xml;utf8,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='#dddddd'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='#888'>" + title_cn + "\n300x200</text></svg>"));
    card.innerHTML = `
      <div class="card-img"><img src="${imgSrc}" alt="${title_cn}" style="width:100%;height:100%;object-fit:cover"/></div>
      <div class="card-body">
        <div>
          <h3 class="title-cn">${title_cn}</h3>
          <h3 class="title-en" style="display:none">${title_en}</h3>
          <p class="price-text">${price}</p>
        </div>`;
    grid.appendChild(card);
  });
  filterByCat('all');
}

function switchLang(lang){
  document.querySelectorAll('.title-cn').forEach(el=> el.style.display = (lang==='zh')?'block':'none');
  document.querySelectorAll('.title-en').forEach(el=> el.style.display = (lang==='en')?'block':'none');
  if(window.PROJECT_PAGE){
    const p = projects.find(pp=> pp[0] === window.PROJECT_PAGE);
    if(p){
      el('heading').innerText = (lang==='zh')?p[1]:p[2];
      el('price').innerText = p[3];
      el('desc').innerText = (lang==='zh')?p[5]:p[4];
    }
  }
}

function setupTabs(){
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      filterByCat(cat);
    });
  });
  document.querySelector('.tab[data-cat="all"]').classList.add('active');
}

function filterByCat(cat){
  const cards = document.querySelectorAll('.card');
  cards.forEach(c=>{
    if(cat === 'all' || c.dataset.category === cat) c.style.display = 'flex';
    else c.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  buildIndex();
  setupTabs();
  document.getElementById('lang-zh').addEventListener('click', ()=> switchLang('zh'));
  document.getElementById('lang-en').addEventListener('click', ()=> switchLang('en'));
});
