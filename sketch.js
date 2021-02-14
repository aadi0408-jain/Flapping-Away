var PLAY = 1;
var END = 0;
var START;
var gameState = START;
var levelState = "level1";
var start, startImage, rules, rulesImage;
var score;
var level1, level1Image, level2, level2Image, level3, level3Image;
var bg, bgImage;
var ground, groundImage;
var bird, birdImage, sadBirdImage, chickenImage, blast;
var pillarUp, pillarUpImage;
var pillarDown, pillarDownImage;
var laserUp, laserUpImage;
var laserDown, laserDownImage;
var fire, fireImage;
var gun, gunImage, gun2, gun2Image;
var pillarGroup, groundGroup, laserGroup, fireGroup;
var gameOver, gameOverImage;
var youWin, youWinImage;

function preload(){
  
  startImage = loadImage("name.png");
  rulesImage = loadImage("rules.png");
  level1Image = loadImage("level1.png");
  level2Image = loadImage("level2.png");
  level3Image = loadImage("level3.png")
  bgImage = loadImage("bg.jpg");
  groundImage = loadImage("groundImage.png");
  birdImage = loadImage("bird.gif");
  sadBirdImage = loadImage("sadBird.png");
  chickenImage = loadImage("chicken.png");
  blast = loadImage("blast.gif");
  pillarUpImage = loadImage("pillarUp.png");
  pillarDownImage = loadImage("pillarDown.png");
  laserDownImage = loadImage("laserDown.png");
  laserUpImage = loadImage("laserUp.png");
  fireImage = loadImage("fire.gif");
  gunImage = loadImage("gun.gif");
  gun2Image = loadImage("gun2.gif");
  gameOverImage = loadImage("gameOver.gif");
  youWinImage = loadImage("YouWin.png");
  
}
function setup() {
  createCanvas(550, 400);
  
  score = 0;
  
  bg = createSprite(325, 200, 650, 400);
  bg.addImage(bgImage);
  bg.x = bg.width /2;
  
  start = createSprite(200, 50);
  start.addImage(startImage);
  start.visible = true;
  
  rules = createSprite(250, 100);
  rules.addImage(rulesImage);
  rules.visible = true;
  
  bird = createSprite(50,0,20,50);
  bird.addImage(birdImage);
  bird.addImage("sad", sadBirdImage);
  bird.addImage("fry", chickenImage);
  bird.addImage("boom", blast);
  bird.scale = 0.25;
  bird.velocityY = 2;
  
  ground = createSprite(325,250,650,400);
  ground.addImage(groundImage);
  ground.velocityX = -1;
  
  gun = createSprite(325);
  gun.y = Math.round(random(100, 300));
  gun.addImage(gunImage);
  gun.visible = false;
  
  gun2 = createSprite(325);
  gun2.y = Math.round(random(150, 350));
  gun2.addImage(gun2Image);
  gun2.velocityY = 2;
  gun2.visible = false;
  
  level1 = createSprite(275, 200, 50,50);
  level1.addImage(level1Image);
  level1.scale = 0.5;
  level1.visible = true;
  
  level2 = createSprite(275, 200, 50, 50);
  level2.visible = false;
  level2.addImage(level2Image);
  
  level3 = createSprite(275, 200, 50, 50);
  level3.visible = false;
  level3.addImage(level3Image);
  
  bird.setCollider("rectangle",0,0,130,130);
  bird.debug = false;
  
  gameOver = createSprite(250, 200);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  
  youWin = createSprite(275, 200);
  youWin.visible = false;
  youWin.addImage(youWinImage);
  
  pillarGroup = new Group();
  laserGroup = new Group();
  fireGroup = new Group();
  gunGroup = new Group(); 
  
}

function draw() {
  
  background(bgImage);
  
  if (gameState === START){
    if (keyDown("right")){
      gameState = PLAY;
      youWin.visible = false;
    }
  }
  if (gameState === PLAY){
    
    start.visible = false;
    rules.visible = false; 
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    //jump when the space key is pressed
    if(keyDown("space")){
      bird.velocityY = -9;
      level1.visible = false;
      level2.visible = false;
      level3.visible = false;
    }
    
    //add gravity
    bird.velocityY = bird.velocityY + 0.8;
  
      bg.velocityX = -0.3;
      if (bg.x < 0){
      bg.x = bg.width/2;         
    }
  if (pillarGroup.isTouching(bird)){
    gameState = END;
    bird.changeImage("sad", sadBirdImage);
    bird.scale = 0.15;
  }
    
    if (laserGroup.isTouching(bird)){
      gameState = END;
      bird.changeImage("boom", blast);
      bird.scale = 0.15;
    }
    if (fireGroup.isTouching(bird)){
      gameState = END;
      bird.changeImage("fry", chickenImage);
      bird.scale = 0.15;
    }
    if (gun.isTouching(bird)){
      gameState = END;
      bird.changeImage("boom",blast);
      bird.scale = 0.15;
    }
    if (bird.y > 400){
      gameState = END;
      bird.changeImage("sad", sadBirdImage);
      bird.scale = 0.15;
    }
      
    if (levelState === "level1"){
        spawnlevel1(); 
    if (frameCount===1000){
      level2.visible = true;
      levelState = "level2";
          }
    }
    if (levelState === "level2"){
        spawnlasers();
      if (frameCount===2000){
      level3.visible = true;
      levelState = "level3";
      }
    }
    if (levelState === "level3"){
      spawnFire();                 
    }
  if (frameCount === 3000){
    youWin.visible = true;
  }
  if (frameCount === 2200){
    gun2.visible = true;
  }
   if (frameCount%500 === 0){
    gun.visible = false;
   }
  spawnGround();  
  spawnGuns();
            
    
  }
  
  else if(gameState === END){
    bird.velocityY = 1;
    bird.velocityX = 1;
    level1.destroy();
    level2.destroy();
    level3.destroy();
    bg.velocityX = 0;
    gameOver.visible = true;
    gun.destroy();
    gun2.destroy();
    }
  
  drawSprites();
  fill("black");
  textSize(20);
  text("Score: "+ score, 400, 50);
  
}
  function spawnGround(){
  if (frameCount%25 === 0){
  ground = createSprite(325,250,650,400);
  ground.addImage(groundImage);
      ground.velocityX = -4;
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
}
}
function spawnlevel1(){
if (frameCount%75 === 0){                                   
  pillarDown = createSprite(550, 20, 100);
  pillarDown.y = Math.round(random(10, 50));
  pillarDown.addImage(pillarDownImage);
  pillarDown.velocityX = -6;
  
  pillarUp = createSprite(550, 20, 100);
  pillarUp.y = Math.round(random(330, 390));
  pillarUp.addImage(pillarUpImage);
  pillarUp.velocityX = -6;
  
  pillarGroup.add(pillarDown);
  pillarGroup.add(pillarUp);

}
}
function spawnlasers(){
      
      if (frameCount%75 === 0){
           
      laserDown = createSprite(550, 20, 100);
      laserDown.y = Math.round(random(10, 50));
      laserDown.scale = 0.3;
      laserDown.addImage(laserUpImage);
      laserDown.velocityX = -8;
      
      laserUp = createSprite(550, 20, 100);
      laserUp.y = Math.round(random(330, 380));
      laserUp.scale = 0.2;
      laserUp.addImage(laserDownImage);
      laserUp.velocityX = -8;
      
      laserGroup.add(laserDown);
      laserGroup.add(laserUp);
      }
  }

function spawnFire(){
  
  if (frameCount%50 === 0){
    fire = createSprite(550, 350);
    fire.y = Math.round(random(150, 250));
    fire.addImage(fireImage);
    fire.scale = 0.5;
    fire.velocityX = -11;   
    fire.setCollider("rectangle", 0, 0, 90, 320);
    fire.debug = false;
    fireGroup.add(fire);
  }
}
function spawnGuns(){
  if (frameCount%400 === 0){
    gun.visible = true;
  }
}