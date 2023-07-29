export default class CommentBox {
    comment;
    commentBox;
    constructor(comment) {
        this.comment = comment;
        this.#createCommentBox();
    }
    #createCommentBox() {
        this.commentBox = document.createElement('div');
        this.commentBox.setAttribute('id', `comment-${this.comment.id}`);
        this.commentBox.setAttribute('class', 'comment-box');
        this.commentBox.style.backgroundColor = this.comment.backgroundColorHex;
        this.commentBox.appendChild(this.#createSpanElementWithText());
    }
    #createSpanElementWithText() {
        const span = document.createElement('span');
        span.innerText = this.comment.text;
        return span;
    }
}
//# sourceMappingURL=comment.js.map