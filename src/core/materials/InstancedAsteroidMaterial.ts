import { ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, replaceShaderIncludes } from '@/core/shaders/helpers'
import { InstancedAsteroidShader } from '@/core/shaders/content/InstancedAsteroidShader'
import { textureManager } from '@/core/services/TextureManager'

class InstancedAsteroidMaterial extends ShaderMaterial {
  public constructor(parameters?: ShaderMaterialParameters) {
    super(parameters)

    const { uniforms, vertexShader, fragmentShader } = cloneShader(InstancedAsteroidShader)

    uniforms.diffuseMap.value = textureManager.textures.get('asteroid.jpg')
    uniforms.nightMap.value = textureManager.textures.get('night.jpg')

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { InstancedAsteroidMaterial }
