import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import styled from "styled-components";
import AudioAnalyzer from "./AudioAnalyzer";

const VisualWrapper = styled.div`
width: 100%;
max-width: 850px;
height: 340px;
margin: 32px 0 0 0;
border-radius: 17px;
overflow: hidden;
background: radial-gradient(circle at 33% 60%, #232336 45%, #10161a 100%);
box-shadow: 0 8px 36px #0005, 0 0px 1px #fff2 inset;
position: relative;
`;

const VizLabel = styled.div`
position: absolute;
top: 20px;
left: 24px;
color: #ff6c52;
opacity: 0.82;
font-weight: 700;
font-size: 1.09em;
letter-spacing: 0.5px;
z-index: 2;
pointer-events: none;
`;

const VISUAL_NAMES = {
"trap-bars": "Bass Bars",
"lofi-vhs": "VHS Wave",
"disco-particles": "Disco Orbs",
"turntable": "Turntable",
"ambient-glow": "Ambient Glow",
"ambient-disc": "Futurist Disc"
};

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

useEffect(() => {
if (!song.audio) return;
const audio = document.querySelector(`audio[src="${song.audio}"]`);
setAudioEl(audio || null);
}, [song.audio]);

useEffect(() => {
if (mountRef.current) mountRef.current.innerHTML = "";
const mode = getVisualMode(song, visualMode);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#151a1e");
const camera = new THREE.PerspectiveCamera(60, 850 / 340, 0.1, 1000);
camera.position.z = 2.7;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(850, 340);
mountRef.current.appendChild(renderer.domElement);

let cleanup = () => {}, animId = 0;

if (mode === "trap-bars") {
const N_BARS = 32, bars = [], group = new THREE.Group();
for (let i = 0; i < N_BARS; ++i) {
const geo = new THREE.CylinderGeometry(0.07, 0.11, 1, 18);
const mat = new THREE.MeshStandardMaterial({
color: "#64ffda",
roughness: 0.35,
metalness: 0.92,
transparent: true,
opacity: 0.95
});
const bar = new THREE.Mesh(geo, mat);
bar.position.x = (i - N_BARS/2) * 0.199;
bar.position.y = -0.38;
group.add(bar); bars.push(bar);
}
scene.add(group);
scene.add(new THREE.HemisphereLight("#64ffda", "#10161a", 1.13));
let frame = 0;
const animate = () => {
frame++;
bars.forEach((bar, i) => {
let mag = (freqArray[i] || 100)/128 + 0.8 + 0.23 * Math.sin(frame * 0.11 + i * 0.31);
bar.scale.y = mag * 0.92;
bar.material.color = new THREE.Color(`hsl(${(202 + i*10 + frame*2)%360},100%,66%)`);
bar.material.opacity = 0.83 + 0.17*Math.sin(frame * 0.151 + i * 0.13);
});
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animId);
} else {
// ... previous visual modes here ...
const discGeom = new THREE.TorusGeometry(0.82, 0.19, 24, 48);
const discMat = new THREE.MeshStandardMaterial({
color: "#64ffda",
emissive: "#181f1d",
roughness: 0.23,
metalness: 0.98
});
const disc = new THREE.Mesh(discGeom, discMat);
disc.rotation.x = Math.PI / 2.10;
scene.add(disc); scene.add(new THREE.PointLight("#64ffda", 1.2, 100));
let frame = 0;
const animate = () => {
frame++;
disc.rotation.z = frame * 0.0129;
disc.material.emissiveIntensity = 0.35 + 0.12 * Math.sin(frame * 0.048);
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animId);
}

return () => {
cleanup();
if (mountRef.current?.firstChild) mountRef.current.removeChild(renderer.domElement);
renderer.dispose();
};
}, [song.id, song.audio, visualMode, freqArray.join('|')]);

return (
<VisualWrapper>
<VizLabel>
{VISUAL_NAMES[getVisualMode(song, visualMode)] || "Visualizer"}
</VizLabel>
<div ref={mountRef} style={{ width: "100%", height: "100%" }} />
{audioEl && (
<AudioAnalyzer audio={audioEl} onFrame={arr => setFreqArray(arr.slice(0, 32))} fftSize={64} />
)}
</VisualWrapper>
);
}
