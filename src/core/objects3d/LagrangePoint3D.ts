import { IObject3D } from '@/core/objects3d/types'
import { Object3D, Vector3 } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { Label2D } from '@/core/objects3d/hud/Label2D'
import { LagrangePointsTypes } from '@/core/data/types'

class LagrangePoint3D implements IObject3D {
  private readonly model: CelestialObject
  private readonly type: LagrangePointsTypes
  private readonly position: Vector3
  public object3D: Object3D

  public constructor(model: CelestialObject, type: LagrangePointsTypes, position: Vector3) {
    this.model = model
    this.type = type
    this.position = position
    this.object3D = new Object3D()
  }

  public build(): Object3D {
    this.object3D.name = `${this.model.name} ${this.type}`
    this.object3D.add(new Label2D(this.object3D.name).build())

    this.object3D.position.copy(this.position)

    return this.object3D
  }
}

export { LagrangePoint3D }
