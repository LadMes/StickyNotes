import InputArea from "./input-area"

const types: Record<string, () => DialogMenu> = {
  DMNewStickyNote: createDMNewStickyNote
}

export default function createDialogMenu (type: string): DialogMenu {
  try {
    return types[type]()
  } catch (err) {
    console.log(err)
    // TODO: Add Default DM
    return createDMNewStickyNote()
  }
}

abstract class DialogMenu extends HTMLDivElement {
  private isMoving: boolean = false
  private currentX: number
  private currentY: number

  constructor () {
    super()
    this.classList.add('dialog-menu')
    this.appendChild(this.createCloseIcon())
  }

  connectedCallback (): void {
    const top = window.innerHeight / 2 - this.offsetHeight / 2
    this.style.top = top < 0 ? '0px' : top.toString() + 'px'

    const left = window.innerWidth / 2 - this.offsetWidth / 2
    this.style.left = left < 0 ? '0px' : left.toString() + 'px'

    this.addEventListener('mousedown', this.mousedown)
    this.addEventListener('mousemove', this.mousemove)
    this.addEventListener('mouseup', this.mouseup)
  }

  disconnectedCallback (): void {
    this.removeEventListener('mousedown', this.mousedown)
    this.removeEventListener('mousemove', this.mousemove)
    this.removeEventListener('mouseup', this.mouseup)
  }

  private mousedown (e: MouseEvent): void {
    this.style.cursor = 'move'
    this.isMoving = true
    this.currentX = e.offsetX
    this.currentY = e.offsetY
  }

  private mousemove (e: MouseEvent): void {
    if (this.isMoving) {
      const currentLeft = parseInt(this.style.left)
      let nextLeft = currentLeft - (this.currentX - e.offsetX)
      if (nextLeft < 0) {
        nextLeft = 0
      }
      this.style.left = nextLeft.toString() + 'px'

      const currentTop = parseInt(this.style.top)
      let nextTop = currentTop - (this.currentY - e.offsetY)
      if (nextTop < 0) {
        nextTop = 0
      }
      this.style.top = nextTop.toString() + 'px'
    }
  }

  private mouseup (e: MouseEvent): void {
    if (this.isMoving) {
      this.style.cursor = 'default'
      this.isMoving = false
    }
  }

  private createCloseIcon (): HTMLImageElement {
    const closeIcon = document.createElement('img')
    closeIcon.src = '../close_icon.png'
    closeIcon.classList.add('close-icon')
    closeIcon.addEventListener('click', this.removeDialogMenu)

    return closeIcon
  }

  private removeDialogMenu (): void {
    this.parentElement?.remove()
  }
}

function createDMNewStickyNote (): DialogMenu {
  return new DMNewStickyNote()
}

class DMNewStickyNote extends DialogMenu {
  constructor () {
    super()
    this.classList.add('dialog-menu-new-sticky-note')
    this.appendChild(new InputArea('color', 'hexColor', 'Select Color'))
  }
}


customElements.define('dialog-menu', DMNewStickyNote, { extends: 'div' })

