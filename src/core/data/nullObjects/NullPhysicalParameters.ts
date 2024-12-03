import { CelestialObjectPhysicalParameters } from '@/core/data/types'

class NullPhysicalParameters implements CelestialObjectPhysicalParameters {
  public mass: number = 0
  public radius: number = 0
  public axialTilt: number = 0
  public orbitalPeriod: number = 0
  public rotationPeriod: number = 0
}

export { NullPhysicalParameters }
