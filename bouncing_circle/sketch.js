let circleX, circleY, radius = 20;
let dx = 15, dy = 15;
let color = 0;
let w = 800, h = 800;

function setup() {
    createCanvas(w, h);
    fill(0, 0, 255);
    circleX = random(0, w);
    circleY = random(0, h);
}

function update() {
    if(circleX >= w-radius/2 || circleX <= 0+radius/2) {
        dx *= -1;
        fill(255, 0, 0);
    }
    if (circleY >= h-radius/2 || circleY <= 0+radius/2) {
        dy *= -1;
        fill(0, 255, 0);
    }
}

function mousePressed() {
    dx = random(5, 20);
    dy = random(5, 20);
}

function draw() {
    color = map(circleX+circleY, 0, 700, 0, 255);
    background(color);
    update();
    circleX += dx;
    circleY += dy;
    circle(circleX, circleY, radius);
}