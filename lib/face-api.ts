import type { CelebrityMatch,ReferenceDescriptor } from "@/types/celebrity";
import { celebrities } from "@/data/celebrities";
let ready=false;
let liveCache:ReferenceDescriptor[]|null=null;
export async function loadModels(){
  if(ready)return;
  const faceapi=await import("@vladmandic/face-api");
  await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models"),faceapi.nets.faceLandmark68Net.loadFromUri("/models"),faceapi.nets.faceRecognitionNet.loadFromUri("/models")]);
  ready=true;
}
export async function describeFace(image:HTMLImageElement){
  const faceapi=await import("@vladmandic/face-api");
  const detections=await faceapi.detectAllFaces(image,new faceapi.TinyFaceDetectorOptions({inputSize:416,scoreThreshold:.55})).withFaceLandmarks().withFaceDescriptors();
  if(detections.length===0)throw new Error("We couldn't find a clear face. Try a brighter, front-facing photo.");
  if(detections.length>1)throw new Error("We found more than one face. Please use a photo with one person.");
  const descriptor=Array.from(detections[0].descriptor);
  if(descriptor.length!==128||descriptor.some(v=>!Number.isFinite(v)))throw new Error("The face descriptor was invalid. Please try another photo.");
  return descriptor;
}
const distance=(a:number[],b:number[])=>Math.sqrt(a.reduce((sum,v,i)=>sum+(v-b[i])**2,0));
const MAX_MATCH_DISTANCE=0.6;
export const distanceToPercent=(d:number)=>Math.round(Math.max(0,Math.min(1,1-d/MAX_MATCH_DISTANCE))*100);
export function rankMatches(query:number[],refs:ReferenceDescriptor[]):CelebrityMatch[]{
  const best=new Map<string,number>();
  for(const ref of refs){if(ref.values.length!==128||ref.values.some(v=>!Number.isFinite(v)))continue;const d=distance(query,ref.values);best.set(ref.celebrityId,Math.min(d,best.get(ref.celebrityId)??Infinity));}
  return [...best].map(([id,d])=>({celebrity:celebrities.find(c=>c.id===id),distance:d})).filter((v):v is CelebrityMatch=>Boolean(v.celebrity)&&v.distance<=MAX_MATCH_DISTANCE).sort((a,b)=>a.distance-b.distance).slice(0,5);
}
export async function buildLiveReferenceLibrary(){
  if(liveCache)return liveCache;
  const faceapi=await import("@vladmandic/face-api"); const refs:ReferenceDescriptor[]=[];
  for(const celebrity of celebrities){
    try{
      const wikipedia=new URL("https://en.wikipedia.org/w/api.php"); wikipedia.search=new URLSearchParams({action:"query",format:"json",origin:"*",titles:celebrity.name,prop:"pageimages",piprop:"name"}).toString();
      const page=Object.values((await fetch(wikipedia).then(r=>r.json())).query.pages)[0] as {pageimage?:string}; if(!page.pageimage)continue;
      const commons=new URL("https://en.wikipedia.org/w/api.php"); commons.search=new URLSearchParams({action:"query",format:"json",origin:"*",titles:`File:${page.pageimage}`,prop:"imageinfo",iiprop:"url|extmetadata",iiurlwidth:"700"}).toString();
      const file=Object.values((await fetch(commons).then(r=>r.json())).query.pages)[0] as {imageinfo?:Array<{thumburl?:string;url:string;descriptionurl:string;extmetadata?:Record<string,{value?:string}>}>}; const info=file.imageinfo?.[0]; if(!info)continue;
      const license=(info.extmetadata?.LicenseShortName?.value??"").replace(/<[^>]+>/g,""); if(!/(CC BY|CC0|Public domain)/i.test(license)||/NC/i.test(license))continue;
      const blob=await fetch(info.thumburl??info.url).then(r=>r.blob()); const objectUrl=URL.createObjectURL(blob); const image=new Image(); image.src=objectUrl; await image.decode();
      const found=await faceapi.detectAllFaces(image,new faceapi.TinyFaceDetectorOptions({inputSize:416,scoreThreshold:.45})).withFaceLandmarks().withFaceDescriptors(); URL.revokeObjectURL(objectUrl); if(found.length!==1)continue;
      celebrity.images=[{thumbnailUrl:info.thumburl??info.url,originalUrl:info.url,sourceUrl:info.descriptionurl,filePageUrl:info.descriptionurl,license}]; refs.push({celebrityId:celebrity.id,modelVersion:"@vladmandic/face-api@1.7.15",referenceImageId:page.pageimage,values:Array.from(found[0].descriptor)});
    }catch{continue}
  }
  liveCache=refs; return refs;
}
