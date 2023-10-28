const elementName = 'dialog-menu-button'

export default class DialogMenuButton extends HTMLButtonElement {
  eventsAndCallbacks: Record<string, eventCallback>
  constructor (options: DialogMenuButtonOptions, eventsAndCallbacks: Record<string, eventCallback>) {
    super()
    this.setAttribute('is', elementName)
    this.type = options.type
    this.id = options.id
    this.textContent = options.textContent
    this.eventsAndCallbacks = eventsAndCallbacks
  }

  connectedCallback (): void {
    for (const event in this.eventsAndCallbacks) {
      this.addEventListener(event, this.eventsAndCallbacks[event])
    }
  }

  disconnectedCallback (): void {
    for (const event in this.eventsAndCallbacks) {
      this.removeEventListener(event, this.eventsAndCallbacks[event])
    }
  }
}

interface DialogMenuButtonOptions {
  type: HTMLButtonElement['type']
  id: HTMLButtonElement['id']
  textContent: HTMLButtonElement['textContent']
}

type eventCallback = (event: Event) => void

customElements.define(elementName, DialogMenuButton, { extends: 'button' })
