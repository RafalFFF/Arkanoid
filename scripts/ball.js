let ballAray = [];

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        /*********calculate direction***********/
        let x1 = tempXCor;
        let y1 = 450;
        let x2 = X2;
        let y2 = Y2;
        let dx = x2 - x1;
        let dy = y2 - y1;
        let cosA = (Math.abs(dx)) / (Math.sqrt(dx * dx + dy * dy));
        let sinA = (Math.abs(dy)) / (Math.sqrt(dx * dx + dy * dy));
        this.directionX = 5 * cosA;
        this.directionY = 5 * sinA;
        /***************************************/
        this.init = function () {
            ballAray.push(this);
        }
    }
    drawBall() {
        context.save();
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill();
        context.restore();
        
        
    }
    moveBall() {
        if (X2 > tempXCor) {
            this.x += this.directionX;
            this.y -= this.directionY;
        } else if (X2 < tempXCor) {
            this.x -= this.directionX;
            this.y -= this.directionY;
        }else if(X2==tempXCor){
            this.y -= this.directionY;
        }
    }
}

function drawBalls() {
    ballAray.forEach(element => {
        element.drawBall();
    });
}

function moveBalls() {
    ballAray.forEach(element => {
        element.moveBall();
    })
}