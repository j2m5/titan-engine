import { Model } from '@/core/data/Model'
import { IAtmosphere, ICelestialObject, TColor } from '@/core/data/types'
import { CelestialObjects } from '@/database/CelestialObjects'
import { CelestialObject } from '@/models/CelestialObject'
import { Atmosphere3D } from '@/core/objects3d/meshes/Atmosphere3D'
import { IObject3D } from '@/core/objects3d/types'

class Atmosphere extends Model {
  public radius: number
  public scatter: TColor
  public scatteringStrength: number
  public densityFalloff: number

  public constructor(data: IAtmosphere) {
    super(data)
    this.radius = data.radius
    this.scatter = data.scatter
    this.scatteringStrength = data.scatteringStrength
    this.densityFalloff = data.densityFalloff
  }

  public override createObject3D(): IObject3D {
    return new Atmosphere3D(this)
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

export { Atmosphere }
