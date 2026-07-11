# ✋ gesture-controlled-ui

> **Browser-native hand-tracking experiments** — no install, no build step, just your webcam.

🔗 **Live site:** [lolz365.github.io/gesture-controlled-ui](https://lolz365.github.io/gesture-controlled-ui/)

---

## Experiments

| # | Experiment | Direct Link | Gesture | Technique |
|---|------------|-------------|---------|-----------|
| 1 | 🎨 **Gesture Art** | [Open →](https://lolz365.github.io/gesture-controlled-ui/experiments/gesture-art.html) | Index finger paints · Pinch lifts brush | Hand Landmarks |
| 2 | 🌫️ **Fog Mirror** | [Open →](https://lolz365.github.io/gesture-controlled-ui/experiments/fog-mirror.html) | Palm + fingertips wipe fog layer | Palm + Fingertips |
| 3 | 🌬️ **Breath Room** | [Open →](https://lolz365.github.io/gesture-controlled-ui/experiments/breath-room.html) | Open palm → scatter · Fist → sphere | Openness Detection |
| 4 | 💧 **Liquid Light** | [Open →](https://lolz365.github.io/gesture-controlled-ui/experiments/liquid-light.html) | Palm ripples a color grid | Palm Center |
| 5 | 🧲 **Magnet Field** | [Open →](https://lolz365.github.io/gesture-controlled-ui/experiments/magnet-field.html) | Palm attracts 40 magnetic field lines | Palm Center |

---

## Stack

- **Vanilla JS** + HTML5 Canvas (zero build step)
- **[MediaPipe Tasks Vision](https://developers.google.com/mediapipe)** `@0.10.14` — HandLandmarker via CDN
- **Delegate chain:** GPU → WebNN → Wasm (auto-fallback)
- GitHub Pages deployment via GitHub Actions

---

## Local Setup

```bash
git clone https://github.com/Lolz365/gesture-controlled-ui.git
cd gesture-controlled-ui
npx serve .
# open http://localhost:3000
```

> ⚠️ Webcam access requires a secure context — `localhost` works fine, opening `file://` directly does not.
