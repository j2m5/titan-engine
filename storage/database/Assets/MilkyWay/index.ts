import { IAtmosphere, IHalo, IRing } from '@/core/data/types'
import { SolAtmospheres, SolHalos, SolRings } from '@storage/database/Assets/MilkyWay/Sol'
import { TOI519Atmospheres } from '@storage/database/Assets/MilkyWay/TOI519'

export const MilkyWayAtmospheres: IAtmosphere[] = [...SolAtmospheres, ...TOI519Atmospheres]

export const MilkyWayHalos: IHalo[] = [...SolHalos]

export const MilkyWayRings: IRing[] = [...SolRings]
