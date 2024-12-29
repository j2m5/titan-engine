import { ICelestialObject } from '@/core/data/types'
import { SolObjects } from '@storage/database/CelestialObjects/MilkyWay/Sol'
import { TOI519Objects } from '@storage/database/CelestialObjects/MilkyWay/TOI519'
import { SagitariusObjects } from '@storage/database/CelestialObjects/MilkyWay/Sagitarius'

export const MilkyWayObjects: ICelestialObject[] = [...SolObjects, ...TOI519Objects, ...SagitariusObjects]
