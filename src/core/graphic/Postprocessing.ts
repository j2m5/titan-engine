import { engine } from '@/core/graphic/Engine'
import { HalfFloatType, Material, MeshBasicMaterial, Object3D, ShaderMaterial, WebGLRenderTarget } from 'three'
import { isHavingMaterial } from '@/core/helpers/predicates'
import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  ShaderPass,
  ToneMappingEffect,
  ToneMappingMode
} from 'postprocessing'
import { AdditiveBlendingShader } from '@/core/shaders/content/AdditiveBlendingShader'
import { height, width } from '@/core/constants'

class Postprocessing {
  public composer: EffectComposer | null = null
  public bloomComposer: EffectComposer | null = null

  private darkMaterial: Material = new MeshBasicMaterial({ color: '#000000' })
  private materials: { [uuid: string]: Material | Material[] } = {}

  public init(): void {
    this.composer = new EffectComposer(engine.renderer, {
      stencilBuffer: true,
      depthBuffer: true,
      frameBufferType: HalfFloatType,
      multisampling: 4
    })

    this.bloomComposer = new EffectComposer(engine.renderer, {
      frameBufferType: HalfFloatType
    })

    this.bloomComposer.autoRenderToScreen = false

    const renderPass: RenderPass = new RenderPass(engine.scene, engine.camera)

    const bloomEffect: BloomEffect = new BloomEffect({
      radius: 0.7,
      blendFunction: BlendFunction.SCREEN,
      mipmapBlur: true,
      luminanceThreshold: 0.1,
      luminanceSmoothing: 0.0025,
      intensity: 5
    })

    const toneMappingEffect: ToneMappingEffect = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
      blendFunction: BlendFunction.SET,
      resolution: 256,
      whitePoint: 16,
      middleGrey: 0.6,
      minLuminance: 0.01,
      averageLuminance: 1,
      adaptationRate: 1
    })

    const effectPass: EffectPass = new EffectPass(engine.camera, bloomEffect, toneMappingEffect)

    const mixMaterial: ShaderMaterial = new ShaderMaterial(AdditiveBlendingShader)
    const mixPass: ShaderPass = new ShaderPass(mixMaterial, 'tDiffuse')

    mixMaterial.uniforms.tAdd.value = this.bloomComposer.outputBuffer.texture
    mixPass.needsSwap = true

    this.bloomComposer.addPass(renderPass)
    this.bloomComposer.addPass(effectPass)
    this.composer.addPass(renderPass)
    this.composer.addPass(mixPass)
  }

  public render(delta?: number): void {
    engine.scene.traverse((object: Object3D): void => {
      this.maskMaterials(object)
    })
    this.bloomComposer?.render(delta)
    engine.scene.traverse((object: Object3D): void => {
      this.restoreMaterials(object)
    })
    this.composer?.render(delta)
  }

  public renderToScreenshot(): void {
    const [screenshotWidth, screenshotHeight] = [4096, 2048]

    engine.renderer.setSize(screenshotWidth, screenshotHeight)

    const canvas: HTMLCanvasElement = engine.renderer.domElement

    this.render()

    canvas.toBlob(async (blob: Blob | null): Promise<void> => {
      if (blob) {
        const a: HTMLAnchorElement = document.createElement('a')
        document.body.appendChild(a!)
        a.style.display = 'none'
        a.href = window.URL.createObjectURL(blob)
        a.download = `screenshot-${Date.now()}.png`
        a.click()
        document.body.removeChild(a)
      }
    })

    engine.renderer.setSize(width, height)
  }

  public dispose(): void {
    this.bloomComposer?.dispose()
    this.composer?.dispose()
  }

  private maskMaterials(object: Object3D): void {
    if (isHavingMaterial(object) && object.userData.hasBloom === undefined) {
      this.materials[object.uuid] = object.material
      object.material = this.darkMaterial
    }
  }

  private restoreMaterials(object: Object3D): void {
    if (isHavingMaterial(object) && this.materials[object.uuid]) {
      object.material = this.materials[object.uuid]
      delete this.materials[object.uuid]
    }
  }
}

export const postprocessing: Postprocessing = new Postprocessing()
