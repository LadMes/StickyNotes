import { DotImage, type Dot } from './dot'
import type Comment from '../models/comment'
import CommentContainer from '../components/comment-container'
import { type Layer } from 'konva/lib/Layer'
import { type Circle } from 'konva/lib/shapes/Circle'

// TODO: Change into Web-Component
export default class StickyNoteElement {
  id: number
  commentContainer: CommentContainer
  dotImage: DotImage

  constructor (stickyNote: StickyNote) {
    this.id = stickyNote.id
    this.#addDotImage(stickyNote.dot)
    this.commentContainer = new CommentContainer(stickyNote.comments)
  }

  mount (layer: Layer, container: HTMLElement): void {
    layer.add(this.dotImage.element)
    container.appendChild(this.commentContainer)
    this.#setCommentContainerPosition()
  }

  #addDotImage (dot: Dot): void {
    this.dotImage = new DotImage(dot)

    this.dotImage.element.on('click', (e) => {
      e.cancelBubble = true
      fetch(`api/StickyNotes/${this.id}`, {
        method: 'DELETE'
      }).then(() => {
        this.dotImage.element.remove()
        this.commentContainer.remove()
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  #setCommentContainerPosition (): void {
    const dot: Circle = this.dotImage.element
    this.commentContainer.style.top = (dot.y() + dot.radius()).toString() + 'px'
    this.commentContainer.style.left = (dot.x() - this.commentContainer.offsetWidth / 2).toString() + 'px'
  }
}

export interface StickyNote {
  id: number
  dot: Dot
  comments: Comment[]
}
