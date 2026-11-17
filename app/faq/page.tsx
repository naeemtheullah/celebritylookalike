import type {Metadata} from "next";
import type {ReactNode} from "react";
import Link from "next/link";
export const metadata:Metadata={title:"FAQ",description:"Answers about how Celebrity Look Alike works, how your data is handled, why results vary, and how the celebrity reference library is built.",alternates:{canonical:"/faq"}};
type Entry=[string,ReactNode,string?];
const groups:[string,Entry[]][]=[
 ["General",[
  ["What is Celebrity Look Alike?","A free tool that compares your photo's facial geometry against a reviewed library of celebrities and ranks the closest visual matches. It's built for fun and curiosity, not identification."],
  ["Who is my celebrity look-alike?",<>Upload a clear, front-facing photo to our <Link href="/#tool">finder</Link> and it ranks the closest matches from our reviewed library in seconds — see our <Link href="/blog/how-to-find-your-celebrity-look-alike">step-by-step guide</Link> for tips on getting the best result.</>,"Upload a clear, front-facing photo to our finder and it ranks the closest matches from our reviewed library in seconds."],
  ["Is there a celebrity look-alike app to download?","No download needed — the tool runs directly in your browser on desktop or mobile, so there's nothing to install."],
  ["Is this the same as facial recognition used for identification?","No. Facial recognition for identification confirms whether two photos show the same person. This tool does the opposite — it measures resemblance between different people, which is a much looser, more approximate comparison."],
  ["Do I need an account?","No. The tool works without sign-up, and we don't build a profile of your visits."],
 ]],
 ["Privacy & data",[
  ["Does my photo leave my device?","No. Face detection and descriptor generation run entirely in your browser using on-device AI models. Your photo and its numerical descriptor are never uploaded by this tool."],
  ["Is my photo stored anywhere?","No. Everything is held in browser memory only and is cleared when you reset the tool, close the tab, or navigate away."],
  ["What does the cookie banner actually control?",<>Only one thing: a local preference recording your consent choice. No analytics or marketing technologies are installed in this build regardless of your choice. See our <Link href="/cookie-policy">cookie policy</Link> for details.</>,"Only one thing: a local preference recording your consent choice. No analytics or marketing technologies are installed in this build regardless of your choice."],
 ]],
 ["Accuracy & results",[
  ["Is a match percentage a confidence score?","No. It's a readable scale built from the mathematical distance between face descriptors — useful for comparing results against each other, not a statistical probability or scientific measurement."],
  ["Why did I get no match at all?","It means nothing in our current library is a reasonably close fit for your photo. That's an honest result, not a bug — we'd rather show nothing than force a weak match."],
  ["Why might I get different matches for two photos of myself?","Lighting, camera angle, expression, image quality, and even which reference photo exists for a celebrity can all shift the measured distance and change the ranking."],
  ["Can a bad photo cause a false 'no face found' error?","Yes. Backlighting, extreme angles, low resolution, or a face that's very small in the frame can all lower the detector's confidence below its threshold. Try a brighter, front-facing, higher-resolution photo."],
 ]],
 ["Celebrities & the reference library",[
  ["How are celebrities chosen for the library?","Each entry needs a single, clearly visible face in a properly licensed reference photo (Creative Commons or public domain) before it's added — we review licensing and image quality manually."],
  ["Can I suggest a celebrity to add?",<>Yes — see our <Link href="/contact">contact page</Link> for what to include.</>,"Yes — see our contact page for what to include."],
  ["Does a match mean I resemble that celebrity in real life?","Only according to this specific model's geometric comparison. Human perception of resemblance also weighs things like hairstyle, expression, and context that this tool doesn't consider."],
 ]],
 ["AI & comparisons",[
  ["Can ChatGPT find my celebrity look-alike?",<>Not in the same measured way — see our <Link href="/blog/celebrity-look-alike-ai-explained">explainer on celebrity look-alike AI</Link> for how a chat AI's guess differs from an actual face-descriptor comparison.</>,"Not in the same measured way — a chat AI's guess is a language-model impression, not a measured comparison against a fixed reference library."],
  ["What's the difference between a celebrity look-alike quiz and this tool?",<>A quiz scores your answers to questions, not your face. See our <Link href="/blog/celebrity-look-alike-quiz-vs-ai-face-match">quiz vs. AI face match comparison</Link> for the full breakdown, including Instagram/Snapchat-style filters.</>,"A quiz scores your answers to questions, not your face. This tool measures actual facial geometry instead."],
 ]],
 ["Technical",[
  ["Can I use my phone's camera instead of uploading a file?","Yes. Camera access is requested only after you choose that option, and its media stream is stopped as soon as you close the camera view or capture a photo."],
  ["What image formats and sizes are supported?","JPG, PNG, and WebP, up to 10 MB."],
  ["Which browsers are supported?","Any modern browser with WebGL support (Chrome, Edge, Firefox, Safari). Very old or restricted browsers may be unable to load the on-device AI models."],
 ]],
];
const schema={"@context":"https://schema.org","@type":"FAQPage","mainEntity":groups.flatMap(([,items])=>items.map(([q,a,plain])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":plain??(a as string)}})))};
export default function Page(){return <article className="basic">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <p className="eyebrow">Questions, answered</p>
  <h1>Celebrity look-alike FAQ</h1>
  <p className="meta">Last updated: 17 November 2026</p>
  <p>Clear information about how the tool works, what your results mean, and how your data is handled. Still have a question? <Link href="/contact">Contact us</Link>.</p>
  {groups.map(([group,items])=><div className="faq-group" key={group}>
    <h2>{group}</h2>
    {items.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}
  </div>)}
</article>}
