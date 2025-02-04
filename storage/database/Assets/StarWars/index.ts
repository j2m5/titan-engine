import { IAtmosphere, IRing } from '@/core/data/types'
import { TatooAtmospheres, TatooRings } from '@storage/database/Assets/StarWars/Tatoo'

export const StarWarsAtmospheres: IAtmosphere[] = [...TatooAtmospheres]

export const StarWarsRings: IRing[] = [...TatooRings]
