import { Renderable } from '@/core/objects3d/types'
import { Halo } from '@/models/Halo'
import { BufferGeometry, Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { HaloMaterial } from '@/core/materials/HaloMaterial'

class Halo3D implements Renderable {
  private readonly model: Halo
  public geometry: BufferGeometry
  public material: ShaderMaterial
  public object3D: Object3D

  public constructor(model: Halo) {
    this.model = model
    this.geometry = new SphereGeometry(toThreeJSUnits(this.model.radius), 128, 128)
    this.material = new HaloMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
  }

  public build(): Object3D {
    this.object3D.name = this.model.name + 'Halo'
    this.object3D.userData.type = this.model.type

    return this.object3D
  }
}

export { Halo3D }
