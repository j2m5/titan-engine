import { Texture, TextureLoader, DefaultLoadingManager } from 'three'
import { engine } from '@/core/graphic/Engine'
import { appStore } from '@/core/mobX/AppStore'
import { TextureParameters } from '@/core/data/types'

class TextureManager {
  public textures: Map<string, Texture> = new Map<string, Texture>()
  private readonly textureLoader: TextureLoader

  public constructor() {
    this.textureLoader = new TextureLoader()
  }

  public onStart(): void {
    DefaultLoadingManager.onStart = (url: string, loaded: number, total: number): void => {
      appStore.setAppLoadingAsset(url)
      appStore.setAppLoadingProgress(loaded)
      appStore.setAppLoadingTotal(total)
    }
  }

  public onProgress(): void {
    DefaultLoadingManager.onProgress = (url: string, loaded: number, total: number): void => {
      appStore.setAppLoadingAsset(url)
      appStore.setAppLoadingProgress(loaded)
      appStore.setAppLoadingTotal(total)
    }
  }

  public onLoad(callback?: () => void): void {
    DefaultLoadingManager.onLoad = (): void => {
      appStore.setAppLoadingAsset('Loading completed')
      appStore.setAppLoadingStatus(false)
      appStore.setAppLoadingAsset('')
      if (callback) callback()
    }
  }

  public onError(): void {
    DefaultLoadingManager.onError = (url: string): void => {
      console.error(`The error occurred while loading: ${url}`)
    }
  }

  public async loadAll(sources: TextureParameters[]): Promise<void> {
    const loadPromises: Promise<Texture | undefined>[] = sources.map((source: TextureParameters) => this.load(source))
    await Promise.all(loadPromises)
  }

  public async load(source: TextureParameters): Promise<Texture | undefined> {
    try {
      const regex: RegExp = /(?:.+\/)?([a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|gif|bmp|svg|webp))/
      const fullURL: string = this.getFullURL(source.path)
      const match: RegExpMatchArray | null = fullURL.match(regex)
      const imageName: string = match ? match[1] : ''
      const texture: Texture = await this.textureLoader.loadAsync(fullURL)

      texture.name = imageName
      texture.colorSpace = source.colorSpace ? source.colorSpace : ''
      texture.anisotropy = 8

      this.textures.set(source.path, texture)

      engine.renderer.initTexture(texture)

      return texture
    } catch (e) {
      console.error(e)
    }
  }

  public dispose(key: string): void {
    const texture: Texture | undefined = this.textures.get(key)

    if (texture) texture.dispose()
    this.textures.delete(key)
  }

  public disposeAll(): void {
    if (this.textures.size) {
      this.textures.forEach((value: Texture, key: string, map: Map<string, Texture>): void => {
        value.dispose()
        map.delete(key)
      })
    }
  }

  private getFullURL(url: string): string {
    return require(`@/images/textures/${url}`)
  }
}

export const textureManager: TextureManager = new TextureManager()
