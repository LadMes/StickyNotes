import InputArea from './input-area'
import Comment from '../models/comment'
import { nameOf } from '../helpers'

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
      inputProps: {
        type: 'text',
        name: nameOf<Comment>('text'),
        id: `comment-${commentNumber}`
      },
      labelProps: {
        textContent: `Comment ${commentNumber}`
      }
    }, {
      input: this.handleTextChange
    }))
    this.appendChild(new InputArea({
      inputProps: {
        type: 'color',
        name: nameOf<Comment>('backgroundColorHex'),
        value: '#FFFFFF',
        id: `background-color-${commentNumber}`
      },
      labelProps: {
        textContent: `Background Color For Comment ${commentNumber}`
      }
    }, {
      input: this.handleBackgroundColorHexChange
    }))
    this.appendChild(new InputArea({
      inputProps: {
        type: 'color',
        name: nameOf<Comment>('textColorHex'),
        value: '#000000',
        id: `text-color-${commentNumber}`
      },
      labelProps: {
        textContent: `Text Color For Comment ${commentNumber}`
      }
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
