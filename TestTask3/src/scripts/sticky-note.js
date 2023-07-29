import CommentContainer from './comment-container';
import Konva from 'konva';
export default class StickyNote {
    dot;
    commentContainer;
    dotImage;
    constructor(dot) {
        this.dot = dot;
        this.#createDotImage();
        this.commentContainer = new CommentContainer(dot.comments);
    }
    #createDotImage() {
        this.dotImage = new Konva.Circle({
            x: this.dot.x,
            y: this.dot.y,
            radius: this.dot.radius,
            fill: this.dot.colorHex
        });
        this.dotImage.on('click', () => {
            fetch(`api/Dots/${this.dot.id}`, {
                method: 'DELETE'
            }).then(() => {
                this.dotImage.remove();
                this.commentContainer.commentContainerElement.remove();
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    setCommentContainerPosition() {
        const elem = this.commentContainer.commentContainerElement;
        elem.style.top = (this.dot.y + this.dot.radius).toString() + 'px';
        elem.style.left = (this.dot.x - elem.offsetWidth / 2).toString() + 'px';
    }
}
//# sourceMappingURL=sticky-note.js.map