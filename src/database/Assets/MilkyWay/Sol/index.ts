import { IAtmosphere, IHalo, IRing } from '@/core/data/types'
import { hexToRGB } from '@/core/shaders/helpers'

export const SolAtmospheres: IAtmosphere[] = [
  {
    name: 'Venus',
    parent: 'Venus',
    type: 'atmosphere',
    radius: 6152,
    scatter: { r: 500, g: 530, b: 600 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Earth',
    parent: 'Earth',
    type: 'atmosphere',
    radius: 6521,
    scatter: { r: 650, g: 490, b: 380 },
    scatteringStrength: 15,
    densityFalloff: 10
  },
  {
    name: 'Mars',
    parent: 'Mars',
    type: 'atmosphere',
    radius: 3440,
    scatter: { r: 450, g: 500, b: 500 },
    scatteringStrength: 10,
    densityFalloff: 5
  },
  {
    name: 'Jupiter',
    parent: 'Jupiter',
    type: 'atmosphere',
    radius: 70911,
    scatter: { r: 650, g: 650, b: 600 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Saturn',
    parent: 'Saturn',
    type: 'atmosphere',
    radius: 59232,
    scatter: { r: 700, g: 650, b: 500 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Uranus',
    parent: 'Uranus',
    type: 'atmosphere',
    radius: 25662,
    scatter: { r: 700, g: 530, b: 440 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Neptune',
    parent: 'Neptune',
    type: 'atmosphere',
    radius: 24922,
    scatter: { r: 650, g: 530, b: 380 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Titan',
    parent: 'Titan',
    type: 'atmosphere',
    radius: 2700,
    scatter: { r: 600, g: 500, b: 440 },
    scatteringStrength: 15,
    densityFalloff: 10
  }
]

export const SolHalos: IHalo[] = [
  {
    name: 'Triton',
    parent: 'Triton',
    type: 'halo',
    radius: 1400,
    day: hexToRGB('#546880'),
    night: hexToRGB('#546880')
  },
  {
    name: 'Pluto',
    parent: 'Pluto',
    type: 'halo',
    radius: 1250,
    day: hexToRGB('#699de1'),
    night: hexToRGB('#699de1')
  },
  {
    name: 'Eris',
    parent: 'Eris',
    type: 'halo',
    radius: 1200,
    day: hexToRGB('#5897ea'),
    night: hexToRGB('#5897ea')
  }
]

export const SolRings: IRing[] = [
  {
    name: 'Saturn',
    parent: 'Saturn',
    type: 'ring',
    innerRadius: 74500,
    outerRadius: 140220,
    alphaTest: 0.2,
    countParticles: 250000,
    diffuseMap: {
      path: 'planets/saturn/saturn_rings.png',
      colorSpace: 'srgb-linear'
    }
  },
  {
    name: 'Uranus',
    parent: 'Uranus',
    type: 'ring',
    innerRadius: 38000,
    outerRadius: 58000,
    alphaTest: 0.08,
    countParticles: 250000,
    diffuseMap: {
      path: 'planets/uranus/uranus_rings.png',
      colorSpace: 'srgb-linear'
    }
  },
  {
    name: 'Neptune',
    parent: 'Neptune',
    type: 'ring',
    innerRadius: 40900,
    outerRadius: 62932,
    alphaTest: 0.08,
    countParticles: 250000,
    diffuseMap: {
      path: 'planets/neptune/neptune_rings.png',
      colorSpace: 'srgb-linear'
    }
  }
]
