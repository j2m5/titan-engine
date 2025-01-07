import { ICelestialObject } from '@/core/data/types'
import { SolObjects } from '@storage/database/CelestialObjects/MilkyWay/Sol'
import { TOI519Objects } from '@storage/database/CelestialObjects/MilkyWay/TOI519'
import { SagittariusObjects } from '@storage/database/CelestialObjects/MilkyWay/Sagittarius'

export const MilkyWayObjects: ICelestialObject[] = [...SolObjects, ...TOI519Objects, ...SagittariusObjects]
