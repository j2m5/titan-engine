import { makeAutoObservable } from 'mobx'
import { INotification } from '@/ui/interfaces/INotification'
import { NotificationMessageProps } from '@/ui/interfaces/NotificationMessageProps'
import { universeStore } from '@/core/mobX/UniverseStore'
import { TScenario } from '@/core/data/types'
import { Simulation } from '@/Simulation'
import { engine } from '@/core/graphic/Engine'
import { AppConfig } from '@/config/app'
import { Vector3 } from 'three'
import { postprocessing } from '@/core/graphic/Postprocessing'

const simulation: Simulation = new Simulation()

class AppStore {
  public scenario: TScenario | null = null
  public appLoadingStatus: boolean = true
  public appLoadingProgress: number = 0
  public appLoadingTotal: number = 0
  public appLoadingAsset: string = ''
  public speedOfTime: number = 1
  public notification: INotification = {
    isOpen: false,
    type: 'info',
    message: ''
  }

  public constructor() {
    makeAutoObservable(this)
  }

  public async setScenario(payload: TScenario | null): Promise<void> {
    this.scenario = payload

    simulation.dispose()
    postprocessing.dispose()
    this.setAppLoadingStatus(true)
    this.setSpeedOfTime(1)

    if (payload) {
      await simulation.createScene()

      const cameraPosition: [number, number, number] = payload.defaultCameraPosition || AppConfig.DefaultCameraPosition

      engine.camera.position.set(...cameraPosition)
      engine.camera.lookAt(new Vector3())

      simulation.run()
      postprocessing.init()
    }
  }

  public setAppLoadingStatus(payload: boolean): void {
    this.appLoadingStatus = payload
  }

  public setAppLoadingProgress(payload: number): void {
    this.appLoadingProgress = payload
  }

  public setAppLoadingTotal(payload: number): void {
    this.appLoadingTotal = payload
  }

  public setAppLoadingAsset(payload: string): void {
    this.appLoadingAsset = payload
  }

  public get loadingPercentage(): number {
    if (this.appLoadingProgress > 0 || this.appLoadingTotal > 0) {
      return Math.ceil((this.appLoadingProgress / this.appLoadingTotal) * 100)
    } else {
      return 0
    }
  }

  public setSpeedOfTime(payload: number | number[]): void {
    if (typeof payload === 'number') {
      this.speedOfTime = payload
    }
  }

  public setTimer(): void {
    if (this.speedOfTime > 0) {
      universeStore.epoch += 1000
    }
  }

  public openNotification({ type, message }: NotificationMessageProps) {
    this.notification.isOpen = true
    this.notification.type = type
    this.notification.message = message
  }

  public closeNotification(): void {
    this.notification.isOpen = false
    this.notification.type = 'info'
    this.notification.message = ''
  }
}

export const appStore: AppStore = new AppStore()
