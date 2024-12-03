import { makeAutoObservable } from 'mobx'
import { ModelState, SimulationState } from '@/core/data/types'
import { Object3D, Vector3 } from 'three'
import { AppConfig } from '@/core/config'
import { engine } from '@/core/graphic/Engine'
import { Crosshair2D } from '@/core/objects3d/hud/Crosshair2D'

class SimulationStore implements SimulationState {
  public cameraPosition: Vector3 = new Vector3().fromArray(AppConfig.DefaultCameraPosition)
  public cameraDirection: Vector3 = new Vector3()
  public cameraTarget: Vector3 = new Vector3()
  public modelState: ModelState[] = []
  public selectedModel: string = ''
  public closestModelToCamera: ModelState | null = null
  public shouldUpdate: boolean = true
  private crosshair: Object3D = new Crosshair2D().build()

  public constructor() {
    makeAutoObservable(this)
  }

  public setToDefaults(): void {
    this.cameraPosition = new Vector3().fromArray(AppConfig.DefaultCameraPosition)
    this.cameraDirection = new Vector3()
    this.cameraTarget = new Vector3()
    this.modelState = []
    this.selectedModel = ''
    this.closestModelToCamera = null
    this.shouldUpdate = true
  }

  public updateCameraPosition(payload: Vector3): void {
    this.cameraPosition.copy(payload)
  }

  public updateCameraDirection(payload: Vector3): void {
    this.cameraDirection.copy(payload)
  }

  public updateCameraTarget(payload: Vector3): void {
    this.cameraTarget.copy(payload)
    engine.astroControls.target.copy(this.cameraTarget)
  }

  public updateModelState(payload: ModelState): void {
    const index: number = this.modelState.findIndex((el: ModelState): boolean => el.name === payload.name)

    if (index !== -1) {
      this.modelState.splice(index, 1, payload)
    }

    if (this.shouldUpdate) {
      this.updateClosestModelToCamera()
    }

    this.updateCameraTarget(this.closestModelToCamera ? this.closestModelToCamera.position : new Vector3())
  }

  public updateSelectedModel(payload: string): void {
    this.selectedModel = payload
  }

  public updateSelection(payload: string | null): void {
    if (payload) {
      const object3D: Object3D | undefined = engine.scene.getObjectByName(payload + 'LocalSpace')

      this.updateSelectedModel(payload)

      if (object3D) {
        this.crosshair.visible = true
        object3D.add(this.crosshair)
      }
    } else {
      this.updateSelectedModel('')
      this.crosshair.visible = false
      engine.scene.add(this.crosshair)
    }
  }

  private updateClosestModelToCamera(): void {
    this.closestModelToCamera = this.modelState.reduce(
      (closest: ModelState, model: ModelState): ModelState =>
        model.distanceFromCamera < closest.distanceFromCamera ? model : closest,
      this.modelState[0]
    )
  }

  public updateShouldUpdate(payload: boolean): void {
    this.shouldUpdate = payload
  }

  public addModelState(payload: ModelState): void {
    this.modelState.push(payload)
  }

  public findModelState(name: string): ModelState | undefined {
    return this.modelState.find((el: ModelState): boolean => el.name === name)
  }
}

export const simulationStore: SimulationStore = new SimulationStore()
