import { Texture } from 'three'
import { TColor } from '@/core/data/types'

export function generateTexture(color: string): Texture {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256

  const context: CanvasRenderingContext2D = canvas.getContext('2d')!
  context.fillStyle = color
  context.fillRect(0, 1, 2, 1)

  const texture: Texture = new Texture(canvas)
  texture.needsUpdate = true

  return texture
}

export function calculateScatterRGB(color: TColor, strength: number): TColor {
  return {
    r: Math.pow(400 / color.r, 4) * strength,
    g: Math.pow(400 / color.g, 4) * strength,
    b: Math.pow(400 / color.b, 4) * strength
  }
}
