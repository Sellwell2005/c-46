var bg,bgImg;
var player, shooterImg, shooter_shooting, zombieimg, zombieimg1, bulletimg
var zombies
var zombieGroup, bulletsGroup
var bullets = 50
var zombie_hand
var h1,h2,h3
var life = 3
var PLAY = 2
var WIN = 1
var LOSE = 0
var gameState = PLAY
var bullets_stack
var score = 0



function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieimg = loadImage("assets/zombie.png")
  zombieimg1 = loadImage("assets/zombie1.png")
  bulletimg = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombie_hand = loadImage("assets/zombie_hand.png")
  h1 = loadImage("assets/heart_1.png")
  h2 = loadImage("assets/heart_2.png")
  h3 = loadImage("assets/heart_3.png")
  bullets_stack = loadImage("assets/bullet logo.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup = new Group()
   bulletsGroup = new Group()

Heart1 = createSprite(displayWidth-150,40,20,20)
Heart1.addImage(h1)
Heart1.visible = false
Heart1.scale = 0.3


Heart2 = createSprite(displayWidth-100,40,20,20)
Heart2.addImage(h2)
Heart2.visible = false
Heart2.scale = 0.3

Heart3 = createSprite(displayWidth-150,40,20,20)
Heart3.addImage(h3)
Heart3.visible = true
Heart3.scale = 0.3

bulletL = createSprite(displayWidth-350,40,10,10)
bulletL.addImage(bullets_stack)
bulletL.scale = 0.1

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullet = createSprite(player.x, player.y - 20,10,10)
  bullet.velocityX = 5
  bullet.addImage(bulletimg)
  bullet.scale = 0.15
  bulletsGroup.add(bullet)
  bullets = bullets-1
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

zombieGroup.overlap(bulletsGroup,function(zo,bu){
//zo.addImage(zombie_hand)
  zo.remove()
  bu.remove()
})

zombieGroup.overlap(player,function(zo,pl){
  life = life-1
  zo.destroy()
})

  if(life == 2){
    Heart2.visible = true
    Heart1.visible = false
    Heart3.visible = false
  }
  if(life == 1){
    Heart2.visible = false
    Heart1.visible = true
    Heart3.visible = false
}

if(life === 0){
  gameState = LOSE
  Heart1.visible = false
}

spawnZombies()

drawSprites();

textSize(20)
fill("white")
text("SCORE = "+ score, displayWidth-550,50)
text(bullets,displayWidth-330,55)

}
function spawnZombies() {
  if(frameCount%100 == 0) {
  zombies = createSprite(width,random(100,600),10,10)
  zombies.velocityX = -5;
  zombies.lifetime = 300
  rand = Math.round(random(1,2))
  if(rand === 1){
    zombies.addImage(zombieimg)
    zombies.scale = 0.15
  }
  else{
    zombies.addImage(zombieimg1)
    zombies.scale = 0.6
  }
  zombieGroup.add(zombies)

  }
}
