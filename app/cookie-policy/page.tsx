import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Cookie Policy",description:"Celebrity Look Alike uses a single strictly necessary local preference for cookie consent. No analytics or marketing cookies are installed.",alternates:{canonical:"/cookie-policy"}};
export default function Page(){return <article className="basic">
  <p className="eyebrow">Minimal by design</p>
  <h1>Cookie policy</h1>
  <p className="meta">Last updated: 17 November 2026</p>
  <p>This page explains exactly what we store in your browser, and why there's very little to explain.</p>

  <h2>What we actually store</h2>
  <p>We use one piece of local browser storage — not a traditional server-set cookie, but the same idea: a small value saved on your device.</p>
  <div className="card-grid">
    <article><h3>cookie-consent</h3><p>Purpose: remembers whether you accepted or rejected optional cookies. Type: strictly necessary, browser local storage. Duration: until you clear your browser's site data.</p></article>
  </div>

  <h2>What we don't use</h2>
  <ul>
    <li><strong>No analytics cookies</strong> — we don't track page views, sessions, or behavior.</li>
    <li><strong>No advertising or marketing cookies</strong> — nothing is installed for retargeting or ad personalization.</li>
    <li><strong>No third-party tracking scripts</strong> of any kind are loaded in this build.</li>
  </ul>
  <p>If that changes in the future, this page will be updated first, and the cookie banner will reflect the new categories before anything optional is enabled.</p>

  <h2>Managing your preference</h2>
  <p>You can change your mind at any time by clearing your browser's local site data for this domain, which will cause the cookie banner to reappear on your next visit. Most browsers offer this under Settings → Privacy → Site Data, or a similar path.</p>

  <h2>Related reading</h2>
  <p>For how your photo and face data are handled — separately from this local preference — see our <Link href="/privacy-policy">privacy policy</Link>.</p>

  <h2>Changes to this policy</h2>
  <p>Any future change to what we store will be reflected here before it takes effect, with the date above updated accordingly.</p>
</article>}
