import type { CelebrityMatch,ReferenceDescriptor } from "@/types/celebrity";
import { celebrities } from "@/data/celebrities";
let ready=false;
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
export function rankMatches(query:number[],refs:ReferenceDescriptor[]):CelebrityMatch[]{
  const best=new Map<string,number>();
  for(const ref of refs){if(ref.values.length!==128||ref.values.some(v=>!Number.isFinite(v)))continue;const d=distance(query,ref.values);best.set(ref.celebrityId,Math.min(d,best.get(ref.celebrityId)??Infinity));}
  return [...best].map(([id,d])=>({celebrity:celebrities.find(c=>c.id===id),distance:d})).filter((v):v is CelebrityMatch=>Boolean(v.celebrity)).sort((a,b)=>a.distance-b.distance).slice(0,5);
}
