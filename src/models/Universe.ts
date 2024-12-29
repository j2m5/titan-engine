import { Model } from '@/core/data/Model'
import { IUniverse } from '@/core/data/types'
import { SceneSize } from '@/core/constants'
import { Universe3D } from '@/core/objects3d/meshes/Universe3D'
import { IObject3D } from '@/core/objects3d/types'

const data: IUniverse = {
  name: 'Universe',
  parent: null,
  type: 'universe',
  radius: SceneSize / 100
}

class Universe extends Model {
  public radius: number

  public constructor() {
    super(data)
    this.radius = data.radius
  }

  public override createObject3D(): IObject3D {
    return new Universe3D(this)
  }
}

export { Universe }
