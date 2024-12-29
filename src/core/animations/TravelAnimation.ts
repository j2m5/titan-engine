import anime from 'animejs/lib/anime.es'
import { IAnimation } from '@/core/animations/IAnimation'
import { ModelState } from '@/core/data/types'
import { simulationStore } from '@/core/mobX/SimulationStore'
import { Quaternion, Vector3 } from 'three'
import { cameraStore } from '@/core/mobX/CameraStore'
import { engine } from '@/core/graphic/Engine'
import { modalWindowStore } from '@/ui/components/modules/mobX/ModalWindowStore'
import { fromKilometers, toThreeJSUnits } from '@/core/helpers/scaling'
import { appStore } from '@/core/mobX/AppStore'
import { menuStore } from '@/ui/components/modules/mobX/MenuStore'

class TravelAnimation implements IAnimation {
  private readonly objectName: string

  public constructor(objectName: string) {
    this.objectName = objectName
  }

  public execute(): void {
    const data: ModelState | undefined = simulationStore.modelState.find(
      (el: ModelState): boolean => el.name === this.objectName
    )

    if (data) {
      const position: Vector3 = data.position
      const offset: number = data.physicalParameters.radius ? toThreeJSUnits(data.physicalParameters.radius) * 3 : 0
      const alpha: number = (data.distanceFromCamera - offset) / data.distanceFromCamera
      const destination: Vector3 = new Vector3().lerpVectors(engine.camera.position.clone(), position, alpha)
      const currentSpeed: number = cameraStore.speed

      let lastValue: number,
        lastTime: number,
        speed: number = 0

      const startRotation: Quaternion = engine.camera.quaternion.clone()
      engine.camera.lookAt(position)
      const endRotation: Quaternion = engine.camera.quaternion.clone()
      engine.camera.quaternion.copy(startRotation)

      const animation: { t: number } = { t: 0 }

      const lookAt: anime.AnimeParams = {
        targets: animation,
        t: 1,
        duration: 1500,
        easing: 'easeInQuad',
        update: (): void => {
          engine.camera.quaternion.slerp(endRotation, animation.t)
        }
      }

      const travel: anime.AnimeParams = {
        targets: [engine.camera.position],
        x: destination.x,
        y: destination.y,
        z: destination.z,
        easing: 'easeOutQuint',
        duration: modalWindowStore.flightAnimationTime * 1000,
        direction: 'normal',
        begin: (): void => {
          engine.astroControls.enabled = false
          menuStore.closeMenu()
        },
        update: (anim: anime.AnimeInstance): void => {
          const currentTime: number = +new Date()
          const currentValue: string = anim.animations[0].currentValue

          if (lastValue !== 0 && lastTime !== 0) {
            speed = (Number(currentValue) - lastValue) / (currentTime - lastTime) / engine.clock.getDelta()
          }

          lastValue = Number(currentValue)
          lastTime = currentTime

          cameraStore.setSpeed(fromKilometers(Math.abs(speed)))
        },
        complete: (): void => {
          engine.astroControls.enabled = true
          appStore.openNotification({ type: 'success', message: 'Completed' })
          cameraStore.setSpeed(currentSpeed)
        }
      }

      const timeline: anime.AnimeTimelineInstance = anime.timeline()

      timeline.add(lookAt)
      timeline.add(travel)
    } else {
      appStore.openNotification({ type: 'error', message: 'Error, no selected object' })
    }
  }
}

export { TravelAnimation }
