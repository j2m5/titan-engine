import { Renderable } from '@/core/objects3d/types'
import { BufferGeometry, Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'
import { Atmosphere } from '@/models/Atmosphere'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { AtmosphereMaterial } from '@/core/materials/AtmosphereMaterial'

class Atmosphere3D implements Renderable {
  private readonly model: Atmosphere
  public geometry: BufferGeometry
  public material: ShaderMaterial
  public object3D: Object3D

  public constructor(model: Atmosphere) {
    this.model = model
    this.geometry = new SphereGeometry(toThreeJSUnits(this.model.radius), 128, 128)
    this.material = new AtmosphereMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
  }

  public build(): Object3D {
    this.object3D.name = this.model.name + 'Atmosphere'
    this.object3D.userData.type = this.model.type

    return this.object3D
  }
}

export { Atmosphere3D }
