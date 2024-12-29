import { Model } from '@/core/data/Model'
import {
  CelestialObjectFeatures,
  CelestialObjectKeplerianParameters,
  CelestialObjectPhysicalParameters,
  CelestialObjectRenderingParameters,
  CelestialObjectTextures,
  IAtmosphere,
  ICelestialObject,
  IHalo,
  IRing
} from '@/core/data/types'
import { NullKeplerianParameters } from '@/core/data/nullObjects/NullKeplerianParameters'
import { CelestialObjects } from '@storage/database/CelestialObjects'
import { AUM, CIRCLE, G, J2000, SolarMass } from '@/core/constants'
import { Vector2, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import { Atmosphere } from '@/models/Atmosphere'
import { Atmospheres, Halos, Rings } from '@storage/database/Assets'
import { Ring } from '@/models/Ring'
import { NullPhysicalParameters } from '@/core/data/nullObjects/NullPhysicalParameters'
import { Star3D } from '@/core/objects3d/meshes/Star3D'
import { Planet3D } from '@/core/objects3d/meshes/Planet3D'
import { Barycenter3D } from '@/core/objects3d/Barycenter3D'
import { universeStore } from '@/core/mobX/UniverseStore'
import { Glow } from '@/models/Glow'
import { IObject3D } from '@/core/objects3d/types'
import { Halo } from '@/models/Halo'
import { NullRenderingParameters } from '@/core/data/nullObjects/NullRenderingParameters'
import { BlackHole3D } from '@/core/objects3d/meshes/BlackHole3D'

class CelestialObject extends Model {
  private readonly data: ICelestialObject
  public description: string
  public color: string
  public computeLagrangePoints: boolean
  public features: CelestialObjectFeatures | null
  public textures: CelestialObjectTextures | null
  public renderingParameters: CelestialObjectRenderingParameters
  public physicalParameters: CelestialObjectPhysicalParameters
  public keplerianParameters: CelestialObjectKeplerianParameters
  public epoch: number

  public constructor(data: ICelestialObject) {
    super(data)
    this.data = data
    this.description = data.description
    this.color = data.color
    this.computeLagrangePoints = data.computeLagrangePoints || false
    this.features = data.features || null
    this.textures = data.textures || null
    this.renderingParameters = data.renderingParameters || new NullRenderingParameters()
    this.physicalParameters = data.physicalParameters || new NullPhysicalParameters()
    this.keplerianParameters = data.keplerianParameters || new NullKeplerianParameters()
    this.epoch = universeStore.epoch
  }

  public override createObject3D(): IObject3D {
    switch (this.type) {
      case 'star':
        return new Star3D(this)
      case 'planet':
        return new Planet3D(this)
      case 'blackhole':
        return new BlackHole3D(this)
      default:
        return new Barycenter3D(this)
    }
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

  public get atmosphere(): Atmosphere | null {
    if (this.features && this.features.includes('atmosphere')) {
      const atmosphere: IAtmosphere | undefined = Atmospheres.find((el: IAtmosphere): boolean => el.name === this.name)

      if (atmosphere) {
        return new Atmosphere(atmosphere)
      }
    }

    return null
  }

  public get halo(): Halo | null {
    if (this.features && this.features.includes('halo')) {
      const halo: IHalo | undefined = Halos.find((el: IHalo): boolean => el.name === this.name)

      if (halo) {
        return new Halo(halo)
      }
    }

    return null
  }

  public get ring(): Ring | null {
    if (this.features && this.features.includes('ring')) {
      const ring: IRing | undefined = Rings.find((el: IRing): boolean => el.name === this.name)

      if (ring) {
        return new Ring(ring)
      }
    }

    return null
  }

  public get glow(): Glow | null {
    if (this.features && this.features.includes('glow')) {
      return new Glow(this.data)
    }

    return null
  }

  public get $argOfPeriapsis(): number {
    return degToRad(this.keplerianParameters.argOfPeriapsis)
  }

  public get $ascendingNode(): number {
    return degToRad(this.keplerianParameters.ascendingNode)
  }

  public get $inclination(): number {
    return degToRad(this.keplerianParameters.inclination)
  }

  public get $meanAnomalyAtEpoch(): number {
    return degToRad(this.keplerianParameters.meanAnomalyAtEpoch)
  }

  public get mu(): number {
    if (this.parent) {
      return G * (this.parent.physicalParameters.mass + this.physicalParameters.mass)
    }

    return G * (SolarMass + this.physicalParameters.mass)
  }

  public get meanMotion(): number {
    return Math.sqrt(this.mu / Math.pow(this.keplerianParameters.semiMajorAxis * AUM, 3))
  }

  public get periapsisDistance(): number {
    return this.keplerianParameters.semiMajorAxis * (1 - this.keplerianParameters.eccentricity)
  }

  public get apoapsisDistance(): number {
    return this.keplerianParameters.semiMajorAxis * (1 + this.keplerianParameters.eccentricity)
  }

  public getTrueAnomalyByEccentricAnomaly(ea: number): number {
    if (this.isElliptic()) {
      const phi: number = Math.atan2(
        Math.sqrt(1.0 - this.keplerianParameters.eccentricity * this.keplerianParameters.eccentricity) * Math.sin(ea),
        Math.cos(ea) - this.keplerianParameters.eccentricity
      )

      return phi >= 0 ? phi : phi + CIRCLE
    } else {
      return (
        2 *
        Math.atan(
          Math.sqrt((this.keplerianParameters.eccentricity + 1) / (this.keplerianParameters.eccentricity - 1)) *
            Math.tanh(ea / 2)
        )
      )
    }
  }

  public getMeanAnomalyByEpoch(epoch: number): number {
    return this.$meanAnomalyAtEpoch + this.meanMotion * (epoch - J2000)
  }

  public getEccentricAnomalyByMeanAnomaly(ma: number, e: number): number {
    if (!this.isRealKeplerianParameters()) {
      return 0
    }

    const maxIter: number = 30
    const delta: number = 0.00000001
    let M: number = ma
    let E,
      F,
      i: number = 0

    if (e < 1) {
      M = M % (2.0 * Math.PI)
      M = 2.0 * Math.PI * (M - Math.floor(M))

      E = e < 0.8 ? M : Math.PI

      F = E - e * Math.sin(E) - M

      while (Math.abs(F) > delta && i < maxIter) {
        E = E - F / (1.0 - e * Math.cos(E))
        F = E - e * Math.sin(E) - M
        i = i + 1
      }
    } else {
      E = (Math.log(2 * (Math.abs(M) + 1 / 3)) + 1) / e + (1 - 1 / e) * Math.asinh(Math.abs(M) / e)
      E *= Math.sign(M)

      F = e * Math.sinh(E) - E - M

      while (Math.abs(F) > delta && i < maxIter) {
        E = E - F / (e * Math.cosh(E) - 1)
        F = e * Math.sinh(E) - E - M
        i = i + 1
      }
    }

    return E
  }

  public getPlaneCoords(ta: number): Vector2 {
    const r: number =
      (this.keplerianParameters.semiMajorAxis *
        (1 - this.keplerianParameters.eccentricity * this.keplerianParameters.eccentricity)) /
      (1 + this.keplerianParameters.eccentricity * Math.cos(ta))

    return new Vector2(r * Math.cos(ta), r * Math.sin(ta))
  }

  public getPosition(epoch: number, e?: number): Vector3 {
    if (!this.isRealKeplerianParameters()) {
      return new Vector3()
    }

    const E: number =
      e ??
      this.getEccentricAnomalyByMeanAnomaly(this.getMeanAnomalyByEpoch(epoch), this.keplerianParameters.eccentricity)
    const v: number = this.getTrueAnomalyByEccentricAnomaly(E)

    const [xPlane, yPlane] = this.getPlaneCoords(v)

    const x: number =
      xPlane *
        (Math.cos(this.$argOfPeriapsis) * Math.cos(this.$ascendingNode) -
          Math.sin(this.$argOfPeriapsis) * Math.sin(this.$ascendingNode) * Math.cos(this.$inclination)) -
      yPlane *
        (Math.sin(this.$argOfPeriapsis) * Math.cos(this.$ascendingNode) +
          Math.cos(this.$argOfPeriapsis) * Math.sin(this.$ascendingNode) * Math.cos(this.$inclination))

    const y: number =
      xPlane *
        (Math.cos(this.$argOfPeriapsis) * Math.sin(this.$ascendingNode) +
          Math.sin(this.$argOfPeriapsis) * Math.cos(this.$ascendingNode) * Math.cos(this.$inclination)) -
      yPlane *
        (Math.sin(this.$argOfPeriapsis) * Math.sin(this.$ascendingNode) -
          Math.cos(this.$argOfPeriapsis) * Math.cos(this.$ascendingNode) * Math.cos(this.$inclination))

    const z: number =
      xPlane * (Math.sin(this.$argOfPeriapsis) * Math.sin(this.$inclination)) +
      yPlane * (Math.cos(this.$argOfPeriapsis) * Math.sin(this.$inclination))

    return new Vector3(x, z, -y)
  }

  public isElliptic(): boolean {
    return this.keplerianParameters.eccentricity < 1
  }

  public isHyperbolic(): boolean {
    return this.keplerianParameters.eccentricity > 1
  }

  public isRealKeplerianParameters(): boolean {
    return this.keplerianParameters.semiMajorAxis > 0
  }
}

export { CelestialObject }
