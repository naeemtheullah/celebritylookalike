import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Blog",description:"Guides on finding your celebrity look-alike, how AI face matching works, and how it compares to quizzes and filters.",alternates:{canonical:"/blog"}};
const posts=[
 {slug:"how-to-find-your-celebrity-look-alike",title:"How to Find Your Celebrity Look-Alike (Free & Private)",excerpt:"A step-by-step guide to finding your celebrity look-alike with a clear photo, what the match score means, common mistakes, and why results can vary.",readTime:"8 min read"},
 {slug:"celebrity-look-alike-ai-explained",title:"Celebrity Look-Alike AI Explained: How It Works (and Can ChatGPT Do It?)",excerpt:"What's actually happening behind an AI celebrity look-alike generator, how it differs from ChatGPT and deepfake technology, and what it can't tell you.",readTime:"9 min read"},
 {slug:"celebrity-look-alike-quiz-vs-ai-face-match",title:"Celebrity Look-Alike Quiz vs. AI Face Match: Which Is More Accurate?",excerpt:"Personality quizzes, Instagram filters, and AI face-descriptor matching all claim to find your celebrity look-alike. Here's how they actually differ.",readTime:"8 min read"},
];
export default function Page(){return <article className="basic">
  <p className="eyebrow">Guides &amp; explainers</p>
  <h1>Blog</h1>
  <p>Deeper dives into how celebrity look-alike matching actually works, and how to get the most out of it.</p>
  <div className="blog-grid">
    {posts.map(p=><Link key={p.slug} className="blog-card" href={`/blog/${p.slug}`}>
      <img src={`/blog/${p.slug}.webp`} alt="" width={1731} height={909}/>
      <div className="blog-card-body">
        <h2>{p.title}</h2>
        <p>{p.excerpt}</p>
        <small className="meta">{p.readTime}</small>
      </div>
    </Link>)}
  </div>
</article>}
