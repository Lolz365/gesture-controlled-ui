/**
 * Webcam helper — returns a started HTMLVideoElement.
 */
export async function startWebcam(videoEl, width = 640, height = 480) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width, height, facingMode: 'user' },
    audio: false
  });
  videoEl.srcObject = stream;
  await videoEl.play();
  return videoEl;
}
