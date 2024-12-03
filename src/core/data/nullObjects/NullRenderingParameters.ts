import { CelestialObjectRenderingParameters } from '@/core/data/types'

class NullRenderingParameters implements CelestialObjectRenderingParameters {
  public bumpScale: number = 1
  public emission: number = 1
}

export { NullRenderingParameters }
