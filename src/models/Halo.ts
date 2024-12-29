import { Model } from '@/core/data/Model'
import { IObject3D } from '@/core/objects3d/types'
import { ICelestialObject, IHalo, TColor } from '@/core/data/types'
import { CelestialObject } from '@/models/CelestialObject'
import { CelestialObjects } from '@storage/database/CelestialObjects'
import { Halo3D } from '@/core/objects3d/meshes/Halo3D'

class Halo extends Model {
  public radius: number
  public day: TColor
  public night: TColor

  public constructor(data: IHalo) {
    super(data)
    this.radius = data.radius
    this.day = data.day
    this.night = data.night
  }

  public createObject3D(): IObject3D {
    return new Halo3D(this)
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

export { Halo }
