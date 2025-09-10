// MagicBackground.jsx
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useMagicBgStore } from "@/store/MagicBGStore";
import { animated, useSpring } from "@react-spring/three";
import Aritmetic from "@/../utils/Aritmetic";

// -------------------- Esfera que brilla --------------------
function GlowingSphere({
  radius = 0.5,
  color = "#7dd3fc",
  position,
  intensity,
}) {
  return (
    <animated.mesh position={position}>
      {/* 🔹 Geometría reducida para performance (de 64/32 → 32/16) */}
      <sphereGeometry args={[radius, 32, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity}
        metalness={0}
        roughness={0.3}
        side={THREE.FrontSide}
      />
    </animated.mesh>
  );
}

// -------------------- Runa individual --------------------
function RuneSymbol({ position, symbol, delay }) {
  const ref = useRef();
  const timeRef = useRef(0);
  const opacityRef = useRef(0); // invisible al inicio
  const scaleRef = useRef(0.1); // pequeñito al inicio

  useFrame((_, delta) => {
    if (!ref.current) return;
    timeRef.current += delta;

    // 🔹 Antes del delay: forzar invisibilidad y escala mínima
    if (timeRef.current < delay) {
      ref.current.material.opacity = 0;
      ref.current.scale.setScalar(0.1);
      return;
    }

    // 🔹 Después del delay: animación normal
    if (opacityRef.current < 1 && scaleRef.current < 1.5) {
      opacityRef.current = Math.min(opacityRef.current + delta * 0.8, 1);
      scaleRef.current = Math.min(scaleRef.current + delta, 1.5);
    } else {
      opacityRef.current = Math.max(opacityRef.current - delta * 0.3, 0);
    }

    ref.current.scale.setScalar(scaleRef.current);
    ref.current.rotation.y += delta * 0.05;
    ref.current.material.opacity = opacityRef.current;
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.1}
      color="#7dd3fc"
      anchorX="center"
      anchorY="middle"
      transparent
    >
      {symbol}
    </Text>
  );
}

// -------------------- Columna de runas --------------------
function RuneColumn({ viewport, symbols = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ" }) {
  const { runes, pos } = useMemo(() => {
    const length = Math.floor(Math.random() * 7) + 6;
    const r = Array.from(
      { length },
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );

    const x = Aritmetic.RandomBetween(-10, 10);
    const y = Aritmetic.RandomBetween(-10, 10);
    const z = Aritmetic.RandomBetween(10, 15) * -1;

    return { runes: r, pos: [x, y, z] };
  }, [viewport, symbols]);

  return (
    <>
      {runes.map((rune, i) => (
        <RuneSymbol
          key={i}
          symbol={rune}
          position={[pos[0], pos[1] - i * 0.25, pos[2]]}
          delay={i * 0.3}
        />
      ))}
    </>
  );
}

// -------------------- Sistema de columnas --------------------
export function RuneCascade({ count = 10 }) {
  const { size } = useThree();
  const viewport = { width: size.width, height: size.height };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <RuneColumn key={i} viewport={viewport} />
      ))}
    </>
  );
}

// -------------------- Emisor de partículas --------------------
function RandomParticleEmitter({
  position = [0, 0, 0],
  spawnRate = 1,
  speed = 0.05,
  color = "#7dd3fc",
  maxParticles = 500,
  maxDistance = 5,
  minSpeed = 0.01,
  timeToMin = 60,
}) {
  const pointsRef = useRef();
  const particlesRef = useRef([]);
  const positions = useMemo(
    () => new Float32Array(maxParticles * 3),
    [maxParticles]
  );
  const alphas = useMemo(() => new Float32Array(maxParticles), [maxParticles]);
  const originRef = useRef(
    new THREE.Vector3(...(Array.isArray(position) ? position : [0, 0, 0]))
  );

  const tau = useMemo(() => timeToMin / Math.log(100), [timeToMin]);

  useFrame((_, delta) => {
    const particles = particlesRef.current;

    position.to((x, y, z) => {
      originRef.current.set(x, y, z);
    });

    // ---------- Spawn ----------
    const spawnOne = () => {
      const phi = Math.random() * 2 * Math.PI;
      const costheta = Math.random() * 2 - 1;
      const theta = Math.acos(costheta);
      const dir = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(theta)
      );

      const v0 = speed * (0.5 + Math.random());
      const vel = dir.clone().multiplyScalar(v0);

      const pos = originRef.current.clone();
      particles.push({ pos, vel, v0, age: 0 });
    };

    if (spawnRate >= 1) {
      for (let s = 0; s < Math.floor(spawnRate); s++) {
        if (particles.length < maxParticles) spawnOne();
      }
      if (Math.random() < spawnRate % 1 && particles.length < maxParticles)
        spawnOne();
    } else if (Math.random() < spawnRate && particles.length < maxParticles) {
      spawnOne();
    }

    // ---------- Update ----------
    let write = 0;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.age += delta;

      const vNow = minSpeed + (p.v0 - minSpeed) * Math.exp(-p.age / tau);
      if (vNow > 0) p.vel.setLength(vNow);

      p.pos.addScaledVector(p.vel, delta);

      const distance = p.pos.distanceTo(originRef.current);
      if (distance > maxDistance) continue;

      positions[write * 3 + 0] = p.pos.x;
      positions[write * 3 + 1] = p.pos.y;
      positions[write * 3 + 2] = p.pos.z;
      alphas[write] = 1 - distance / maxDistance;

      particles[write] = p;
      write++;
    }
    particles.length = write;

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      geo.setDrawRange(0, write);
      geo.attributes.position.needsUpdate = true;
      geo.attributes.alpha.needsUpdate = true;
    }
  });

  return (
    <animated.points ref={pointsRef} position={position}>
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
      <pointsMaterial size={0.1} color={color} transparent opacity={1} />
    </animated.points>
  );
}

// -------------------- Shader para Disco --------------------
const ringVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.2, dist); // borde difuminado
    gl_FragColor = vec4(uColor, uOpacity * alpha);
  }
`;

// -------------------- Disco de luz (anillo) --------------------
function LightDisc({
  position = [0, 0, 0],
  rotation = [-Math.PI / 2, 0, 0],
  color = "#7dd3fc",
  innerRadius = 1,
  outerRadius = 2,
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: 1.0 },
        },
        vertexShader: ringVertexShader,
        fragmentShader: ringFragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [color]
  );

  return (
    <animated.mesh position={position} rotation={rotation} material={material}>
      <ringGeometry args={[innerRadius, outerRadius, 64]} />
    </animated.mesh>
  );
}

function MagicCore({ spherePos, rotation, beamColor, intensity, discScale }) {
  const coreRef = useRef();

  return (
    <animated.group ref={coreRef} position={spherePos} rotation={rotation}>
      <GlowingSphere radius={0.5} color={beamColor} intensity={intensity} />

      <LightDisc
        innerRadius={1 * discScale}
        outerRadius={5 * discScale}
        color={beamColor}
      />
    </animated.group>
  );
}

// -------------------- Componente Principal --------------------
const MagicBackground = ({ children }) => {
  const beamColor = "#7dd3fc";
  const spherePos = useMagicBgStore((state) => state.spherePos);
  const sphereRot = useMagicBgStore((state) => state.sphereRot);

  const [intensity, setIntensity] = useState(0);
  const [bloomIntensity, setBloomIntensity] = useState(0);
  const [fogColor, setFogColor] = useState(new THREE.Color("#000000"));
  const [discScale, setDiscScale] = useState(0);
  const [speedParticles, setSpeedParticles] = useState(0);
  const [startRunes, setStartRunes] = useState(false);

  const { animatedSpherePos, animatedSphereRot } = useSpring({
    animatedSpherePos: spherePos,
    animatedSphereRot: sphereRot,
    config: { mass: 5, tension: 500, friction: 100, duration: 1200 },
  });

  useEffect(() => {
    let t = 0;
    let runeTimer;

    const tick = () => {
      t += 0.02;

      if (t < 1) {
        setIntensity(0);
        setBloomIntensity(0);
        setDiscScale(0);
      } else if (t < 1.3) {
        const k = (t - 1) / 0.3;
        setIntensity(50 * k);
        setBloomIntensity(30 * k);
        setFogColor(
          new THREE.Color().lerpColors(
            new THREE.Color("#000000"),
            new THREE.Color("#ffffff"),
            k
          )
        );
        setDiscScale(k); // 👈 discos aparecen con la explosión
        setSpeedParticles(5);
      } else if (t < 3) {
        const k = 1 - (t - 1.3) / 1.7;
        setIntensity(5 + 45 * k);
        setBloomIntensity(10 + 20 * k);
        setFogColor(
          new THREE.Color().lerpColors(
            new THREE.Color("#000000"),
            new THREE.Color("#7dd3fc"),
            1 - k
          )
        );
      } else {
        setIntensity(5);
        setBloomIntensity(10);
        setFogColor(new THREE.Color("#000000"));
        setDiscScale(1); // 👈 discos tamaño final
        runeTimer = setInterval(() => {
          setStartRunes(true);
          setTimeout(() => setStartRunes(false), 10000);
        }, 60 * 1000);
        return;
      }

      requestAnimationFrame(tick);
    };

    const anim = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(anim);
      if (runeTimer) clearInterval(runeTimer);
    };
  }, []);

  return (
    <div
      className="overflow-hidden bg-black"
      style={{ position: "relative", width: "100%", height: "100dvh" }}
    >
      <Canvas camera={{ position: [0, 0, 0], fov: 50, near: 0.01, far: 500 }}>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={[fogColor, 10, 55]} />
        <MagicCore
          spherePos={animatedSpherePos.to((x, y, z) => [x, y, z])}
          rotation={animatedSphereRot}
          beamColor={beamColor}
          intensity={intensity}
          discScale={discScale}
        />

        <RandomParticleEmitter
          position={animatedSpherePos.to((x, y, z) => [x, y, z])}
          spawnRate={1}
          speed={speedParticles}
          minSpeed={1}
          timeToMin={120}
          maxDistance={120}
          color={beamColor}
          maxParticles={2000}
        />

        {startRunes && <RuneCascade count={5} />}

        <OrbitControls enableDamping />
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={bloomIntensity}
            luminanceThreshold={0.001}
            luminanceSmoothing={0.1}
          />
        </EffectComposer>
      </Canvas>

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
