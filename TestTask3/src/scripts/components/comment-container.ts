import type Comment from '../models/comment'
import CommentBox from './comment-box'

const elementName = 'comment-container'

export default class CommentContainer extends HTMLDivElement {
  constructor (comments: Comment[]) {
    super()
    this.setAttribute('is', elementName)
    this.setAttribute('class', 'comment-container')
    for (let i = 0; i < comments.length; i++) {
      this.appendChild(new CommentBox(comments[i]))
    }
  }
}

customElements.define(elementName, CommentContainer, { extends: 'div' })
