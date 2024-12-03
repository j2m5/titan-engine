import { Model } from '@/core/data/Model'
import { ICelestialObject, IRing, TextureParameters } from '@/core/data/types'
import { CelestialObjects } from '@/database/CelestialObjects'
import { CelestialObject } from '@/models/CelestialObject'
import { Ring3D } from '@/core/objects3d/meshes/Ring3D'
import { IObject3D } from '@/core/objects3d/types'

class Ring extends Model {
  public innerRadius: number
  public outerRadius: number
  public alphaTest: number
  public countParticles: number
  public diffuseMap: TextureParameters

  public constructor(data: IRing) {
    super(data)
    this.innerRadius = data.innerRadius
    this.outerRadius = data.outerRadius
    this.alphaTest = data.alphaTest
    this.countParticles = data.countParticles
    this.diffuseMap = data.diffuseMap
  }

  public override createObject3D(): IObject3D {
    return new Ring3D(this)
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

export { Ring }
