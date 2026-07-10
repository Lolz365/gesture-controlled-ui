/**
 * LiteRT Web bootstrap helper.
 * Loads the LiteRT WASM runtime and a .tflite hand-landmark model,
 * then exposes runInference(imageData) -> landmarks[].
 *
 * Requires: https://unpkg.com/@tensorflow/tfjs-tflite/dist/tf-tflite.min.js
 * (or the LiteRT Web package once GA)
 */

export async function initLiteRT(modelPath = 'models/hand_landmark_lite.tflite') {
  // LiteRT Web uses the same API surface as TFLite Task Library
  const { TFLiteModel, loadTFLiteModel } = window.tflite ?? {};
  if (!loadTFLiteModel) throw new Error('LiteRT/TFLite not loaded. Include the script tag first.');

  const model = await loadTFLiteModel(modelPath);
  console.log('[LiteRT] model loaded:', modelPath);
  return model;
}

export function tensorToLandmarks(outputTensor, width, height) {
  // Hand landmark model outputs 21 keypoints × 3 (x,y,z)
  const data = outputTensor.dataSync();
  const landmarks = [];
  for (let i = 0; i < 21; i++) {
    landmarks.push({
      x: data[i * 3] * width,
      y: data[i * 3 + 1] * height,
      z: data[i * 3 + 2]
    });
  }
  return landmarks;
}
