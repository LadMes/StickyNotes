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

export type eventCallback = (event: Event) => void
