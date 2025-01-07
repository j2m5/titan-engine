import { CelestialObject3D } from '@/core/objects3d/CelestialObject3D'
import { BufferGeometry, LOD, Material, Mesh, Object3D, Sphere, SphereGeometry, Vector3 } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { PlanetMaterial } from '@/core/materials/PlanetMaterial'
import { Label2D } from '@/core/objects3d/hud/Label2D'
import { degToRad } from 'three/src/math/MathUtils'
import { AppConfig } from '@/config/app'
import { height } from '@/core/constants'
import { FakePlanet } from '@/core/objects3d/sprites/FakePlanet'
import { CompositedRenderable, UsesLOD } from '@/core/objects3d/types'
import { engine } from '@/core/graphic/Engine'

const cameraDirection: Vector3 = engine.camera.getWorldDirection(new Vector3())

class Planet3D extends CelestialObject3D implements CompositedRenderable, UsesLOD {
  public geometry: BufferGeometry
  public material: Material
  public object3D: Object3D
  public lod: LOD
  private readonly sphere: Sphere

  public constructor(model: CelestialObject) {
    super(model)
    this.geometry = new SphereGeometry(toThreeJSUnits(this.model.physicalParameters.radius), 256, 256)
    this.material = new PlanetMaterial(this.model)
    this.object3D = new Mesh(this.geometry, this.material)
    this.lod = new LOD()
    this.sphere = new Sphere(this.worldPosition, toThreeJSUnits(this.model.physicalParameters.radius))
    this.geometry.computeTangents()
    this.generateEvents()
  }

  public override build(): Object3D {
    this.object3D.add(new Label2D(this.model.name).build())
    this.object3D.rotateX(-degToRad(this.model.physicalParameters.axialTilt))
    this.lod.name = this.model.name

    this.group.add(this.lod)

    this.lod.addLevel(this.object3D)
    this.lod.addLevel(new FakePlanet(this.model).build(), this.computeDistanceLOD())

    return super.build()
  }

  public override update(): void {
    super.update()

    this.sphere.center.copy(this.worldPosition)
  }

  private computeDistanceLOD(): number {
    const radius: number = this.model.physicalParameters.radius
    const fov: number = degToRad(AppConfig.PerspectiveCameraParameters.fov)
    const pixels: number = 3

    return toThreeJSUnits((2 * radius * height) / (fov * pixels))
  }
}

export { Planet3D }
