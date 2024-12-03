import { ICelestialObject } from '@/core/data/types'
import { MilkyWayObjects } from '@/database/CelestialObjects/MilkyWay'
import { StarWarsObjects } from '@/database/CelestialObjects/StarWars'

export const CelestialObjects: ICelestialObject[] = [...MilkyWayObjects, ...StarWarsObjects]
