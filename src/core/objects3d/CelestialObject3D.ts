import { IObject3D, Updatable, UsesGroup } from '@/core/objects3d/types'
import { Group, Object3D, Vector3 } from 'three'
import { CelestialObject } from '@/models/CelestialObject'
import { universeStore } from '@/core/mobX/UniverseStore'
import { AU, SpaceScale } from '@/core/constants'
import { ModelState } from '@/core/data/types'
import { engine } from '@/core/graphic/Engine'
import { simulationStore } from '@/core/mobX/SimulationStore'

abstract class CelestialObject3D implements IObject3D, UsesGroup, Updatable {
  protected readonly model: CelestialObject
  public group: Group
  public abstract object3D: Object3D
  private vector: Vector3 = new Vector3()

  protected constructor(model: CelestialObject) {
    this.model = model
    this.group = new Group()
  }

  public get localPosition(): Vector3 {
    return this.model.getPosition(universeStore.epoch).multiplyScalar(AU * SpaceScale)
  }

  public get worldPosition(): Vector3 {
    return this.group.getWorldPosition(new Vector3())
  }

  protected initState(): void {
    simulationStore.addModelState({
      name: this.model.name,
      distanceFromCamera: engine.camera.position.distanceTo(this.worldPosition),
      position: this.worldPosition,
      physicalParameters: {
        mass: this.model.physicalParameters.mass,
        radius: this.model.physicalParameters.radius,
        axialTilt: this.model.physicalParameters.axialTilt,
        orbitalPeriod: this.model.physicalParameters.orbitalPeriod,
        rotationPeriod: this.model.physicalParameters.rotationPeriod
      },
      parent: simulationStore.modelState.find((el: ModelState): boolean => el.name === this.model.parent?.name) || null
    })
  }

  protected generateEvents(): void {
    this.group.addEventListener('added', (): void => {
      this.initState()
    })
  }

  public build(): Object3D {
    this.object3D.name = this.model.name
    this.object3D.userData.type = 'celestialObject'
    this.object3D.userData.subtype = this.model.type
    this.group.name = this.model.name + 'LocalSpace'

    this.model.features?.forEach((el): void => {
      const feature: IObject3D | undefined = this.model[el]?.createObject3D()

      if (feature) this.group.add(feature.build())
    })

    this.group.position.copy(this.localPosition)

    return this.group
  }

  public update(): void {
    this.group.position.copy(this.localPosition)

    const worldPosition: Vector3 = this.object3D.getWorldPosition(this.vector)
    const distance: number = engine.camera.position.distanceTo(worldPosition)

    simulationStore.updateModelState({
      name: this.model.name,
      distanceFromCamera: distance,
      position: worldPosition,
      physicalParameters: {
        mass: this.model.physicalParameters.mass,
        radius: this.model.physicalParameters.radius,
        axialTilt: this.model.physicalParameters.axialTilt,
        orbitalPeriod: this.model.physicalParameters.orbitalPeriod,
        rotationPeriod: this.model.physicalParameters.rotationPeriod
      },
      parent: simulationStore.modelState.find((el: ModelState): boolean => el.name === this.model.parent?.name) || null
    })
  }
}

export { CelestialObject3D }
