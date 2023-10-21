﻿import InputArea from './input-area'
import type Dot from '../models/dot'
import type Comment from '../models/comment'
import { type StickyNote } from '../models/sticky-note'
import { createStickyNote } from '../api-calls'
import { type Stage } from 'konva/lib/Stage'
import { getValueFromInput } from '../helpers'

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

// TODO: add an input for chosing color of a comment box
export class DMNewStickyNote extends DialogMenu {
  dotX: number
  dotY: number
  stage: Stage

  constructor (stage: Stage, dotX: number, dotY: number) {
    super()
    this.dotX = dotX
    this.dotY = dotY
    this.stage = stage
    this.classList.add('dialog-menu-new-sticky-note')
    this.appendChild(new InputArea('color', 'colorHex', 'Select Color'))
    this.appendChild(new InputArea('text', 'radius', 'Enter radius'))
    this.createButtons()
  }

  // Temprary
  // TODO: refactor
  private createButtons (): void {
    const buttonContainer = document.createElement('div')
    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    submitButton.textContent = 'Create'
    submitButton.addEventListener('click', (e) => {
      e.stopPropagation()
      const radiusInput = this.querySelector<HTMLInputElement>('input[name=radius]')
      const dotColorInput = this.querySelector<HTMLInputElement>('input[name=colorHex]')

      const dot: Dot = {
        x: this.dotX,
        y: this.dotY,
        radius: parseInt(getValueFromInput(radiusInput)),
        colorHex: getValueFromInput(dotColorInput)
      }

      const commentInputs = Array.from(this.querySelectorAll<HTMLInputElement>('input[name=text]'))
      const comments: Comment[] = []
      commentInputs.forEach(el => {
        const comment: Comment = {
          text: el.value,
          backgroundColorHex: '#33'
        }
        comments.push(comment)
      })

      const stickyNote: StickyNote = {
        dot,
        comments
      }
      createStickyNote(this.stage, stickyNote)
      this.remove()
    })

    const addButton = document.createElement('button')
    addButton.textContent = 'Add'
    let commentNumber = 0
    addButton.addEventListener('click', (e) => {
      commentNumber++
      const comment = new InputArea('text', 'text', `Comment ${commentNumber}`)
      this.insertBefore(comment, this.children[this.children.length - 1])
    })

    buttonContainer.appendChild(submitButton)
    buttonContainer.appendChild(addButton)
    this.appendChild(buttonContainer)
  }
}

customElements.define('dialog-menu', DMNewStickyNote, { extends: 'div' })