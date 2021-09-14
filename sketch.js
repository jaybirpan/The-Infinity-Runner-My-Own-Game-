var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround, backgroundimage;
var gameOver,gameOverImg;
var player,player_run, player_dead;
var ground,invisibleGround, groundImage, topGround,topGroundImage;
var obstaclesGroup,rock1,rock2,rock3,rock4,rock5,rock6;
var cloud1,cloud2,cloud3,cloud4, cloudsGroup;
var treesGroup,pinktree,greentree1,greentree2,greentree3,greentree4,greentree5,greentree6;
var score=0;

function preload(){
    player_run= loadAnimation("Images/Run1.png","Images/Run2.png","Images/Run3.png","Images/Run4.png","Images/Run5.png","Images/Run6.png","Images/Run7.png","Images/Run8.png");
    backgroundimage= loadImage("Images/background.png");
    gameOverImg = loadImage("Images/Game Over.png");
    groundImage= loadImage("Images/Ground.png");
    topGroundImage= loadImage("Images/Top Ground.png");
    clouds= loadImage("Images/clouds.png")
    rock1= loadImage("Images/rock1.png");
    rock2= loadImage("Images/rock2.png");
    rock3= loadImage("Images/rock3.png");
    rock4= loadImage("Images/rock4.png");
    rock5= loadImage("Images/rock5.png");
    rock6= loadImage("Images/rock6.png");
    cloud1= loadImage("Images/cloud1.png");
    cloud2= loadImage("Images/cloud2.png");
    cloud3= loadImage("Images/cloud3.png");
    cloud4= loadImage("Images/cloud4.png");
    pinktree= loadImage("Images/pinktree1.png");
    greentree1= loadImage("Images/greentree1.png");
    greentree2= loadImage("Images/greentree2.png");
    greentree3= loadImage("Images/greentree3.png");
    greentree4= loadImage("Images/greentree4.png");
    greentree5= loadImage("Images/greentree5.png");
    greentree6= loadImage("Images/greentree6.png");
}

function setup(){
    createCanvas(1500,650);

    backGround= createSprite(width/2,height/2);
    backGround.addImage("backGround",backgroundimage);
    backGround.x = backGround.width/2

    player = createSprite(100,518,20,50);
    player.addAnimation("running",player_run);
    player.scale = 0.7;
    player.setCollider("rectangle",0,0,player.width,player.height-20);

    ground= createSprite(width/2,height-40);
    ground.addImage("ground",groundImage);
    ground.x = ground.width/2
    //ground.velocityX = -(2 + 3*score/100);

    invisibleGround = createSprite(width/2,height-83,width,10);
    invisibleGround.visible = false;

    topGround= createSprite(width/2,height-550);
    //topGround.velocityX = -(2 + 3*score/100);
    topGround.addImage("topGround",topGroundImage);
    topGround.x = topGround.width/2;
    
    ground.velocityX=-5;
    topGround.velocityX=-5;
    backGround.velocityX=-5;

    gameOver = createSprite(750,325);
    gameOver.addImage("gameOver",gameOverImg);
    gameOver.scale = 0.5;
    gameOver.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();
    treesGroup = new Group();

    score = 0;
    player.debug=true;
    
}

function draw(){
    background(0);    
      
    if (gameState===PLAY){

        score = score + Math.round(getFrameRate()/60);
        //ground.velocityX = -(2 + 3*score/100);
        //topGround.velocityX = -(2 + 3*score/100);

        if(keyDown("space") && player.y >= 500) {
                player.velocityY = -19;

      }
        player.velocityY = player.velocityY + 0.9

        if (backGround.x < 0){
        backGround.x = backGround.width/2;

      }

        if (ground.x < 0){
        ground.x = ground.width/2;

      }

        if (topGround.x < 0){
        topGround.x = topGround.width/2;

      }
        if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }

      player.collide(invisibleGround);
      spawnTrees();
      spawn();
      spawnClouds();
    }  

    else if (gameState === END) {

        gameOver.visible = true;

        //set velcity of each game object to 0
        ground.velocityX = 0;
        player.velocity= 0;
        topGround.velocityX=0;
        backGround.velocityX=0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
        treesGroup.setVelocityXEach(0);
        
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        treesGroup.setLifetimeEach(-1);

         }
     
    drawSprites();
    textSize(30);
    fill("white");
    text("Score: "+ score, 1350,30);
}
function spawn(){
  if (frameCount%200===0){
    var obstacle = createSprite(width+10,528,10,40);
    //obstacle.velocityX = -(4 + 3*score/100);
    //obstacle.debug = true;
    obstacle.velocityX = -5;
    obstacle.debug=false;
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(rock1);
              break;
      case 2: obstacle.addImage(rock2);
              break;
      case 3: obstacle.addImage(rock3);
              break;
      case 4: obstacle.addImage(rock4);
              break;
      case 5: obstacle.addImage(rock5);
              break;
      case 6: obstacle.addImage(rock6);
              break;
      default: break;
    }
     //assign scale and lifetime to the obstacle           
     obstacle.scale = 2;
     obstacle.setCollider("circle",0,0,20);
     obstacle.lifetime = 350;
     //add each obstacle to the group
     obstaclesGroup.add(obstacle);
     
  }
     
}

function spawnTrees(){
        if (frameCount%150===0){
          var trees = createSprite(width+5,450,10,40);
          //trees.velocityX = -(2 + 3*score/100);
          //obstacle.debug = true;
          trees.velocityX = -5;
          trees.debug=false
          ;
      
          //generate random Tress
          var rand = Math.round(random(1,7));
          switch(rand) {
            case 1: trees.addImage(pinktree);
                    break;
            case 2: trees.addImage(greentree1);
                    break;
            case 3: trees.addImage(greentree2);
                    break;
            case 4: trees.addImage(greentree3);
                    break;
            case 5: trees.addImage(greentree4);
                    break;
            case 6: trees.addImage(greentree5);
                    break;
            case 7: trees.addImage(greentree6);
                    break;
            default: break;
          }
           //assign scale and lifetime to the obstacle           
           trees.scale = 2.3;
           trees.lifetime = 350;
           player.depth=trees.depth+1
           ground.depth=trees.depth+1
           treesGroup.add(trees);
        }
}

function spawnClouds() {
        //write code here to spawn the clouds
        if (frameCount % 150 === 0) {
          var cloud = createSprite(1600,200,10,40);
          var rand = Math.round(random(1,4));
          switch(rand) {
            case 1: cloud.addImage(cloud1);
                    break;
            case 2: cloud.addImage(cloud2);
                    break;
            case 3: cloud.addImage(cloud3);
                    break;
            case 4: cloud.addImage(cloud4);
                    break;
            default: break;
          }
          cloud.scale = 1;
          cloud.velocityX = -10;
          
           //assign lifetime to the variable
          cloud.lifetime = 400;
          cloud.depth=topGround.depth-1;
          cloudsGroup.add(cloud);
        }
        
      }