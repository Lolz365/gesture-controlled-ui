/**
 * hand-tracker.js — MediaPipe Tasks Vision wrapper
 * Loads HandLandmarker from CDN, no build step required.
 */

let handLandmarker = null;
let lastVideoTime = -1;

export async function initHandTracker() {
  const vision = await import(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/vision_bundle.mjs'
  );
  const { HandLandmarker, FilesetResolver } = vision;

  const filesetResolver = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm'
  );

  handLandmarker = await HandLandmarker.createFromOptions(filesetResolver, {
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
      delegate: 'GPU'
    },
    runningMode: 'VIDEO',
    numHands: 1
  });

  console.log('[HandTracker] ready');
  return handLandmarker;
}

export function detectHands(videoEl) {
  if (!handLandmarker || videoEl.readyState < 2) return [];
  if (videoEl.currentTime === lastVideoTime) return [];
  lastVideoTime = videoEl.currentTime;
  try {
    const result = handLandmarker.detectForVideo(videoEl, performance.now());
    return result.landmarks?.[0] ?? [];
  } catch (e) {
    return [];
  }
}

export function palmCenter(landmarks, w, h) {
  if (!landmarks.length) return null;
  const ids = [0, 5, 9, 13, 17];
  const avg = ids.reduce((a, id) => { a.x += landmarks[id].x; a.y += landmarks[id].y; return a; }, { x: 0, y: 0 });
  return { x: (avg.x / ids.length) * w, y: (avg.y / ids.length) * h };
}

export function indexTip(landmarks, w, h) {
  if (!landmarks.length) return null;
  return { x: landmarks[8].x * w, y: landmarks[8].y * h };
}

export function isPinching(landmarks, w, h, threshold = 40) {
  if (!landmarks.length) return false;
  const t = landmarks[4], i = landmarks[8];
  const dx = (t.x - i.x) * w, dy = (t.y - i.y) * h;
  return Math.sqrt(dx * dx + dy * dy) < threshold;
}

export function handOpenness(landmarks, w, h) {
  if (!landmarks.length) return null;
  const base = landmarks[0];
  const tips = [4, 8, 12, 16, 20];
  const avg = tips.reduce((sum, id) => {
    const dx = (landmarks[id].x - base.x) * w;
    const dy = (landmarks[id].y - base.y) * h;
    return sum + Math.sqrt(dx * dx + dy * dy);
  }, 0) / tips.length;
  return Math.min(Math.max((avg - 50) / 130, 0), 1);
}
