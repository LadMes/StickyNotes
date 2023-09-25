import '../styles/main.css'
import Konva from 'konva'
import StickyNoteElement, { type StickyNote } from './sticky-note'

const stage = new Konva.Stage({
  container: 'container',
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

const layer = new Konva.Layer()

stage.add(layer)

fetch('api/StickyNotes').then(async res => {
  return await res.json()
}).then((stickyNotes: StickyNote[]) => {
  const container = stage.container()

  for (const stickyNote of stickyNotes) {
    const sn = new StickyNoteElement(stickyNote)
    sn.mount(layer, container)
  }
}).catch((err) => {
  console.log(err)
})

stage.addEventListener('click', (e: PointerEvent) => {
  if (e.button === 0) {
    let radius = 0
    do {
      const value = prompt('Please enter dot radius')
      if (value != null) {
        radius = parseInt(value)
      }
    } while (radius <= 0 || isNaN(radius))

    fetch('api/StickyNotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        x: e.pageX,
        y: e.pageY,
        radius
      })
    }).then(async res => {
      return await res.json()
    }).then((stickyNote: StickyNote) => {
      const container = stage.container()
      const sn = new StickyNoteElement(stickyNote)
      sn.mount(layer, container)
    })
      .catch((err) => {
        console.log(err)
      })
  }
})
