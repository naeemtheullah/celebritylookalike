"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
export default function CookieBanner(){const [open,setOpen]=useState(false);useEffect(()=>setOpen(!localStorage.getItem("cookie-consent")),[]);const save=(v:string)=>{localStorage.setItem("cookie-consent",v);setOpen(false)};return open?<aside className="cookies" aria-label="Cookie preferences" role="dialog" aria-modal="false"><div className="cookies-icon"><Cookie size={20}/></div><div className="cookies-body"><strong>Your privacy, your choice</strong><p>We use only strictly necessary cookies today. Optional analytics and marketing stay off until you say otherwise. <Link href="/cookie-policy">Read our cookie policy</Link></p><div className="cookies-actions"><button className="secondary outline" onClick={()=>save("necessary")}>Reject optional</button><button className="primary small" onClick={()=>save("all")}>Accept all</button></div></div></aside>:null}
