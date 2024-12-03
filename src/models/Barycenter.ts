import { CelestialObject } from '@/models/CelestialObject'
import { ICelestialObject } from '@/core/data/types'
import { Barycenter3D } from '@/core/objects3d/Barycenter3D'
import { IObject3D } from '@/core/objects3d/types'

class Barycenter extends CelestialObject {
  public constructor(data: ICelestialObject) {
    super(data)
  }

  public override createObject3D(): IObject3D {
    return new Barycenter3D(this)
  }
}

export { Barycenter }
