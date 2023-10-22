import { type Stage } from 'konva/lib/Stage'
import StickyNoteElement, { type StickyNote } from './models/sticky-note'

export function showStickyNote (stage: Stage, stickyNote: StickyNote): void {
  const sn = new StickyNoteElement(stickyNote)
  sn.mount(stage.getLayers()[0], stage.container())
}

export function showStickyNotes (stage: Stage, stickyNotes: StickyNote[]): void {
  for (const stickyNote of stickyNotes) {
    showStickyNote(stage, stickyNote)
  }
}

export function stopPropagation (e: Event): void {
  e.stopPropagation()
}

export function getValueFromInput (input: HTMLInputElement | null): string {
  if (input?.value !== undefined) {
    return input.value
  }
  return ''
}

export function getInputByNameAttribute (element: Element, name: string): HTMLInputElement | null {
  return element.querySelector<HTMLInputElement>(`input[name=${name}]`)
}
