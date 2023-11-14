import { createStickyNote } from '../api-calls'
import { stopPropagation } from '../helpers'
import CommentInputArea from './comment-input-area'
import DialogMenuButton from './dialog-button'
import { StickyNote } from '../models/sticky-note'
import DotInputArea from './dot-input-area'
import InputValidator from '../input-validator'

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

// TODO: Try composition instead of inheritance
export class NewStickyNoteDialog extends DialogMenu {
  private readonly stickyNote: StickyNote
  private readonly validotor: InputValidator

  constructor (dotX: number, dotY: number) {
    super()
    this.validotor = new InputValidator(['input-error'])
    this.stickyNote = new StickyNote()
    this.submitStickyNote = this.submitStickyNote.bind(this)
    this.addCommentInputArea = this.addCommentInputArea.bind(this)
    this.deleteCommentInputArea = this.deleteCommentInputArea.bind(this)

    this.classList.add('dialog-menu-new-sticky-note')
    this.appendChild(this.createDotInputArea(dotX, dotY))
    this.appendChild(this.createCommentInputAreaContainer())
    this.appendChild(this.createButtonContainer())
  }

  private createDotInputArea (dotX: number, dotY: number): DotInputArea {
    const dotInputArea = new DotInputArea(dotX, dotY, this.validotor)
    this.stickyNote.dot = dotInputArea.dot

    return dotInputArea
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
    if (this.validotor.validate()) {
      this.remove()
      createStickyNote(this.stickyNote)
    } else {
      this.validotor.showErrorMessages()
    }
  }

  private addCommentInputArea (event: Event): void {
    event.stopPropagation()
    const container = this.querySelector<HTMLDivElement>('#comment-input-area-container')
    const commentNumber = this.getCommentInputAreas().length + 1
    const newCommentInputArea = new CommentInputArea(commentNumber, this.validotor)

    this.stickyNote.comments.push(newCommentInputArea.comment)
    container?.appendChild(newCommentInputArea)
  }

  private deleteCommentInputArea (event: Event): void {
    event.stopPropagation()
    const lastCommentInput = Array.from(this.getCommentInputAreas()).pop()
    lastCommentInput?.remove()
    this.stickyNote.comments.pop()
  }

  private getCommentInputAreas (): NodeListOf<CommentInputArea> {
    return this.querySelectorAll<CommentInputArea>('div[is=comment-input-area]')
  }
}

customElements.define(elementNames.DialogMenu, DialogMenu)
customElements.define(elementNames.NewStickyNoteDialog, NewStickyNoteDialog)
