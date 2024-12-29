import { AdditiveBlending, BackSide, ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { Atmosphere } from '@/models/Atmosphere'
import { CelestialObject } from '@/models/CelestialObject'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, replaceShaderIncludes } from '@/core/shaders/helpers'
import { AtmosphereShader } from '@/core/shaders/content/AtmosphereShader'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { calculateScatterRGB } from '@/core/materials/helpers'

class AtmosphereMaterial extends ShaderMaterial {
  public model: Atmosphere

  public constructor(model: Atmosphere, parameters?: ShaderMaterialParameters) {
    super(parameters)
    this.model = model

    const { uniforms, vertexShader, fragmentShader } = cloneShader(AtmosphereShader)

    const parent: CelestialObject = this.model.parent!

    uniforms.targetRadius.value = toThreeJSUnits(parent.physicalParameters.radius)
    uniforms.atmosphereRadius.value = toThreeJSUnits(this.model.radius)
    uniforms.scatterRGB.value = calculateScatterRGB(this.model.scatter, this.model.scatteringStrength)
    uniforms.densityFalloff.value = this.model.densityFalloff

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.depthWrite = false
    this.transparent = true
    this.blending = AdditiveBlending
    this.side = BackSide
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { AtmosphereMaterial }
