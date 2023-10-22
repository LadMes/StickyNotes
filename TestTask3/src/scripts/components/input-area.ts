import { stopPropagation } from '../helpers'

const elementName = 'input-area'

export default class InputArea extends HTMLDivElement {
  private readonly options: Options

  constructor (options: Options) {
    super()
    this.setAttribute('is', elementName)
    this.options = options
    this.appendChild(this.createLabel())
    this.appendChild(this.createInput())
  }

  connectedCallback (): void {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].addEventListener('mousedown', stopPropagation)
    }
  }

  disconnectedCallback (): void {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeEventListener('mousedown', stopPropagation)
    }
  }

  private createInput (): HTMLInputElement {
    const input = document.createElement('input')
    input.type = this.options.type
    input.name = this.options.name
    input.id = this.options.id

    if (this.options.value !== undefined) {
      input.setAttribute('value', this.options.value)
    }

    return input
  }

  private createLabel (): HTMLLabelElement {
    const label = document.createElement('label')
    label.htmlFor = this.options.id
    label.innerText = this.options.text

    return label
  }
}

interface Options {
  type: string
  value?: string
  name: string
  id: string
  text: string
}

customElements.define(elementName, InputArea, { extends: 'div' })
