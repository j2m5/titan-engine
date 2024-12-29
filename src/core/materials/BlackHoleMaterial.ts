import { ShaderMaterial } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader } from '@/core/shaders/helpers'
import { BlackHoleShader } from '@/core/shaders/content/BlackHoleShader'

class BlackHoleMaterial extends ShaderMaterial {
  public model: CelestialObject

  public constructor(model: CelestialObject, parameters?: ShaderMaterialParameters) {
    super(parameters)
    this.model = model

    const { uniforms, vertexShader, fragmentShader } = cloneShader(BlackHoleShader)

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
  }
}

export { BlackHoleMaterial }
