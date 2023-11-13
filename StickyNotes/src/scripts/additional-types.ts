export type EventCallback = (event: Event) => void

export interface InputErrorProps {
  errorCondition: (value: string) => boolean
  errorMessage: string
}
