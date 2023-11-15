import { stopPropagation } from '../helpers'
import { type InputErrorProps, type EventCallback } from '../additional-types'
import type InputValidator from '../input-validator'

const elementName = 'input-area'

export default class InputArea extends HTMLDivElement {
  private readonly props: InputAreaProps
  private readonly validator: InputValidator
  private readonly label: HTMLLabelElement
  private readonly input: HTMLInputElement
  private readonly span: HTMLSpanElement

  constructor (props: InputAreaProps, validator?: InputValidator) {
    super()
    this.setAttribute('is', elementName)
    this.props = props
    if (validator !== undefined) {
      this.validator = validator
    }
    this.label = this.appendChild(this.createLabel())
    this.input = this.appendChild(this.createInput())
    this.span = this.appendChild(this.createErrorSpan())
  }

  connectedCallback (): void {
    this.addEventListener('mousedown', stopPropagation)

    for (const event in this.props.inputEvents) {
      this.input.addEventListener(event, this.props.inputEvents[event])
    }
    if (this.props.errorProps !== undefined) {
      this.validator.addErrorCondition(this.input, this.span, {
        errorCondition: this.props.errorProps.errorCondition,
        errorMessage: this.props.errorProps.errorMessage
      })
    }
  }

  disconnectedCallback (): void {
    this.removeEventListener('mousedown', stopPropagation)

    for (const event in this.props.inputEvents) {
      this.input.removeEventListener(event, this.props.inputEvents[event])
    }
    if (this.props.errorProps !== undefined) {
      this.validator.removeErrorCondition(this.input)
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

  private createErrorSpan (): HTMLSpanElement {
    const span = document.createElement('span')
    span.classList.add('error-message')

    return span
  }
}

interface InputAreaProps {
  inputProps: InputProps
  labelProps: LabelProps
  inputEvents?: Record<string, EventCallback>
  errorProps?: InputErrorProps
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
