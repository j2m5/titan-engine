import { ShaderChunk, UniformsUtils, Vector3 } from 'three'
import { AppUniformsChunk } from './chunks'
import { TShader } from '@/core/shaders/types'

const defaultUniforms = {
  lightPosition: { value: new Vector3() },
  diffuseMap: { value: null },
  nightMap: { value: null },
  cloudMap: { value: null },
  specularMap: { value: null },
  bumpMap: { value: null },
  bumpScale: { value: 0 },
  emission: { value: 1.0 },
  targetRadius: { value: 0 },
  atmosphereRadius: { value: 0 },
  scatterRGB: { value: new Vector3() },
  densityFalloff: { value: 0 }
}
const ringShadowUniforms = AppUniformsChunk.ringShadowUniforms

export const PlanetShader: TShader = {
  uniforms: UniformsUtils.merge([defaultUniforms, ringShadowUniforms]),
  vertexShader: `
    precision highp float;
    
    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_vertex']}
    
    uniform vec3 lightPosition;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewLightDirection;
    varying vec3 vLocalLightDirection;
    varying vec3 vViewPosition;
    
    #ifdef hasAtmosphere
      varying vec3 vLocalCameraPosition;
    #endif

    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      vec3 worldLightDirection = normalize(worldPosition.xyz - lightPosition);
      vec3 localLightDirection = (inverse(modelMatrix) * vec4(worldLightDirection, 0.0)).xyz;
      vec4 viewLightDirection = viewMatrix * vec4(lightPosition, 1.0);

      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vViewLightDirection = normalize(viewLightDirection.xyz - mvPosition.xyz);
      vLocalLightDirection = localLightDirection;
      vViewPosition = -mvPosition.xyz;
      
      #ifdef hasAtmosphere
        vLocalCameraPosition = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
      #endif

      ${ShaderChunk['logdepthbuf_vertex']}
    }
  `,
  fragmentShader: `
    precision highp float;
    
    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_fragment']}
    
    uniform vec3 lightPosition;
    uniform sampler2D diffuseMap;
    uniform sampler2D nightMap;
    uniform sampler2D cloudMap;
    uniform sampler2D specularMap;
    uniform sampler2D bumpMap;
    uniform float bumpScale;
    uniform float emission;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewLightDirection;
    varying vec3 vLocalLightDirection;
    varying vec3 vViewPosition;
    
    #ifdef hasBump
      #include <bumpFunctions>
    #endif
    
    #ifdef hasRing
      #include <ringShadowUniforms>
      #include <ringShadowFunctions>
    #endif
    
    #ifdef hasAtmosphere
      #define SCATTER_POINT_COUNT 10
      #define OPTICAL_DEPTH_POINT_COUNT 10
    
      uniform float targetRadius;
      uniform float atmosphereRadius;
      uniform vec3 scatterRGB;
      uniform float densityFalloff;
      
      varying vec3 vLocalCameraPosition;
    
      vec3 origin = vec3(0.0);
    
      #include <atmosphereFunctions>
    #endif
    
    void main() {
      ${ShaderChunk['logdepthbuf_fragment']}
      vec3 normal = normalize(vNormal);
      
      #ifdef hasBump
        float faceDirection = gl_FrontFacing ? 1.0 : -1.0;
        normal = perturbNormalArb(-vViewPosition, normal, dHdxy_fwd(), faceDirection);
      #endif
      
      vec3 lightDirection = normalize(vViewLightDirection);
      float lightIntensity = max(dot(normal, lightDirection), 0.0);
  
      vec3 lightColor = vec3(1.0);
      vec3 dayColor = texture2D(diffuseMap, vUv).rgb;
      vec3 nightColor = texture2D(nightMap, vUv).rgb;
      
      vec3 cloudColor = texture2D(cloudMap, vUv).rgb;
      cloudColor *= pow(max(0.5 * lightIntensity + 0.1, 0.0), 0.5);
      float cloudAlpha = dot(cloudColor, vec3(1.0)) / 3.0;
      cloudAlpha = pow(cloudAlpha, 0.5);
      
      vec3 day = cloudColor + dayColor * (1.0 - cloudAlpha);
      vec3 night = nightColor * nightColor * emission;
  
      vec3 finalColor = mix(night, day, lightIntensity);
      finalColor = clamp(finalColor, 0.0, 1.0);
      
      #ifdef hasSpecular
        float specComp = max(0.0, dot(normal, lightDirection));
        specComp = pow(specComp, 32.0) * 0.35;
        
        float specularIntensity = texture2D(specularMap, vUv).r;
        
        finalColor += specularIntensity * specComp;
      #endif
      
      #ifdef hasRing
        #include <ringShadowFragment>
      #endif
      
      #ifdef hasAtmosphere
        #include <atmosphereFragment>
        
        gl_FragColor = vec4(atmosphereColor.rgb + finalColor, 1.0);
      #else
        gl_FragColor = vec4(finalColor, 1.0);
      #endif
      
      ${ShaderChunk['tonemapping_fragment']}
      ${ShaderChunk['colorspace_fragment']}
    }
  `
}
