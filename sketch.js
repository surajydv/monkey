var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage

var foodGroup
var obstaclesGroup
var survivalTime=0;
var score=0

var gameOver, restart;

//localStorage["HighestScore"] = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
monkey_collided=loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(0,190,1200,10);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*survivalTime/100);
  
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
survivalTime=0;
}

function draw() {
  background("blue");
  textSize(20);
  fill(255);
  text("survivalTime: "+ survivalTime, 400,20);
text("score: "+ score, 400,40);
  drawSprites();
  if (gameState===PLAY){
  survivalTime  = survivalTime + Math.round(getFrameRate()/60);
    if(monkey.isTouching(foodGroup)){
      score=score+1;
      foodGroup[0].destroy()
    
    }
  
    if(keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 12
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
    
    spawnBanana();
    spawnObstacles();
  
   if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    } 
  }
   else if (gameState === END ) {
  
    monkey.addAnimation("collided", monkey_collided);
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //change the trex animation
    monkey.changeAnimation("collided",monkey_collided);
    monkey.scale =0.1;
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    }
  }


function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each coins to the group
    foodGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);    
    //generate random obstacles
      obstacle.addImage(obstacleImage)  
    obstacle.velocityX = -(6 + 3*survivalTime/100);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  monkey.changeAnimation("running",monkey_running);
  monkey.scale =0.1;
  /*if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }*/
  
  score = 0;
  

}






