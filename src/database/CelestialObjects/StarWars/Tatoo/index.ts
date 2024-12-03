import { ICelestialObject } from '@/core/data/types'
import { JupiterMass, JupiterRadius, MoonMass, MoonRadius, SolarMass, SolarRadius } from '@/core/constants'

export const TatooObjects: ICelestialObject[] = [
  {
    name: 'Tatoo Barycenter',
    parent: null,
    type: 'barycenter',
    description: '',
    color: '#000000'
  },
  {
    name: 'Tatoo I',
    parent: 'Tatoo Barycenter',
    type: 'star',
    description: '',
    color: '#e5e55a',
    physicalParameters: {
      mass: SolarMass * 1.1,
      radius: SolarRadius * 1.2,
      axialTilt: 7.25,
      orbitalPeriod: 6.050707298909615e3,
      rotationPeriod: 10,
      temperature: 5900
    },
    keplerianParameters: {
      semiMajorAxis: 0.137,
      eccentricity: 0.25,
      inclination: 2.5,
      argOfPeriapsis: 47.8,
      ascendingNode: 94.2,
      meanAnomalyAtEpoch: 22.1
    }
  },
  {
    name: 'Tatoo II',
    parent: 'Tatoo Barycenter',
    type: 'star',
    description: '',
    color: '#ea9650',
    physicalParameters: {
      mass: SolarMass * 0.7,
      radius: SolarRadius * 0.8,
      axialTilt: 7.25,
      orbitalPeriod: 6.050707298909615e3,
      rotationPeriod: 10,
      temperature: 2700
    },
    keplerianParameters: {
      semiMajorAxis: 0.145,
      eccentricity: 0.3,
      inclination: 2.5,
      argOfPeriapsis: 213.5,
      ascendingNode: 94.2,
      meanAnomalyAtEpoch: 335.4
    }
  },
  {
    name: 'Tatooine',
    parent: 'Tatoo Barycenter',
    type: 'planet',
    description: '',
    color: '#cd853f',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/tatooine/tatooine.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: 4.868e24,
      radius: 5232.5,
      axialTilt: 24.7,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 1.6,
      eccentricity: 0.05,
      inclination: 2.1,
      argOfPeriapsis: 259.1,
      ascendingNode: 27.4,
      meanAnomalyAtEpoch: 17.3
    }
  },
  {
    name: 'Ohann',
    parent: 'Tatoo Barycenter',
    type: 'planet',
    description: '',
    color: '#d7bb5f',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/ohann/ohann.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: JupiterMass * 1.2,
      radius: JupiterRadius * 1.3,
      axialTilt: 11.16,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 5.2,
      eccentricity: 0.125,
      inclination: 1.7,
      argOfPeriapsis: 30.5,
      ascendingNode: 240.3,
      meanAnomalyAtEpoch: 70.8
    }
  },
  {
    name: 'Adriana',
    parent: 'Tatoo Barycenter',
    type: 'planet',
    description: '',
    color: '#2f9ece',
    features: ['atmosphere', 'ring'],
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/adriana/adriana.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: JupiterMass * 0.4,
      radius: JupiterRadius * 0.8,
      axialTilt: -29.6,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 11.2,
      eccentricity: 0.26,
      inclination: 5.3,
      argOfPeriapsis: 140.6,
      ascendingNode: 58.2,
      meanAnomalyAtEpoch: 330.4
    }
  },
  {
    name: 'Ghomrassen',
    parent: 'Tatooine',
    type: 'planet',
    description: '',
    color: '#888684',
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/ghomrassen/ghomrassen.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.3,
      radius: MoonRadius * 0.3,
      axialTilt: 4.2,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.001,
      eccentricity: 0.07,
      inclination: 3.142,
      argOfPeriapsis: 45.769,
      ascendingNode: 27.314,
      meanAnomalyAtEpoch: 97.123
    }
  },
  {
    name: 'Guermessa',
    parent: 'Tatooine',
    type: 'planet',
    description: '',
    color: '#83684c',
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/guermessa/guermessa.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.24,
      radius: MoonRadius * 0.27,
      axialTilt: 7.7,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.0027,
      eccentricity: 0.09,
      inclination: 4.36,
      argOfPeriapsis: 250.908,
      ascendingNode: 114.783,
      meanAnomalyAtEpoch: 178.234
    }
  },
  {
    name: 'Chenini',
    parent: 'Tatooine',
    type: 'planet',
    description: '',
    color: '#888787',
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/chenini/chenini.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.22,
      radius: MoonRadius * 0.21,
      axialTilt: 15.9,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.04,
      eccentricity: 0.36,
      inclination: 2.14,
      argOfPeriapsis: 310.582,
      ascendingNode: 87.231,
      meanAnomalyAtEpoch: 67.391
    }
  },
  {
    name: 'Ohann I',
    parent: 'Ohann',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    textures: {
      diffuseMap: {
        path: 'planets/unnamed/unnamed_planet_5.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.65,
      radius: MoonRadius * 0.7,
      axialTilt: 3.1,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.003,
      eccentricity: 0.06,
      inclination: 0.14,
      argOfPeriapsis: 234.678,
      ascendingNode: 77.123,
      meanAnomalyAtEpoch: 10.234
    }
  },
  {
    name: 'Ohann II',
    parent: 'Ohann',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    textures: {
      diffuseMap: {
        path: 'planets/unnamed/unnamed_planet_6.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.42,
      radius: MoonRadius * 0.5,
      axialTilt: 17.2,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.007,
      eccentricity: 0.16,
      inclination: 0.84,
      argOfPeriapsis: 56.789,
      ascendingNode: 210.345,
      meanAnomalyAtEpoch: 178.123
    }
  },
  {
    name: 'Ohann III',
    parent: 'Ohann',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    textures: {
      diffuseMap: {
        path: 'planets/unnamed/unnamed_planet_7.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.15,
      radius: MoonRadius * 0.2,
      axialTilt: 9.6,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.015,
      eccentricity: 0.09,
      inclination: 1.32,
      argOfPeriapsis: 123.456,
      ascendingNode: 300.234,
      meanAnomalyAtEpoch: 250.567
    }
  },
  {
    name: 'Adriana I',
    parent: 'Adriana',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    textures: {
      diffuseMap: {
        path: 'planets/unnamed/unnamed_planet_1.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.85,
      radius: MoonRadius * 0.8,
      axialTilt: 7.1,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.0017,
      eccentricity: 0.03,
      inclination: -30.2,
      argOfPeriapsis: 200.123,
      ascendingNode: 187.489,
      meanAnomalyAtEpoch: 342.567
    }
  },
  {
    name: 'Adriana II',
    parent: 'Adriana',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    textures: {
      diffuseMap: {
        path: 'planets/unnamed/unnamed_planet_3.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.64,
      radius: MoonRadius * 0.6,
      axialTilt: 15.5,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.0024,
      eccentricity: 0.02,
      inclination: -31.4,
      argOfPeriapsis: 78.934,
      ascendingNode: 188.567,
      meanAnomalyAtEpoch: 150.245
    }
  },
  {
    name: 'Adriana III',
    parent: 'Adriana',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/StarWars/adriana3/adriana3.jpg',
        colorSpace: 'srgb-linear'
      },
      bumpMap: {
        path: 'planets/StarWars/adriana3/adriana3_bump.jpg'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 1.32,
      radius: MoonRadius * 1.3,
      axialTilt: 19.2,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.0035,
      eccentricity: 0.03,
      inclination: -32.1,
      argOfPeriapsis: 102.345,
      ascendingNode: 190.255,
      meanAnomalyAtEpoch: 89.456
    }
  },
  {
    name: 'Adriana IV',
    parent: 'Adriana',
    type: 'planet',
    description: '',
    color: '#b4b4b4',
    features: ['atmosphere'],
    textures: {
      diffuseMap: {
        path: 'planets/unnamed/unnamed_planet_5.png',
        colorSpace: 'srgb-linear'
      },
      nightMap: {
        path: 'night.jpg'
      }
    },
    physicalParameters: {
      mass: MoonMass * 0.95,
      radius: MoonRadius * 0.98,
      axialTilt: 5.7,
      orbitalPeriod: 2.246975358369535e2,
      rotationPeriod: 5832.443616
    },
    keplerianParameters: {
      semiMajorAxis: 0.0064,
      eccentricity: 0.13,
      inclination: -35.8,
      argOfPeriapsis: 120.789,
      ascendingNode: 195.124,
      meanAnomalyAtEpoch: 270.987
    }
  }
]
