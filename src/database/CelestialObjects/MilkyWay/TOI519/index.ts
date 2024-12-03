import { ICelestialObject } from '@/core/data/types'
import { JupiterMass, JupiterRadius, SolarMass, SolarRadius } from '@/core/constants'

export const TOI519Objects: ICelestialObject[] = [
  {
    name: 'TOI-519',
    parent: null,
    type: 'star',
    description: '',
    color: '#ef3535',
    physicalParameters: {
      mass: SolarMass * 0.372,
      radius: SolarRadius * 0.3578,
      axialTilt: 0,
      orbitalPeriod: 0,
      rotationPeriod: 10,
      temperature: 3354
    }
  },
  {
    name: 'TOI-519b',
    parent: 'TOI-519',
    type: 'planet',
    description: '',
    color: '#2e78da',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/exoplanets/toi_519b/toi_519b.jpg',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'planets/exoplanets/toi_519b/toi_519b_night.png',
        colorSpace: 'srgb-linear'
      }
    },
    renderingParameters: {
      emission: 1
    },
    physicalParameters: {
      mass: JupiterMass * 0.463,
      radius: JupiterRadius * 0.209,
      axialTilt: 15.5,
      orbitalPeriod: 1.3,
      rotationPeriod: 1.3
    },
    keplerianParameters: {
      semiMajorAxis: 0.0159,
      eccentricity: 0.35,
      inclination: 0.2,
      argOfPeriapsis: 41.168,
      ascendingNode: 125.452,
      meanAnomalyAtEpoch: 127.276
    }
  }
]
