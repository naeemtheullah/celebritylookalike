"use client";
import { useEffect,useState } from "react";
import { Moon,Sun } from "lucide-react";
export default function ThemeToggle(){
  const [theme,setTheme]=useState<"light"|"dark">("light");
  useEffect(()=>{
    const resolved=document.documentElement.getAttribute("data-theme") as "light"|"dark"|null;
    setTheme(resolved??(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
  },[]);
  const toggle=()=>{
    const next=theme==="dark"?"light":"dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme",next);
    try{localStorage.setItem("theme",next)}catch{}
  };
  return <button className="theme-toggle" onClick={toggle} aria-label={theme==="dark"?"Switch to light theme":"Switch to dark theme"}>
    {theme==="dark"?<Sun size={18}/>:<Moon size={18}/>}
  </button>;
}
