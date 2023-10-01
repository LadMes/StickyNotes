import '../styles/main.css'
import Konva from 'konva'
import { type Dot } from './models/dot'
import { createStickyNote, getStickyNotes } from './api-calls'

const stage = new Konva.Stage({
  container: 'container',
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

stage.add(new Konva.Layer())

getStickyNotes(stage)

stage.addEventListener('click', (e: PointerEvent) => {
  if (e.button === 0) {
    let radius = 0
    // TO-DO: Replace prompt with movable div
    do {
      const value = prompt('Please enter dot radius')
      if (value == null) {
        break
      }
      radius = parseInt(value)
    } while (radius <= 0 || isNaN(radius))

    const dot: Dot = {
      x: e.pageX,
      y: e.pageY,
      radius,
      colorHex: '#0'
    }
    if (radius > 0) {
      createStickyNote(stage, dot)
    }
  }
})
