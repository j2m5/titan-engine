import { AdditiveBlending, ShaderMaterial } from 'three'
import { cloneShader } from '@/core/shaders/helpers'
import { RingFogParticlesShader } from '@/core/shaders/content/RingFogParticlesShader'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'

class RingFogParticlesMaterial extends ShaderMaterial {
  public constructor(parameters?: ShaderMaterialParameters) {
    super(parameters)

    const { uniforms, vertexShader, fragmentShader } = cloneShader(RingFogParticlesShader)

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.transparent = true
    this.depthWrite = false
    this.blending = AdditiveBlending
  }
}

export { RingFogParticlesMaterial }
