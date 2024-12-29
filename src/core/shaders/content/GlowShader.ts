import { TShader } from '@/core/shaders/types'
import { Color, ShaderChunk } from 'three'

export const GlowShader: TShader = {
  uniforms: {
    falloff: { value: 0 },
    glowInternalRadius: { value: 0 },
    glowColor: { value: new Color() },
    glowSharpness: { value: 0 },
    opacity: { value: 0 }
  },
  vertexShader: `
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
      
      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vPosition = modelPosition.xyz;
      vNormal = modelNormal.xyz;
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    uniform float falloffAmount;
    uniform float glowSharpness;
    uniform float glowInternalRadius;
    uniform float opacity;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      if (!gl_FrontFacing) normal *= -1.0;
      
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = dot(viewDirection, normal);
      
      fresnel = pow(fresnel, glowInternalRadius + 0.1);
      
      float falloff = smoothstep(0.0, falloffAmount, fresnel);
      float fakeGlow = fresnel;
      
      fakeGlow += fresnel * glowSharpness;
      fakeGlow *= falloff;
      
      gl_FragColor = vec4(clamp(glowColor * fresnel, 0.0, 1.0), clamp(fakeGlow, 0.0, opacity));
      
      ${ShaderChunk['tonemapping_fragment']}
      ${ShaderChunk['colorspace_fragment']}
    }
  `
}
