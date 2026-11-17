import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"About Us",description:"Learn how Celebrity Look Alike works, why it was built privacy-first, and how its celebrity reference library is reviewed.",alternates:{canonical:"/about"}};
export default function Page(){return <article className="basic">
  <p className="eyebrow">About the project</p>
  <h1>A careful approach to visual resemblance.</h1>
  <p className="meta">Last updated: 17 November 2026</p>
  <p>Celebrity Look Alike is an independent face-comparison tool built around two priorities that are often at odds: a fun, genuinely useful result, and total honesty about what that result actually means. It measures approximate visual similarity between your photo and a reviewed library of celebrities. It does not identify people, verify identity, or make any claim about who you are.</p>

  <h2>Why we built this</h2>
  <p>Most "celebrity look-alike" tools online fall into one of two camps: novelty apps that upload your photo to a server you can't inspect, or gimmicks that return a match regardless of how close it actually is. We wanted something different — a tool that runs entirely in your browser, is upfront about the limits of face-matching technology, and tells you plainly when nothing in its library is actually a good fit.</p>

  <h2>How the matching works</h2>
  <p>One face is detected in your photo and its landmarks are mapped. That geometry is converted into a 128-dimensional numerical descriptor using a published face-recognition model. The same model and version generate a descriptor for every celebrity in our reference library, so comparisons happen on equal footing. Your descriptor is then compared against the library and ranked by Euclidean distance — a mathematical measure of how close two descriptors are, not a probability or identity score.</p>
  <p>The reference library currently includes 66 public figures spanning actors, singers, athletes, models, musicians, and television personalities from a range of regions and backgrounds, each one reviewed for a clear, single-face, appropriately licensed photo before being added.</p>

  <h2>What makes this different</h2>
  <ul>
    <li><strong>Nothing leaves your device.</strong> Face detection and descriptor generation run locally in your browser using on-device AI models — your photo is never uploaded to a server by this tool.</li>
    <li><strong>No accounts, no tracking.</strong> You can use the tool without signing up, and we don't build a profile of your visits.</li>
    <li><strong>Honest about uncertainty.</strong> If no celebrity in the library is a reasonably close match, we say so instead of forcing a weak result.</li>
  </ul>

  <h2>Our commitment to transparency</h2>
  <p>We'd rather under-promise than oversell what this technology can do. A low or missing match doesn't mean something went wrong — it usually just means the library doesn't yet include someone who shares your features. We're steadily expanding it. If you want the full technical and legal detail behind that promise, see our <Link href="/privacy-policy">privacy policy</Link> and <Link href="/disclaimer">disclaimer</Link>.</p>

  <h2>Keep exploring</h2>
  <ul>
    <li><Link href="/celebrities">Browse the celebrity directory</Link> to see who's currently in the reference library.</li>
    <li><Link href="/faq">Read the FAQ</Link> for answers about accuracy, privacy, and how results are calculated.</li>
    <li><Link href="/#tool">Try the tool</Link> with a clear, front-facing photo.</li>
  </ul>
</article>}
