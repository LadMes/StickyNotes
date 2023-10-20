import type StickyNoteElement from './models/sticky-note'
import { type StickyNote } from './models/sticky-note'
import { type Stage } from 'konva/lib/Stage'
import { showStickyNote, showStickyNotes } from './helpers'

const apiURL = 'api/StickyNotes'

export function getStickyNotes (stage: Stage): void {
  fetch(apiURL).then(async res => {
    return await res.json()
  }).then((stickyNotes: StickyNote[]) => {
    showStickyNotes(stage, stickyNotes)
  }).catch((err) => {
    console.log(err)
  })
}

export function createStickyNote (stage: Stage, stickyNote: StickyNote): void {
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stickyNote)
  }).then(async res => {
    return await res.json()
  }).then((stickyNote: StickyNote) => {
    showStickyNote(stage, stickyNote)
  })
    .catch((err) => {
      console.log(err)
    })
}

export function deleteStickyNote (stickyNoteElement: StickyNoteElement): void {
  fetch(`${apiURL}/${stickyNoteElement.id}`, {
    method: 'DELETE'
  }).then(() => {
    stickyNoteElement.dotImage.remove()
    stickyNoteElement.commentContainer.remove()
  }).catch((err) => {
    console.log(err)
  })
}
