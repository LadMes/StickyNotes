export default class InputValidator {
  private readonly validations: Map<HTMLInputElement, ValidationProps>

  constructor () {
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
        result.push(validationProps.errorMessage)
      }
    }

    return result
  }

  addErrorCondition (input: HTMLInputElement, errorMessage: string, errorCondition: ConditionDelegate): void {
    this.validations.set(input, { errorCondition, errorMessage, isValid: false })
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
        if (validationProps.errorCondition()) {
          event.target.classList.add('input-error')
          validationProps.isValid = false
        } else {
          event.target.classList.remove('input-error')
          validationProps.isValid = true
        }
      }
    }
  }
}

type ConditionDelegate = () => boolean

interface ValidationProps {
  errorCondition: ConditionDelegate
  isValid: boolean
  errorMessage: string
}
