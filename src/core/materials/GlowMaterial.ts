import { AdditiveBlending, Color, DoubleSide, ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { Glow } from '@/models/Glow'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, colorTemperatureToRGB, replaceShaderIncludes, rgbToHex } from '@/core/shaders/helpers'
import { GlowShader } from '@/core/shaders/content/GlowShader'

class GlowMaterial extends ShaderMaterial {
  public model: Glow

  public constructor(model: Glow, parameters?: ShaderMaterialParameters) {
    super(parameters)
    this.model = model

    const { uniforms, vertexShader, fragmentShader } = cloneShader(GlowShader)
    const { r, g, b } = colorTemperatureToRGB(model.temperature)
    const color: string = rgbToHex({ r, g, b })

    uniforms.falloff.value = 0
    uniforms.glowInternalRadius.value = 4.5
    uniforms.glowColor.value = new Color(color)
    uniforms.glowSharpness.value = 0
    uniforms.opacity.value = 1

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.blending = AdditiveBlending
    this.side = DoubleSide
    this.transparent = true
    this.depthWrite = false
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { GlowMaterial }
