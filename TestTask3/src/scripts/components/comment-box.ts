import type Comment from '../models/comment'

export default class CommentBox extends HTMLDivElement {
  commentId?: number

  constructor (comment: Comment) {
    super()
    this.commentId = comment.id
    this.createCommentBox(comment)
  }

  private createCommentBox (comment: Comment): void {
    this.setAttribute('id', `comment-${comment.id}`)
    this.setAttribute('class', 'comment-box')
    this.style.backgroundColor = comment.backgroundColorHex
    this.style.color = comment.textColorHex

    this.appendChild(this.createSpanElementWithText(comment.text))
  }

  private createSpanElementWithText (text: string): HTMLSpanElement {
    const span = document.createElement('span')
    span.innerText = text
    return span
  }
}

customElements.define('comment-box', CommentBox, { extends: 'div' })
