import { IObject3D } from '@/core/objects3d/types'
import { Object3D } from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { simulationStore } from '@/core/mobX/SimulationStore'

class Label2D implements IObject3D {
  private readonly text: string
  public object3D: Object3D

  public constructor(text: string) {
    this.text = text

    const div: HTMLDivElement = document.createElement('div')
    div.className = 'label-name'
    div.innerHTML = this.text.toUpperCase()
    div.style.backgroundColor = 'transparent'
    div.style.color = '#c3c8d2'
    div.style.fontSize = '0.9rem'
    div.style.fontWeight = 'bold'
    div.style.letterSpacing = '3px'
    div.style.top = '20px'

    div.addEventListener('click', (): void => {
      simulationStore.updateSelection(this.text)
    })

    this.object3D = new CSS2DObject(div)
  }

  public build(): Object3D {
    this.object3D.name = this.text + 'Label'
    this.object3D.userData.type = 'label'

    return this.object3D
  }
}

export { Label2D }
