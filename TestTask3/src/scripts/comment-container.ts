import { CommentBox, type Comment } from './comment'

export default class CommentContainer {
  commentBoxes: CommentBox[]
  element: HTMLDivElement

  constructor (comments: Comment[]) {
    this.commentBoxes = []
    this.#createCommentContainer(comments)
  }

  #createCommentContainer (comments: Comment[]): void {
    this.element = document.createElement('div')
    this.element.setAttribute('class', 'comment-container')

    for (let i = 0; i < comments.length; i++) {
      this.commentBoxes[i] = new CommentBox(comments[i])
      this.element.appendChild(this.commentBoxes[i].element)
    }
  }
}
