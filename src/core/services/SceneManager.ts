import { Model } from '@/core/data/Model'
import { Group, Object3D } from 'three'
import { engine } from '@/core/graphic/Engine'
import { Universe } from '@/models/Universe'
import { OrbitCurve3D } from '@/core/objects3d/lines/OrbitCurve3D'
import { CelestialObject } from '@/models/CelestialObject'
import { IObject3D } from '@/core/objects3d/types'

class SceneManager {
  public construct(models: Map<Model, IObject3D>): void {
    const container: Group = new Group()
    container.name = 'Container'

    engine.scene.add(container)

    const universe: Universe = new Universe()
    const universe3D: IObject3D = universe.createObject3D()

    models.set(universe, universe3D)
    container.add(universe3D.build())

    models.forEach((value: IObject3D, key: Model): void => {
      const object: Object3D = value.build()
      if (!key.parentName) {
        container.add(object)
      } else {
        const parentLocalSpace: Object3D | undefined = engine.scene.getObjectByName(key.parentName + 'LocalSpace')

        if (parentLocalSpace) {
          parentLocalSpace.add(object)

          if (key instanceof CelestialObject) {
            parentLocalSpace.add(new OrbitCurve3D(key).build())
          }
        }
      }
    })
  }
}

export { SceneManager }
