import { DoubleSide, ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { Ring } from '@/models/Ring'
import { CelestialObject } from '@/models/CelestialObject'
import { cloneShader, replaceShaderIncludes } from '@/core/shaders/helpers'
import { RingShader } from '@/core/shaders/content/RingShader'
import { textureManager } from '@/core/services/TextureManager'
import { toThreeJSUnits } from '@/core/helpers/scaling'

class RingMaterial extends ShaderMaterial {
  public model: Ring

  public constructor(model: Ring) {
    super()
    this.model = model

    const { uniforms, vertexShader, fragmentShader } = cloneShader(RingShader)

    const parent: CelestialObject = this.model.parent!

    uniforms.diffuseMap.value = textureManager.textures.get(this.model.diffuseMap.path)
    uniforms.innerRadius.value = toThreeJSUnits(this.model.innerRadius)
    uniforms.outerRadius.value = toThreeJSUnits(this.model.outerRadius)
    uniforms.alphaTest.value = this.model.alphaTest
    uniforms.planetRadius.value = toThreeJSUnits(parent.physicalParameters.radius)

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.side = DoubleSide
    this.transparent = true
    this.depthWrite = false
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { RingMaterial }
