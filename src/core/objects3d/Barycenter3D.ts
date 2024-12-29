import { CelestialObject3D } from '@/core/objects3d/CelestialObject3D'
import { Object3D } from 'three'
import { CelestialObject } from '@/models/CelestialObject'

class Barycenter3D extends CelestialObject3D {
  public object3D: Object3D

  public constructor(model: CelestialObject) {
    super(model)
    this.object3D = new Object3D()
    this.generateEvents()
  }

  public override build(): Object3D {
    return super.build()
  }
}

export { Barycenter3D }
