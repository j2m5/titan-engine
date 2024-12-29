import { ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, colorTemperatureToRGB, normalizeColor, replaceShaderIncludes } from '@/core/shaders/helpers'
import { CelestialObject } from '@/models/CelestialObject'
import { StarShader } from '@/core/shaders/content/StarShader'

class StarMaterial extends ShaderMaterial {
  private model: CelestialObject

  public constructor(model: CelestialObject, parameters?: ShaderMaterialParameters) {
    super(parameters)
    this.model = model

    const temperature: number =
      this.model.physicalParameters && this.model.physicalParameters.temperature
        ? this.model.physicalParameters.temperature
        : 3000

    const { uniforms, vertexShader, fragmentShader } = cloneShader(StarShader)
    const { r, g, b } = colorTemperatureToRGB(temperature)

    uniforms.spectralColor.value = normalizeColor({ r, g, b })

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { StarMaterial }
