import { type Comment } from './comment'

export default interface Dot {
  id: number
  x: number
  y: number
  radius: number
  colorHex: string
  comments: Comment[]
}
