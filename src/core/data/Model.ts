import { IModel, ModelType } from '@/core/data/types'
import { IObject3D } from '@/core/objects3d/types'

abstract class Model {
  public name: string
  public type: ModelType
  public parentName: string | null

  protected constructor(data: IModel) {
    this.name = data.name
    this.type = data.type
    this.parentName = data.parent
  }

  public abstract createObject3D(): IObject3D
}

export { Model }
