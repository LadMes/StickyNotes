import InputArea from './input-area'
import Comment from '../models/comment'
import { nameOf } from '../helpers'
import type InputValidator from '../input-validator'

const elementName = 'comment-input-area'

// TODO: This requires refactoring
export default class CommentInputArea extends HTMLDivElement {
  comment: Comment
  private readonly commentNumber: number
  private readonly validator: InputValidator

  constructor (commentNumber: number, validator: InputValidator) {
    super()
    this.comment = new Comment()
    this.commentNumber = commentNumber
    this.validator = validator
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleBackgroundColorHexChange = this.handleBackgroundColorHexChange.bind(this)
    this.handleTextColorHexChange = this.handleTextColorHexChange.bind(this)
    this.setAttribute('is', elementName)
    this.appendChild(this.createTextInputArea())
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

  private createTextInputArea (): InputArea {
    const textInputArea = new InputArea({
      inputProps: {
        type: 'text',
        name: nameOf<Comment>('text'),
        id: `comment-${this.commentNumber}`
      },
      labelProps: {
        textContent: `Comment ${this.commentNumber}`
      }
    }, {
      input: this.handleTextChange
    })

    const input = textInputArea.querySelector<HTMLInputElement>('input')
    if (input !== null) {
      this.validator.addErrorCondition(input, 'Comment can\'t be empty', () => {
        if (input.value === '') {
          return true
        }

        return false
      })
    }

    return textInputArea
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
