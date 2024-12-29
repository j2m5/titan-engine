import { ShaderChunk, Vector3 } from 'three'
import { TShader } from '@/core/shaders/types'

export const AtmosphereShader: TShader = {
  uniforms: {
    targetRadius: { value: 0 },
    atmosphereRadius: { value: 0 },
    lightPosition: { value: new Vector3() },
    scatterRGB: { value: new Vector3() },
    densityFalloff: { value: 0 }
  },
  vertexShader: `
    precision highp float;
    
    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_vertex']}
    
    uniform vec3 lightPosition;
    
    varying vec3 vPosition;
    varying vec3 vLocalLightDirection;
    varying vec3 vLocalCameraPosition;
    varying vec3 vViewPosition;

    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      
      gl_Position = projectionMatrix * mvPosition;
      
      vec3 worldLightDirection = normalize(worldPosition.xyz - lightPosition);
      
      vPosition = position;
      vLocalLightDirection = mat3(modelMatrix) * worldLightDirection;
      vLocalCameraPosition = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
      vViewPosition = -mvPosition.xyz;
      ${ShaderChunk['logdepthbuf_vertex']}
    }
  `,
  fragmentShader: `
    precision highp float;
    
    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_fragment']}
  
    #define SCATTER_POINT_COUNT 10
    #define OPTICAL_DEPTH_POINT_COUNT 10
    
    uniform float targetRadius;
    uniform float atmosphereRadius;
    uniform vec3 scatterRGB;
    uniform float densityFalloff;
    
    varying vec3 vPosition;
    varying vec3 vLocalLightDirection;
    varying vec3 vLocalCameraPosition;
    varying vec3 vViewPosition;
    
    vec3 origin = vec3(0.0);
    
    #include <atmosphereFunctions>
    
    void main() {
      ${ShaderChunk['logdepthbuf_fragment']}
      
      #include <atmosphereFragment>
      
      gl_FragColor = atmosphereColor;
      
      ${ShaderChunk['tonemapping_fragment']}
      ${ShaderChunk['colorspace_fragment']}
    }
  `
}
