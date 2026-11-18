import { FaceDetector,FaceLandmarker,FilesetResolver } from "@mediapipe/tasks-vision";
// MediaPipe's WASM runtime logs benign informational lines (XNNPACK delegate creation,
// feedback-manager notices, GL context setup) through console.error. Next.js treats any
// console.error as a crash and shows its red overlay, so filter just these known-safe lines.
if(typeof window!=="undefined"&&!(window as unknown as {__mpLogPatched?:boolean}).__mpLogPatched){
 (window as unknown as {__mpLogPatched?:boolean}).__mpLogPatched=true;
 const nativeError=console.error.bind(console);
 const benign=/XNNPACK delegate|inference_feedback_manager|gl_context\.cc|CLOSE_PATH_NV|Feedback manager/;
 console.error=(...args:unknown[])=>{
  if(typeof args[0]==="string"&&benign.test(args[0]))return;
  nativeError(...args);
 };
}
const WASM_URL="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm";
const DETECTOR_MODEL="https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite";
const LANDMARKER_MODEL="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
let detectorPromise:Promise<FaceDetector>|null=null;
let landmarkerPromise:Promise<FaceLandmarker>|null=null;
function getDetector(){
 if(!detectorPromise)detectorPromise=FilesetResolver.forVisionTasks(WASM_URL).then(files=>FaceDetector.createFromOptions(files,{baseOptions:{modelAssetPath:DETECTOR_MODEL},runningMode:"IMAGE"}));
 return detectorPromise;
}
function getLandmarker(){
 if(!landmarkerPromise)landmarkerPromise=FilesetResolver.forVisionTasks(WASM_URL).then(files=>FaceLandmarker.createFromOptions(files,{baseOptions:{modelAssetPath:LANDMARKER_MODEL},runningMode:"IMAGE",numFaces:1}));
 return landmarkerPromise;
}
export type NormalizedBox={x:number;y:number;width:number;height:number};
export async function detectFaceBox(img:HTMLImageElement):Promise<NormalizedBox|null>{
 try{
  const detector=await getDetector();
  const result=detector.detect(img);
  const box=result.detections[0]?.boundingBox;
  if(!box)return null;
  return{x:box.originX/img.naturalWidth,y:box.originY/img.naturalHeight,width:box.width/img.naturalWidth,height:box.height/img.naturalHeight};
 }catch{return null}
}
export type FaceFeatures={faceShape:string;eyeShape:string;noseWidth:string;mouthWidth:string};
const dist=(a:{x:number;y:number},b:{x:number;y:number})=>Math.hypot(a.x-b.x,a.y-b.y);
export async function analyzeFaceFeatures(img:HTMLImageElement):Promise<FaceFeatures|null>{
 try{
  const landmarker=await getLandmarker();
  const result=landmarker.detect(img);
  const pts=result.faceLandmarks[0];
  if(!pts||!pts.length)return null;
  const p=(i:number)=>({x:pts[i].x,y:pts[i].y});
  const faceWidth=dist(p(234),p(454));
  const faceHeight=dist(p(10),p(152));
  const jawWidth=dist(p(58),p(288));
  const ratio=faceHeight/faceWidth;
  const jawRatio=jawWidth/faceWidth;
  let faceShape="Oval";
  if(ratio>1.42)faceShape="Oblong";
  else if(jawRatio<0.72)faceShape="Heart";
  else if(ratio<1.08&&jawRatio>0.86)faceShape="Round";
  else if(jawRatio>0.86)faceShape="Square";
  const eyeWidth=dist(p(33),p(133));
  const eyeHeight=dist(p(159),p(145));
  const eyeRatio=eyeHeight/eyeWidth;
  const eyeShape=eyeRatio>0.37?"Round":eyeRatio<0.24?"Narrow":"Almond";
  const noseWidthRatio=dist(p(49),p(279))/faceWidth;
  const noseWidth=noseWidthRatio>0.33?"Wide":noseWidthRatio<0.25?"Narrow":"Balanced";
  const mouthWidthRatio=dist(p(61),p(291))/faceWidth;
  const mouthWidth=mouthWidthRatio>0.46?"Wide":mouthWidthRatio<0.34?"Narrow":"Balanced";
  return{faceShape,eyeShape,noseWidth,mouthWidth};
 }catch{return null}
}
