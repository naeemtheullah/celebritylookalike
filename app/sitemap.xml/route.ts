import {celebrities} from '@/data/celebrities';
export const dynamic='force-static';
const BASE='https://celebritylookalike.pro';
const LAST_MOD='2026-11-17';
const toCategorySlug=(c:string)=>c.toLowerCase().replaceAll(' ','-');

type Img={loc:string;title?:string;caption?:string};
type Entry={url:string;images?:Img[]};

const homeImages:Img[]=[
 {loc:`${BASE}/serp/celebrity-look-alike.webp`,title:'Celebrity Look Alike — Find Your AI Face Match'},
 {loc:`${BASE}/illustrations/private-face-match.jpg`,title:'Illustrated portrait and reflection connected by facial landmark lines'},
 {loc:`${BASE}/illustrations/photo-tips.jpg`,title:'A person taking a clear, front-facing selfie in soft window light'},
 {loc:`${BASE}/illustrations/browser-privacy.jpg`,title:'Facial landmarks protected inside a private boundary'},
 {loc:`${BASE}/celeb-logo.webp`,title:'Celebrity Look Alike logo'},
];
const blogImages:Record<string,Img>={
 'blog/how-to-find-your-celebrity-look-alike':{loc:`${BASE}/blog/how-to-find-your-celebrity-look-alike.webp`,title:'How to find your celebrity look-alike'},
 'blog/celebrity-look-alike-ai-explained':{loc:`${BASE}/blog/celebrity-look-alike-ai-explained.webp`,title:'Celebrity look-alike AI, explained'},
 'blog/celebrity-look-alike-quiz-vs-ai-face-match':{loc:`${BASE}/blog/celebrity-look-alike-quiz-vs-ai-face-match.webp`,title:'Celebrity look-alike quiz vs. AI face match'},
};
const staticPaths=['','about','contact','faq','celebrities','celebrities/actors','celebrities/actresses','celebrities/singers','celebrities/musicians','celebrities/models','celebrities/athletes','celebrities/television-personalities','privacy-policy','cookie-policy','terms-and-conditions','disclaimer','blog'];

function buildEntries():Entry[]{
 const list:Entry[]=staticPaths.map(p=>({url:`${BASE}/${p}`,images:p===''?homeImages:undefined}));
 for(const slug of Object.keys(blogImages))list.push({url:`${BASE}/${slug}`,images:[blogImages[slug]]});
 for(const c of celebrities){
  const url=`${BASE}/celebrities/${toCategorySlug(c.category)}/${c.slug}`;
  const img=c.images[0];
  list.push({url,images:img?[{loc:img.thumbnailUrl.startsWith('http')?img.thumbnailUrl:`${BASE}${img.thumbnailUrl}`,title:`${c.name} — celebrity look-alike reference photo`,caption:img.attribution?`Reference photo of ${img.attribution}, licensed ${img.license}, via Wikimedia Commons.`:`Reference photo of ${c.name}, licensed ${img.license}, via Wikimedia Commons.`}]:undefined});
 }
 return list;
}
const escapeXml=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');

export async function GET(){
 const entries=buildEntries();
 const body=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map(e=>{
  const imagesXml=(e.images??[]).map(img=>`    <image:image>\n      <image:loc>${escapeXml(img.loc)}</image:loc>${img.title?`\n      <image:title>${escapeXml(img.title)}</image:title>`:''}${img.caption?`\n      <image:caption>${escapeXml(img.caption)}</image:caption>`:''}\n    </image:image>`).join('\n');
  return `  <url>\n    <loc>${escapeXml(e.url)}</loc>\n    <lastmod>${LAST_MOD}</lastmod>\n${imagesXml}\n  </url>`;
 }).join('\n')}\n</urlset>\n`;
 return new Response(body,{headers:{'Content-Type':'application/xml'}});
}
