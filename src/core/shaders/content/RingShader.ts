import { ShaderChunk, Vector3 } from 'three'
import { TShader } from '@/core/shaders/types'
import { toThreeJSUnits } from '@/core/helpers/scaling'

export const RingShader: TShader = {
  uniforms: {
    diffuseMap: { value: null },
    innerRadius: { value: 0 },
    outerRadius: { value: 0 },
    alphaTest: { value: 0 },
    lightPosition: { value: new Vector3() },
    planetRadius: { value: 0 },
    minDistance: { value: toThreeJSUnits(1000) },
    maxDistance: { value: toThreeJSUnits(5000) }
  },
  vertexShader: `
    precision highp float;
    
    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_vertex']}
    
    uniform vec3 lightPosition;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vLightDirectionL;
    varying vec3 vLocalCameraPosition;
  
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vec3 viewPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * vec4(viewPosition, 1.0);
      
      vec3 lightDirWorld = normalize(worldPosition.xyz - lightPosition);
      vec3 lightDirLocal = (inverse(modelMatrix) * vec4(lightDirWorld, 0.0)).xyz;
      
      vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
      vPosition = position;
      vWorldPosition = worldPosition.xyz;
      vLightDirectionL = lightDirLocal;
      vLocalCameraPosition = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
      ${ShaderChunk['logdepthbuf_vertex']}
    }
  `,
  fragmentShader: `
    precision highp float;
    
    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_fragment']}
    
    uniform vec3 lightPosition;
    uniform sampler2D diffuseMap;
    uniform float innerRadius;
    uniform float outerRadius;
    uniform float alphaTest;
    uniform float planetRadius;
    uniform float minDistance;
    uniform float maxDistance;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vLightDirectionL;
    varying vec3 vLocalCameraPosition;
    
    float getShadowFromSphere(vec3 lightDirLocal, vec3 ringPosLocal, float planetRadius) {
      vec3 sunDirScaled = normalize(lightDirLocal);
      float pDotLScaled = dot(ringPosLocal, sunDirScaled);
      if (dot(ringPosLocal, ringPosLocal) - pDotLScaled * pDotLScaled < planetRadius * planetRadius && pDotLScaled > 0.0) {
        return 0.04;
      } else {
        return 1.0;
      }
    }
    
    void main() {
      ${ShaderChunk['logdepthbuf_fragment']}
      vec2 uv;
      uv.x = (length(vPosition) - innerRadius) / (outerRadius - innerRadius);
      
      if (uv.x < 0.0 || uv.x > 1.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
      }
      uv.y = 0.0;
      
      vec4 color = texture2D(diffuseMap, uv);
      
      if (color.a <= 0.0) discard;
      
      float distance = length(vLocalCameraPosition - vPosition);
      float transparencyFactor = smoothstep(minDistance, maxDistance, distance);

      color.a *= transparencyFactor;
      
      float noise = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
      float shadow = getShadowFromSphere(vLightDirectionL, vPosition, planetRadius);
      
      vec3 corrNormal = gl_FrontFacing ? vNormal : -vNormal;
      
      float lightIntensity = dot(corrNormal, normalize(lightPosition - vWorldPosition));
      vec3 finalColor = color.rgb;
      
      if (lightIntensity < 0.0) {
        vec3 lightDir = normalize(vLightDirectionL);
        vec3 cameraDir = normalize(vLocalCameraPosition - vPosition);
        float cosTheta = dot(-lightDir, cameraDir);
        
        const float g = -0.9;
        const float g2 = g * g;
        const float k = 1.5 / 806.202 * ((1.0 - g2) / (2.0 + g2));
        float backscatter = 3.0 * k * (1.0 + cosTheta * cosTheta) * pow(1.0 + g2 - 2.0 * g * cosTheta, -1.5);
        
        vec3 scatterColor = mix(vec3(1.0, 0.95, 0.85), vec3(1.0, 1.0, 0.9), abs(cosTheta));
        
        finalColor *= 0.2;
        finalColor += backscatter * scatterColor;
      }
      
      finalColor += 0.05 * noise;
      
      gl_FragColor = vec4(finalColor * shadow, color.a);
      
      ${ShaderChunk['tonemapping_fragment']}
      ${ShaderChunk['colorspace_fragment']}
    }
  `
}
