// MagicBackground.jsx
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// -------------------- Esfera que brilla --------------------
function GlowingSphere({
  radius = 0.5,
  color = "#7dd3fc",
  position,
  intensity,
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 64, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity} // <- intensidad dinámica
        metalness={0}
        roughness={0.3}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// -------------------- Rayo de Luz Cónico --------------------
function LightBeam({
  position,
  color = "#7dd3fc",
  size = [15, 12], // [height, radialSegments]
  rotation,
  radiusTop,
  radiusBottom,
}) {
  const meshRef = useRef();

  const material = useMemo(() => {
    const vertexShader = `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec3 vPosition;

      void main() {
        float opacity = (vPosition.y + ${size[0]}.0 / 2.0) / ${size[0]}.0;
        gl_FragColor = vec4(uColor * opacity, uOpacity * opacity);
      }
    `;

    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
  }, [color, size]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      material={material}
    >
      <cylinderGeometry args={[radiusTop, radiusBottom, size[0], size[1]]} />
    </mesh>
  );
}

// -------------------- Emisor de partículas (arreglado) --------------------
function RandomParticleEmitter({
  position = [0, 0, 0],
  spawnRate = 1, // por defecto: 1 partícula por frame (comportamiento similar al original)
  speed = 0.05, // velocidad base en el momento del spawn
  color = "#7dd3fc",
  maxParticles = 500,
  maxDistance = 5,
  minSpeed = 0.01, // velocidad mínima final
  timeToMin = 60, // segundos para acercarse ~99% a minSpeed
}) {
  const pointsRef = useRef();
  const particlesRef = useRef([]);
  const positions = useMemo(
    () => new Float32Array(maxParticles * 3),
    [maxParticles]
  );
  const alphas = useMemo(() => new Float32Array(maxParticles), [maxParticles]);
  const origin = useMemo(() => new THREE.Vector3(...position), [position]);

  // tau para ~99% en timeToMin: 1 - exp(-timeToMin/tau) = 0.99  => tau = timeToMin / ln(100)
  const tau = useMemo(() => timeToMin / Math.log(100), [timeToMin]);

  useFrame((_, delta) => {
    const particles = particlesRef.current;

    // ---------- SPAWN (manteniendo compatibilidad con comportamiento anterior) ----------
    // - spawnRate >= 1: se considera "partículas por frame" (como antes).
    // - 0 < spawnRate < 1: se considera "probabilidad por frame" (ej spawnRate=0.01 -> ~1% chance).
    if (spawnRate >= 1) {
      const whole = Math.floor(spawnRate);
      const frac = spawnRate - whole;
      for (let s = 0; s < whole; s++) {
        if (particles.length >= maxParticles) break;
        spawnOne();
      }
      if (Math.random() < frac && particles.length < maxParticles) spawnOne();
    } else if (spawnRate > 0) {
      if (Math.random() < spawnRate && particles.length < maxParticles)
        spawnOne();
    }

    function spawnOne() {
      // dirección uniforme en la esfera
      const phi = Math.random() * 2 * Math.PI;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);
      const dir = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(theta)
      );

      const v0 = speed * (0.5 + Math.random()); // v0 aleatoria basada en speed actual
      const vel = dir.clone().multiplyScalar(v0);
      const pos = origin.clone();

      particles.push({ pos, vel, v0, age: 0 });
    }

    // ---------- UPDATE (frenado por edad hacia minSpeed) ----------
    let write = 0;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.age += delta;

      // velocidad según edad: v = min + (v0 - min) * exp(-age/tau)
      const vNow = minSpeed + (p.v0 - minSpeed) * Math.exp(-p.age / tau);
      // evita setLength con cero
      if (vNow > 0) p.vel.setLength(vNow);

      // integrar
      p.pos.addScaledVector(p.vel, delta);

      const distance = p.pos.distanceTo(origin);
      if (distance > maxDistance) {
        // fuera: no lo escribimos -> reciclado
        continue;
      }

      // escribir en buffers compactados
      positions[write * 3 + 0] = p.pos.x;
      positions[write * 3 + 1] = p.pos.y;
      positions[write * 3 + 2] = p.pos.z;
      alphas[write] = 1 - distance / maxDistance;

      particles[write] = p;
      write++;
    }
    particles.length = write;

    // actualizar buffers de la geometría
    if (pointsRef.current && pointsRef.current.geometry) {
      const geo = pointsRef.current.geometry;
      geo.setDrawRange(0, write);
      if (geo.attributes.position) geo.attributes.position.array = positions;
      if (geo.attributes.position) geo.attributes.position.needsUpdate = true;
      if (geo.attributes.alpha) geo.attributes.alpha.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxParticles}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-alpha"
          count={maxParticles}
          array={alphas}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors={false}
        color={color}
        transparent
        opacity={1}
      />
    </points>
  );
}

const MagicBackground = ({ children }) => {
  const beamColor = "#7dd3fc";
  const spherePos = [10, -2, -25];

  const [intensity, setIntensity] = useState(0); // brillo esfera
  const [bloomIntensity, setBloomIntensity] = useState(0); // bloom global
  const [fogColor, setFogColor] = useState(new THREE.Color("#000000"));

  const [lightBeamLeftRadiusTop, setLightBeamLeftRadiusTop] = useState(0);
  const [lightBeamRightRadiusTop, setLightBeamRightRadiusTop] = useState(0);
  const [speedParticles, setSpeedParticles] = useState(0);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.02;

      // Fase inicial: todo oscuro
      if (t < 1) {
        setIntensity(0);
        setBloomIntensity(0);
      }

      // Explosión: rápido a blanco
      else if (t >= 1 && t < 1.3) {
        const k = (t - 1) / 0.3; // 0→1
        setIntensity(50 * k);
        setBloomIntensity(30 * k);
        setFogColor(
          new THREE.Color().lerpColors(
            new THREE.Color("#000000"),
            new THREE.Color("#ffffff"),
            k
          )
        );
        setLightBeamRightRadiusTop(0.1);
        setLightBeamLeftRadiusTop(0.1);
        setSpeedParticles(5); // durante el "boom" las nuevas partículas salen rápido
      }

      // Disipación: baja poco a poco
      else if (t >= 1.3 && t < 3) {
        const k = 1 - (t - 1.3) / 1.7; // 1→0
        setIntensity(5 + 45 * k);
        setBloomIntensity(10 + 20 * k);
        setFogColor(
          new THREE.Color().lerpColors(
            new THREE.Color("#000000"),
            new THREE.Color("#7dd3fc"),
            1 - k
          )
        );
      }

      // Estado final estable
      else {
        setIntensity(5);
        setBloomIntensity(10);
        setFogColor(new THREE.Color("#000000"));
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="overflow-hidden"
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <Canvas camera={{ position: [0, 0, 0], fov: 50, near: 0.01, far: 500 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={[fogColor, 5.5, 38]} />

        {/* Esfera central con intensidad animada */}
        <GlowingSphere
          radius={0.5}
          color={beamColor}
          position={spherePos}
          intensity={intensity}
        />

        {/* Rayos */}
        <LightBeam
          position={[spherePos[0] - 8, spherePos[1], spherePos[2]]}
          rotation={[1.5, 0, 5]}
          radiusTop={lightBeamLeftRadiusTop}
          radiusBottom={0}
          color={beamColor}
        />
        <LightBeam
          position={[spherePos[0] + 8, spherePos[1] - 0.1, spherePos[2]]}
          rotation={[-1.6, 0, -5]}
          radiusTop={lightBeamRightRadiusTop}
          radiusBottom={0}
          color={beamColor}
        />

        {/* Partículas normales */}
        <RandomParticleEmitter
          position={spherePos}
          spawnRate={1} // 1 partícula por frame (ajusta si quieres más)
          speed={speedParticles} // velocidad base en el spawn (cambia durante el timeline)
          minSpeed={1}
          timeToMin={120}
          maxDistance={120}
          color={beamColor}
          maxParticles={2000}
        />

        <OrbitControls enableDamping />

        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={bloomIntensity}
            luminanceThreshold={0.01}
            luminanceSmoothing={0.1}
          />
        </EffectComposer>
      </Canvas>

      {/* Contenido en primer plano */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <div style={{ padding: "2rem", color: "white", pointerEvents: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MagicBackground;
