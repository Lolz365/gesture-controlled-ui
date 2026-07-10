# gesture-controlled-ui

A static, GitHub Pages–friendly experiment hub for gesture-controlled UI interactions. Uses LiteRT.js (.tflite in-browser) + MediaPipe hand tracking via webcam.

## Live Demos
- [Gesture Art](experiments/gesture-art.html)
- [Fog Mirror](experiments/fog-mirror.html)
- [Breath Room](experiments/breath-room.html)
- [Liquid Light](experiments/liquid-light.html)
- [Magnet Field](experiments/magnet-field.html)

## Stack
- Vanilla JS + HTML5 Canvas
- LiteRT Web (Wasm / WebGPU / WebNN)
- MediaPipe Hand Landmark model (.tflite)
- No build step — open in browser or deploy via GitHub Pages

## Setup
1. Clone the repo
2. Open `index.html` in a browser (or use `npx serve .`)
3. Allow webcam access when prompted
