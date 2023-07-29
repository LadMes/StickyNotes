import CommentBox, { type Comment } from './comment'

export default class CommentContainer {
  comments: CommentBox[]
  commentContainerElement: HTMLDivElement

  constructor (comments: Comment[]) {
    this.comments = []
    this.#createCommentContainer(comments)
  }

  #createCommentContainer (comments: Comment[]): void {
    this.commentContainerElement = document.createElement('div')
    this.commentContainerElement.setAttribute('class', 'comment-container')

    for (let i = 0; i < comments.length; i++) {
      this.comments[i] = new CommentBox(comments[i])
      this.commentContainerElement.appendChild(this.comments[i].commentBox)
    }
  }
}
