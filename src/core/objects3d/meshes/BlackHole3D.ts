import { CelestialObject3D } from '@/core/objects3d/CelestialObject3D'
import { CompositedRenderable } from '@/core/objects3d/types'
import { BufferGeometry, Material, Mesh, Object3D, PlaneGeometry } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { BlackHoleMaterial } from '@/core/materials/BlackHoleMaterial'

class BlackHole3D extends CelestialObject3D implements CompositedRenderable {
  public geometry: BufferGeometry
  public material: Material
  public object3D: Object3D

  public constructor(model: CelestialObject) {
    super(model)

    this.geometry = new PlaneGeometry(1, 1)
    this.material = new BlackHoleMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
  }
}

export { BlackHole3D }
