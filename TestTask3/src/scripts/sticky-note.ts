import { DotImage, type Dot } from './dot'
import { type Comment } from './comment'
import CommentContainer from './comment-container'
import { type Layer } from 'konva/lib/Layer'
import { type Circle } from 'konva/lib/shapes/Circle'

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
    container.appendChild(this.commentContainer.element)
    this.#setCommentContainerPosition()
  }

  #addDotImage (dot: Dot): void {
    this.dotImage = new DotImage(dot)

    this.dotImage.element.on('click', () => {
      fetch(`api/StickyNotes/${this.id}`, {
        method: 'DELETE'
      }).then(() => {
        this.dotImage.element.remove()
        this.commentContainer.element.remove()
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  #setCommentContainerPosition (): void {
    const commentContainer: HTMLDivElement = this.commentContainer.element
    const dot: Circle = this.dotImage.element
    commentContainer.style.top = (dot.y() + dot.radius()).toString() + 'px'
    commentContainer.style.left = (dot.x() - commentContainer.offsetWidth / 2).toString() + 'px'
  }
}

export interface StickyNote {
  id: number
  dot: Dot
  comments: Comment[]
}
