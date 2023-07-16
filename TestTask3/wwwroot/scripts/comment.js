export default class Comment {
    constructor(comment) {
        this.id = comment.id;
        this.text = comment.text;
        this.backgroundColorHex = comment.backgroundColorHex;
        this.#createCommentBox();
    }

    #createCommentBox() {
        this.commentBox = document.createElement("div");
        this.commentBox.setAttribute("id", `comment-${this.id}`);
        this.commentBox.setAttribute("class", "comment-box");
        this.commentBox.style.backgroundColor = this.backgroundColorHex;

        this.commentBox.appendChild(this.#createSpanElementWithText());
    }

    #createSpanElementWithText() {
        let span = document.createElement("span");
        span.innerText = this.text;
        return span;
    }
}