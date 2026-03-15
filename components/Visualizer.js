import { useRef, useEffect } from "react";
import * as THREE from "three";
import styled from "styled-components";

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

if (mode === "trap-bars") {
// Animated bars
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
let mag = 0.75 + 0.3 * Math.sin(frame * 0.09 + i * 0.33);
bar.scale.y = mag;
bar.material.color = new THREE.Color(`hsl(${(150 + i*9 + frame)%360},90%,62%)`);
});
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate(); cleanup = () => cancelAnimationFrame(animId);
} else if (mode === "lofi-vhs") {
// Retro tape
const geo = new THREE.BoxGeometry(1.44, 0.44, 0.17);
const mat = new THREE.MeshStandardMaterial({ color: "#c0b497", metalness: 0.78, roughness: 0.7 });
const tape = new THREE.Mesh(geo, mat);
tape.position.z = 0.2;
scene.add(tape);
scene.add(new THREE.DirectionalLight("#64ffda", 2));
let frame = 0;
const animate = () => {
frame++;
tape.rotation.y = Math.sin(frame*0.015) * 0.23;
tape.rotation.x = Math.cos(frame*0.009) * 0.15 + Math.sin(frame*0.025) * 0.03;
let flicker = 0.95 + 0.07 * Math.abs(Math.sin(frame * 0.23));
tape.material.emissiveIntensity = flicker;
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate(); cleanup = () => cancelAnimationFrame(animId);
} else if (mode === "disco-particles") {
// House/EDM: color swirl particles
let particles = [];
const geometry = new THREE.SphereGeometry(0.030, 4, 4);
for (let i = 0; i < 64; ++i) {
const material = new THREE.MeshStandardMaterial({ color: `hsl(${i*6}, 85%, 57%)`});
const mesh = new THREE.Mesh(geometry, material);
let angle = (i / 64) * Math.PI * 2, radius = 0.85 + (i % 5) * 0.13;
mesh.position.x = Math.cos(angle) * radius;
mesh.position.y = Math.sin(angle) * radius;
mesh.position.z = (Math.cos(i * 4.2) * 0.3);
particles.push(mesh); scene.add(mesh);
}
scene.add(new THREE.HemisphereLight("#fff", "#64ffda", 2.2));
let frame = 0;
const animate = () => {
frame++;
particles.forEach((p, i) => {
let angle = (i / 64)*Math.PI*2 + frame*0.005;
let radius = 1.05 + 0.06*Math.sin(frame*0.02 + i*0.25);
p.position.x = Math.cos(angle) * radius;
p.position.y = Math.sin(angle) * radius;
p.material.color = new THREE.Color(`hsl(${(i*10+frame)%360},88%,62%)`);
});
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate(); cleanup = () => cancelAnimationFrame(animId);
} else if (mode === "ambient-glow") {
// Glowing disc
const discGeom = new THREE.TorusGeometry(0.76, 0.19, 24, 48);
const discMat = new THREE.MeshStandardMaterial({
color: "#64ffda",
emissive: "#163a2c",
roughness: 0.21,
metalness: 0.98
});
const disc = new THREE.Mesh(discGeom, discMat);
disc.rotation.x = Math.PI / 2.22;
scene.add(disc);
scene.add(new THREE.PointLight("#64ffda", 1.21, 100));
let frame = 0;
const animate = () => {
frame++;
disc.rotation.z = frame * 0.021 + Math.sin(frame*0.002)/2;
disc.material.emissiveIntensity = 0.25 + 0.14*Math.sin(frame*0.016);
renderer.render(scene, camera);
animId = requestAnimationFrame(animate);
};
animate(); cleanup = () => cancelAnimationFrame(animId);
} else if (mode === "turntable") {
// Hip-hop turntable
const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.19,1.19,0.19,50), new THREE.MeshStandardMaterial({color:"#303837",metalness:1,roughness:0.73}));
disc.rotation.x = Math.PI/2;
scene.add(disc);
const label = new THREE.Mesh(new THREE.CircleGeometry(0.31, 25), new THREE.MeshStandardMaterial({color: "#64ffda"}));
label.position.z = 0.12; scene.add(label);
const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.06,1.0), new THREE.MeshStandardMaterial({color:"#ff6c52"})); arm.position.x = -0.7; arm.position.y = 0.7; arm.rotation.z = 0.34;
scene.add(arm); scene.add(new THREE.PointLight("#fff", 1.13, 6));
let frame = 0; const animate = () => { frame++; disc.rotation.z +=0.02 + Math.sin(frame*0.03)*0.001; renderer.render(scene, camera); animId=requestAnimationFrame(animate)};
animate(); cleanup = () => cancelAnimationFrame(animId);
} else {
// Default glowing disc
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
}, [song.id, JSON.stringify(song.genres), visualMode]);

return (
<VisualWrapper>
<div ref={mountRef} style={{ width: "100%", height: "100%" }} />
</VisualWrapper>
);
}
