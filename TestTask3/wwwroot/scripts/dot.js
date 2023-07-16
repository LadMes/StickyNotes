import CommentContainer from "./comment-container.js";

export default class Dot {
    constructor(dot) {
        this.id = dot.id;
        this.x = dot.x;
        this.y = dot.y;
        this.radius = dot.radius;
        this.colorHex = dot.colorHex;
        this.#createDotImage();
        this.commentContainer = new CommentContainer(dot.comments);
    }

    #createDotImage() {
        this.dotImage = new Konva.Circle({
            x: this.x,
            y: this.y,
            radius: this.radius,
            fill: this.colorHex
        });

        this.dotImage.on("click", () => {
            fetch(`api/Dots/${this.id}`, {
                method: "DELETE"
            }).then(() => {
                this.dotImage.remove();
                this.commentContainer.commentContainer.remove();
            });
        });
    }
}