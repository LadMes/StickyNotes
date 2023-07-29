import CommentBox from './comment';
export default class CommentContainer {
    comments;
    commentContainerElement;
    constructor(comments) {
        this.comments = [];
        this.#createCommentContainer(comments);
    }
    #createCommentContainer(comments) {
        this.commentContainerElement = document.createElement('div');
        this.commentContainerElement.setAttribute('class', 'comment-container');
        for (let i = 0; i < comments.length; i++) {
            this.comments[i] = new CommentBox(comments[i]);
            this.commentContainerElement.appendChild(this.comments[i].commentBox);
        }
    }
}
//# sourceMappingURL=comment-container.js.map