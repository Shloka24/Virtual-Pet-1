var dog, dogImg;
var happyDogImg, bg;
var database;
var foodS;


function preload()
{
   dogImg = loadImage("Dog.png");
   happyDogImg = loadImage("happydog.png");
   bg = loadImage("background.jpg");
   
}

function setup(){
database = firebase.database();
createCanvas(800,800);

var foodStock = database.ref('Food');
foodStock.on("value", readStock);

dog  = createSprite(400, 600, 50, 50);
dog.scale = 0.3;
dog.addImage(dogImg);


}


function draw() {  
background(bg);

strokeWeight(20);
textSize(30);
fill("black");
text("Food Remaining:" + foodS, 280, 350);
textSize(20);
text("PRESS UP ARROW TO FEED BROWNIE MILK", 200, 50);
  drawSprites();

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){

  if(x<= 0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



