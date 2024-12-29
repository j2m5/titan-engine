import { ICelestialObject } from '@/core/data/types'
import { SolarMass, SolarRadius } from '@/core/constants'

export const SagitariusObjects: ICelestialObject[] = [
  {
    name: 'Sagitarius A',
    parent: null,
    type: 'blackhole',
    description: '',
    color: '#8d8d8d',
    physicalParameters: {
      mass: SolarMass * 10000,
      radius: SolarRadius * 10,
      axialTilt: 0,
      orbitalPeriod: 0,
      rotationPeriod: 10
    }
  }
]
