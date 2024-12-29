import { ICelestialObject } from '@/core/data/types'
import { MilkyWayObjects } from '@storage/database/CelestialObjects/MilkyWay'
import { StarWarsObjects } from '@storage/database/CelestialObjects/StarWars'

export const CelestialObjects: ICelestialObject[] = [...MilkyWayObjects, ...StarWarsObjects]
