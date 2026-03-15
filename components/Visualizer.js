"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function Visualizer({
  currentSong,
  audioAnalyser,    // expected: AnalyserNode from Web Audio API
  isPlaying = false,
  className = "",
}) {
  if (!currentSong) {
    return <div className="w-full h-full bg-black/80 flex items-center justify-center text-white">No song selected</div>;
  }

  const theme = currentSong.visualTheme || "default-smoke";
  const colors = currentSong.colorPalette || ["#ff00aa", "#00ffcc", "#ffff00"];
  const particleCount = Math.min(currentSong.particleIntensity || 12000, 20000); // cap for performance

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 0, 14], fov: 55 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#0a0015"));
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={55} />

        <Scene
          theme={theme}
          colors={colors}
          particleCount={particleCount}
          audioAnalyser={audioAnalyser}
          isPlaying={isPlaying}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <PostEffects />
      </Canvas>
    </div>
  );
}

function PostEffects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={1.3} />
    </EffectComposer>
  );
}

function Scene({ theme, colors, particleCount, audioAnalyser, isPlaying }) {
  const { scene } = useThree();
  const pointsRef = useRef();

  const freqData = useRef(new Uint8Array(512));

  const particles = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      pos[i3]     = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 20;

      vel[i3]     = (Math.random() - 0.5) * 0.03;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.03 + 0.01; // gentle upward
      vel[i3 + 2] = (Math.random() - 0.5) * 0.03;

      const c = new THREE.Color(colors[i % colors.length]);
      col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("velocity", new THREE.BufferAttribute(vel, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

    return geo;
  }, [particleCount, colors]);

  const material = useMemo(
    () => new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
    []
  );

  useFrame((_, delta) => {
    if (!audioAnalyser || !isPlaying || !pointsRef.current) return;

    audioAnalyser.getByteFrequencyData(freqData.current);

    let bass = 0;
    for (let i = 0; i < 12; i++) bass += freqData.current[i];
    bass /= 12 * 255;

    let mid = 0;
    for (let i = 20; i < 60; i++) mid += freqData.current[i];
    mid /= 40 * 255;

    pointsRef.current.rotation.y += 0.003 + bass * 0.04;
    pointsRef.current.scale.setScalar(1 + bass * 1.2 + mid * 0.3);

    const positions = pointsRef.current.geometry.attributes.position.array;
    const velocities = pointsRef.current.geometry.attributes.velocity.array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     += velocities[i3]     * (1 + bass * 5);
      positions[i3 + 1] += velocities[i3 + 1] * (1 + bass * 3);
      positions[i3 + 2] += velocities[i3 + 2] * (1 + bass * 4);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  scene.fog = new THREE.FogExp2("#0a0015", 0.06);

  return (
    <>
      <points ref={pointsRef} geometry={particles} material={material} />

      {/* Central reacting orb */}
      <mesh>
        <sphereGeometry args={[1.2, 28, 28]} />
        <meshBasicMaterial color={colors[1] || "#00ffcc"} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  );
}
