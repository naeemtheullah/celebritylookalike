import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Disclaimer",description:"Celebrity Look Alike results are approximate, for entertainment only, and are not an identity verification or celebrity endorsement.",alternates:{canonical:"/disclaimer"}};
export default function Page(){return <article className="basic">
  <p className="eyebrow">Read this before trusting a result</p>
  <h1>Disclaimer</h1>
  <p className="meta">Last updated: 17 November 2026</p>
  <p>This page sets out the limitations of Celebrity Look Alike plainly, so there's no ambiguity about what a result does and doesn't mean.</p>

  <h2>Entertainment purposes only</h2>
  <p>This tool is designed for fun and curiosity. Results are not scientific, medical, legal, or professional conclusions of any kind, and should not be treated as such.</p>

  <h2>Not an identity verification tool</h2>
  <p>A match reported by this tool reflects approximate geometric similarity between two face descriptors — it is not a biometric identity check, and it cannot confirm or deny who you are, who anyone else is, or whether two people are related.</p>

  <h2>Accuracy and limitations</h2>
  <p>Results depend heavily on factors outside the model's control: lighting, camera angle, image resolution, facial expression, and which reference photo happens to represent a given celebrity. The same person can receive different results from two different photos of themselves. The celebrity reference library is also limited in size — if a genuinely similar-looking person isn't included, the ranking simply cannot reflect that.</p>

  <h2>No celebrity endorsement or affiliation</h2>
  <p>This is an independent website, not affiliated with, endorsed by, or operated on behalf of any celebrity featured in the reference library. Inclusion in the library is based solely on the availability of a properly licensed, single-face reference photograph.</p>

  <h2>Image sourcing and licensing</h2>
  <p>Reference photographs are sourced from Wikipedia and Wikimedia Commons under Creative Commons or public-domain licenses. Attribution and license details appear on each celebrity's profile page. If you believe an image is used incorrectly or without proper attribution, please <Link href="/contact">contact us</Link>.</p>

  <h2>External links</h2>
  <p>Pages on this site may link to Wikipedia, Wikimedia Commons, or other third-party sites for attribution or further reading. We are not responsible for the content or practices of those external sites.</p>

  <h2>Limitation of liability</h2>
  <p>We make no warranty as to the accuracy, completeness, or reliability of any result produced by this tool, and accept no liability for decisions made or actions taken based on it. See our <Link href="/terms-and-conditions">terms and conditions</Link> for the full legal terms governing use of this service.</p>
</article>}
