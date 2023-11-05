import type Dot from './dot'
import DotImage from '../components/dot-image'
import type Comment from '../models/comment'
import CommentContainer from '../components/comment-container'
import { type Layer } from 'konva/lib/Layer'
import { deleteStickyNote } from '../api-calls'

export default class StickyNoteElement {
  id?: number
  private readonly commentContainer: CommentContainer
  private dotImage: DotImage

  constructor (stickyNote: StickyNote) {
    this.id = stickyNote.id
    this.addDotImage(stickyNote.dot)
    this.commentContainer = new CommentContainer(stickyNote.comments)
  }

  mount (layer: Layer, container: HTMLElement): void {
    layer.add(this.dotImage)
    container.appendChild(this.commentContainer)
    this.setCommentContainerPosition()
  }

  unmount (): void {
    this.commentContainer.remove()
    this.dotImage.remove()
  }

  private addDotImage (dot: Dot): void {
    this.dotImage = new DotImage(dot)

    this.dotImage.on('click', (e) => {
      e.cancelBubble = true
      deleteStickyNote(this)
    })
  }

  private setCommentContainerPosition (): void {
    this.commentContainer.style.top = `${(this.dotImage.y() + this.dotImage.radius())}px`
    this.commentContainer.style.left = `${(this.dotImage.x() - this.commentContainer.offsetWidth / 2)}px`
  }
}

export interface StickyNote {
  id?: number
  dot: Dot
  comments: Comment[]
}
