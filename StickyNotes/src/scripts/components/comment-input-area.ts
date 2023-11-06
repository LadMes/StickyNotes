import InputArea from './input-area'
import Comment from '../models/comment'

const elementName = 'comment-input-area'

export default class CommentInputArea extends HTMLDivElement {
  comment: Comment

  constructor (commentNumber: number) {
    super()
    this.comment = new Comment()
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleBackgroundColorHexChange = this.handleBackgroundColorHexChange.bind(this)
    this.handleTextColorHexChange = this.handleTextColorHexChange.bind(this)
    this.setAttribute('is', elementName)
    this.appendChild(new InputArea({
      type: 'text',
      name: 'text',
      textContent: `Comment ${commentNumber}`,
      id: `comment-${commentNumber}`
    }, {
      input: this.handleTextChange
    }))
    this.appendChild(new InputArea({
      type: 'color',
      name: 'backgroundColorHex',
      textContent: `Background Color For Comment ${commentNumber}`,
      value: '#FFFFFF',
      id: `background-color-${commentNumber}`
    }, {
      input: this.handleBackgroundColorHexChange
    }))
    this.appendChild(new InputArea({
      type: 'color',
      name: 'textColorHex',
      textContent: `Text Color For Comment ${commentNumber}`,
      value: '#000000',
      id: `text-color-${commentNumber}`
    }, {
      input: this.handleTextColorHexChange
    }))
  }

  private handleTextChange (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.comment.text = event.target.value
    }
  }

  private handleBackgroundColorHexChange (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.comment.backgroundColorHex = event.target.value
    }
  }

  private handleTextColorHexChange (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.comment.textColorHex = event.target.value
    }
  }
}

customElements.define(elementName, CommentInputArea, { extends: 'div' })
