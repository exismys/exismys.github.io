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

let canvasTwo = function(sketch) {
    let pos, prev, color;

    sketch.setup = function() {
        let levyFlightDiv = document.getElementById("levy-flight");
        let width = levyFlightDiv.offsetWidth;
        let height = 400;
        let levyFlightCanvas = sketch.createCanvas(width, height);
        levyFlightCanvas.parent("levy-flight");
        sketch.background(51);
        pos = sketch.createVector(width/2, height/2);
        prev = pos.copy();
        color = [255, 255, 255];
    }


    sketch.draw = function() {
        sketch.stroke(color[0], color[1], color[2]);
        sketch.strokeWeight(2);
        sketch.line(pos.x, pos.y, prev.x, prev.y);
        prev.set(pos);
        let step = p5.Vector.random2D();
        let prob = sketch.random(100);
        if (prob < 2) {
            step.mult(sketch.random(25, 100));
            color = [sketch.random(255), sketch.random(255), sketch.random(255)];
        } else {
            step.setMag(2);
        }
        pos.add(step);
    }
}

new p5(canvasTwo);
