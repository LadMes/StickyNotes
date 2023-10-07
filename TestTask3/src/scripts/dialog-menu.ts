export default class DialogMenu {
  static instance: DialogMenu | null = null
  dialogMenu: HTMLDivElement
  isMoving: boolean = false
  currentX: number
  currentY: number

  constructor (type: string) {
    if (DialogMenu.instance === null) {
      DialogMenu.instance = this

      this.dialogMenu = document.createElement('div')
      this.dialogMenu.classList.add('dialog-menu')
      this.dialogMenu.style.width = '400px'
      this.dialogMenu.style.height = '500px'

      const top = window.innerHeight / 2 - parseInt(this.dialogMenu.style.height) / 2
      this.dialogMenu.style.top = top < 0 ? '0px' : top.toString() + 'px'

      const left = window.innerWidth / 2 - parseInt(this.dialogMenu.style.width) / 2
      this.dialogMenu.style.left = left < 0 ? '0px' : left.toString() + 'px'

      this.dialogMenu.addEventListener('mousedown', this.#mousedown)
      this.dialogMenu.addEventListener('mousemove', this.#mousemove)
      this.dialogMenu.addEventListener('mouseup', this.#mouseup)

      this.dialogMenu.appendChild(this.#createCloseIcon())
    }

    return DialogMenu.instance
  }

  #mousedown (e: MouseEvent): void {
    if (DialogMenu.instance !== null) {
      DialogMenu.instance.dialogMenu.style.cursor = 'move'
      DialogMenu.instance.isMoving = true
      DialogMenu.instance.currentX = e.offsetX
      DialogMenu.instance.currentY = e.offsetY
    }
  }

  #mousemove (e: MouseEvent): void {
    if (DialogMenu.instance?.isMoving === true) {
      const currentLeft = parseInt(DialogMenu.instance.dialogMenu.style.left)
      let nextLeft = currentLeft - (DialogMenu.instance.currentX - e.offsetX)
      if (nextLeft < 0) {
        nextLeft = 0
      }
      DialogMenu.instance.dialogMenu.style.left = nextLeft.toString() + 'px'

      const currentTop = parseInt(DialogMenu.instance.dialogMenu.style.top)
      let nextTop = currentTop - (DialogMenu.instance.currentY - e.offsetY)
      if (nextTop < 0) {
        nextTop = 0
      }
      DialogMenu.instance.dialogMenu.style.top = nextTop.toString() + 'px'
    }
  }

  #mouseup (e: MouseEvent): void {
    if (DialogMenu.instance?.isMoving === true) {
      DialogMenu.instance.dialogMenu.style.cursor = 'default'
      DialogMenu.instance.isMoving = false
    }
  }

  #createCloseIcon (): HTMLImageElement {
    const closeIcon = document.createElement('img')
    closeIcon.src = '../close_icon.png'
    closeIcon.classList.add('close-icon')
    closeIcon.addEventListener('click', this.#remove)

    return closeIcon
  }

  #remove (e: Event): void {
    if (e.target instanceof HTMLImageElement) {
      e.target.parentElement?.remove()
      DialogMenu.instance = null
    }
  }
}
