import { ShaderMaterial, WebGLProgramParametersWithUniforms } from 'three'
import { ShaderMaterialParameters } from 'three/src/materials/ShaderMaterial'
import { cloneShader, replaceShaderIncludes } from '@/core/shaders/helpers'
import { PlanetShader } from '@/core/shaders/content/PlanetShader'
import { TDictionary } from '@/core/data/types'
import { CelestialObject } from '@/models/CelestialObject'
import { textureManager } from '@/core/services/TextureManager'
import { calculateScatterRGB, generateTexture } from '@/core/materials/helpers'
import { toThreeJSUnits } from '@/core/helpers/scaling'

class PlanetMaterial extends ShaderMaterial {
  public model: CelestialObject

  public constructor(model: CelestialObject, parameters?: ShaderMaterialParameters) {
    super(parameters)
    this.model = model

    const { uniforms, vertexShader, fragmentShader } = cloneShader(PlanetShader)
    const defines: TDictionary<any> = {}

    if (this.model.textures) {
      uniforms.diffuseMap.value = this.model.textures.diffuseMap
        ? textureManager.textures.get(this.model.textures.diffuseMap.path)
        : generateTexture('#ffffff')

      uniforms.nightMap.value = this.model.textures.nightMap
        ? textureManager.textures.get(this.model.textures.nightMap.path)
        : generateTexture('#000000')

      if (this.model.textures.cloudMap) {
        uniforms.cloudMap.value = textureManager.textures.get(this.model.textures.cloudMap.path)
      }

      if (this.model.textures.specularMap) {
        defines.hasSpecular = '1'
        uniforms.specularMap.value = textureManager.textures.get(this.model.textures.specularMap.path)
      }

      if (this.model.textures.bumpMap) {
        defines.hasBump = '1'
        uniforms.bumpMap.value = textureManager.textures.get(this.model.textures.bumpMap.path)
      }
    }

    if (this.model.ring) {
      defines.hasRing = '1'
      uniforms.shadowRingsInnerRadius.value = toThreeJSUnits(this.model.ring.innerRadius)
      uniforms.shadowRingsOuterRadius.value = toThreeJSUnits(this.model.ring.outerRadius)
      uniforms.shadowRingsTexture.value = textureManager.textures.get(this.model.ring.diffuseMap.path)
    }

    if (this.model.atmosphere) {
      defines.hasAtmosphere = '1'
      uniforms.targetRadius.value = toThreeJSUnits(this.model.physicalParameters.radius)
      uniforms.atmosphereRadius.value = toThreeJSUnits(this.model.atmosphere.radius)
      uniforms.scatterRGB.value = calculateScatterRGB(
        this.model.atmosphere.scatter,
        this.model.atmosphere.scatteringStrength
      )
      uniforms.densityFalloff.value = this.model.atmosphere.densityFalloff
    }

    uniforms.emission.value = this.model.renderingParameters.emission
    uniforms.bumpScale.value = this.model.renderingParameters.bumpScale

    this.uniforms = uniforms
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.defines = defines
  }

  public override onBeforeCompile(parameters: WebGLProgramParametersWithUniforms): void {
    parameters.vertexShader = replaceShaderIncludes(parameters.vertexShader)
    parameters.fragmentShader = replaceShaderIncludes(parameters.fragmentShader)
  }
}

export { PlanetMaterial }
