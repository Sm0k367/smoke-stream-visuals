// components/Visualizer.js
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

export default function Visualizer({ song }) {
const mountRef = useRef();

useEffect(() => {
// THREE.js essentials
const scene = new THREE.Scene();
scene.background = new THREE.Color("#181a1f");

const camera = new THREE.PerspectiveCamera(60, 850 / 340, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(850, 340);
mountRef.current.appendChild(renderer.domElement);

// === DEMO: Each song can have its own visual setup ===
let group;
if (song.id === "ef5e6b4c-fd00-4070-ab4f-5a95f8ec5315") {
// Demo: animated cube for "Let Me See You Go to Work"
group = new THREE.Group();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: "#64ffda" });
const cube = new THREE.Mesh(geometry, material);
group.add(cube);
scene.add(group);

const light = new THREE.PointLight("#64ffda", 1.4, 100);
light.position.set(4, 8, 12);
scene.add(light);

let frame = 0;
const animate = () => {
frame++;
cube.rotation.x = frame * 0.01;
cube.rotation.y = frame * 0.015;
renderer.render(scene, camera);
group._animId = requestAnimationFrame(animate);
};
animate();
} else {
// Demo: color-changing sphere for other song(s)
group = new THREE.Group();
const geometry = new THREE.SphereGeometry(0.9, 64, 64);
const material = new THREE.MeshStandardMaterial({
color: new THREE.Color("hsl(" + (song.title.length * 17) % 360 + ",85%,60%)"),
roughness: 0.3
});
const sphere = new THREE.Mesh(geometry, material);
group.add(sphere);
scene.add(group);

const light = new THREE.PointLight("#fff", 1.2, 100);
light.position.set(1.5, 3.2, 10);
scene.add(light);

let frame = 0;
const animate = () => {
frame++;
sphere.rotation.y = Math.sin(frame * 0.012);
sphere.material.color = new THREE.Color(`hsl(${((frame * 2 + song.id.length * 60) % 360)},85%,60%)`);
renderer.render(scene, camera);
group._animId = requestAnimationFrame(animate);
};
animate();
}

// CLEANUP
return () => {
group && cancelAnimationFrame(group._animId);
// Remove canvas from DOM
if (mountRef.current.firstChild) {
mountRef.current.removeChild(mountRef.current.firstChild);
}
renderer.dispose();
};
// Re-run only if song.id changes
}, [song.id]);

return (
<VisualWrapper>
<div ref={mountRef} style={{ width: "100%", height: "100%" }} />
</VisualWrapper>
);
}
