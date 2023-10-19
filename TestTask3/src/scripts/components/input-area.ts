export default class InputArea extends HTMLDivElement {
  constructor (inputType: string, name: string, text: string) {
    super()
    this.appendChild(this.createLabel(name, text))
    this.appendChild(this.createInput(inputType, name))
  }

  connectedCallback (): void {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].addEventListener('mousedown', this.stopPropagaiton)
    }
  }

  disconnectedCallback (): void {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeEventListener('mousedown', this.stopPropagaiton)
    }
  }

  private createInput (inputType: string, name: string): HTMLInputElement {
    const input = document.createElement('input')
    input.type = inputType
    input.name = name
    input.id = name

    return input
  }

  private createLabel (name: string, text: string): HTMLLabelElement {
    const label = document.createElement('label')
    label.htmlFor = name
    label.innerText = text

    return label
  }

  private stopPropagaiton (e: Event): void {
    e.stopPropagation()
  }
}

customElements.define('input-area', InputArea, { extends: 'div' })
