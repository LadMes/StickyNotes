import { type InputErrorProps } from './additional-types'

export default class InputValidator {
  private readonly validations: Map<HTMLInputElement, ValidationProps>
  private readonly errorCSSClasses: string[]

  constructor (errorCSSClasses: string[]) {
    this.errorCSSClasses = errorCSSClasses
    this.validations = new Map<HTMLInputElement, ValidationProps>()
    this.handleInputValidation = this.handleInputValidation.bind(this)
  }

  validate (): boolean {
    if (this.validations.size === 0) {
      return true
    }

    for (const KVP of this.validations) {
      const validationProps = KVP[1]
      if (!validationProps.isValid) {
        return false
      }
    }

    return true
  }

  getAllErrorMessages (): string[] {
    const result: string[] = []
    for (const KVP of this.validations) {
      const validationProps = KVP[1]
      if (!validationProps.isValid) {
        result.push(validationProps.errorProps.errorMessage)
      }
    }

    return result
  }

  addErrorCondition (input: HTMLInputElement, errorHolder: Element, errorProps: InputErrorProps): void {
    this.validations.set(input, { errorProps, isValid: false, errorHolder })
    input.addEventListener('input', this.handleInputValidation)
    input.addEventListener('focusout', this.handleInputValidation)
  }

  removeErrorCondition (input: HTMLInputElement): void {
    if (this.validations.has(input)) {
      input.removeEventListener('input', this.handleInputValidation)
      input.removeEventListener('focusout', this.handleInputValidation)
      this.validations.delete(input)
    }
  }

  private handleInputValidation (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const validationProps = this.validations.get(event.target)
      if (validationProps !== undefined) {
        if (validationProps.errorProps.errorCondition(event.target.value)) {
          event.target.classList.add(...this.errorCSSClasses)
          validationProps.errorHolder.textContent = validationProps.errorProps.errorMessage
          validationProps.isValid = false
        } else {
          event.target.classList.remove(...this.errorCSSClasses)
          validationProps.errorHolder.textContent = ''
          validationProps.isValid = true
        }
      }
    }
  }
}

interface ValidationProps {
  errorProps: InputErrorProps
  isValid: boolean
  errorHolder: Element
}
