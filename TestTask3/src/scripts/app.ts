import '../styles/main.css'
import Konva from 'konva'
import type Dot from './dot'
import StickyNote from './sticky-note'

const stage = new Konva.Stage({
  container: 'container',
  width: document.body.clientWidth,
  height: document.body.clientHeight
})

const layer = new Konva.Layer()
stage.add(layer)

fetch('api/Dots').then(async res => {
  return await res.json()
}).then((dots: Dot[]) => {
  const container = stage.container()

  for (const dot of dots) {
    const d = new StickyNote(dot)
    layer.add(d.dotImage)
    container.appendChild(d.commentContainer.commentContainerElement)
    d.setCommentContainerPosition()
  }
}).catch((err) => {
  console.log(err)
})
