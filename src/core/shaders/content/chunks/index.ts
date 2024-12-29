import { TDictionary } from '@/core/data/types'
import { ringShadowFragment, ringShadowFunctions, ringShadowUniforms } from './RingShadow'
import { noiseFunctions } from './Noise'
import { bumpFunctions } from '@/core/shaders/content/chunks/Bump'
import { IUniform } from 'three'
import { atmosphereFunctions, atmosphereFragment } from '@/core/shaders/content/chunks/Atmosphere'

export const AppUniformsChunk: TDictionary<TDictionary<IUniform>> = {
  ringShadowUniforms: {
    shadowRingsInnerRadius: { value: 0 },
    shadowRingsOuterRadius: { value: 0 },
    shadowRingsTexture: { value: null }
  }
}

export const AppShaderChunk: TDictionary = {
  ringShadowUniforms,
  ringShadowFunctions,
  ringShadowFragment,
  noiseFunctions,
  bumpFunctions,
  atmosphereFunctions,
  atmosphereFragment
}
