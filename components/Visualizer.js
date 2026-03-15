import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import styled from "styled-components";
import AudioAnalyzer from "./AudioAnalyzer";

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

const VISUAL_MODES = [
"trap-bars",
"lofi-vhs",
"disco-particles",
"turntable",
"ambient-glow",
"ambient-disc"
];

function getVisualMode(song, forced) {
if (forced && VISUAL_MODES.includes(forced)) return forced;
const genres = (song.genres || []).map(g => g.toLowerCase());
if (genres.some(g => g.includes('trap'))) return "trap-bars";
if (genres.some(g => g.includes('lo-fi') || g.includes('lofi'))) return "lofi-vhs";
if (genres.some(g => g.includes('house') || g.includes('edm'))) return "disco-particles";
if (genres.some(g => g.includes('hip hop') || g.includes('hip-hop'))) return "turntable";
if (genres.some(g => g.includes('ambient') || g.includes('experimental'))) return "ambient-glow";
return "ambient-disc";
}

export default function Visualizer({ song, visualMode }) {
const mountRef = useRef();
const [freqArray, setFreqArray] = useState(new Array(32).fill(0));
const [audioEl, setAudioEl] = useState(null);

// Watch for new audio element when song changes
useEffect(() => {
if (!song.audio) return;
const audio = document.querySelector('audio[src="' + song.audio + '"]');
setAudioEl(audio || null);
}, [song.audio]);

useEffect(() => {
if (mountRef.current) mountRef.current.innerHTML = "";
const mode = getVisualMode(song, visualMode);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#181a1f");
const camera = new THREE.PerspectiveCamera(60, 850 / 340, 0.1, 1000);
camera.position.z = 2.7;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(850, 340);
mountRef.current.appendChild(renderer.domElement);

let cleanup = () => {}, animId = 0;

// Example: trap-bars get real FFT reactivity, others can add it too!
if (mode === "trap-bars") {
const N_BARS = 32, bars = [], group = new THREE.Group();
for (let i = 0; i < N_BARS; ++i) {
const geo = new THREE.CylinderGeometry(0.08, 0.1, 1, 12);
const mat = new THREE.MeshStandardMaterial({ color: "#64ffda" });
const bar = new THREE.Mesh(geo, mat);
bar.position.x = (i - N_BARS/2) * 0.19;
bar.position.y = -0.4;
group.add(bar); bars.push(bar);
}
scene.add(group);
scene.add(new THREE.HemisphereLight("#64ffda", "#181a1f", 1.12));
let frame = 0;
const animate = () => {
frame++;
bars.forEach((bar, i) => {
// Use FFT real audio if present, otherwise bounce
let mag = (freqArray[i] || 100)/128 + 0.7 + 0.15 * Math.sin(frame * 0.11 + i * 0.31);
bar.scale.y = mag;
bar.material.color = new THREE.Color(`hsl(${(150 + i*9 + frame)%360},90%,62%)`);
});
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animId);
} else {
// Default disc or alternate, see previous file for more modes!
const discGeom = new THREE.TorusGeometry(0.76, 0.19, 24, 48);
const discMat = new THREE.MeshStandardMaterial({
color: "#64ffda",
emissive: "#131d1a",
roughness: 0.19,
metalness: 0.92
});
const disc = new THREE.Mesh(discGeom, discMat);
disc.rotation.x = Math.PI / 2.15;
scene.add(disc); scene.add(new THREE.PointLight("#64ffda", 1.2, 100));
let frame = 0; const animate = () => { frame++; disc.rotation.z = frame * 0.013; disc.material.emissiveIntensity = 0.33 + 0.1 * Math.sin(frame * 0.045); renderer.render(scene, camera); animId=requestAnimationFrame(animate)};
animate(); cleanup = () => cancelAnimationFrame(animId);
}

return () => {
cleanup();
if (mountRef.current?.firstChild) mountRef.current.removeChild(renderer.domElement);
renderer.dispose();
};
}, [song.id, song.audio, visualMode, freqArray.join('|')]);

// Attach audio FFT for reactivity if audio element is present
return (
<VisualWrapper>
<div ref={mountRef} style={{ width: "100%", height: "100%" }} />
{audioEl && (
<AudioAnalyzer audio={audioEl} onFrame={arr => setFreqArray(arr.slice(0, 32))} fftSize={64} />
)}
</VisualWrapper>
);
}
