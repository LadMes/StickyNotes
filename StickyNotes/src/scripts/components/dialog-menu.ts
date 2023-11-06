import InputArea from './input-area'
import { createStickyNote } from '../api-calls'
import { getInputByNameAttribute, getValueFromInput, stopPropagation } from '../helpers'
import CommentInputArea from './comment-input-area'
import DialogMenuButton from './dialog-button'
import { StickyNote } from '../models/sticky-note'

const elementNames = {
  DialogMenu: 'dialog-menu',
  NewStickyNoteDialog: 'new-sticky-note-dialog'
}

class DialogMenu extends HTMLElement {
  private isMoving: boolean = false
  private currentX: number
  private currentY: number

  constructor () {
    super()
    this.removeDialogMenu = this.removeDialogMenu.bind(this)
    this.classList.add('dialog-menu')
    this.appendChild(this.createCloseIcon())
  }

  connectedCallback (): void {
    this.style.top = this.calculateCoordInPx(window.innerHeight, this.offsetHeight)
    this.style.left = this.calculateCoordInPx(window.innerWidth, this.offsetWidth)

    this.addEventListener('mousedown', this.mousedown)
    this.addEventListener('mousemove', this.mousemove)
    this.addEventListener('mouseup', this.mouseup)
  }

  disconnectedCallback (): void {
    this.removeEventListener('mousedown', this.mousedown)
    this.removeEventListener('mousemove', this.mousemove)
    this.removeEventListener('mouseup', this.mouseup)
  }

  private calculateCoordInPx (windowSideSize: number, dialogSideSize: number): string {
    return Math.max(0, (windowSideSize - dialogSideSize) / 2).toString() + 'px'
  }

  private mousedown (e: MouseEvent): void {
    this.style.cursor = 'move'
    this.isMoving = true
    this.currentX = e.offsetX
    this.currentY = e.offsetY
  }

  private mousemove (e: MouseEvent): void {
    if (this.isMoving) {
      this.style.left = this.calculateNewCornerCoordInPx(parseInt(this.style.left), this.currentX, e.offsetX)
      this.style.top = this.calculateNewCornerCoordInPx(parseInt(this.style.top), this.currentY, e.offsetY)
    }
  }

  private mouseup (e: MouseEvent): void {
    if (this.isMoving) {
      this.style.cursor = 'default'
      this.isMoving = false
    }
  }

  private calculateNewCornerCoordInPx (currentCornerCoord: number,
    currentMouseCoord: number, nextMouseCoord: number): string {
    return Math.max(0, currentCornerCoord - (currentMouseCoord - nextMouseCoord))
      .toString() + 'px'
  }

  private createCloseIcon (): HTMLImageElement {
    const closeIcon = document.createElement('img')
    closeIcon.src = '../close_icon.png'
    closeIcon.classList.add('close-icon')
    closeIcon.addEventListener('click', this.removeDialogMenu, { once: true })

    return closeIcon
  }

  private removeDialogMenu (): void {
    this.remove()
  }
}

// TO-DO: Try composition instead of inheritance
export class NewStickyNoteDialog extends DialogMenu {
  private readonly stickyNote: StickyNote
  private isModelValid: boolean = false

  constructor (dotX: number, dotY: number) {
    super()
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.handleColorHexChange = this.handleColorHexChange.bind(this)
    this.submitStickyNote = this.submitStickyNote.bind(this)
    this.addCommentInputArea = this.addCommentInputArea.bind(this)
    this.deleteCommentInputArea = this.deleteCommentInputArea.bind(this)
    this.stickyNote = new StickyNote()
    this.stickyNote.dot.x = dotX
    this.stickyNote.dot.y = dotY
    this.classList.add('dialog-menu-new-sticky-note')
    this.appendChild(new InputArea({
      type: 'color',
      name: 'colorHex',
      textContent: 'Select Color',
      id: 'colorHex',
      value: this.stickyNote.dot.colorHex
    }, {
      input: this.handleColorHexChange
    }))
    this.appendChild(new InputArea({
      type: 'text',
      name: 'radius',
      textContent: 'Enter radius',
      id: 'radius'
    }, {
      input: this.handleRadiusChange
    }))
    this.appendChild(this.createCommentInputAreaContainer())
    this.appendChild(this.createButtonContainer())
  }

  private handleColorHexChange (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.stickyNote.dot.colorHex = event.target.value
    }
  }

  private handleRadiusChange (event: Event): void {
    const radiusInpunt = getInputByNameAttribute(this, 'radius')
    const value = parseInt(getValueFromInput(radiusInpunt))
    if (isNaN(value) || value <= 0 || value > 100) {
      radiusInpunt?.classList.add('input-error')
      this.isModelValid = false
    } else {
      this.stickyNote.dot.radius = value
      radiusInpunt?.classList.remove('input-error')
      this.isModelValid = true
    }
  }

  private createCommentInputAreaContainer (): HTMLDivElement {
    const container = document.createElement('div')
    container.id = 'comment-input-area-container'

    return container
  }

  private createButtonContainer (): HTMLDivElement {
    const buttonContainer = document.createElement('div')
    buttonContainer.appendChild(new DialogMenuButton({
      type: 'submit',
      id: 'submit-button',
      textContent: 'Create'
    }, {
      click: this.submitStickyNote,
      mousedown: stopPropagation
    }))
    buttonContainer.appendChild(new DialogMenuButton({
      type: 'button',
      id: 'add-comment',
      textContent: 'Add Comment'
    }, {
      click: this.addCommentInputArea,
      mousedown: stopPropagation
    }))
    buttonContainer.appendChild(new DialogMenuButton({
      type: 'button',
      id: 'delete-comment',
      textContent: 'Remove Comment'
    }, {
      click: this.deleteCommentInputArea,
      mousedown: stopPropagation
    }))

    return buttonContainer
  }

  private submitStickyNote (event: Event): void {
    event.stopPropagation()
    if (this.isModelValid) {
      this.remove()
      createStickyNote(this.stickyNote)
    }
  }

  private addCommentInputArea (event: Event): void {
    event.stopPropagation()
    const container = this.querySelector<HTMLDivElement>('#comment-input-area-container')
    const commentNumber = this.getCommentInputAreas().length + 1
    const newCommentInputArea = new CommentInputArea(commentNumber)
    this.stickyNote.comments.push(newCommentInputArea.comment)

    container?.appendChild(newCommentInputArea)
  }

  private deleteCommentInputArea (event: Event): void {
    event.stopPropagation()
    const lastCommentInput = Array.from(this.getCommentInputAreas()).pop()
    lastCommentInput?.remove()
  }

  private getCommentInputAreas (): NodeListOf<CommentInputArea> {
    return this.querySelectorAll<CommentInputArea>('div[is=comment-input-area]')
  }
}

customElements.define(elementNames.DialogMenu, DialogMenu)
customElements.define(elementNames.NewStickyNoteDialog, NewStickyNoteDialog)
