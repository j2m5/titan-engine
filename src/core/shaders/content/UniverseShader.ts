import { TShader } from '@/core/shaders/types'
import { ShaderChunk } from 'three'

export const UniverseShader: TShader = {
  uniforms: {
    time: { value: 0.0 },
    starTexture: { value: null }
  },
  vertexShader: `
    attribute float size;
    
    varying vec3 vColor;
    
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
      
      vColor = color;
    }
  `,
  fragmentShader: `
    uniform sampler2D starTexture;
    uniform float time;
    
    varying vec3 vColor;
    varying float vDistance;
      
    void main() {
      float brightnessFactor = 2.0;
      float minBrightness = 0.5;
      float maxBrightness = 1.0;
      
      float blink = 0.5 * (maxBrightness - minBrightness) * sin(time + gl_PointCoord.x * 10.0) + 0.5 * (maxBrightness + minBrightness);
      vec4 starColor = vec4(vColor, 1.0);
      
      starColor = starColor * texture2D(starTexture, gl_PointCoord);
      starColor *= brightnessFactor;
      starColor *= blink;
      
      gl_FragColor = starColor;
      
      ${ShaderChunk['tonemapping_fragment']}
      ${ShaderChunk['colorspace_fragment']}
    }
  `
}
