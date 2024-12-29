import { Renderable, UsesLOD } from '@/core/objects3d/types'
import { BufferGeometry, LOD, Mesh, Object3D, RingGeometry, ShaderMaterial } from 'three'
import { Ring } from '@/models/Ring'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { RingMaterial } from '@/core/materials/RingMaterial'
import { degToRad } from 'three/src/math/MathUtils'
import { InstancedAsteroid3D } from '@/core/objects3d/instanced/InstancedAsteroid3D'

class Ring3D implements Renderable, UsesLOD {
  private readonly model: Ring
  public geometry: BufferGeometry
  public material: ShaderMaterial
  public lod: LOD
  public object3D: Object3D

  public constructor(model: Ring) {
    this.model = model
    this.geometry = new RingGeometry(
      toThreeJSUnits(this.model.innerRadius),
      toThreeJSUnits(this.model.outerRadius),
      256
    )
    this.material = new RingMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
    this.lod = new LOD()
  }

  public build(): Object3D {
    this.object3D.name = this.model.name
    this.lod.name = this.model.name

    this.object3D.rotateX(degToRad(90))

    if (this.model.parent) {
      this.lod.rotateX(-degToRad(this.model.parent.physicalParameters.axialTilt))
    }

    const simpleRing: Object3D = this.object3D
    const detailedRing: Object3D = simpleRing
      .clone()
      .add(new InstancedAsteroid3D(this.model.innerRadius, this.model.outerRadius, this.model.countParticles).build())

    this.lod.addLevel(detailedRing)
    this.lod.addLevel(simpleRing, toThreeJSUnits(this.model.outerRadius * 2))
    this.lod.userData.type = this.model.type

    return this.lod
  }
}

export { Ring3D }
