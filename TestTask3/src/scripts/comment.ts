export default class CommentBox {
  comment: Comment
  commentBox: HTMLDivElement

  constructor (comment: Comment) {
    this.comment = comment
    this.#createCommentBox()
  }

  #createCommentBox (): void {
    this.commentBox = document.createElement('div')
    this.commentBox.setAttribute('id', `comment-${this.comment.id}`)
    this.commentBox.setAttribute('class', 'comment-box')
    this.commentBox.style.backgroundColor = this.comment.backgroundColorHex

    this.commentBox.appendChild(this.#createSpanElementWithText())
  }

  #createSpanElementWithText (): HTMLSpanElement {
    const span = document.createElement('span')
    span.innerText = this.comment.text
    return span
  }
}

export interface Comment {
  id: number
  text: string
  backgroundColorHex: string
}
