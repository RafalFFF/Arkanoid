let boxes = [];
let quantity = 1;

class Box {
    constructor(x, y,color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.counter = boxLevel;
        this.init = function () {
            boxes.push(this);
        }
    }
    drawBoxes() {
        if(this.counter>0){
            context.save();
            context.font="20px Georgia";
            context.fillStyle = this.color;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(this.counter, this.x+24, this.y+24);
            context.lineWidth=2;
            context.strokeStyle=this.color;
            context.strokeRect(this.x, this.y, 48, 48);
            context.restore();
        }
    }
    moveDown() {
        this.y += 1;
    }
}

let xCordinations = [];
let temp1 = 0;

function draw() {
    quantity = Math.floor(Math.random() * 7);
    for (i = 0; i < quantity; i++) {
        do {
            let random = Math.floor(Math.random() * 7);
            next = true;

            for (let j = 0; j < xCordinations.length; j++) {
                if (random == xCordinations[j]) {
                    next = false;
                }
            }

            if (next == true) {
                xCordinations[temp1] = random;
                temp1++;
            }
        } while (next != true);
    }
    console.log(xCordinations);
}

function drawBoxes() {
    boxes.forEach(box => {
        box.drawBoxes();
    })
}
let mdCounter = 0;
let spawnFlag = false;



draw();