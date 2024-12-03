import { Intersection, Object3D, Raycaster, Vector2 } from 'three'
import { Model } from '@/core/data/Model'
import { IObject3D } from '@/core/objects3d/types'
import { height, width } from '@/core/constants'
import { engine } from '@/core/graphic/Engine'
import { simulationStore } from '@/core/mobX/SimulationStore'

class RayManager {
  public models: Object3D[]
  public raycaster: Raycaster
  public mouse: Vector2 = new Vector2()

  public constructor(models: Map<Model, IObject3D>) {
    this.models = [...models.values()].map((el: IObject3D) => el.object3D)
    this.raycaster = new Raycaster()
  }

  public onClick(event: MouseEvent): void {
    this.mouse.x = (event.clientX / width) * 2 - 1
    this.mouse.y = -(event.clientY / height) * 2 + 1

    this.raycaster.setFromCamera(this.mouse, engine.camera)

    const intersects: Intersection[] = this.raycaster.intersectObjects(this.models)
    if (intersects.length) {
      simulationStore.updateSelection(intersects[0].object.name)
    } else {
      simulationStore.updateSelection(null)
    }
  }
}

export { RayManager }
