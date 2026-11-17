# Celebrity Look Alike

Next.js browser-side celebrity resemblance application. Visitor images never leave the browser.

## Setup

1. Run `npm install`.
2. Copy the TinyFaceDetector, FaceLandmark68, and FaceRecognition model manifests and shards from the installed `@vladmandic/face-api/model` directory into `public/models`.
3. Review Wikimedia Commons images for commercial reuse and attribution.
4. Generate genuine 128-value descriptors with the same model release and place reviewed records in `public/celebrity-data/descriptors.json`.
5. Add matching normalized records to `data/celebrities.ts`.
6. Run `npm run typecheck` and `npm run build`.

No random or placeholder descriptors are included. The matcher intentionally reports an unavailable reference library until reviewed data is installed.
"# celebritylookalike" 
"# celebritylookalike" 
