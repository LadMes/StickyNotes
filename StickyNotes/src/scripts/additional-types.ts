export type EventCallback = (event: Event) => void

export interface InputErrorProps {
  errorCondition: () => boolean
  errorMessage: string
}
