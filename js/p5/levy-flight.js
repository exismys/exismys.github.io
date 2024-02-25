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
