import { useEffect, useRef } from "react";

export default function AudioMotionVisualizer({ audioElement }) {
const canvasRef = useRef();
useEffect(() => {
if (!audioElement || !canvasRef.current) return;

let ctx = canvasRef.current.getContext("2d");
let audioCtx, analyser, source, dataArray, animId;

// Setup
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
analyser = audioCtx.createAnalyser();
analyser.fftSize = 64;
source = audioCtx.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(audioCtx.destination);
dataArray = new Uint8Array(analyser.frequencyBinCount);

function draw() {
analyser.getByteFrequencyData(dataArray);
ctx.clearRect(0, 0, 540, 38);
for (let i = 0; i < dataArray.length; i++) {
let barHeight = dataArray[i] / 2.2;
ctx.fillStyle = `hsl(${180 + i * 10},80%,65%)`;
ctx.fillRect(i * 12, 38 - barHeight, 9, barHeight + 2);
}
animId = requestAnimationFrame(draw);
}
draw();

return () => {
if (animId) cancelAnimationFrame(animId);
if (audioCtx) audioCtx.close();
};
}, [audioElement]);

return (
<canvas
ref={canvasRef}
width={540}
height={38}
style={{ width: "100%", maxWidth: 540, margin: "0 auto", display: "block", borderRadius: 11, background: "#10191d" }}
/>
);
}
