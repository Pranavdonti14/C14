var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1
var END = 0
var gamestate = PLAY
var obstacle_group, cloud_group


var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png")
 
  obstacle1Image = loadImage("obstacle1.png")
  obstacle2Image = loadImage("obstacle2.png")
  obstacle3Image = loadImage("obstacle3.png")
  obstacle4Image = loadImage("obstacle4.png")
  obstacle5Image = loadImage("obstacle5.png")
  obstacle6Image = loadImage("obstacle6.png")
}

function setup() {

  createCanvas(600,200)
  obstacle_group = new Group()
  cloud_group = new Group()
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

}

function draw() {
  //set background color
  background(180);
  text("Score:"+score,500,50)
  if (gamestate === PLAY){
ground.velocityX = -4
score = score+Math.round(frameCount/60)
if (ground.x < 0){
ground.x = ground.width/2;
}
if(keyDown("space")&& trex.y >= 100) {
  trex.velocityY = -10;
}
trex.velocityY = trex.velocityY + 0.8
spawnClouds()
spawnObstacles()
if (obstacle_group.isTouching(trex)) {
  gamestate = END
}
  }else if(gamestate === END){
ground.velocityX = 0
obstacle_group.setVelocityXEach(0)
cloud_group.setVelocityXEach(0)
  }


  
  
  // jump when the space key is pressed
 
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
 
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if (frameCount%60 === 0) {
  cloud = createSprite(600,80,40,10)
  cloud.addImage(cloudimage)
  cloud.scale = 0.4
  cloud.velocityX = -4
  cloud.y = Math.round(random(10,80))
  cloud.lifetime = 150
 cloud.depth = trex.depth
 trex.depth = trex.depth+1
 cloud_group.add(cloud)
}
 
}
function spawnObstacles(){
if (frameCount%60 === 0) {
  obstacle = createSprite(600,165,40,80)
  obstacle.velocityX = -4
  obstacle_group.add(obstacle)
var rand = Math.round(random(1,6))
switch(rand){
  case 1 : obstacle.addImage(obstacle1Image)
  break;
  case 2 : obstacle.addImage(obstacle2Image)
  break;
  case 3 : obstacle.addImage(obstacle3Image)
  break;
  case 4 : obstacle.addImage(obstacle4Image)
  break;
  case 5 : obstacle.addImage(obstacle5Image)
  break;
  case 5 : obstacle.addImage(obstacle6Image)
  break;
  default:break
}
obstacle.scale = 0.5
obstacle.lifetime = 150
}
}





