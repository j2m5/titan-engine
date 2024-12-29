import { Renderable } from '@/core/objects3d/types'
import { BufferGeometry, Line, LineBasicMaterial, Object3D, Vector3 } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { AU, SpaceScale } from '@/core/constants'

class OrbitCurve3D implements Renderable {
  private readonly model: CelestialObject
  public geometry: BufferGeometry
  public material: LineBasicMaterial
  public object3D: Object3D

  public constructor(model: CelestialObject) {
    this.model = model
    this.geometry = (() => {
      const points: Vector3[] = this.getPoints()

      points.forEach((point: Vector3): void => {
        point.multiplyScalar(AU * SpaceScale)
      })

      return new BufferGeometry().setFromPoints(points)
    })()
    this.material = new LineBasicMaterial({ color: this.model.color, transparent: true, opacity: 0.7 })
    this.object3D = new Line(this.geometry, this.material)
  }

  public build(): Object3D {
    this.object3D.name = this.model.name + 'Orbit'
    this.object3D.userData.type = 'orbit'

    return this.object3D
  }

  private getPoints(count: number = 36000): Vector3[] {
    const points: Vector3[] = []

    for (let i: number = 0; i <= count; i++) {
      const theta: number = i / count
      const e: number = this.model.getEccentricAnomalyByMeanAnomaly(theta, this.model.keplerianParameters.eccentricity)
      const v: Vector3 = this.model.getPosition(this.model.epoch, e)

      points.push(v)
    }

    return points
  }
}

export { OrbitCurve3D }
