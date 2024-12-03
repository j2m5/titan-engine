import { IObject3D } from '@/core/objects3d/types'
import { Object3D } from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

class Arrow2D implements IObject3D {
  public object3D: Object3D

  public constructor() {
    const div: HTMLDivElement = document.createElement('div')

    div.className = 'arrow'
    div.style.backgroundColor = 'transparent'
    div.style.color = 'red'
    div.innerHTML = '➤'

    this.object3D = new CSS2DObject(div)
  }

  public build(): Object3D {
    this.object3D.name = 'arrow'
    this.object3D.userData.type = 'arrow'

    return this.object3D
  }
}

export { Arrow2D }
