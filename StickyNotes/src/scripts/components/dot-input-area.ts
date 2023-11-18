import { getValueFromInput, nameOf } from '../helpers'
import type InputValidator from '../input-validator'
import Dot from '../models/dot'
import InputArea from './input-area'

const elementName = 'dot-input-area'

// TODO: This requires refactoring
export default class DotInputArea extends HTMLDivElement {
  dot: Dot

  constructor (x: number, y: number, validator: InputValidator) {
    super()
    this.dot = new Dot()
    this.dot.x = x
    this.dot.y = y
    this.handleRadiusChange = this.handleRadiusChange.bind(this)
    this.handleColorHexChange = this.handleColorHexChange.bind(this)
    this.append(new InputArea({
      inputProps: {
        type: 'color',
        name: nameOf<Dot>('colorHex'),
        id: 'color-hex',
        value: this.dot.colorHex
      },
      labelProps: {
        textContent: 'Select Color'
      },
      inputEvents: {
        input: this.handleColorHexChange
      }
    }))
    this.appendChild(this.createRadiusInputArea(validator))
  }

  private createRadiusInputArea (validator: InputValidator): InputArea {
    const radiusInputArea = new InputArea({
      inputProps: {
        type: 'text',
        name: nameOf<Dot>('radius'),
        id: 'radius'
      },
      labelProps: {
        textContent: 'Enter Radius'
      },
      inputEvents: {
        input: this.handleRadiusChange
      },
      errorProps: {
        errorMessage: 'Radius must be in the range from 10 to 100',
        errorCondition: (value: string) => {
          const number = parseInt(value)
          if (isNaN(number) || number < 5 || number > 100) {
            return true
          }
          return false
        }
      }
    }, validator)

    return radiusInputArea
  }

  private handleColorHexChange (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.dot.colorHex = event.target.value
    }
  }

  private handleRadiusChange (event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const value = parseInt(getValueFromInput(event.target))
      if (!isNaN(value)) {
        this.dot.radius = value
      }
    }
  }
}

customElements.define(elementName, DotInputArea, { extends: 'div' })
