import type {
  ColorSpace,
  MagnificationTextureFilter,
  Mapping,
  MinificationTextureFilter,
  PixelFormat,
  TextureDataType,
  Wrapping
} from 'three/src/constants'
import type { Vector3 } from 'three'

export interface SimulationState {
  cameraPosition: Vector3
  cameraDirection: Vector3
  cameraTarget: Vector3
  modelState: ModelState[]
}

export interface ModelState {
  name: string
  distanceFromCamera: number
  position: Vector3
  physicalParameters: CelestialObjectPhysicalParameters
  parent: ModelState | null
}

export type LagrangePoints = {
  L1: Vector3
  L2: Vector3
  L3: Vector3
  L4: Vector3
  L5: Vector3
}

export type LagrangePointsTypes = keyof LagrangePoints

export interface IModel {
  name: string
  parent: string | null
  type: ModelType
}

export interface IUniverse extends IModel {
  radius: number
}

export interface ICelestialObject extends IModel {
  description: string
  color: string
  computeLagrangePoints?: boolean
  features?: CelestialObjectFeatures
  textures?: CelestialObjectTextures
  renderingParameters?: CelestialObjectRenderingParameters
  physicalParameters?: CelestialObjectPhysicalParameters
  keplerianParameters?: CelestialObjectKeplerianParameters
}

export interface IRing extends IModel {
  innerRadius: number
  outerRadius: number
  alphaTest: number
  countParticles: number
  diffuseMap: TextureParameters
}

export interface IAtmosphere extends IModel {
  radius: number
  scatter: TColor
  scatteringStrength: number
  densityFalloff: number
}

export interface IHalo extends IModel {
  radius: number
  day: TColor
  night: TColor
}

export enum AllowedModelTypes {
  universe,
  barycenter,
  star,
  planet,
  atmosphere,
  halo,
  ring
}

export type ModelType = keyof typeof AllowedModelTypes

export enum AllowedCelestialObjectFeatures {
  atmosphere,
  halo,
  ring,
  glow
}

export type CelestialObjectFeatures = Array<keyof typeof AllowedCelestialObjectFeatures>

export type TextureParameters = {
  path: string
  mapping?: Mapping
  wrapS?: Wrapping
  wrapT?: Wrapping
  magFilter?: MagnificationTextureFilter
  minFilter?: MinificationTextureFilter
  format?: PixelFormat
  type?: TextureDataType
  anisotropy?: number
  colorSpace?: ColorSpace
}

export type CelestialObjectTextures = {
  diffuseMap?: TextureParameters
  cloudMap?: TextureParameters
  specularMap?: TextureParameters
  bumpMap?: TextureParameters
  nightMap?: TextureParameters
}

export type CelestialObjectRenderingParameters = {
  emission?: number
  bumpScale?: number
}

export type CelestialObjectPhysicalParameters = {
  mass: number
  radius: number
  axialTilt: number
  orbitalPeriod: number
  rotationPeriod: number
  temperature?: number
}

export type CelestialObjectKeplerianParameters = {
  semiMajorAxis: number
  eccentricity: number
  inclination: number
  argOfPeriapsis: number
  ascendingNode: number
  meanAnomalyAtEpoch: number
}

export type TColor = {
  r: number
  g: number
  b: number
}

export type TDictionary<T = string> = {
  [key: string]: T
}

export type TScenario = {
  id: string
  name: string
  description: string
  preview: string
  size: number
  defaultCameraPosition?: [number, number, number]
  lights: string[]
  objects: string[]
}
