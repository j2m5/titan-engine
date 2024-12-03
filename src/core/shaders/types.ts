import { IUniform } from 'three'
import { TDictionary } from '@/core/data/types'

export type TShader = {
  name?: string
  defines?: TDictionary<any>
  uniforms: TDictionary<IUniform>
  vertexShader: string
  fragmentShader: string
}
