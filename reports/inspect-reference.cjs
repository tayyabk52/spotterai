const { chromium } = require('@playwright/test');
(async () => {
 const browser = await chromium.launch();
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto('https://www.bb-b.net/', {waitUntil:'networkidle'});
 const reject = page.getByRole('button',{name:'Tout rejeter',exact:true});
 if(await reject.count()) await reject.click();
 console.log(JSON.stringify(await page.evaluate(()=>({scripts:[...document.scripts].map(s=>s.src).filter(Boolean),styles:[...document.querySelectorAll('link[rel=stylesheet]')].map(s=>s.href),elements:[...document.querySelectorAll('h2,h3,a')].filter(e=>/Une agence|singulière|En savoir plus/.test(e.textContent)).slice(0,8).map(e=>{const s=getComputedStyle(e);return {tag:e.tagName,text:e.textContent.trim(),class:e.className,html:e.outerHTML.slice(0,1800),font:s.fontFamily,size:s.fontSize,weight:s.fontWeight,lineHeight:s.lineHeight,spacing:s.letterSpacing,padding:s.padding,transition:s.transition,transform:s.transform}})})),null,2));
 await page.evaluate(()=>scrollTo(0,1300));await page.waitForTimeout(800);await page.screenshot({path:'reports/reference-copy.png'});
 const scripts=await page.evaluate(()=>[...document.scripts].map(s=>s.src).filter(s=>s.includes('bb-b.net')));
 for(const url of scripts){const r=await page.request.get(url);const source=await r.text();const snippets=[...source.matchAll(/.{0,180}(?:gsap|ScrollTrigger|SplitText|IntersectionObserver|data-aos|stagger|clipPath).{0,250}/g)].slice(0,20).map(m=>m[0]);if(snippets.length)console.log(JSON.stringify({url,snippets}));}
 await browser.close();
})();
