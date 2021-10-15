imgHall = "";

status1 = "";
object = [];

function preload() {
    imgHall = loadImage("mulroom.png");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function draw() {
    image(imgHall, 0, 0, 640, 420);
    if (status1 != "") {
        for (i = 0; i < object.length; i++) {

            percent = floor(object[i].confidence * 100);
            var d = random(100, 255);
            var e = random(100, 255);
            var f = random(100, 255);
            fill("#FF0000");
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(d, e, f);
            strokeWeight(4);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status1 = true;
    objectDetector.detect(imgHall, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    console.log(result);
    object = result;
}