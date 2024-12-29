import { CelestialObjectKeplerianParameters } from '@/core/data/types'

class NullKeplerianParameters implements CelestialObjectKeplerianParameters {
  public semiMajorAxis: number = 0
  public eccentricity: number = 0
  public inclination: number = 0
  public argOfPeriapsis: number = 0
  public ascendingNode: number = 0
  public meanAnomalyAtEpoch: number = 0
}

export { NullKeplerianParameters }
