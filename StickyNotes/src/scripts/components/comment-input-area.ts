import InputArea from './input-area'
import Comment from '../models/comment'
import { nameOf } from '../helpers'
import type InputValidator from '../input-validator'

const elementName = 'comment-input-area'

// TODO: This requires refactoring
export default class CommentInputArea extends HTMLDivElement {
  comment: Comment
  private readonly commentNumber: number

  constructor (commentNumber: number, validator: InputValidator) {
    super()
    this.comment = new Comment()
    this.commentNumber = commentNumber
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleBackgroundColorHexChange = this.handleBackgroundColorHexChange.bind(this)
    this.handleTextColorHexChange = this.handleTextColorHexChange.bind(this)
    this.setAttribute('is', elementName)
    this.appendChild(this.createTextInputArea(validator))
    this.appendChild(new InputArea({
      inputProps: {
        type: 'color',
        name: nameOf<Comment>('backgroundColorHex'),
        value: '#FFFFFF',
        id: `background-color-${commentNumber}`
      },
      labelProps: {
        textContent: `Background color for Comment ${commentNumber}`
      },
      inputEvents: {
        input: this.handleBackgroundColorHexChange
      }
    }))
    this.appendChild(new InputArea({
      inputProps: {
        type: 'color',
        name: nameOf<Comment>('textColorHex'),
        value: '#000000',
        id: `text-color-${commentNumber}`
      },
      labelProps: {
        textContent: `Text color for Comment ${commentNumber}`
      },
      inputEvents: {
        input: this.handleTextColorHexChange
      }
    }))
  }

  private createTextInputArea (validator: InputValidator): InputArea {
    const textInputArea = new InputArea({
      inputProps: {
        type: 'text',
        name: nameOf<Comment>('text'),
        id: `comment-${this.commentNumber}`
      },
      labelProps: {
        textContent: `Comment ${this.commentNumber}`
      },
      inputEvents: {
        input: this.handleTextChange
      },
      errorProps: {
        errorMessage: 'Comment can\'t be empty',
        errorCondition: (value: string) => {
          if (value === '') {
            return true
          }

          return false
        }
      }
    }, validator)

    textInputArea.querySelector('input')?.classList.add('input-text')

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
