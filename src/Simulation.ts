import { ICelestialObject, TextureParameters } from '@/core/data/types'
import { CelestialObject } from '@/models/CelestialObject'
import { Model } from '@/core/data/Model'
import { IObject3D } from '@/core/objects3d/types'
import { CelestialObjects } from '@/database/CelestialObjects'
import { AppConfig } from '@/core/config'
import { textureManager } from '@/core/services/TextureManager'
import { engine } from '@/core/graphic/Engine'
import { postprocessing } from '@/core/graphic/Postprocessing'
import { toThreeJSUnits } from '@/core/helpers/scaling'
import { cameraStore } from '@/core/mobX/CameraStore'
import { universeStore } from '@/core/mobX/UniverseStore'
import { appStore } from '@/core/mobX/AppStore'
import { DAY } from '@/core/constants'
import { SceneManager } from '@/core/services/SceneManager'
import { simulationStore } from '@/core/mobX/SimulationStore'
import { Material, Object3D, Vector3 } from 'three'
import { RayManager } from '@/core/services/RayManager'
import { modalWindowStore } from '@/ui/components/modules/mobX/ModalWindowStore'
import { isRenderable, isUpdatable } from '@/core/helpers/predicates'
import { objectStore } from '@/core/mobX/ObjectStore'

class Simulation {
  public models: Map<Model, IObject3D> = new Map<Model, IObject3D>()

  public async createResources(): Promise<void> {
    try {
      const textures: TextureParameters[] = []
      const models: Model[] = []

      appStore.scenario?.objects.forEach((el: string): void => {
        const data: ICelestialObject | undefined = CelestialObjects.find(
          (object: ICelestialObject): boolean => object.name === el
        )

        if (data) {
          if (data.textures) {
            textures.push(...Object.values(data.textures))
          }

          const celestialObject: CelestialObject = new CelestialObject(data)

          if (celestialObject.ring) {
            textures.push(celestialObject.ring.diffuseMap)
          }

          models.push(celestialObject)
        }
      })

      await textureManager.loadAll([...textures, ...AppConfig.CommonTextures])

      models.forEach((model: Model): void => {
        this.models.set(model, model.createObject3D())
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async createScene(): Promise<void> {
    const canvas: HTMLCanvasElement = engine.renderer.domElement
    canvas.id = 'canvas'
    canvas.style.position = 'absolute'
    canvas.style.zIndex = '99'

    const labelContainer: HTMLElement = engine.labelRenderer.domElement
    labelContainer.id = 'labels'

    textureManager.onStart()
    textureManager.onProgress()
    textureManager.onLoad((): void => {
      document.body.appendChild(canvas)
      document.body.appendChild(labelContainer)
      modalWindowStore.setTutorialWindowState(true)
    })
    textureManager.onError()

    await this.createResources()

    canvas.addEventListener('wheel', (event: WheelEvent): void => {
      cameraStore.adjustSpeed(event.deltaY)
    })

    canvas.addEventListener('click', (event: MouseEvent): void => {
      rayManager.onClick(event)
    })

    const sceneConstructor: SceneManager = new SceneManager()
    sceneConstructor.construct(this.models)

    const rayManager: RayManager = new RayManager(this.models)

    console.log(engine.scene)
    console.log(this.models)
    console.log(engine.renderer.info)
    console.log(textureManager.textures)
    console.log(objectStore.celestialObjects, objectStore.labels, objectStore.orbits)
  }

  public run(): void {
    engine.clock.start()
    const vector: Vector3 = new Vector3()

    const tick = (): void => {
      const delta: number = engine.clock.getDelta()
      universeStore.setEpoch(universeStore.epoch + (delta * appStore.speedOfTime) / DAY)
      this.models.forEach((value: IObject3D): void => {
        if (isUpdatable(value)) value.update()
      })
      engine.astroControls.movementSpeed = toThreeJSUnits(cameraStore.speed)
      engine.astroControls.update(delta)
      engine.labelRenderer.render(engine.scene, engine.camera)
      simulationStore.updateCameraPosition(engine.camera.position.clone())
      simulationStore.updateCameraDirection(engine.camera.getWorldDirection(vector))
      postprocessing.render(delta)
      engine.renderer.setAnimationLoop(tick)
    }

    return tick()
  }

  public dispose(): void {
    engine.scene.traverse((object: Object3D): void => {
      if (isRenderable(object)) {
        object.geometry.dispose()
        if (Array.isArray(object.material)) {
          object.material.forEach((el: Material): void => {
            el.dispose()
          })
        } else {
          object.material.dispose()
        }
      }
    })
    engine.scene.clear()
    this.models.clear()
    textureManager.disposeAll()
    universeStore.setToDefaults()
    simulationStore.setToDefaults()
    objectStore.setToDefaults()

    engine.camera.position.set(...AppConfig.DefaultCameraPosition)
    engine.camera.lookAt(new Vector3())

    const labels: Element | null = document.querySelector('#labels')

    if (labels) {
      labels.replaceChildren()
      labels.remove()
    }
  }
}

export { Simulation }
