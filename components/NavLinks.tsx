"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links=[
 {href:"/#tool",label:"Finder",match:(p:string)=>p==="/"},
 {href:"/celebrities",label:"Celebrities",match:(p:string)=>p.startsWith("/celebrities")},
 {href:"/about",label:"About",match:(p:string)=>p==="/about"},
 {href:"/faq",label:"FAQ",match:(p:string)=>p==="/faq"},
];
export default function NavLinks(){
 const pathname=usePathname();
 return <nav>{links.map(l=><Link key={l.href} href={l.href} className={l.match(pathname)?"active":undefined}>{l.label}</Link>)}</nav>;
}
