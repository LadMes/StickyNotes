import '../styles/main.css'
import '../assets/close_icon.png'
import Konva from 'konva'
import { getStickyNotes } from './api-calls'
import { DMNewStickyNote } from './components/dialog-menu'

const stage = new Konva.Stage({
  container: 'container',
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

stage.add(new Konva.Layer())

getStickyNotes(stage)

stage.addEventListener('click', (e: PointerEvent) => {
  if (e.button === 0 && document.getElementsByClassName('dialog-menu').length === 0) {
    document.body.append(new DMNewStickyNote(stage, e.pageX, e.pageY))
  }
})
