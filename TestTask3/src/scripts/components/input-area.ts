import { type eventCallback, stopPropagation } from '../helpers'

const elementName = 'input-area'

export default class InputArea extends HTMLDivElement {
  private readonly options: InputAreaOptions
  private readonly inputEvents: Record<string, eventCallback>

  constructor (options: InputAreaOptions, inputEvents?: Record<string, eventCallback>) {
    super()
    this.setAttribute('is', elementName)
    this.options = options
    if (inputEvents !== undefined) {
      this.inputEvents = inputEvents
    }
    this.appendChild(this.createLabel())
    this.appendChild(this.createInput())
  }

  connectedCallback (): void {
    this.addEventListener('mousedown', stopPropagation)
    const input = this.querySelector<HTMLInputElement>('input')
    for (const event in this.inputEvents) {
      input?.addEventListener(event, this.inputEvents[event])
    }
  }

  disconnectedCallback (): void {
    this.removeEventListener('mousedown', stopPropagation)
    for (const event in this.inputEvents) {
      this.removeEventListener(event, this.inputEvents[event])
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
    label.textContent = this.options.textContent

    return label
  }
}

interface InputAreaOptions {
  type: HTMLInputElement['type']
  value?: HTMLInputElement['value']
  name: HTMLInputElement['name']
  id: HTMLInputElement['id']
  textContent: HTMLInputElement['textContent']
}

customElements.define(elementName, InputArea, { extends: 'div' })
