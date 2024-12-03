export const bumpFunctions = `
    vec2 dHdxy_fwd() {
      vec2 dSTdx = dFdx(vUv);
      vec2 dSTdy = dFdy(vUv);
      float Hll = bumpScale * texture2D(bumpMap, vUv).x;
      float dBx = bumpScale * texture2D(bumpMap, vUv + dSTdx).x - Hll;
      float dBy = bumpScale * texture2D(bumpMap, vUv + dSTdy).x - Hll;
      return vec2(dBx, dBy);
    }
    
    vec3 perturbNormalArb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection) {
      vec3 vSigmaX = normalize(dFdx(surf_pos.xyz));
      vec3 vSigmaY = normalize(dFdy(surf_pos.xyz));
      vec3 vN = surf_norm;
      vec3 R1 = cross(vSigmaY, vN);
      vec3 R2 = cross(vN, vSigmaX);
      float fDet = dot(vSigmaX, R1) * faceDirection;
      vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
      return normalize(abs(fDet) * surf_norm - vGrad);
    }
`
