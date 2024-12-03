import { makeAutoObservable } from 'mobx'
import { engine } from '@/core/graphic/Engine'
import { getObjectsByUserDataProperty } from '@/core/helpers/finder'
import type { Object3D } from 'three'

class ObjectStore {
  public showLabels: boolean = true
  public showOrbits: boolean = true

  public constructor() {
    makeAutoObservable(this)
  }

  public setToDefaults(): void {
    this.showLabels = true
    this.showOrbits = true
  }

  public get celestialObjects(): Object3D[] {
    return getObjectsByUserDataProperty(engine.scene, 'type', 'celestialObject')
  }

  public get labels(): Object3D[] {
    return getObjectsByUserDataProperty(engine.scene, 'type', 'label')
  }

  public get orbits(): Object3D[] {
    return getObjectsByUserDataProperty(engine.scene, 'type', 'orbit')
  }

  public setShowLabels(payload: boolean): void {
    this.showLabels = payload
    this.setVisibility(this.labels, payload)
  }

  public setShowOrbits(payload: boolean): void {
    this.showOrbits = payload
    this.setVisibility(this.orbits, payload)
  }

  private setVisibility(objects: Object3D[], value: boolean): void {
    objects.forEach((el: Object3D): void => {
      el.visible = value
    })
  }
}

export const objectStore: ObjectStore = new ObjectStore()
