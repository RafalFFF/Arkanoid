const canva = document.querySelector('.board');
const context = canva.getContext('2d');
const ballCount = document.querySelector('#ballCount');

ballCount.style.left=50+'%';

let boxLevel = 1;
let playerLevel = 1;
let canShoot = true;
let readNewCordination = true;
let gameOver = false;


let X2 = 0;
let Y2 = 0;

const boxSize = 50;

/*********************Arrow*********************/
let angle = 0;
let radius = 50;
let circleCordinationX = 175;
let circleCordinationY = 450;
let tempXCor = circleCordinationX;
let newX = 125;
let newY = 450;

let arrowFlag=true;
let readArrowX=true;
function drawArrow() {
    if(arrowFlag){
        context.save();
        context.strokeStyle = 'red';
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(circleCordinationX, circleCordinationY);
        context.lineTo(newX, newY);
        context.stroke();
        context.closePath();
        context.restore()
    }
    context.save();
    context.fillStyle='#efaa07'
    context.beginPath();
    context.arc(circleCordinationX,circleCordinationY,10,0,2*Math.PI);
    context.fill();
    context.restore();
}
/***********************************************/
/*******************Background******************/

function drawBackground(){
    context.save();
    context.fliiStyle='black';
    context.fillRect(0,0,350,450);
    context.restore();
    
    
}
/************************************************/
/*****************Player levels******************/
let bonuses=[];
class Bonus{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.init = function(){
            bonuses.push(this);
        }
    }
    drawBonus(){
        context.save();
        context.strokeStyle='#FFFF00';
        context.lineWidth=3;
        context.beginPath();
        context.arc(this.x,this.y,10,0,Math.PI*2);
        context.fillStyle='#FFFF00';
        context.font="30px Georgia";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText('+', this.x, this.y);
        context.stroke();
        context.closePath();
        context.restore();
    }
    moveDown(){
        this.y+=1;
    }
}
function drawBonuses(){
    bonuses.forEach(bonus=>{
        bonus.drawBonus();
    })
}

let plusX;
let disX;
let newXCordinations = xCordinations;
let activateBonus = new Boolean(false);

function checkFreeSpace(array){
    let flag;
    let tempX;
    let probability=Math.floor(Math.random()*10);
    if(probability>3){
        if(array.length<7){
            activateBonus=true;
            do{
                tempX = Math.floor(Math.random()*7);
                flag=true;
                for(let i=0;i<array.length;i++){
                    if(tempX===array[i]){
                        flag=false;
                    }
                }
            }while(flag!=true);
            plusX=tempX;
            
        }
    }else if(probability<=3){
        activateBonus=false;
    }
}
function createBonus(){
    if(activateBonus==true){
        let bTemp = new Bonus((plusX*boxSize)+25,75);
        bTemp.init();
    }else return;
}

function inBonusRange(){
    bonuses.forEach(bonus=>{
        ballAray.forEach(ball=>{
            let xDistance = (bonus.x-ball.x)*(bonus.x-ball.x);
            let yDistance = (bonus.y-ball.y)*(bonus.y-ball.y);
            if(Math.sqrt(xDistance+yDistance)<ball.r+10){
                bonuses.splice(bonuses.indexOf(bonus),1);
                playerLevel++;
            } 
        })
    })
}
/***********************************************/
/*********************Ball**********************/
function shot(e) {
    if (e.keyCode == 32) {
        arrowFlag=false;
        if (canShoot && !spawnFlag) {
            readNewCordination = !readNewCordination;
            canShoot = !canShoot;
            let counter = 0;
            let bulletInterval = setInterval(() => {
                let temp1 = new Ball(tempXCor, 450, 5);
                temp1.init();
                counter++;
                ballCount.textContent=`x${playerLevel-counter}`;
                if (counter == playerLevel) {
                    clearInterval(bulletInterval);
                }
            }, 150);
        }
    } else if (e.keyCode == 37) {
        if (angle > 0) {
            angle -= 2;
        }
    } else if (e.keyCode == 39) {
        if (angle < 180) {
            angle += 2;
        }
    }
    newX = -radius * Math.cos(angle * (Math.PI / 180)) + circleCordinationX;
    newY = -radius * Math.sin(angle * (Math.PI / 180)) + circleCordinationY;
}
/***********************************************/


/************Colision and endgame***************/
/***********************************************/
function boxColision() {
    ballAray.forEach(ball => {
        boxes.forEach(box => {
            if (ball.x > box.x && ball.x < box.x + boxSize) {
                if(ball.y<=box.y+boxSize && ball.y>=box.y){
                    ball.directionY = -ball.directionY;
                    let tempSound = new Audio();
                    tempSound.src = "sound/hit.mp3";
                    tempSound.play();
                    console.log('trafil');
                    box.counter--;
                    return;
                }
            } else if (ball.y<=box.y+boxSize && ball.y>=box.y) {
                if(ball.x<=box.x+boxSize+5 && ball.x>=box.x-5){
                    ball.directionX = -ball.directionX;
                    let tempSound = new Audio();
                    tempSound.src = "sound/hit.mp3";
                    tempSound.play();
                    console.log('bok');
                    box.counter--;
                    return;
                }
            }
            if (box.counter <= 0) {
                boxes.splice(boxes.indexOf(box), 1);
            }
            
        })
    })
}

let stopGameFlag=false;

function endGame(){
    boxes.forEach(box=>{
        if(box.y+50==450){
            stopGameFlag = true;
        }
    })
}

function drawEndGame(){
    context.save();
    context.fillStyle = 'red';
    context.font="24px Georgia";
    context.fillText(`Koniec twój wynik to ${boxLevel}`,40,212.5);
    context.restore();
}


function checkColision() {
    for (let i = 0; i < ballAray.length; i++) {
        if (ballAray[i].x - ballAray[i].r < 0 || ballAray[i].x + ballAray[i].r >= 350) {
            ballAray[i].directionX = -ballAray[i].directionX;
        } else if (ballAray[i].y - ballAray[i].r <= 0) {
            ballAray[i].directionY = -ballAray[i].directionY;
        } else if (ballAray[i].y > 450 || ballAray[i].y >1500) {
            if(readArrowX){
                circleCordinationX=ballAray[i].x;
                ballCount.style.left=circleCordinationX+"px";
                readArrowX=false;

                   
            }
            ballAray.splice(i, 1);
            if (ballAray.length == 0) {
                newX=circleCordinationX;
                newY=circleCordinationY-50;
                angle=90;
                readArrowX=true;
                arrowFlag=true;
                ballCount.textContent=`x${playerLevel}`;
                boxLevel++;
                readNewCordination = true;
                quantity = 0;
                temp1 = 0;
                moveDown();
                canShoot = true;
                
            }
        }
    }
    boxColision();
}
/***********************************************/
/*****************color change******************/
function changeBoxColors(){
    boxes.forEach(box=>{
        if(box.counter<=boxLevel && box.counter>=boxLevel*0.8){
            box.color='red';
        }else if(box.counter<boxLevel*0.8 && box.counter>=boxLevel*0.6){
            box.color='orangered';
        }else if(box.counter<boxLevel*0.6 && box.counter>=boxLevel*0.4){
            box.color='darkorange';
        }else if(box.counter<boxLevel*0.4 && box.counter>=boxLevel*0.2){
            box.color='orange';
        }else if(box.counter<boxLevel*0.2){
            box.color='gold';
        }
    })
}
/***********************************************/
/********blocking change of trajectory**********/
function chceckNewCordainations() {
    if (readNewCordination) {
        tempXCor = circleCordinationX;
        X2 = newX;
        Y2 = newY;
    }
}
/***********************************************/
/*****************first boxes*******************/
function createBox() {
    for (let i = 0; i < quantity; i++) {
        let temp = new Box(xCordinations[i] * boxSize, 50,'red');
        temp.init();
    }
}
/************************************************/
/****************move down object****************/
function moveDown() {
    spawnFlag = false;
    let i = setInterval(() => {
        boxes.forEach(box => {
            box.moveDown();
        })
        bonuses.forEach(bonus=>{
            bonus.moveDown();
        })
        mdCounter++;
        if (mdCounter >= 50) {
            clearInterval(i);
            mdCounter = 0;
            spawnFlag = true;
        }
    }, 14);
}
/****************************************************/
/****************************************************/
createBox();
checkFreeSpace(xCordinations);
createBonus();


/****************************************************/
/****************Spawning new boxes *****************/
function spawNewBox() {
    if (spawnFlag == true) {
        draw();
        createBox();
        newXCordinations=[];
        newXCordinations=xCordinations;
        checkFreeSpace(xCordinations);
        createBonus();
        spawnFlag = false;
    }
}

/****************************************************/
/*******************Main function********************/
function main() {
    context.clearRect(0, 0, canva.width, canva.height);
    drawBackground();
    drawArrow();

    chceckNewCordainations();
    
    spawNewBox();
    drawBoxes();
    changeBoxColors();

    drawBonuses();
    inBonusRange();
    
    checkColision();
    drawBalls();
    moveBalls();
    endGame();

    let myRequest=requestAnimationFrame(main);
    if(stopGameFlag){
        cancelAnimationFrame(myRequest);
        context.clearRect(0, 0, canva.width, canva.height);
        drawBackground();
        drawEndGame();
        ballCount.style.display="none";
        let endSound = new Audio();
        endSound.src = "sound/end.mp3"
        endSound.play();
    }
    
}
main();


document.addEventListener("keydown", shot);