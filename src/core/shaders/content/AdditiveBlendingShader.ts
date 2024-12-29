import { TShader } from '@/core/shaders/types'

export const AdditiveBlendingShader: TShader = {
  uniforms: {
    tDiffuse: { value: null },
    tAdd: { value: null }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform sampler2D tAdd;
  
    varying vec2 vUv;
  
    void main() {
      vec4 texelBase = texture2D(tDiffuse, vUv);
      vec4 texelAdd = texture2D(tAdd, vUv);
      
      gl_FragColor = texelBase + texelAdd;
    }
  `
}
