import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {celebrities} from "@/data/celebrities";
const categories=['actors','actresses','singers','musicians','models','athletes','television-personalities'] as const;
const toCategorySlug=(category:string)=>category.toLowerCase().replaceAll(' ','-');
export function generateStaticParams(){
  return celebrities.map(c=>({category:toCategorySlug(c.category),slug:c.slug}));
}
export async function generateMetadata({params}:{params:Promise<{category:string;slug:string}>}):Promise<Metadata>{
  const {category,slug}=await params;
  const celebrity=celebrities.find(c=>c.slug===slug&&toCategorySlug(c.category)===category);
  if(!celebrity)return{};
  const title=`${celebrity.name} Look Alike — Find Your Celebrity Match`;
  const description=`See ${celebrity.name}'s reference photo in our library and test your own photo to find out how closely you match this celebrity look alike.`;
  const image=celebrity.images[0]?.thumbnailUrl;
  return{title,description,alternates:{canonical:`/celebrities/${category}/${slug}`},openGraph:{title,description,url:`/celebrities/${category}/${slug}`,type:"profile",images:image?[{url:image,width:700,height:700,alt:celebrity.name}]:undefined},twitter:{card:"summary_large_image",title,description,images:image?[image]:undefined}};
}
export default async function Page({params}:{params:Promise<{category:string;slug:string}>}){
  const {category,slug}=await params;
  if(!categories.includes(category as typeof categories[number]))notFound();
  const celebrity=celebrities.find(c=>c.slug===slug&&toCategorySlug(c.category)===category);
  if(!celebrity)notFound();
  const image=celebrity.images[0];
  const categoryTitle=celebrity.category;
  const related=celebrities.filter(c=>c.category===celebrity.category&&c.id!==celebrity.id).slice(0,6);
  const schema={"@context":"https://schema.org","@type":"Person","name":celebrity.name,"jobTitle":celebrity.profession,"description":celebrity.biography.slice(0,300),"image":image?.thumbnailUrl,"sameAs":celebrity.wikipediaUrl?[celebrity.wikipediaUrl]:undefined,"url":`https://celebritylookalike.pro/celebrities/${category}/${slug}`};
  return <article className="basic profile">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
    <p className="eyebrow"><Link href="/celebrities">Celebrity directory</Link> / <Link href={`/celebrities/${category}`}>{categoryTitle}</Link></p>
    <div className="profile-head">
      {image&&<img src={image.thumbnailUrl} alt={celebrity.name} width={160} height={160}/>}
      <div>
        <h1>{celebrity.name} look alike</h1>
        <p className="profile-role">{celebrity.profession}</p>
      </div>
    </div>
    <p>{celebrity.biography}</p>
    <p>Want to see how closely your own features compare to {celebrity.name}? Upload a clear photo and our private, browser-side matching tool will measure your facial descriptor against {celebrity.name} and every other celebrity in the reference library.</p>
    <Link className="primary" href="/#tool">Find your celebrity look alike →</Link>
    {image&&(image.author||image.attribution)&&<p className="attribution">Reference photo {image.attribution?`of ${image.attribution} `:''}by {image.author||"Wikimedia Commons contributor"}, licensed <a href={image.licenseUrl} rel="license noopener">{image.license}</a>, via <a href={image.filePageUrl} rel="noopener">Wikimedia Commons</a>.</p>}
    {related.length>0&&<section className="related"><h2>More {categoryTitle.toLowerCase()} in our library</h2><div className="related-grid">{related.map(r=><Link key={r.id} href={`/celebrities/${toCategorySlug(r.category)}/${r.slug}`}>{r.images[0]&&<img src={r.images[0].thumbnailUrl} alt={r.name}/>}<span>{r.name}</span></Link>)}</div></section>}
  </article>;
}
