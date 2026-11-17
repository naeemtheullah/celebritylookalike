"use client";
import { useEffect,useRef,useState } from "react";
import { Check,X,ZoomIn } from "lucide-react";
const OUTPUT_SIZE=640;
export default function ImageCropper({src,onConfirm,onCancel}:{src:string;onConfirm:(dataUrl:string)=>void;onCancel:()=>void}){
 const viewport=useRef<HTMLDivElement>(null);
 const imgRef=useRef<HTMLImageElement>(null);
 const [size,setSize]=useState(0);
 const [natural,setNatural]=useState({w:0,h:0});
 const [zoom,setZoom]=useState(1);
 const [pos,setPos]=useState({x:0,y:0});
 const drag=useRef<{active:boolean;startX:number;startY:number;origX:number;origY:number}>({active:false,startX:0,startY:0,origX:0,origY:0});
 const baseScale=size&&natural.w?Math.max(size/natural.w,size/natural.h):0;
 const ready=baseScale>0;
 useEffect(()=>{
  const el=viewport.current; if(!el)return;
  const ro=new ResizeObserver(entries=>{const w=entries[0]?.contentRect.width;if(w)setSize(w)});
  ro.observe(el);
  return()=>ro.disconnect();
 },[]);
 useEffect(()=>{
  if(!ready)return;
  setZoom(1);
  const w=natural.w*baseScale,h=natural.h*baseScale;
  setPos({x:(size-w)/2,y:(size-h)/2});
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[ready,size,natural.w,natural.h]);
 const clamp=(x:number,y:number,scale:number)=>{
  const w=natural.w*scale,h=natural.h*scale;
  const minX=Math.min(0,size-w),minY=Math.min(0,size-h);
  return{x:Math.min(0,Math.max(minX,x)),y:Math.min(0,Math.max(minY,y))};
 };
 useEffect(()=>{if(ready)setPos(p=>clamp(p.x,p.y,baseScale*zoom))},[zoom]);
 const onImgLoad=()=>{const img=imgRef.current;if(img)setNatural({w:img.naturalWidth,h:img.naturalHeight})};
 const down=(clientX:number,clientY:number)=>{drag.current={active:true,startX:clientX,startY:clientY,origX:pos.x,origY:pos.y}};
 const move=(clientX:number,clientY:number)=>{if(!drag.current.active||!ready)return;const dx=clientX-drag.current.startX,dy=clientY-drag.current.startY;setPos(clamp(drag.current.origX+dx,drag.current.origY+dy,baseScale*zoom))};
 const up=()=>{drag.current.active=false};
 const confirm=()=>{
  const img=imgRef.current; if(!img||!ready)return;
  const scale=baseScale*zoom;
  const sx=-pos.x/scale,sy=-pos.y/scale,ssize=size/scale;
  const canvas=document.createElement("canvas"); canvas.width=OUTPUT_SIZE; canvas.height=OUTPUT_SIZE;
  const ctx=canvas.getContext("2d"); if(!ctx)return;
  ctx.drawImage(img,sx,sy,ssize,ssize,0,0,OUTPUT_SIZE,OUTPUT_SIZE);
  onConfirm(canvas.toDataURL("image/jpeg",.92));
 };
 return <div className="cropper">
  <div className="crop-viewport" ref={viewport}
   onPointerDown={e=>{(e.target as HTMLElement).setPointerCapture(e.pointerId);down(e.clientX,e.clientY)}}
   onPointerMove={e=>move(e.clientX,e.clientY)}
   onPointerUp={up} onPointerCancel={up}>
   <img ref={imgRef} src={src} alt="Crop your photo" draggable={false} onLoad={onImgLoad}
    style={ready?{transform:`translate(${pos.x}px,${pos.y}px)`,width:natural.w*baseScale*zoom,height:natural.h*baseScale*zoom}:{opacity:0}}/>
   <div className="crop-frame"/>
  </div>
  {ready&&<div className="crop-zoom"><ZoomIn size={16}/><input type="range" min={1} max={3} step={.01} value={zoom} onChange={e=>setZoom(Number(e.target.value))}/></div>}
  <div className="crop-actions">
   <button className="secondary outline" onClick={onCancel}><X size={16}/> Cancel</button>
   <button className="primary" onClick={confirm} disabled={!ready}><Check size={16}/> Use this crop</button>
  </div>
 </div>;
}
