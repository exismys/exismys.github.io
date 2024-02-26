class Bubble {
    constructor(sketch, x, y, r, color = 0) {
        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    move() {
        this.x += this.sketch.random(-2, 2);
        this.y += this.sketch.random(-2, 2);
    }

    show() {
        this.sketch.stroke(255);
        this.sketch.strokeWeight(2);
        this.sketch.fill(this.color, this.color, this.color, 100);
        this.sketch.circle(this.x, this.y, this.r * 2);
    }

    intersects(other) {
        return this.sketch.dist(this.x, this.y, other.x, other.y) < (this.r + other.r);
    }

    changeColor(color) {
        this.color = color;
    }

    contains(x, y) {
        return (this.x, this.y, x, y) < this.r;
    }
}

let canvasThree = function(sketch) {
    let bubbles = [];

    sketch.setup = function() {
        let bubbleDiv = document.getElementById("bubble-intersection");
        let width = bubbleDiv.offsetWidth;
        let height = 400;
        let bubbleCanvas = sketch.createCanvas(width, height);
        bubbleCanvas.parent("bubble-intersection");
        for (let i = 0; i < 10; i++) {
            bubbles[i] = new Bubble(sketch, sketch.random(width), sketch.random(height), sketch.random(10, 40));
        }
    }
    
    sketch.draw = function() {
        sketch.background(0);
        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].show();
            bubbles[i].move();
            let intersectsAny = false;
            for (let j = 0; j < bubbles.length; j++) {
                if (i != j && bubbles[i].intersects(bubbles[j])) {
                    intersectsAny = true;
                }
            }
            if (intersectsAny) bubbles[i].changeColor(255);
            else bubbles[i].changeColor(0);
        }
    }

    sketch.mousePressed = function() {
        let bubble = new Bubble(sketch, sketch.mouseX, sketch.mouseY, sketch.random(10, 40));
        bubbles.push(bubble);
    }
}

new p5(canvasThree);