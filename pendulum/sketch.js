const w = 800, h = 1000;
let r = 10;
let gravity = 3;

class Pendulum {
    constructor(x, y, len, angle, damp) {
        this.origin = createVector(x,y);
        this.position = createVector();
        this.len = len;
        this.angle = angle;
        this.damp = damp;
        this.v = 0;
        this.a = 0;
        this.r = r;
    }
    update() {
        this.a = -gravity * sin(this.angle) / this.len;
        this.v += this.a;
        this.v *= (1-this.damp);
        this.angle += this.v;
        this.position.set(this.len * sin(this.angle), this.len * cos(this.angle), 0);
        this.position.add(this.origin);
    }
    show() {
        stroke(255);
        strokeWeight(2);
        line(this.origin.x, this.origin.y, this.position.x, this.position.y);
        const b = map(this.position.x, this.origin.x-this.len, this.origin.x+this.len, 0, 255);
        fill(0, 0, b);
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.r);            
    }
    display() {
        this.update();
        this.show();
    }
}

let pendulums;

function setup() {
    createCanvas(w, h);
    pendulums = new Array(50);
    for (let i = 0; i < pendulums.length; i++) {
        pendulums[i] = new Pendulum(w/2, h/2, 200+10*i, PI, 0);
    }
}

function draw() {
    background(0);
    for(let pendulum of pendulums) {
        pendulum.display();
    }
}