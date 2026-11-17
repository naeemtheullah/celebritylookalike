import type { Metadata } from "next";import Link from "next/link";import "./globals.css";import "./illustration.css";import "./home-sections.css";import CookieBanner from "@/components/CookieBanner";import ThemeToggle from "@/components/ThemeToggle";
const themeInitScript=`try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
export const metadata:Metadata={metadataBase:new URL("https://celebritylookalike.pro"),title:{default:"Celebrity Look Alike — Private AI Face Match","template":"%s | Celebrity Look Alike"},description:"Discover which celebrities share similar facial features using private, browser-side face analysis.",alternates:{canonical:"/"},icons:{icon:"/logo.webp",shortcut:"/logo.webp",apple:"/logo.webp"},openGraph:{siteName:"Celebrity Look Alike",title:"Celebrity Look Alike",description:"Find your closest celebrity resemblance privately in your browser.",type:"website",locale:"en_US",images:[{url:"/og/celebrity-look-alike.png",width:1200,height:630,alt:"Celebrity Look Alike — Private AI Face Match"}]},twitter:{card:"summary_large_image",title:"Celebrity Look Alike",description:"Find your closest celebrity resemblance privately in your browser.",images:["/og/celebrity-look-alike.png"]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><script dangerouslySetInnerHTML={{__html:themeInitScript}}/></head><body>
<header><Link className="logo" href="/"><span className="logo-badge"><img src="/celeb-logo.webp" alt="Celebrity Look Alike" width={1983} height={793}/></span></Link><nav><Link href="/#tool">Finder</Link><Link href="/celebrities">Celebrities</Link><Link href="/about">About</Link><Link href="/faq">FAQ</Link></nav><ThemeToggle/><Link className="primary small header-cta" href="/#tool">Find my look alike</Link></header>
<main>{children}</main>
<footer>
  <div className="footer-grid">
    <div className="footer-brand"><Link className="logo" href="/"><span className="logo-badge"><img src="/celeb-logo.webp" alt="Celebrity Look Alike" width={1983} height={793}/></span></Link><p>Approximate resemblance, thoughtfully measured. Private, browser-side face comparison.</p></div>
    <div className="footer-col"><h3>Explore</h3><Link href="/#tool">Finder</Link><Link href="/celebrities">Celebrities</Link></div>
    <div className="footer-col"><h3>Company</h3><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/faq">FAQ</Link></div>
    <div className="footer-col"><h3>Legal</h3><Link href="/privacy-policy">Privacy</Link><Link href="/cookie-policy">Cookies</Link><Link href="/terms-and-conditions">Terms</Link><Link href="/disclaimer">Disclaimer</Link></div>
  </div>
  <div className="footer-bottom"><small>© {new Date().getFullYear()} Celebrity Look Alike. Independent service. No celebrity endorsement is implied.</small></div>
</footer>
<CookieBanner/></body></html>}
