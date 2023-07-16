import Comment from "./comment.js";

export default class CommentContainer {
    constructor(comments) {
        this.comments = [];
        this.#createCommentContainer(comments)
    }

    #createCommentContainer(comments) {
        this.commentContainer = document.createElement("div");
        this.commentContainer.setAttribute("class", "comment-container");

        for (let i = 0; i < comments.length; i++) {
            this.comments[i] = new Comment(comments[i]);
            this.commentContainer.appendChild(this.comments[i].commentBox);
        }
    }

    setCommentContainerPosition(dot) {
        this.commentContainer.style.top = (dot.y + dot.radius).toString() + "px";
        this.commentContainer.style.left = (dot.x - this.commentContainer.offsetWidth / 2).toString() + "px";
    }
}