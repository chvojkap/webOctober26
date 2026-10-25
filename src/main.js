import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-800.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import './style.css';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduced.matches) document.documentElement.classList.add('js-motion');
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);} }),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menu=document.querySelector('.menu-toggle'), navigation=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');navigation.classList.toggle('open',open);menu.querySelector('.menu-label').textContent=open?'Close':'Menu';});
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');navigation.classList.remove('open');menu.querySelector('.menu-label').textContent='Menu';}
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.querySelectorAll('.axis-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.axis-tab').forEach(other=>{const active=other===tab;other.classList.toggle('active',active);other.setAttribute('aria-expanded',String(active));other.querySelector('.axis-sign').textContent=active?'−':'+';});document.querySelector('.axis-visual').dataset.active=tab.dataset.axis;}));
document.querySelector('#year').textContent=new Date().getFullYear();
const form=document.querySelector('#contact-form');
form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);document.querySelector('#enquiry-text').value=`Colaborix — AI Champion Accelerator enquiry\n\nName: ${data.get('name')}\nWork email: ${data.get('email')}\nOrganisation: ${data.get('organisation')}\n\n${data.get('message')||'I would like to discuss the AI Champion Accelerator for our organisation.'}`;document.querySelector('.enquiry-result').hidden=false;document.querySelector('#form-status').textContent='Your draft is ready to copy. It has not been sent.';document.querySelector('#enquiry-text').focus();});
document.querySelector('.copy-button').addEventListener('click',async()=>{const field=document.querySelector('#enquiry-text');try{await navigator.clipboard.writeText(field.value);document.querySelector('#form-status').textContent='Enquiry copied. Share it with your Colaborix contact.';}catch{field.focus();field.select();document.querySelector('#form-status').textContent='Select and copy the enquiry above.';}});
// A shaded, depth-sorted point sculpture: three connected orbital ribbons.
const canvas=document.querySelector('#sculpture'),ctx=canvas.getContext('2d');
let width=0,height=0,time=0,pointerX=0,pointerY=0,visible=true,last=0;
const rings=[];
for(let ring=0;ring<3;ring++){const points=[];for(let i=0;i<6000;i++){const u=i*2.399963229728653;const v=(i/6000)*Math.PI*2;const tube=.24;const radius=1.18+tube*Math.cos(u);let x=radius*Math.cos(v),y=tube*Math.sin(u),z=radius*Math.sin(v);if(ring===1){[x,y,z]=[y,x,z];}if(ring===2){[x,y,z]=[x,z,y];}points.push([x,y,z,i%7]);}rings.push(points);}
function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);if(reduced.matches)draw(0);}
function draw(timestamp){if(!ctx||!width||!height)return;if(!reduced.matches)time=timestamp*.0001;ctx.clearRect(0,0,width,height);const scale=Math.min(width*.30,height*.30);const ay=-.55+time+pointerX*.10,ax=.53+Math.sin(time*.7)*.12+pointerY*.08;const cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax);const points=[];
ctx.save();ctx.translate(width*.5,height*.48);ctx.scale(1,.17);const shadow=ctx.createRadialGradient(0,scale*7,0,0,scale*7,scale*1.2);shadow.addColorStop(0,'rgba(44,57,27,.10)');shadow.addColorStop(1,'rgba(44,57,27,0)');ctx.fillStyle=shadow;ctx.fillRect(-scale*1.4,scale*5.5,scale*2.8,scale*3);ctx.restore();
rings.forEach((ring,index)=>ring.forEach(p=>{let [x,y,z]=p;const x1=x*cy-z*sy,z1=x*sy+z*cy;const y1=y*cx-z1*sx,z2=y*sx+z1*cx;const perspective=4.9/(4.9-z2*.35);points.push({x:width*.5+x1*scale*perspective,y:height*.46+y1*scale*perspective,z:z2,ring:index,shade:p[3]});}));points.sort((a,b)=>a.z-b.z);for(const p of points){const light=(p.z+1.6)/3.2;const size=(.55+light*.6)*Math.max(.7,width/650);const alpha=.35+light*.6;const colors=[[139,161,111],[178,198,141],[213,236,175]];const c=colors[p.ring];const lift=p.shade*3;ctx.fillStyle=`rgba(${c[0]+lift},${c[1]+lift},${c[2]+lift},${alpha})`;ctx.fillRect(p.x,p.y,size,size);}}
function animate(timestamp){if(visible&&!document.hidden&&!reduced.matches&&timestamp-last>32){draw(timestamp);last=timestamp;}requestAnimationFrame(animate);}
new ResizeObserver(resize).observe(canvas);new IntersectionObserver(e=>{visible=e[0].isIntersecting;}).observe(canvas);canvas.parentElement.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;});canvas.parentElement.addEventListener('pointerleave',()=>{pointerX=0;pointerY=0;});reduced.addEventListener('change',()=>draw(0));resize();requestAnimationFrame(animate);
