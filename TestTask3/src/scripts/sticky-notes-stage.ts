import Konva from 'konva'
import StickyNoteElement, { type StickyNote } from './models/sticky-note'
import { DMNewStickyNote } from './components/dialog-menu'

const stage = new Konva.Stage({
  container: 'container',
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

stage.add(new Konva.Layer())

stage.addEventListener('click', (e: PointerEvent) => {
  if (e.button === 0 && document.getElementsByClassName('dialog-menu').length === 0) {
    document.body.append(new DMNewStickyNote(e.pageX, e.pageY))
  }
})

export function showStickyNote (stickyNote: StickyNote): void {
  const sn = new StickyNoteElement(stickyNote)
  sn.mount(stage.getLayers()[0], stage.container())
}

export function showStickyNotes (stickyNotes: StickyNote[]): void {
  for (const stickyNote of stickyNotes) {
    showStickyNote(stickyNote)
  }
}
