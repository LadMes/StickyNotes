import InputArea from './input-area'
import type Dot from '../models/dot'
import type Comment from '../models/comment'
import { createStickyNote } from '../api-calls'
import { getInputByNameAttribute, getValueFromInput, stopPropagation } from '../helpers'
import CommentInputArea from './comment-input-area'
import DialogMenuButton from './dialog-button'

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
    this.classList.add('dialog-menu')
    this.appendChild(this.createCloseIcon())
  }

  connectedCallback (): void {
    this.style.top = this.calculateCoord(window.innerHeight, this.offsetHeight)
    this.style.left = this.calculateCoord(window.innerWidth, this.offsetWidth)

    this.addEventListener('mousedown', this.mousedown)
    this.addEventListener('mousemove', this.mousemove)
    this.addEventListener('mouseup', this.mouseup)
  }

  disconnectedCallback (): void {
    this.removeEventListener('mousedown', this.mousedown)
    this.removeEventListener('mousemove', this.mousemove)
    this.removeEventListener('mouseup', this.mouseup)
  }

  private calculateCoord (windowSideSize: number, dialogSideSize: number): string {
    return Math.max(0, windowSideSize / 2 - dialogSideSize / 2).toString() + 'px'
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
    closeIcon.addEventListener('click', this.removeDialogMenu, { once: true })

    return closeIcon
  }

  private removeDialogMenu (): void {
    this.parentElement?.remove()
  }
}

// TO-DO: Try composition instead of inheritance
export class NewStickyNoteDialog extends DialogMenu {
  private readonly dotX: number
  private readonly dotY: number
  private isModelValid: boolean = false

  constructor (dotX: number, dotY: number) {
    super()
    this.checkRadius = this.checkRadius.bind(this)
    this.submitStickyNote = this.submitStickyNote.bind(this)
    this.addCommentInputArea = this.addCommentInputArea.bind(this)
    this.deleteCommentInputArea = this.deleteCommentInputArea.bind(this)
    this.dotX = dotX
    this.dotY = dotY
    this.classList.add('dialog-menu-new-sticky-note')
    this.appendChild(new InputArea({
      type: 'color',
      name: 'colorHex',
      textContent: 'Select Color',
      id: 'colorHex'
    }))
    this.appendChild(new InputArea({
      type: 'text',
      name: 'radius',
      textContent: 'Enter radius',
      id: 'radius'
    }, {
      input: this.checkRadius
    }))
    this.appendChild(this.createCommentInputAreaContainer())
    this.appendChild(this.createButtonContainer())
  }

  private checkRadius (event: Event): void {
    const radiusInpunt = getInputByNameAttribute(this, 'radius')
    const value = parseInt(getValueFromInput(radiusInpunt))
    if (isNaN(value) || value <= 0 || value > 100) {
      radiusInpunt?.classList.add('input-error')
      this.isModelValid = false
    } else {
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
      const dot = this.getDotFromInputData()
      const comments = this.getCommentsFromInputData()
      this.remove()
      createStickyNote({ dot, comments })
    }
  }

  private addCommentInputArea (event: Event): void {
    event.stopPropagation()
    const container = this.querySelector<HTMLDivElement>('#comment-input-area-container')
    const commentInputAreas = this.getCommentInputAreas()
    const newCommentInputArea = new CommentInputArea(commentInputAreas.length + 1)

    container?.appendChild(newCommentInputArea)
  }

  private deleteCommentInputArea (event: Event): void {
    event.stopPropagation()
    const lastCommentInput = Array.from(this.getCommentInputAreas()).pop()
    lastCommentInput?.remove()
  }

  private getDotFromInputData (): Dot {
    const radiusInput = getInputByNameAttribute(this, 'radius')
    const dotColorInput = getInputByNameAttribute(this, 'colorHex')

    return {
      x: this.dotX,
      y: this.dotY,
      radius: parseInt(getValueFromInput(radiusInput)),
      colorHex: getValueFromInput(dotColorInput)
    }
  }

  private getCommentsFromInputData (): Comment[] {
    const commentInputs = Array.from(this.getCommentInputAreas())
    const comments: Comment[] = []
    commentInputs.forEach(el => {
      const comment: Comment = this.getCommentFromInputData(el)
      comments.push(comment)
    })

    return comments
  }

  private getCommentFromInputData (input: CommentInputArea): Comment {
    return {
      text: getValueFromInput(getInputByNameAttribute(input, 'text')),
      backgroundColorHex: getValueFromInput(getInputByNameAttribute(input, 'backgroundColorHex')),
      textColorHex: getValueFromInput(getInputByNameAttribute(input, 'textColorHex'))
    }
  }

  private getCommentInputAreas (): NodeListOf<CommentInputArea> {
    return this.querySelectorAll<CommentInputArea>('div[is=comment-input-area]')
  }
}

customElements.define(elementNames.DialogMenu, DialogMenu)
customElements.define(elementNames.NewStickyNoteDialog, NewStickyNoteDialog)
