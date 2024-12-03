import type { BufferGeometry, Group, LOD, Material, Object3D } from 'three'

export interface IObject3D {
  object3D: Object3D
  build(): Object3D
}

export interface UsesGeometry {
  geometry: BufferGeometry
}

export interface UsesMaterial<T extends Material = Material> {
  material: T
}

export interface UsesGroup {
  group: Group
}

export interface UsesLOD {
  lod: LOD
}

export interface Updatable {
  update(): void
}

export interface Renderable extends IObject3D, UsesGeometry, UsesMaterial {}

export interface CompositedRenderable extends Renderable, UsesGroup {}
