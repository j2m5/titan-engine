import { IAtmosphere, IHalo, IRing } from '@/core/data/types'
import { MilkyWayAtmospheres, MilkyWayHalos, MilkyWayRings } from '@storage/database/Assets/MilkyWay'
import { StarWarsAtmospheres, StarWarsRings } from '@storage/database/Assets/StarWars'

export const Atmospheres: IAtmosphere[] = [...MilkyWayAtmospheres, ...StarWarsAtmospheres]

export const Halos: IHalo[] = [...MilkyWayHalos]

export const Rings: IRing[] = [...MilkyWayRings, ...StarWarsRings]
