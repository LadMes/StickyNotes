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
    let container = document.querySelector("#container");

    for (let dot of dots) {
        let d = new Dot(dot);
        layer.add(d.dotImage);
        container.appendChild(d.commentContainer.commentContainer);
        d.commentContainer.setCommentContainerPosition(d);
    }
});