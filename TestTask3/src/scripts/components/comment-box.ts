import type Comment from '../models/comment'

const elementName = 'comment-box'

export default class CommentBox extends HTMLDivElement {
  commentId?: number

  constructor (comment: Comment) {
    super()
    this.setAttribute('is', elementName)
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

customElements.define(elementName, CommentBox, { extends: 'div' })
