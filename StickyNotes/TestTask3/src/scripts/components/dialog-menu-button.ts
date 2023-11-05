import { type eventCallback } from '../helpers'

const elementName = 'dialog-menu-button'

export default class DialogMenuButton extends HTMLButtonElement {
  buttonEvents: Record<string, eventCallback>

  constructor (options: DialogMenuButtonOptions, buttonEvents: Record<string, eventCallback>) {
    super()
    this.setAttribute('is', elementName)
    this.type = options.type
    this.id = options.id
    this.textContent = options.textContent
    this.buttonEvents = buttonEvents
  }

  connectedCallback (): void {
    for (const event in this.buttonEvents) {
      this.addEventListener(event, this.buttonEvents[event])
    }
  }

  disconnectedCallback (): void {
    for (const event in this.buttonEvents) {
      this.removeEventListener(event, this.buttonEvents[event])
    }
  }
}

interface DialogMenuButtonOptions {
  type: HTMLButtonElement['type']
  id: HTMLButtonElement['id']
  textContent: HTMLButtonElement['textContent']
}

customElements.define(elementName, DialogMenuButton, { extends: 'button' })
