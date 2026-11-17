import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Terms and Conditions",description:"The terms governing your use of Celebrity Look Alike, including acceptable use, celebrity image licensing, and limitations of liability.",alternates:{canonical:"/terms-and-conditions"}};
export default function Page(){return <article className="basic">
  <p className="eyebrow">Please read before use</p>
  <h1>Terms and conditions</h1>
  <p className="meta">Last updated: 17 November 2026</p>
  <p>These terms govern your use of Celebrity Look Alike. By using the tool, you agree to them. If you don't agree, please don't use the service.</p>
  <ul className="toc">
    <li><a href="#service">The service</a></li>
    <li><a href="#use">Acceptable use</a></li>
    <li><a href="#ip">Intellectual property &amp; images</a></li>
    <li><a href="#endorsement">No endorsement</a></li>
    <li><a href="#warranty">Disclaimer of warranties</a></li>
    <li><a href="#liability">Limitation of liability</a></li>
    <li><a href="#changes">Changes to these terms</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <h2 id="service">The service</h2>
  <p>Celebrity Look Alike is a free, browser-based tool that compares a photo you provide against a reviewed library of celebrity reference images and reports the closest visual matches by a mathematical distance measurement. It is provided for entertainment and informational purposes only.</p>

  <h2 id="use">Acceptable use</h2>
  <p>You agree to use this service only with photographs you have the right to process — your own photo, or one you have clear permission to use. You agree not to:</p>
  <ul>
    <li>Use results to identify, track, or make consequential decisions about any real person;</li>
    <li>Upload photographs of others without their consent;</li>
    <li>Use the tool to harass, defame, or impersonate anyone;</li>
    <li>Represent a result as a celebrity endorsement, affiliation, or sponsorship;</li>
    <li>Attempt to disrupt, overload, or reverse-engineer the service in bad faith.</li>
  </ul>

  <h2 id="ip">Intellectual property &amp; images</h2>
  <p>Celebrity reference photographs used in the library are sourced from Wikipedia and Wikimedia Commons under Creative Commons or public-domain licenses, with attribution and license details shown on each celebrity's profile page. All other site content, design, and code are the property of Celebrity Look Alike unless otherwise noted. You may not reuse celebrity reference images outside the terms of their original license.</p>

  <h2 id="endorsement">No endorsement</h2>
  <p>This is an independent project. No celebrity featured in the reference library has endorsed, sponsored, or is otherwise affiliated with this service, and a visual-similarity result does not imply any such relationship.</p>

  <h2 id="warranty">Disclaimer of warranties</h2>
  <p>The service is provided "as is" and "as available," without warranties of any kind, express or implied, including accuracy, reliability, or fitness for a particular purpose. Facial comparison results depend on image quality, lighting, pose, and the limitations of the underlying model, and may be incomplete, inconsistent, or wrong.</p>

  <h2 id="liability">Limitation of liability</h2>
  <p>To the fullest extent permitted by applicable law, Celebrity Look Alike and its operators are not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, this service, including any reliance placed on its results.</p>

  <h2 id="changes">Changes to these terms</h2>
  <p>We may update these terms as the service evolves. Continued use after a change constitutes acceptance of the revised terms. Material changes will be reflected by updating the date above.</p>

  <h2 id="contact">Contact</h2>
  <p>Questions about these terms can be sent to <a href="mailto:info@celebritylookalike.pro">info@celebritylookalike.pro</a> or via our <Link href="/contact">contact page</Link>.</p>
</article>}
