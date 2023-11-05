import { type eventCallback } from '../helpers'

const elementName = 'dialog-menu-button'

export default class DialogMenuButton extends HTMLButtonElement {
  buttonEvents: Record<string, eventCallback>

  constructor (options: ButtonProps, buttonEvents: Record<string, eventCallback>) {
    super()
    this.setAttribute('is', elementName)
    Object.assign(this, options)
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

interface ButtonProps {
  type: HTMLButtonElement['type']
  id: HTMLButtonElement['id']
  textContent: HTMLButtonElement['textContent']
}

customElements.define(elementName, DialogMenuButton, { extends: 'button' })
