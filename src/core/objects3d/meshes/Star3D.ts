import { CelestialObject3D } from '@/core/objects3d/CelestialObject3D'
import { BufferGeometry, LOD, Material, Mesh, Object3D, SphereGeometry } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { StarMaterial } from '@/core/materials/StarMaterial'
import { Label2D } from '@/core/objects3d/hud/Label2D'
import { degToRad } from 'three/src/math/MathUtils'
import { AppConfig } from '@/config/app'
import { height } from '@/core/constants'
import { FakeStar } from '@/core/objects3d/sprites/FakeStar'
import { CompositedRenderable, UsesLOD } from '@/core/objects3d/types'

class Star3D extends CelestialObject3D implements CompositedRenderable, UsesLOD {
  public geometry: BufferGeometry
  public material: Material
  public object3D: Object3D
  public lod: LOD

  public constructor(model: CelestialObject) {
    super(model)
    this.geometry = new SphereGeometry(toThreeJSUnits(this.model.physicalParameters.radius), 256, 256)
    this.material = new StarMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
    this.lod = new LOD()
    this.geometry.computeBoundingSphere()
    this.generateEvents()
  }

  public override build(): Object3D {
    this.object3D.add(new Label2D(this.model.name).build())
    this.object3D.rotateX(-degToRad(this.model.physicalParameters.axialTilt))
    this.object3D.userData.hasBloom = true
    this.lod.name = this.model.name

    this.group.add(this.lod)

    this.lod.addLevel(this.object3D)
    this.lod.addLevel(new FakeStar(this.model).build(), this.computeDistanceLOD(5))
    this.lod.userData.type = this.model.type

    return super.build()
  }

  private computeDistanceLOD(pixels: number): number {
    const radius: number = this.model.physicalParameters.radius
    const fov: number = degToRad(AppConfig.PerspectiveCameraParameters.fov)

    return toThreeJSUnits((2 * radius * height) / (fov * pixels))
  }
}

export { Star3D }
