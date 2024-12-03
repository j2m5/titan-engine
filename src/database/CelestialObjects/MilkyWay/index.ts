import { ICelestialObject } from '@/core/data/types'
import { SolObjects } from '@/database/CelestialObjects/MilkyWay/Sol'
import { TOI519Objects } from '@/database/CelestialObjects/MilkyWay/TOI519'

export const MilkyWayObjects: ICelestialObject[] = [...SolObjects, ...TOI519Objects]
