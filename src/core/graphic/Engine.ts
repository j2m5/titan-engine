import { Clock, NoToneMapping, PerspectiveCamera, Scene, Sphere, SRGBColorSpace, WebGLRenderer } from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { AstroControls } from '@/core/libs/AstroControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { AppConfig } from '@/core/config'
import { height, width } from '@/core/constants'

class Engine {
  public readonly renderer: WebGLRenderer
  public readonly labelRenderer: CSS2DRenderer
  public readonly scene: Scene
  public readonly camera: PerspectiveCamera
  public readonly cameraSphere: Sphere
  public readonly astroControls: AstroControls
  public readonly clock: Clock
  public readonly stats: Stats

  public constructor() {
    this.renderer = this.makeRenderer()
    this.labelRenderer = this.makeLabelRenderer()
    this.scene = this.makeScene()
    this.camera = this.makeCamera()
    this.cameraSphere = this.makeCameraSphere()
    this.astroControls = this.makeAstroControls()
    this.clock = this.makeClock()
    this.stats = this.makeStats()
  }

  private makeRenderer(): WebGLRenderer {
    const renderer: WebGLRenderer = new WebGLRenderer(AppConfig.RendererParameters)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = NoToneMapping

    return renderer
  }

  private makeLabelRenderer(): CSS2DRenderer {
    const renderer: CSS2DRenderer = new CSS2DRenderer()

    renderer.setSize(width, height)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'

    return renderer
  }

  private makeScene(): Scene {
    const scene: Scene = new Scene()
    scene.name = 'MainScene'

    return scene
  }

  private makeCamera(): PerspectiveCamera {
    const { fov, aspect, near, far } = AppConfig.PerspectiveCameraParameters

    return new PerspectiveCamera(fov, aspect, near, far)
  }

  private makeCameraSphere(): Sphere {
    return new Sphere(this.camera.position.clone(), 0.000001)
  }

  private makeAstroControls(): AstroControls {
    const controls: AstroControls = new AstroControls(this.camera, this.cameraSphere, this.renderer.domElement)
    controls.rollSpeed = 0.1
    controls.autoForward = false

    return controls
  }

  private makeClock(): Clock {
    const clock: Clock = new Clock()
    clock.startTime = 0

    return clock
  }

  private makeStats(): Stats {
    const stats: Stats = new Stats()
    stats.showPanel(0)
    stats.showPanel(1)
    stats.showPanel(2)

    return stats
  }
}

export const engine: Engine = new Engine()
