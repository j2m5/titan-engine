import { AdditiveBlending, BackSide, ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { Halo } from '@/models/Halo'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, normalizeColor, replaceShaderIncludes } from '@/core/shaders/helpers'
import { HaloShader } from '@/core/shaders/content/HaloShader'

class HaloMaterial extends ShaderMaterial {
  public model: Halo

  public constructor(model: Halo, parameters?: ShaderMaterialParameters) {
    super(parameters)
    this.model = model

    const { uniforms, vertexShader, fragmentShader } = cloneShader(HaloShader)

    uniforms.dayColor.value = normalizeColor(this.model.day)
    uniforms.nightColor.value = normalizeColor(this.model.night)

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

export { HaloMaterial }
