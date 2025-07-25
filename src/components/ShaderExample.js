import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vert_uv;
  void main() {
    vert_uv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vert_uv;
  void main() {
    vec3 color = 0.5 + 0.5 * cos(time + vert_uv.xyx + vec3(0,2,4));
    gl_FragColor = vec4(color, 1.0);
  }
`;

const ScreenShaderMaterial = shaderMaterial(
  { time: 0 },
  vertexShader,
  fragmentShader,
);

extend({ ScreenShaderMaterial });

const FullscreenQuad = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.uniforms.time.value += delta;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <screenShaderMaterial ref={ref} />
    </mesh>
  );
};

export default function ShaderExample() {
  return (
    <Canvas style={{opacity: 0.3}} gl={{ preserveDrawingBuffer: true }} orthographic camera={{ position: [0, 0, 1], zoom: 1 }}>
      <FullscreenQuad />
    </Canvas>
  );
}
