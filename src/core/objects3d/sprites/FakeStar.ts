import { IObject3D } from '@/core/objects3d/types'
import { CelestialObject } from '@/models/CelestialObject'
import { AdditiveBlending, Object3D, Sprite, SpriteMaterial, Texture } from 'three'
import { textureManager } from '@/core/services/TextureManager'
import { colorTemperatureToRGB, rgbToHex } from '@/core/shaders/helpers'

class FakeStar implements IObject3D {
  private readonly model: CelestialObject
  public object3D: Object3D

  public constructor(model: CelestialObject) {
    this.model = model

    const map: Texture = textureManager.textures.get('sun_glow.png')!
    map.premultiplyAlpha = true

    const { r, g, b } = colorTemperatureToRGB(this.model.physicalParameters.temperature!)
    const color: string = rgbToHex({ r, g, b })

    const material: SpriteMaterial = new SpriteMaterial({
      map,
      color,
      sizeAttenuation: false,
      depthWrite: false,
      blending: AdditiveBlending
    })

    this.object3D = new Sprite(material)
  }

  public build(): Object3D {
    this.object3D.name = this.model.name + 'SpriteNear'
    this.object3D.scale.multiplyScalar(0.05)
    this.object3D.userData.hasBloom = true

    return this.object3D
  }
}

export { FakeStar }
