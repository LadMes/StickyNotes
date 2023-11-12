export default class InputValidator {
  private readonly inputs: Map<HTMLInputElement, ValidationProps>

  constructor () {
    this.inputs = new Map<HTMLInputElement, ValidationProps>()
    this.handleInputValidation = this.handleInputValidation.bind(this)
  }

  validate (): boolean {
    if (this.inputs.size === 0) {
      return true
    }

    for (const KVP of this.inputs) {
      const validationProps = KVP[1]
      if (!validationProps.isValid) {
        return false
      }
    }

    return true
  }

  addErrorCondition (input: HTMLInputElement, errorMessage: string, errorCondition: ConditionDelegate): void {
    this.inputs.set(input, { errorCondition, errorMessage, isValid: false })
    input.addEventListener('input', this.handleInputValidation)
    input.addEventListener('focusout', this.handleInputValidation)
  }

  removeErrorCondition (input: HTMLInputElement): void {
    if (this.inputs.has(input)) {
      input.removeEventListener('input', this.handleInputValidation)
      input.removeEventListener('focusout', this.handleInputValidation)
      this.inputs.delete(input)
    }
  }

  private handleInputValidation (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const validationProps = this.inputs.get(event.target)
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
