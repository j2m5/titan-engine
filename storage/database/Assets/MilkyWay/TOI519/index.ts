import { IAtmosphere } from '@/core/data/types'
import { JupiterRadius, MoonRadius } from '@/core/constants'

export const TOI519Atmospheres: IAtmosphere[] = [
  {
    name: 'TOI-519b',
    parent: 'TOI-519b',
    type: 'atmosphere',
    radius: JupiterRadius * 0.209 * 1.02,
    scatter: { r: 650, g: 530, b: 380 },
    scatteringStrength: 20,
    densityFalloff: 10
  }
]
