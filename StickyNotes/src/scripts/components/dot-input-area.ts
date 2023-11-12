import { getValueFromInput, nameOf } from '../helpers'
import type InputValidator from '../input-validator'
import Dot from '../models/dot'
import InputArea from './input-area'

const elementName = 'dot-input-area'

// TODO: This requires refactoring
export default class DotInputArea extends HTMLDivElement {
  dot: Dot
  private readonly validator: InputValidator
  constructor (x: number, y: number, validator: InputValidator) {
    super()
    this.dot = new Dot()
    this.dot.x = x
    this.dot.y = y
    this.validator = validator
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
    this.appendChild(this.createRadiusInputArea())
  }

  private createRadiusInputArea (): InputArea {
    const radiusInputArea = new InputArea({
      inputProps: {
        type: 'text',
        name: nameOf<Dot>('radius'),
        id: 'radius'
      },
      labelProps: {
        textContent: 'Enter radius'
      },
      inputEvents: {
        input: this.handleRadiusChange
      }
    })

    const input = radiusInputArea.querySelector<HTMLInputElement>('input')
    if (input !== null) {
      this.validator.addErrorCondition(input, 'Radius must be in the range from 10 to 100', () => {
        const value = parseInt(getValueFromInput(input))
        if (isNaN(value) || value < 5 || value > 100) {
          return true
        }
        return false
      })
    }

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
