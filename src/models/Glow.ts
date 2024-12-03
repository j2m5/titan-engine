import { Model } from '@/core/data/Model'
import { ICelestialObject } from '@/core/data/types'
import { CelestialObject } from '@/models/CelestialObject'
import { CelestialObjects } from '@/database/CelestialObjects'
import { Glow3D } from '@/core/objects3d/meshes/Glow3D'
import { IObject3D } from '@/core/objects3d/types'

class Glow extends Model {
  public radius: number
  public temperature: number

  public constructor(data: ICelestialObject) {
    super(data)
    this.radius = data.physicalParameters ? data.physicalParameters.radius : 0
    this.temperature =
      data.physicalParameters && data.physicalParameters.temperature ? data.physicalParameters.temperature : 3000
  }

  public createObject3D(): IObject3D {
    return new Glow3D(this)
  }

  public get parent(): CelestialObject | null {
    const parent: ICelestialObject | undefined = CelestialObjects.find(
      (el: ICelestialObject): boolean => el.name === this.parentName
    )

    if (parent) {
      return new CelestialObject(parent)
    }

    return null
  }
}

export { Glow }
