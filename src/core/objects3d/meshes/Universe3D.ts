import { Renderable, Updatable } from '@/core/objects3d/types'
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  Object3D,
  Points,
  ShaderMaterial,
  Vector3
} from 'three'
import { Universe } from '@/models/Universe'
import { AU, SpaceScale } from '@/core/constants'
import { UniverseMaterial } from '@/core/materials/UniverseMaterial'

type StarItem = [number, number, number, number, number, number]

enum StarsItemProps {
  Name,
  X,
  Y,
  Z,
  Mag,
  Spec
}

const MIN_MAG: number = -1.44

const spectralColors: number[] = [
  0xfbf8ff, 0xc8d5ff, 0xd8e2ff, 0xe6ecfc, 0xfbf8ff, 0xfff4e8, 0xffeeda, 0xfeead3, 0xfccecb, 0xebd3da, 0xe7dbf3
]

const pixelRatio: number = window.devicePixelRatio || 1

const stars: Array<StarItem> = require('@/database/milkyway.json')

function lightenDarkenColor(hex: number, amount: number): number {
  let col: number[] = [hex >> 16, (hex >> 8) & 0x00ff, hex & 0x0000ff]
  col = col.map((part: number): number => {
    const partTrans: number = part * amount
    return partTrans < 0 ? 0 : partTrans > 255 ? 255 : partTrans
  })
  return col[0] | (col[1] << 8) | (col[2] << 16)
}

function generateParticles(count: number): BufferGeometry {
  const v: Vector3 = new Vector3()
  const geometry: BufferGeometry = new BufferGeometry()

  const positions: Float32Array = new Float32Array(count * 3)
  const colors: Float32Array = new Float32Array(count * 3)
  const sizes: Float32Array = new Float32Array(count)

  for (let i: number = 0, j: number = 0; i < count; i++, j += 3) {
    const star: StarItem = stars[i]

    if (star[StarsItemProps.X] === 0) continue

    v.set(star[StarsItemProps.X], star[StarsItemProps.Y], star[StarsItemProps.Z])
    v.multiplyScalar(AU * SpaceScale * 1000)

    const mag: number = star[StarsItemProps.Mag] - MIN_MAG + 1
    const spectralType: number = star[StarsItemProps.Spec]
    let starColor: number = spectralColors[spectralType] || spectralColors[10]

    if (mag < 10) {
      starColor = lightenDarkenColor(starColor, (1 / mag) ** 0.3)
    } else {
      starColor = lightenDarkenColor(starColor, (1 / mag) ** 0.9)
    }

    positions[j] = v.x
    positions[j + 1] = v.y
    positions[j + 2] = v.z

    const color: Color = new Color(starColor)

    colors[j] = color.r
    colors[j + 1] = color.g
    colors[j + 2] = color.b

    sizes[i] = pixelRatio * (2 + Math.floor(10 * (1 / mag)) / 10)
  }

  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('color', new BufferAttribute(colors, 3))
  geometry.setAttribute('size', new BufferAttribute(sizes, 1).setUsage(DynamicDrawUsage))

  return geometry
}

class Universe3D implements Renderable, Updatable {
  private readonly model: Universe
  public geometry: BufferGeometry
  public material: ShaderMaterial
  public object3D: Object3D

  public constructor(model: Universe) {
    this.model = model
    this.geometry = generateParticles(stars.length)
    this.material = new UniverseMaterial(this.model)
    this.object3D = new Points(this.geometry, this.material)
  }

  public build(): Object3D {
    this.object3D.name = this.model.name
    this.object3D.userData.type = this.model.type

    return this.object3D
  }

  public update(): void {
    this.material.uniforms.time.value = performance.now() / 3000
  }
}

export { Universe3D }
