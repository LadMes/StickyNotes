import InputArea from './input-area'

const elementName = 'comment-input-area'

export default class CommentInputArea extends HTMLDivElement {
  constructor (commentNumber: number) {
    super()
    this.setAttribute('is', elementName)
    this.appendChild(new InputArea({
      type: 'text',
      name: 'text',
      text: `Comment ${commentNumber}`,
      id: `comment-${commentNumber}`
    }))
    this.appendChild(new InputArea({
      type: 'color',
      name: 'backgroundColorHex',
      text: `Background Color For Comment ${commentNumber}`,
      value: '#FFFFFF',
      id: `background-color-${commentNumber}`
    }))
    this.appendChild(new InputArea({
      type: 'color',
      name: 'textColorHex',
      text: `Text Color For Comment ${commentNumber}`,
      value: '#000000',
      id: `text-color-${commentNumber}`
    }))
  }
}

customElements.define(elementName, CommentInputArea, { extends: 'div' })
