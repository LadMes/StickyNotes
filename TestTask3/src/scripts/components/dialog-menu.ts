import InputArea from './input-area'
import type Dot from '../models/dot'
import type Comment from '../models/comment'
import { createStickyNote } from '../api-calls'
import { type Stage } from 'konva/lib/Stage'
import { getInputByNameAttribute, getValueFromInput, stopPropagation } from '../helpers'
import CommentInputArea from './comment-input-area'
import DialogMenuButton from './dialog-menu-button'

/* const types: Record<string, () => DialogMenu> = {
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

function createDMNewStickyNote (): DialogMenu {
  return new DMNewStickyNote()
} */

const elementNames = {
  DMNewStickyNote: 'dialog-menu-new-sticky-note'
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

export class DMNewStickyNote extends DialogMenu {
  private readonly dotX: number
  private readonly dotY: number
  private readonly stage: Stage
  commentNumber: number = 0

  constructor (stage: Stage, dotX: number, dotY: number) {
    super()
    this.setAttribute('is', elementNames.DMNewStickyNote)
    this.dotX = dotX
    this.dotY = dotY
    this.stage = stage
    this.classList.add('dialog-menu-new-sticky-note')
    this.appendChild(new InputArea({
      type: 'color',
      name: 'colorHex',
      text: 'Select Color',
      id: 'colorHex'
    }))
    this.appendChild(new InputArea({
      type: 'text',
      name: 'radius',
      text: 'Enter radius',
      id: 'radius'
    }))
    this.appendChild(this.createButtons())
  }

  private createButtons (): HTMLDivElement {
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

    return buttonContainer
  }

  private submitStickyNote (event: Event): void {
    event.stopPropagation()
    const dialogMenu = document.querySelector<DMNewStickyNote>(`div[is=${elementNames.DMNewStickyNote}]`)
    if (dialogMenu !== null) {
      const dot = dialogMenu.getDotFromInputData()
      const comments = dialogMenu.getCommentsFromInputData()
      createStickyNote(dialogMenu.stage, { dot, comments })
      dialogMenu.remove()
    }
  }

  private addCommentInputArea (event: Event): void {
    event.stopPropagation()
    const dialogMenu = document.querySelector<DMNewStickyNote>(`div[is=${elementNames.DMNewStickyNote}]`)
    if (dialogMenu !== null) {
      dialogMenu.commentNumber++
      const commentInputArea = new CommentInputArea(dialogMenu.commentNumber)
      dialogMenu.insertBefore(commentInputArea, dialogMenu.children[dialogMenu.children.length - 1])
    }
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
    const commentInputs = Array.from(this.querySelectorAll<CommentInputArea>('div[is=comment-input-area]'))
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
}

customElements.define(elementNames.DMNewStickyNote, DMNewStickyNote, { extends: 'div' })
