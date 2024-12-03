import { TShader } from '@/core/shaders/types'
import { Vector3 } from 'three'

export const CrosshairShader: TShader = {
  uniforms: {
    size: { value: 50 },
    color: { value: new Vector3(1.0, 1.0, 1.0) }
  },
  vertexShader: `
    uniform float size;
    
    varying vec3 vPosition;

    void main() {
      gl_PointSize = size;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
      vPosition = position;
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    
    varying vec3 vPosition;
    
    #define PI 3.141592653589793

    void main() {
      vec2 coords = (gl_PointCoord - 0.5) * 2.0;
      
      float angle = atan(coords.y, coords.x);
      float radius = length(coords);

      float borderWidth = 0.3; // Ширина границы треугольников
      float triangleWidth = 0.3; // Ширина треугольника
      float rotationOffset = PI / 3.2; // Поворот на 45 градусов

      if (
        (abs(mod(angle + rotationOffset, PI / 2.0)) < triangleWidth && radius < 1.0 && radius > 0.5 - borderWidth) ||
        (abs(mod(angle + rotationOffset + PI / 2.0, PI / 2.0)) < triangleWidth && radius < 1.0 && radius > 0.5 - borderWidth) ||
        (abs(mod(angle + rotationOffset + PI, PI / 2.0)) < triangleWidth && radius < 1.0 && radius > 0.5 - borderWidth) ||
        (abs(mod(angle + rotationOffset + PI * 1.5, PI / 2.0)) < triangleWidth && radius < 1.0 && radius > 0.5 - borderWidth)
      ) {
        gl_FragColor = vec4(color, 1.0);
      } else {
        discard;
      }
    }
  `
}
