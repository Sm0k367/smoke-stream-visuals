// components/Visualizer.js
import { useRef, useEffect } from "react";
import * as THREE from "three";
import styled from "styled-components";

// You may want to adjust width/height for full responsiveness if you want!
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

function getVisualizerConfig(song) {
// 🔥 Extend this with crazy, custom scenes per song.ID or song.title!
if (song.id === "ef5e6b4c-fd00-4070-ab4f-5a95f8ec5315") {
return "cube";
} else if (song.id === "4eb5722c-08a3-48ac-81e1-8e506a2405ab") {
return "neon-sphere";
} else if (song.genres?.includes("trap")) {
return "waveform-lines";
}
// Default—can randomize, theme to genre, or go wild
return "ambient-disc";
}

export default function Visualizer({ song }) {
const mountRef = useRef();

useEffect(() => {
// Clean DOM if remounting
if (mountRef.current) mountRef.current.innerHTML = "";

const config = getVisualizerConfig(song);

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color("#181a1f");

const camera = new THREE.PerspectiveCamera(60, 850 / 340, 0.1, 1000);
camera.position.z = 2.8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(850, 340);
mountRef.current.appendChild(renderer.domElement);

let animObject;
let cleanup = () => {};

// --- Visuals by config ---
if (config === "cube") {
// Rotating cube—customize color/material!
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: "#64ffda" });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const light = new THREE.PointLight("#64ffda", 1.3, 100);
light.position.set(4, 8, 12);
scene.add(light);

let frame = 0;
const animate = () => {
frame++;
cube.rotation.x = frame * 0.012;
cube.rotation.y = frame * 0.018;
renderer.render(scene, camera);
animObject = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animObject);
} else if (config === "neon-sphere") {
// Neon color-shifting sphere
const sphere = new THREE.Mesh(
new THREE.SphereGeometry(0.9, 64, 64),
new THREE.MeshStandardMaterial({ color: "#64ffda", roughness: 0.25 })
);
scene.add(sphere);
scene.add(new THREE.PointLight("#fff", 1.2, 100));
let frame = 0;
const animate = () => {
frame++;
sphere.rotation.y = Math.sin(frame * 0.01);
sphere.material.color = new THREE.Color(`hsl(${((frame * 2.2) % 360)},85%,60%)`);
renderer.render(scene, camera);
animObject = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animObject);
} else if (config === "waveform-lines") {
// Animated genre-reactive lines (looks great for bass/trap, but simple here)
const group = new THREE.Group();
for (let i = 0; i < 18; ++i) {
const lineGeom = new THREE.CylinderGeometry(0.07, 0.09, Math.random() * 2 + 0.5, 18);
const lineMat = new THREE.MeshStandardMaterial({
color: `hsl(${(i * 34) % 360},85%,60%)`
});
const line = new THREE.Mesh(lineGeom, lineMat);
line.position.x = (i - 8.5) * 0.36;
group.add(line);
}
group.position.y = -0.2;
scene.add(group);
scene.add(new THREE.HemisphereLight("#64ffda", "#181a1f", 1.2));

let frame = 0;
const animate = () => {
frame++;
group.children.forEach((bar, idx) => {
bar.scale.y = Math.abs(Math.sin(frame * 0.12 + idx));
bar.material.color = new THREE.Color(
`hsl(${((frame * 1.1 + idx * 45) % 360)},58%,53%)`
);
});
renderer.render(scene, camera);
animObject = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animObject);
} else {
// Default: glowing ambient disc
const discGeom = new THREE.TorusGeometry(0.76, 0.19, 24, 48);
const discMat = new THREE.MeshStandardMaterial({
color: "#64ffda",
emissive: "#131d1a",
roughness: 0.19,
metalness: 0.92
});
const disc = new THREE.Mesh(discGeom, discMat);
disc.rotation.x = Math.PI / 2.15;
scene.add(disc);
scene.add(new THREE.PointLight("#64ffda", 1.2, 100));
let frame = 0;
const animate = () => {
frame++;
disc.rotation.z = frame * 0.013;
disc.material.emissiveIntensity = 0.33 + 0.1 * Math.sin(frame * 0.045);
renderer.render(scene, camera);
animObject = requestAnimationFrame(animate);
};
animate();
cleanup = () => cancelAnimationFrame(animObject);
}

// CLEANUP when switching songs
return () => {
cleanup();
if (mountRef.current && mountRef.current.firstChild)
mountRef.current.removeChild(renderer.domElement);
renderer.dispose();
};
}, [song.id, song.title]);

return (
<VisualWrapper>
<div ref={mountRef} style={{ width: "100%", height: "100%" }} />
</VisualWrapper>
);
}
