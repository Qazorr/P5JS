let nums = [];
let i = 0, j = 0;
let data_color = 150;
let color = 255;
let w = 800, h = 400;
let data_amount = 200;
let data_width = w/data_amount;
let bubble_start = false, insertion_start = false;

function setup() {
    createCanvas(w+100, h);
    nums = new Array(data_amount);
    const bubble_button = create_button("Bubble", w+50, 20, () => {bubble_start = true; loop();});
    const insertion_button = create_button("Insertion", w+50, 40, () => {insertion_start = true; loop();});
    const stop_button = create_button("Stop", w+50, 60, stop_btn);
    const reset_button = create_button("Reset", w+50, 80, reset);
    noStroke();
    reset();
}

function draw() {
    background(color);
    if(bubble_start) bubble();
    else if(insertion_start) insertion();
    else draw_data();
}

function bubble() {
    draw_data();

    if (i < nums.length) {
        for (let j = 0; j < nums.length - i - 1; j++) {
            let a = nums[j];
            let b = nums[j + 1];
            if (a > b) {
                swap(nums, j, j + 1);
            }
        }
    } else {
        console.log('finished');
        noLoop();
    }
    i++;
}

function insertion() {
    draw_data();

    currentValue = nums[i];
    j = i - 1;
    while (j >= 0 && nums[j] > currentValue ){
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j+1] = currentValue;
    i++;
}

function create_button(name, x, y, func) {
    let button = createButton(name);
    button.position(x, y);
    button.mousePressed(func);
    return button;
}

function stop_btn() {
    bubble_start = false;
    insertion_start = false;
    i = 0; j = 0;
    noLoop();
}

function draw_data() {
    for (let i = 0; i < nums.length; i++) {
        data_color = map(nums[i], 1, h, 0, 255);
        fill(0, data_color, data_color);
        rect(i*data_width, h, data_width, -nums[i]);
    }
}

function reset() {
    background(color);
    for (let i = 0; i < nums.length; i++) {
        nums[i] = random(1, h);
    }
    i = 0;
    j = 0;
    draw_data();
    noLoop();
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}