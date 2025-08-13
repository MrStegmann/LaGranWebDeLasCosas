// LoadingScreen.jsx
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import PropTypes from "prop-types";
import * as THREE from "three";

export default function LoadingScreen({ states }) {
  return (
    <div className="fixed inset-0 bg-[url('/bg-magic.png')] bg-cover flex items-center justify-center z-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.6} color="#66ccff" />
        <EffectComposer>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

LoadingScreen.propTypes = {
  states: PropTypes.arrayOf(PropTypes.bool).isRequired,
};
