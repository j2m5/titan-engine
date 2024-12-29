import dayjs from 'dayjs'
import { getDateFromJD, getJD } from '@/core/helpers/jd'
import { makeAutoObservable } from 'mobx'

class UniverseStore {
  public epoch: number = getJD(new Date())

  public constructor() {
    makeAutoObservable(this)
  }

  public setToDefaults(): void {
    this.epoch = getJD(new Date())
  }

  public get currentDate(): string {
    return dayjs(getDateFromJD(this.epoch)).format('D MMM, YYYY')
  }

  public get currentTime(): string {
    return dayjs(getDateFromJD(this.epoch)).format('HH:mm:ss')
  }

  public setEpoch(payload: number): void {
    this.epoch = payload
  }
}

export const universeStore: UniverseStore = new UniverseStore()
