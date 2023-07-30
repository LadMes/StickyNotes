import Konva from 'konva'
import { type Circle } from 'konva/lib/shapes/Circle'

export class DotImage {
  id: number
  element: Circle

  constructor (dot: Dot) {
    this.id = dot.id
    this.#createDotImage(dot)
  }

  #createDotImage (dot: Dot): void {
    this.element = new Konva.Circle({
      x: dot.x,
      y: dot.y,
      radius: dot.radius,
      fill: dot.colorHex
    })
  }
}

export interface Dot {
  id: number
  x: number
  y: number
  radius: number
  colorHex: string
}
