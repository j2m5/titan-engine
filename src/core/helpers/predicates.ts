import { InstancedMesh, Line, Mesh, Object3D, Points, Sprite } from 'three'
import { Updatable } from '@/core/objects3d/types'

type Renderable = Mesh | InstancedMesh | Line | Points
type HavingMaterial = Mesh | Sprite | Line | Points

export function isRenderable(object: Object3D): object is Renderable {
  return (object as Renderable).geometry !== undefined && (object as Renderable).material !== undefined
}

export function isHavingMaterial(object: unknown): object is HavingMaterial {
  return object instanceof Mesh || object instanceof Sprite || object instanceof Line || object instanceof Points
}

export function isUpdatable(object: unknown): object is Updatable {
  return (object as Updatable).update !== undefined
}
