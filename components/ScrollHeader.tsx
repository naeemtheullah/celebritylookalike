"use client";
import { useEffect } from "react";
export default function ScrollHeader(){
 useEffect(()=>{
  const onScroll=()=>document.body.classList.toggle("scrolled",window.scrollY>24);
  onScroll();
  window.addEventListener("scroll",onScroll,{passive:true});
  return()=>window.removeEventListener("scroll",onScroll);
 },[]);
 return null;
}
