import Dot from "./dot.js";

let body = document.querySelector("body");
let stage = new Konva.Stage({
    container: "container",
    width: body.clientWidth,
    height: body.clientHeight,
});

let layer = new Konva.Layer();
stage.add(layer);

await fetch("api/Dots").then(res => {
    return res.json();
}).then(dots => {
    let container = document.querySelector("#container").firstElementChild;

    for (let dot of dots) {
        let d = new Dot(dot);
        layer.add(d.dotImage);

        let i = 0;
        for (let comment in d.comments) {
            container.appendChild(d.comments[comment].commentBox);
            d.comments[comment].setCommentBoxPosition(d, i);
            i++;
        }
    }
});