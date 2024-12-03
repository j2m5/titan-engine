import { Renderable } from '@/core/objects3d/types'
import { BufferGeometry, Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'
import { Glow } from '@/models/Glow'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { GlowMaterial } from '@/core/materials/GlowMaterial'

class Glow3D implements Renderable {
  private readonly model: Glow
  public geometry: BufferGeometry
  public material: ShaderMaterial
  public object3D: Object3D

  public constructor(model: Glow) {
    this.model = model
    this.geometry = new SphereGeometry(toThreeJSUnits(this.model.radius * 1.7), 128, 128)
    this.material = new GlowMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
  }

  public build(): Object3D {
    this.object3D.name = this.model.name + 'Glow'
    this.object3D.userData.type = this.model.type

    return this.object3D
  }
}

export { Glow3D }
