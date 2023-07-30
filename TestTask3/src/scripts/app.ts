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
