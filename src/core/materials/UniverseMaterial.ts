import { AdditiveBlending, ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, replaceShaderIncludes } from '@/core/shaders/helpers'
import { UniverseShader } from '@/core/shaders/content/UniverseShader'
import { textureManager } from '@/core/services/TextureManager'

class UniverseMaterial extends ShaderMaterial {
  public constructor(parameters?: ShaderMaterialParameters) {
    super(parameters)

    const { uniforms, vertexShader, fragmentShader } = cloneShader(UniverseShader)

    uniforms.starTexture.value = textureManager.textures.get('star.png')

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.vertexColors = true
    this.blending = AdditiveBlending
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { UniverseMaterial }
