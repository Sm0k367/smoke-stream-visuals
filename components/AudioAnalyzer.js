// components/AudioAnalyzer.js
import { useRef, useEffect } from "react";

export default function AudioAnalyzer({ audio, onFrame, fftSize = 128 }) {
const rafRef = useRef();
const analyzerRef = useRef();

useEffect(() => {
if (!audio) return;
let audioCtx, analyser, source, dataArray;

const setup = () => {
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
analyser = audioCtx.createAnalyser();
analyser.fftSize = fftSize;
source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
dataArray = new Uint8Array(analyser.frequencyBinCount);
analyzerRef.current = analyser;

function animate() {
if (!audio.paused && !audio.ended) {
analyser.getByteFrequencyData(dataArray);
onFrame([...dataArray]);
}
rafRef.current = requestAnimationFrame(animate);
}
animate();
};

setup();
return () => {
if (analyzerRef.current) analyzerRef.current.disconnect();
if (rafRef.current) cancelAnimationFrame(rafRef.current);
if (audioCtx && audioCtx.state !== "closed") audioCtx.close();
};
}, [audio]);

return null; // No UI
}
