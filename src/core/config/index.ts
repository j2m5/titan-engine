import { fromAstronomicalUnits } from '@/core/helpers/scaling'
import { WebGLRendererParameters } from 'three'
import { height, width } from '@/core/constants'
import { TextureParameters } from '@/core/data/types'

export type TAppConfig = {
  RendererParameters: WebGLRendererParameters
  PerspectiveCameraParameters: PerspectiveCameraParameters
  DefaultCameraPosition: [number, number, number]
  CommonTextures: TextureParameters[]
}

export type PerspectiveCameraParameters = {
  fov: number
  aspect: number
  near: number
  far: number
}

export const AppConfig: TAppConfig = {
  RendererParameters: {
    logarithmicDepthBuffer: true,
    antialias: false
  },
  PerspectiveCameraParameters: {
    fov: 50,
    aspect: width / height,
    near: 0.000001,
    far: fromAstronomicalUnits(2000)
  },
  DefaultCameraPosition: [0, 0, fromAstronomicalUnits(0.01)],
  CommonTextures: [
    { path: 'sun_glow.png', colorSpace: 'srgb-linear' },
    { path: 'star.png', colorSpace: 'srgb-linear' },
    { path: 'asteroid.jpg', colorSpace: 'srgb-linear' },
    { path: 'night.jpg' }
  ]
}
