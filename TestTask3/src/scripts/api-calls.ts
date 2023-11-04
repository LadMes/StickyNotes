import type StickyNoteElement from './models/sticky-note'
import { type StickyNote } from './models/sticky-note'
import { showStickyNote, showStickyNotes } from './sticky-notes-stage'

const apiURL = 'api/StickyNotes'

export function getStickyNotes (): void {
  fetch(apiURL).then(async res => {
    return await res.json()
  }).then((stickyNotes: StickyNote[]) => {
    showStickyNotes(stickyNotes)
  }).catch((err) => {
    console.log(err)
  })
}

export function createStickyNote (stickyNote: StickyNote): void {
  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stickyNote)
  }).then(async res => {
    return await res.json()
  }).then((stickyNote: StickyNote) => {
    showStickyNote(stickyNote)
  })
    .catch((err) => {
      console.log(err)
    })
}

export function deleteStickyNote (stickyNoteElement: StickyNoteElement): void {
  fetch(`${apiURL}/${stickyNoteElement.id}`, {
    method: 'DELETE'
  }).then(() => {
    stickyNoteElement.unmount()
  }).catch((err) => {
    console.log(err)
  })
}
