import { ICelestialObject } from '@/core/data/types'
import { TatooObjects } from '@/database/CelestialObjects/StarWars/Tatoo'

export const StarWarsObjects: ICelestialObject[] = [...TatooObjects]
