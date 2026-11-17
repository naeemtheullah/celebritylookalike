import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Contact",description:"Get in touch with the Celebrity Look Alike team for support, celebrity suggestions, privacy questions, or press inquiries.",alternates:{canonical:"/contact"}};
export default function Page(){return <article className="basic">
  <p className="eyebrow">We'd like to hear from you</p>
  <h1>Contact us.</h1>
  <p>Whether you've hit a bug, want to suggest a celebrity for the reference library, or have a question about how your data is handled, the fastest way to reach us is by email.</p>

  <div className="callout">
    <h3>Email support</h3>
    <p><a href="mailto:info@celebritylookalike.pro">info@celebritylookalike.pro</a></p>
    <p className="meta">We aim to respond within 2–3 business days. This is an independently run project, so please bear with us during busy periods.</p>
  </div>

  <h2>What to include</h2>
  <ul>
    <li><strong>Bug reports:</strong> the browser and device you're using, and what you expected versus what happened. A screenshot helps a lot.</li>
    <li><strong>Celebrity suggestions:</strong> the person's name and, if possible, a link to a clearly licensed photo (Wikimedia Commons works well).</li>
    <li><strong>Privacy questions:</strong> what you'd like to know — see our <Link href="/privacy-policy">privacy policy</Link> first, since most questions are answered there.</li>
    <li><strong>Press or partnership inquiries:</strong> a short description of your publication or project and what you're looking for.</li>
  </ul>

  <h2>Before you write in</h2>
  <p>Many questions are already answered in our <Link href="/faq">FAQ</Link> — particularly around why results vary, what a match percentage means, and whether your photo is ever stored (it isn't). It's worth a quick look first.</p>

  <h2>What we can't help with</h2>
  <p>We don't offer phone or live chat support, and we can't process requests to "remove" a photo from our systems — because nothing you upload is ever stored or transmitted by this tool in the first place. See our <Link href="/privacy-policy">privacy policy</Link> for the full explanation.</p>
</article>}
