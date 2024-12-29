import { IAtmosphere, IRing } from '@/core/data/types'
import { JupiterRadius, MoonRadius } from '@/core/constants'

export const TatooAtmospheres: IAtmosphere[] = [
  {
    name: 'Tatooine',
    parent: 'Tatooine',
    type: 'atmosphere',
    radius: 5471,
    scatter: { r: 750, g: 690, b: 580 },
    scatteringStrength: 15,
    densityFalloff: 10
  },
  {
    name: 'Ohann',
    parent: 'Ohann',
    type: 'atmosphere',
    radius: JupiterRadius * 1.3 + 1500,
    scatter: { r: 650, g: 530, b: 380 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Adriana',
    parent: 'Adriana',
    type: 'atmosphere',
    radius: JupiterRadius * 0.8 + 1500,
    scatter: { r: 750, g: 690, b: 580 },
    scatteringStrength: 10,
    densityFalloff: 10
  },
  {
    name: 'Adriana III',
    parent: 'Adriana III',
    type: 'atmosphere',
    radius: MoonRadius * 1.3 + 200,
    scatter: { r: 750, g: 600, b: 580 },
    scatteringStrength: 20,
    densityFalloff: 10
  }
]

export const TatooRings: IRing[] = [
  {
    name: 'Adriana',
    parent: 'Adriana',
    type: 'ring',
    innerRadius: 74500,
    outerRadius: 140220,
    alphaTest: 0.02,
    countParticles: 250000,
    diffuseMap: {
      path: 'planets/StarWars/adriana/adriana_rings.png',
      colorSpace: 'srgb-linear'
    }
  }
]
