// components/Visualizer.js
"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Effects,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, GodRays } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// ────────────────────────────────────────────────
//   VISUALIZER MAIN COMPONENT
// ────────────────────────────────────────────────
export default function Visualizer({
  currentSong,
  audioAnalyser,          // Web Audio API AnalyserNode
  isPlaying = false,
  className = "",
}) {
  if (!currentSong) return null;

  const theme = currentSong.visualTheme || "default-smoke";
  const colors = currentSong.colorPalette || ["#ff00aa", "#00ffcc", "#ffff00"];
  const particleCount = currentSong.particleIntensity || 12000;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 12], fov: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0a0015"), 1);
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />

        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={55} />

        <Scene
          theme={theme}
          colors={colors}
          particleCount={particleCount}
          audioAnalyser={audioAnalyser}
          isPlaying={isPlaying}
        />

        <Environment preset="night" background={false} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />

        <PostProcessing />
      </Canvas>
    </div>
  );
}

// ────────────────────────────────────────────────
//   POST-PROCESSING (bloom + godrays feel)
// ────────────────────────────────────────────────
function PostProcessing() {
  const sunPosition = useMemo(() => new THREE.Vector3(5, 8, -10), []);

  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        height={480}
        intensity={1.4}
      />
      {/* Optional godrays – feels very cinematic with smoke */}
      <GodRays
        sunPosition={sunPosition}
        blendFunction={BlendFunction.Screen}
        samples={40}
        density={0.9}
        decay={0.92}
        weight={0.4}
        exposure={0.6}
        clampMax={1.2}
      />
    </EffectComposer>
  );
}

// ────────────────────────────────────────────────
//   MAIN 3D SCENE – per-song themes
// ────────────────────────────────────────────────
function Scene({ theme, colors, particleCount, audioAnalyser, isPlaying }) {
  const { scene } = useThree();
  const pointsRef = useRef();
  const groupRef = useRef();

  // FFT data buffer
  const freqData = useRef(new Uint8Array(512));

  // Smoke / particle field
  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 24;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 24;

      velocities[i3]     = (Math.random() - 0.5) * 0.04;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.04 + 0.01; // light upward drift
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.04;

      sizes[i] = Math.random() * 1.8 + 0.6;

      const c = new THREE.Color(colors[i % colors.length]);
      colorArray[i3]     = c.r;
      colorArray[i3 + 1] = c.g;
      colorArray[i3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    return geometry;
  }, [particleCount, colors]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.14,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    []
  );

  // ─── Audio reactivity update ────────────────────────
  useFrame((state, delta) => {
    if (!audioAnalyser || !isPlaying) return;

    audioAnalyser.getByteFrequencyData(freqData.current);

    const bass = freqData.current.slice(0, 8).reduce((a, b) => a + b, 0) / (8 * 255);
    const mid  = freqData.current.slice(20, 60).reduce((a, b) => a + b, 0) / (40 * 255);
    const high = freqData.current.slice(120, 200).reduce((a, b) => a + b, 0) / (80 * 255);

    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002 + bass * 0.03;
      pointsRef.current.rotation.x += 0.001 + mid * 0.015;

      pointsRef.current.scale.setScalar(1 + bass * 1.4 + mid * 0.4);

      // Push particles outward on bass
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const vel = pointsRef.current.geometry.attributes.velocity.array;
        positions[i3]     += vel[i3]     * (1 + bass * 6);
        positions[i3 + 1] += vel[i3 + 1] * (1 + bass * 4);
        positions[i3 + 2] += vel[i3 + 2] * (1 + bass * 5);
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.08 + high * 0.4);
    }
  });

  // Theme variations (expandable)
  let extraElements = null;

  if (theme.includes("lowrider") || theme.includes("hyphy")) {
    extraElements = (
      <>
        <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="#110022" emissive="#220044" emissiveIntensity={0.3} />
        </mesh>
        {/* Neon underglow simulation */}
        <pointLight position={[0, -3.5, 0]} color="#ff00cc" intensity={4} distance={12} />
      </>
    );
  }

  if (theme.includes("glitch") || theme.includes("digital")) {
    extraElements = (
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[3.2, 2]} />
          <meshBasicMaterial color="#00ffff" wireframe wireframeLinewidth={2} transparent opacity={0.5} />
        </mesh>
      </group>
    );
  }

  return (
    <>
      <points ref={pointsRef} geometry={particles} material={material} />

      {/* Fog / volumetric haze */}
      <fog attach="fog" args={["#0a0015", 8, 24]} />

      {extraElements}

      {/* Central glow orb – reacts to mids */}
      <mesh>
        <sphereGeometry args={[1.4 + mid * 0.8, 32, 32]} />
        <meshBasicMaterial color={colors[1]} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  );
}
