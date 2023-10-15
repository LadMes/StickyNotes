import '../styles/main.css'
import '../assets/close_icon.png'
import Konva from 'konva'
import { type Dot } from './models/dot'
import { createStickyNote, getStickyNotes } from './api-calls'
import createDialogMenu from './dialog-menu'

const stage = new Konva.Stage({
  container: 'container',
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

stage.add(new Konva.Layer())

getStickyNotes(stage)

stage.addEventListener('click', (e: PointerEvent) => {
  if (e.button === 0 && document.getElementsByClassName('dialog-menu').length === 0) {
    // document.body.append(new DialogMenu('dialog-menu-add').dialogMenu)
    document.body.append(createDialogMenu('DMNewStickyNote'))
    /* const dot: Dot = {
      x: e.pageX,
      y: e.pageY,
      radius,
      colorHex: '#0'
    }
    if (radius > 0) {
      createStickyNote(stage, dot)
    } */
  }
})
