
var hamster1,hamster2,hamster3, hamster4,hamsterImg,hamster;
var cheese;
var player, playerImg1, playerImg2;
var player_Animation;
var score = 0;
var hit = 0;
var backgroundImg;
var hammerSound;
var gameState=0;
var name,start;
var restart,restartImg;
var backSound1, backSound2;
var checkSound;
var gameoverSound;

function preload()
{
    hamsterImg = loadImage("images/hamster3.png");
    playerImg1 = loadImage("images/Boy 1.png");
    playerImg2 = loadImage("images/Boy 2.png");
    player_Animation = loadAnimation("images/Boy 1.png", "images/Boy 2.png");
  
    cheeseImg=loadImage("images/cheese.png");
    //backgroundImg = loadImage("images/roadback.jpg");
    hammerSound = loadSound("sounds/Hammer1.mp3");
    startImg=loadImage("images/start.png");
    restartImg = loadImage("images/restart.png");

    backSound1 = loadSound("sounds/retro.mp3")
    backSound2 = loadSound("sounds/backSound2.mp3")
    checkSound = loadSound("sounds/checkPoint.mp3");
    gameoverSound = loadSound("sounds/game_over.mp3")
}

function setup()
{
   createCanvas(displayWidth-200,displayHeight-200);
   
  
   //backSound2.play();
   
   hamster1 = createHamster(0,0);  
   hamster2 = createHamster(980,0);   
   hamster3 = createHamster(0,500);    
   hamster4 = createHamster(980,500);
      
   player = createSprite(displayWidth/2, displayHeight/2);
   player.addImage(playerImg1);
   player.scale = 0.4;
 
   hamster4.visible=true;
  
    player.x=300;
    player.y=300;

   cheese=createSprite(displayWidth/2-100,displayHeight/2+100);
   cheese.addImage(cheeseImg);
   cheese.scale=0.5;
   //cheese.debug=true;
   cheese.setCollider("circle",0,20,200);
   
   start = createSprite(600,200);
   start.scale = 0.5
   start.addImage(startImg);


   restart = createSprite(440,250);
   restart.scale = 0.25;
   restart.addImage(restartImg);
   restart.visible = false;
}

function createHamster(x,y)
{
  hamster = createSprite(x,y,40,40);
  hamster.addImage(hamsterImg);
  hamster.scale = 0.2;
  hamster.visible=false;
  return hamster;
}

function draw()
{
  background("red");
   
   if(score>0 && score%100 === 0)
    {
        checkSound.play() 
    } 
    
  if(gameState==0)
  {   
    fill("white");
    textSize(20);    
    text("Press START to BEGIN and 'a' key to hit the hamster",400,300);
    fill("cyan");
    textFont("Arial");
    text("Dont Let the Hamster Eat Your Cheese!! ",400,350);
   if(mousePressedOver(start))
   {
     startgame();
     backSound1.loop();
     start.destroy();
   }
 
  }
 
if(gameState==1)
{
  player.x = mouseX;
  player.y = mouseY;
spawnHamsters();
if(hamster1.isTouching(cheese)||hamster2.isTouching(cheese) ||
hamster3.isTouching(cheese)||hamster4.isTouching(cheese))
{
  gameState=2;
  cheese.destroy();
}
    if(keyWentDown("a"))
  {
    hammerSound.play();
    player.addImage(playerImg2);
    hit = 1;
  }
 
  if(keyWentUp("a"))
  {
    player.addImage(playerImg1);
    hit = 0;
  }
  
  if(player.isTouching(hamster1) && hit===1)
  {
    score = score+1;
    hamster1.destroy();
    hamster1=createHamster(0,0);
    hamster1.setVelocity(3,3);
     }
  else if(player.isTouching(hamster2) && hit===1)
  {
    score = score+1;
    hamster2.destroy();
    hamster2=createHamster(980,0);
    hamster2.setVelocity(-3,3);
     }
  else if(player.isTouching(hamster3) && hit===1)
  {
    score = score+1;
    hamster3.destroy();
    hamster3=createHamster(0,500);
    hamster3.setVelocity(3,0);
     }
  else if(player.isTouching(hamster4) && hit===1 )
  {
    score = score+1;
    hamster4.destroy();
    //hamster4=createHamster(980,500);
    //hamster4.setVelocity(-1,0);
       
  }
    }
    if(gameState==2)
    {
      //GAME OVER 
      textSize(40);
      fill("white");
      text("CHEESE GONE !!!GAME OVER",200,200);
     
      hamster1.setVelocity(0,0);
      hamster2.setVelocity(0,0);
      hamster3.setVelocity(0,0);
      hamster4.setVelocity(0,0);
      player.x=200;
      player.y=400;
      restart.visible = true;
      backSound1.stop();
     // gameoverSound.play();
      
       if(mousePressedOver(restart))
    {
     console.log("restart");
     backSound1.loop();
     restartGame();
     restart.visible = false;
       }

    }
    if(gameState==1 || gameState==2){
   //display score 
  fill("white");
  textSize(22);
  text("Score: "+score,displayWidth-350,70);
    }
  drawSprites();
 
}
function startgame()
{
  gameState=1;
}
function spawnHamsters()
{
  hamster1.visible=true;
  hamster2.visible=true;
  hamster3.visible=true;
  hamster4.visible=true;
  
  hamster1.velocityX=3;
  hamster1.velocityY=3;
    
  hamster4.velocityX=-3;
  hamster4.velocityY=0;
  player.visible=true;
   
if(frameCount%50===0)
 {
   hamster2.velocityX=-3;
   hamster2.velocityY=3;
   }

 if(frameCount%70===0)
 {
   hamster3.velocityX=3;
   hamster3.velocityY=0;

 }
 if(frameCount%90===0)
 {
   hamster4.velocityX=-3;
   hamster4.velocityY=0;
  }

}
function restartGame()
{ 
  cheese=createSprite(displayWidth/2-100,displayHeight/2+100);
   cheese.addImage(cheeseImg);
   cheese.scale=0.5;
   gameState=1;
  
   //send the hamsters to original locations
   hamster1.x=0;
   hamster1.y=0;
   hamster2.x=980;
   hamster2.y=0;
   hamster3.x=0;
  hamster3.y=500;
  hamster4.x=980;
  hamster4.y=500;
}


 
