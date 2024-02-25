class Walker {
    constructor(sketch, x, y, r = 10) {
        this.sketch = sketch;
        this.pos = sketch.createVector(x, y);
        this.vel = sketch.createVector(1, -1);
        this.acc = sketch.createVector();
        this.r = r;
    }

    update() {
        let mouse = this.sketch.createVector(this.sketch.mouseX, this.sketch.mouseY);
        this.acc = p5.Vector.sub(mouse, this.pos);
        this.acc.setMag(1);
        this.pos.add(this.vel.add(this.acc).limit(5));
    }

    show() {
        this.sketch.stroke(255);
        this.sketch.strokeWeight(2);
        this.sketch.circle(this.pos.x, this.pos.y, this.r * 2);
    }
}

let canvasOne = function(sketch) {
    let walker;

    sketch.setup = function() {
        let walkerDiv = document.getElementById("walker");
        let width = walkerDiv.offsetWidth;
        let height = 400;
        let walkerCanvas = sketch.createCanvas(width, height);
        walkerCanvas.parent("walker");
        walker = new Walker(sketch, width/2, height/2);
    }

    sketch.draw = function() {
        sketch.background(51);
        walker.show();
        walker.update();
    }
}

new p5(canvasOne);
