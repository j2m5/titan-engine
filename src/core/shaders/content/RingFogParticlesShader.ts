import { TShader } from '@/core/shaders/types'
import { Vector3 } from 'three'

export const RingFogParticlesShader: TShader = {
  uniforms: {
    color: { value: new Vector3(0.2, 0.2, 0.2) },
    time: { value: 0 }
  },
  vertexShader: `
    varying vec3 vPosition;
    
    void main() {
      vPosition = position;
      gl_PointSize = 1.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float time;
    
    varying vec3 vPosition;

    float noise(vec3 p) {
      return 0.5 * (sin(p.x * 20.0 + time) + sin(p.y * 20.0 + time) + sin(p.z * 20.0 + time));
    }

    void main() {
      float n = noise(vPosition);
      gl_FragColor = vec4(color, 0.15 + n * 0.35);
    }
  `
}
