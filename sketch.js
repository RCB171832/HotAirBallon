var bg, bgImg;
var balloon, balloonImg;
var obsTop1, obsTop2, obsTop;
var obsBottom1, obsBottom2, obsBottom3;
var obsTopGroup, obsBottomGroup;
var restart, restartImg;
var gameOver, gameOverImg;
var gameState = "play";

function preload (){
    bgImg = loadImage("assets/bg.png");
    balloonImg = loadAnimation("assets/balloon1.png",
     "assets/balloon2.png",
     "assets/balloon3.png" );
     obsTop1 = loadImage("assets/obsTop1.png");
     obsTop2 = loadImage("assets/obsTop2.png");
     obsBottom1 = loadImage("assets/obsBottom1.png");
     obsBottom2 = loadImage("assets/obsBottom2.png");
     obsBottom3 = loadImage("assets/obsBottom3.png");
     restartImg = loadImage("assets/restart.png");
     gameOverImg = loadImage("assets/gameOver.png");
}

function setup(){
    createCanvas(600, 400);
    bg = createSprite(300, 300);
    bg.addImage(bgImg);
    balloon = createSprite(100, 200);
    balloon.addAnimation("balloon", balloonImg);
    balloon.scale = 0.2;
    balloon.debug = true;

    restart = createSprite(300, 200);
    restart.addImage(restartImg);
    restart.scale = 0.7;
    restart.visible = false;


    gameOver = createSprite(300, 150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.7;
    gameOver.visible = false;

    obsTopGroup = new Group();
    obsBottomGroup = new Group();
}

function draw(){
    background(0);
    if(gameState === "play"){
    if(keyDown("SPACE")){
        balloon.velocityY = -6; 
    }
    balloon.velocityY = balloon.velocityY +2;
    if(balloon.isTouching(obsTopGroup) || balloon.isTouching(obsBottomGroup)) {
        gameState = "end";
    }
    }
    if(gameState === "end"){
        gameOver.visible = true;
        restart.visible = true;
        balloon.y = 200;
        balloon.velocityY = 0;
        obsTopGroup.setVelocityXEach(0);
        obsBottomGroup.setVelocityXEach(0);
        obsTopGroup.setLifetimeEach(-1);
        obsBottomGroup.setLifetimeEach(-1);

        if(mousePressedOver(restart)){
            reset();
        }
    }
    spawnObsTop();
    spawnObsBottom();
    drawSprites();
}

function reset(){
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
    obsTopGroup.destroyEach();
    obsBottomGroup.destroyEach();
}
function spawnObsTop(){
    if(frameCount%60 === 0){
        obsTop = createSprite(600, 50, 40, 50);
        
        obsTop.scale = 0.08;
        obsTop.velocityX = -2;
        obsTop.y = random(10, 100);
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obsTop.addImage(obsTop1);
            break;
            case 2: obsTop.addImage(obsTop2); 
            break;
            default: break;
        }
        obsTop.lifetime = 300;
        obsTopGroup.add(obsTop);
    }
}

function spawnObsBottom(){
    if(frameCount%80 === 0){
        obsBottom = createSprite(600, 350, 40, 50);
        
        obsBottom.scale = 0.08;
        obsBottom.velocityX = -2;
        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obsBottom.addImage(obsBottom1);
            break;
            case 2: obsBottom.addImage(obsBottom2);
            break;
            case 3: obsBottom.addImage(obsBottom3); 
            break;
            default: break;
        }
        obsBottom.lifetime = 300;
        obsBottomGroup.add(obsBottom);
    }
}