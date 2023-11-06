export default class Comment {
  id?: number
  text: string
  backgroundColorHex: string
  textColorHex: string

  constructor () {
    this.text = ''
    this.backgroundColorHex = '#FFFFFF'
    this.textColorHex = '#000000'
  }
}
