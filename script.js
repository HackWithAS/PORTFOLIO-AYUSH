/* ─── Intro Loader ─── */
(function(){
  const loader = document.getElementById('intro-loader');
  setTimeout(()=>{
    loader.classList.add('hide');
    setTimeout(()=>{
      loader.style.display='none';
      // Make sure nav and all interactive elements are fully accessible
      document.querySelector('nav').style.pointerEvents='auto';
    }, 700);
  }, 2200);
})();

/* ─── Scroll Progress ─── */
window.addEventListener('scroll',()=>{
  const st=window.scrollY,dh=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById('sp').style.width=(st/dh*100)+'%';
  document.getElementById('nb').classList.toggle('sh',st>50);
  document.getElementById('btt').classList.toggle('on',st>400);
});

/* ─── Typing ─── */
const lines=['Cybersecurity Enthusiast','Web Developer','Ethical Hacker in Training','Secure Development Learner','B.Tech CSE @ Invertis University'];
let li=0,ci=0,del=false;
const te=document.getElementById('ty');
function loop(){
  const cur=lines[li];
  if(!del){
    te.textContent=cur.slice(0,++ci);
    if(ci===cur.length){del=true;setTimeout(loop,2000);return;}
    setTimeout(loop,65);
  }else{
    te.textContent=cur.slice(0,--ci);
    if(ci===0){del=false;li=(li+1)%lines.length;setTimeout(loop,400);return;}
    setTimeout(loop,35);
  }
}
loop();

/* ─── Reveal on scroll ─── */
const ro=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});
},{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>ro.observe(el));

/* ─── Counter animation ─── */
function animC(el){
  const t=+el.dataset.t;
  const dur=t>1000?2000:1200;
  const step=t/(dur/16);
  let c=0;
  const tmr=setInterval(()=>{
    c=Math.min(c+step,t);
    el.textContent=t>100?Math.floor(c):(c<t?c.toFixed(1):t);
    if(c>=t)clearInterval(tmr);
  },16);
}
const so=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){animC(e.target);so.unobserve(e.target);}
  });
},{threshold:.5});
document.querySelectorAll('.sn[data-t]').forEach(el=>so.observe(el));

/* ─── Mobile Nav ─── */
const hbg=document.getElementById('hbg'),mob=document.getElementById('mob');
hbg.addEventListener('click',()=>{
  hbg.classList.toggle('on');
  mob.classList.toggle('on');
  document.body.style.overflow=mob.classList.contains('on')?'hidden':'';
});
function closeM(){
  hbg.classList.remove('on');mob.classList.remove('on');
  document.body.style.overflow='';
}

/* ─── Contact Form ─── */
function sendMsg(){
  const n=document.getElementById('nm').value.trim();
  const e=document.getElementById('em').value.trim();
  const m=document.getElementById('ms').value.trim();
  if(!n||!e||!m){alert('Please fill all fields.');return;}
  const txt=`Hi Ayush! 👋\n\nName: ${n}\nEmail: ${e}\n\nMessage:\n${m}`;
  const link=`https://wa.me/919627898972?text=${encodeURIComponent(txt)}`;
  document.getElementById('fs').style.display='block';
  setTimeout(()=>window.open(link,'_blank'),600);
  document.getElementById('nm').value='';
  document.getElementById('em').value='';
  document.getElementById('ms').value='';
}