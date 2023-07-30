export class CommentBox {
  id: number
  element: HTMLDivElement

  constructor (comment: Comment) {
    this.id = comment.id
    this.#createCommentBox(comment)
  }

  #createCommentBox (comment: Comment): void {
    this.element = document.createElement('div')
    this.element.setAttribute('id', `comment-${comment.id}`)
    this.element.setAttribute('class', 'comment-box')
    this.element.style.backgroundColor = comment.backgroundColorHex

    this.element.appendChild(this.#createSpanElementWithText(comment.text))
  }

  #createSpanElementWithText (text: string): HTMLSpanElement {
    const span = document.createElement('span')
    span.innerText = text
    return span
  }
}

export interface Comment {
  id: number
  text: string
  backgroundColorHex: string
}
