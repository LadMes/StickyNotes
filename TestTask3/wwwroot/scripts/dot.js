import Comment from "./comment.js";

export default class Dot {
    constructor(dot) {
        this.id = dot.id;
        this.x = dot.x;
        this.y = dot.y;
        this.radius = dot.radius;
        this.colorHex = dot.colorHex;
        this.#createDotImage();
        this.comments = {};
        this.#setComments(dot.comments);
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
                for (let comment in this.comments) {
                    this.comments[comment].commentBox.remove();
                }
            });
        });
    }

    #setComments(comments) {
        for (let i = 0; i < comments.length; i++) {
            this.comments[comments[i].id] = new Comment(comments[i]);
        }
    }
}