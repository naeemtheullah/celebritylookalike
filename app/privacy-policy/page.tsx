import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Privacy Policy",description:"How Celebrity Look Alike handles your photo and data: processed entirely in your browser, never uploaded, stored, or used for training.",alternates:{canonical:"/privacy-policy"}};
export default function Page(){return <article className="basic">
  <p className="eyebrow">Your privacy, explained plainly</p>
  <h1>Privacy policy</h1>
  <p className="meta">Last updated: 17 November 2026</p>
  <p>This policy explains what happens to your photo and your data when you use Celebrity Look Alike. The short version: your photo never leaves your device, and we don't collect anything beyond a single local preference for cookie consent.</p>
  <ul className="toc">
    <li><a href="#photos">Your photos and face data</a></li>
    <li><a href="#storage">Local storage and cookies</a></li>
    <li><a href="#third-party">Third-party services</a></li>
    <li><a href="#children">Children's privacy</a></li>
    <li><a href="#retention">Data retention</a></li>
    <li><a href="#rights">Your rights</a></li>
    <li><a href="#changes">Changes to this policy</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <h2 id="photos">Your photos and face data</h2>
  <p>When you upload a photo or use your camera, face detection and descriptor generation happen entirely inside your browser using on-device AI models. Your photo and the numerical descriptor derived from it are:</p>
  <ul>
    <li><strong>Not uploaded</strong> to our servers or any third party by this tool.</li>
    <li><strong>Not stored</strong> in a database, file, or persistent browser storage.</li>
    <li><strong>Not used to train</strong> any model, by us or anyone else.</li>
    <li>Held only in your browser's working memory, and cleared when you reset the tool, close the tab, or navigate away.</li>
  </ul>
  <p>Because nothing is transmitted or retained, we have no record of your photo to produce, export, or delete — there's simply nothing on our side to act on.</p>

  <h2 id="storage">Local storage and cookies</h2>
  <p>The only thing we store on your device is a single preference recording your cookie-consent choice, saved via your browser's local storage. No analytics, advertising, or marketing technologies are installed in this build, regardless of that choice. Full detail is in our <Link href="/cookie-policy">cookie policy</Link>.</p>

  <h2 id="third-party">Third-party services</h2>
  <p>To build the celebrity reference library, your browser may request publicly available images and metadata from Wikipedia and Wikimedia Commons. These requests carry ordinary network information (such as your IP address, handled by those services under their own policies) but never include your photograph or facial descriptor — that data is generated and compared entirely locally and is never part of any outgoing request.</p>

  <h2 id="children">Children's privacy</h2>
  <p>This tool is not directed at children under 13, and we do not knowingly collect personal information from them. Since no photo or descriptor is ever transmitted or stored by this service regardless of who uses it, there is no data of this kind for us to hold on anyone, including minors.</p>

  <h2 id="retention">Data retention</h2>
  <p>We retain nothing related to your photo or analysis results. The only persistent data is the local cookie-consent preference described above, which stays on your device until you clear your browser storage.</p>

  <h2 id="rights">Your rights</h2>
  <p>Depending on where you live, privacy laws such as the GDPR or CCPA may give you rights to access, correct, or delete personal data held about you. Because we do not collect, transmit, or store your photo, descriptor, or any identifying analysis data, there is nothing of that kind for us to provide, correct, or delete. If you believe we hold any personal data about you, <Link href="/contact">contact us</Link> and we'll investigate.</p>

  <h2 id="changes">Changes to this policy</h2>
  <p>We may update this policy as the service evolves. Material changes will be reflected by updating the date at the top of this page.</p>

  <h2 id="contact">Contact</h2>
  <p>Questions about this policy can be sent to <a href="mailto:info@celebritylookalike.pro">info@celebritylookalike.pro</a> or via our <Link href="/contact">contact page</Link>.</p>
</article>}
