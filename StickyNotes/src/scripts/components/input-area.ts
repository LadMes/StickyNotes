import { type eventCallback, stopPropagation } from '../helpers'

const elementName = 'input-area'

export default class InputArea extends HTMLDivElement {
  private readonly props: InputAreaProps

  constructor (props: InputAreaProps) {
    super()
    this.setAttribute('is', elementName)
    this.props = props
    this.appendChild(this.createLabel())
    this.appendChild(this.createInput())
  }

  connectedCallback (): void {
    this.addEventListener('mousedown', stopPropagation)
    const input = this.querySelector<HTMLInputElement>('input')
    for (const event in this.props.inputEvents) {
      input?.addEventListener(event, this.props.inputEvents[event])
    }
  }

  disconnectedCallback (): void {
    this.removeEventListener('mousedown', stopPropagation)
    for (const event in this.props.inputEvents) {
      this.removeEventListener(event, this.props.inputEvents[event])
    }
  }

  private createInput (): HTMLInputElement {
    const input = document.createElement('input')
    Object.assign(input, this.props.inputProps)

    return input
  }

  private createLabel (): HTMLLabelElement {
    const label = document.createElement('label')
    Object.assign(label, this.props.labelProps)
    label.htmlFor = this.props.inputProps.id

    return label
  }
}

interface InputAreaProps {
  inputProps: InputProps
  labelProps: LabelProps
  inputEvents?: Record<string, eventCallback>
}

interface InputProps {
  type: HTMLInputElement['type']
  value?: HTMLInputElement['value']
  name: HTMLInputElement['name']
  id: HTMLInputElement['id']
}

interface LabelProps {
  textContent: HTMLLabelElement['textContent']
}

customElements.define(elementName, InputArea, { extends: 'div' })
