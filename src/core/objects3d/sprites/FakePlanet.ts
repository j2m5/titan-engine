import { IObject3D } from '@/core/objects3d/types'
import { AdditiveBlending, Object3D, Sprite, SpriteMaterial, Texture } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { textureManager } from '@/core/services/TextureManager'

class FakePlanet implements IObject3D {
  private readonly model: CelestialObject
  private readonly scale: number
  public object3D: Object3D

  public constructor(model: CelestialObject, scale: number = 0.002) {
    this.model = model
    this.scale = scale

    const map: Texture = textureManager.textures.get('star.png')!
    map.premultiplyAlpha = true

    const color: string = '#96948b'

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
    this.object3D.name = this.model.name + 'SpriteFar'
    this.object3D.scale.multiplyScalar(this.scale)

    return this.object3D
  }
}

export { FakePlanet }
