// components/Visualizer.js
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import styled from "styled-components";
import AudioAnalyzer from "./AudioAnalyzer";

// Responsive wrapper (tweak as desired)
const VisualWrapper = styled.div`
width: 100%;
max-width: 850px;
height: 340px;
margin: 30px 0;
border-radius: 14px;
overflow: hidden;
background: #181a1f;
box-shadow: 0 4px 28px #0006;
`;

// Example: local audio file support (use song.audio for .mp3 if available)
function useSongAudio(song) {
// For now use null—later, you can add mp3 url per song in playlist.json!
return null;
}

export default function Visualizer({ song, playing = false }) {
const mountRef = useRef();
const [freqArray, setFreqArray] = useState(new Array(32).fill(0));
const [audioEl, setAudioEl] = useState(null);

// Wire up direct audio if available
const audioSrc = useSongAudio(song);

useEffect(() => {
// reset
setFreqArray(new Array(32).fill(0));
if (mountRef.current) mountRef.current.innerHTML = "";

// Three.js setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("#181a1f");
const camera = new THREE.PerspectiveCamera(60, 850 / 340, 0.1, 1000);
camera.position.z = 2.6;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(850, 340);
mountRef.current.appendChild(renderer.domElement);

// Bars visual: truly reactive to freqArray!
const N_BARS = 32;
const bars = [];
const group = new THREE.Group();
for (let i = 0; i < N_BARS; ++i) {
const geo = new THREE.CylinderGeometry(0.08, 0.1, 1, 12);
const mat = new THREE.MeshStandardMaterial({ color: "#64ffda" });
const bar = new THREE.Mesh(geo, mat);
bar.position.x = (i - N_BARS/2) * 0.19;
bar.position.y = -0.4;
group.add(bar);
bars.push(bar);
}
scene.add(group);
scene.add(new THREE.HemisphereLight("#64ffda", "#181a1f", 1.14));

let frame = 0, anim;
const animate = () => {
frame++;
bars.forEach((bar, i) => {
// Map freq amp into bar scale, add a little bounce regardless
let mag = (freqArray[i] || 0)/128 + 0.7 + 0.2 * Math.sin(frame*0.07 + i*0.2);
bar.scale.y = mag;
bar.material.color = new THREE.Color(`hsl(${(100 + i*8 + frame*0.8)%360},90%,62%)`);
});
renderer.render(scene, camera);
anim = requestAnimationFrame(animate);
};
animate();

return () => {
cancelAnimationFrame(anim);
if (mountRef.current?.firstChild) mountRef.current.removeChild(renderer.domElement);
renderer.dispose();
};
}, [song.id]); // rerun on song change

// Provide audio for reactivity if possible
useEffect(() => {
if (!audioSrc) return;
const el = document.createElement("audio");
el.src = audioSrc;
setAudioEl(el);
}, [audioSrc]);

return (
<VisualWrapper>
<div ref={mountRef} style={{ width: "100%", height: "100%" }} />
{/* Only needed if you want visible native player for .mp3s/demo */}
{audioSrc && (
<audio src={audioSrc} controls autoPlay={playing} style={{ marginTop: 10 }} />
)}
{/* Hidden analyzer—runs anytime audio is available */}
{audioEl && (
<AudioAnalyzer audio={audioEl} onFrame={arr => setFreqArray(arr.slice(0, 32))} fftSize={64} />
)}
</VisualWrapper>
);
}
