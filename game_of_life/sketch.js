let w=800, h=800;
let grid;
let cols, rows;
let res=10;
let start=false, stop=true;

function make_array() {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function array_init() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}
function array_clear() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

function create_button(name, x, y, func) {
    let button = createButton(name);
    button.position(x, y);
    button.mousePressed(func);
    return button;
}

function compute() {
    let next_gen = make_array();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbours = count_neighbours(grid, i, j);
            let state = grid[i][j];

            if (state == 0 && neighbours == 3) {
                next_gen[i][j] = 1;
            } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                next_gen[i][j] = 0;
            } else {
                next_gen[i][j] = state;
            }
        }
    }
    return next_gen;
}

function count_neighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    return sum - grid[x][y];
}

function setup() {
    createCanvas(w+100, h);
    cols = w / res;
    rows = h / res;
    grid = make_array();
    const start_button = create_button("Start", w+50, 20, () => {start = true; stop=false;});
    const stop_button = create_button("Stop", w+50, 40, () => {stop = true; start=false;});
    const randomize_button = create_button("Randomize", w+30, 60, () => {array_init();});
    const clear_button = create_button("Clear", w+50, 80, () => {array_clear();});
    array_init();
}

function draw() {
    background(0);
    fill(220);
    rect(w, 0, 100, h);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            x = i * res;
            y = j * res;
            if (grid[i][j] == 1) {
                stroke(0, 255, 0);
                fill(0, 150, 0);
            } else {
                fill(0);
                noStroke();
            }
            rect(x, y, res, res);
        }
    }
    if(start) grid = compute();
}

function mousePressed() {
    if(stop) {
        const a = floor(mouseX/res), b = floor(mouseY/res);
        grid[a][b] = grid[a][b] == 0 ? 1 : 0;
    }
}