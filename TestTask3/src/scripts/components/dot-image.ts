import { Circle } from 'konva/lib/shapes/Circle'
import type Dot from '../models/dot'

export default class DotImage extends Circle {
  dotId?: number

  constructor (dot: Dot) {
    super({
      x: dot.x,
      y: dot.y,
      radius: dot.radius,
      fill: dot.colorHex
    })
    this.dotId = dot.id
  }
}
