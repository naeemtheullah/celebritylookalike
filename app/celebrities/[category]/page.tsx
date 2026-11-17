import type {Metadata} from 'next';
import Link from 'next/link';import {notFound} from 'next/navigation';import {celebrities} from '@/data/celebrities';
const categories=['actors','actresses','singers','musicians','models','athletes','television-personalities'] as const;
export function generateStaticParams(){return categories.map(category=>({category}))}
const titleFor=(category:string)=>category.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ');
export async function generateMetadata({params}:{params:Promise<{category:string}>}):Promise<Metadata>{
  const {category}=await params;
  if(!categories.includes(category as typeof categories[number]))return{};
  const title=titleFor(category);
  return{title:`${title} — Celebrity Directory`,description:`Browse verified ${title.toLowerCase()} in our reviewed, licensed celebrity reference library used to find your celebrity look alike.`,alternates:{canonical:`/celebrities/${category}`}};
}
export default async function Page({params}:{params:Promise<{category:string}>}){
  const {category}=await params;
  if(!categories.includes(category as typeof categories[number]))notFound();
  const title=titleFor(category);
  const items=celebrities.filter(c=>c.category.toLowerCase().replaceAll(' ','-')===category);
  const schema={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://celebritylookalike.pro/"},{"@type":"ListItem","position":2,"name":"Celebrity Directory","item":"https://celebritylookalike.pro/celebrities"},{"@type":"ListItem","position":3,"name":title,"item":`https://celebritylookalike.pro/celebrities/${category}`}]};
  return <article className="basic">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <p className="eyebrow"><Link href="/celebrities">Celebrity directory</Link></p><h1>{title}</h1><p>Browse verified {title.toLowerCase()} included in the face-comparison reference library. Entries appear only after metadata, photography rights and descriptors are reviewed.</p><div className="related-grid">{items.map(c=><Link key={c.id} href={`/celebrities/${category}/${c.slug}`}>{c.images[0]&&<img src={c.images[0].thumbnailUrl} alt={c.name}/>}<span>{c.name}</span></Link>)}</div>
  </article>;
}
