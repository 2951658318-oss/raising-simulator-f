let bg;
let character;
let characterOpen;
let objectImg;

let itemX = 300;
let itemY = 300;
let startX = 300;
let startY = 300;

let itemWidth = 170;
let itemHeight;

let dragging = false;
let isHover = false;
let nearCharacter = false;

let itemVisible = true;

let eating = false;
let eatOpen = false;
let eatCount = 0;
let eatTimer = 0;

function preload(){
  bg = loadImage("assets/tbg.JPG");
 character = loadImage("assets/cha/ori1.PNG");
characterOpen = loadImage("assets/cha/ori2.PNG");
objectImg = loadImage("assets/items/alchol.PNG");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){

  background(255);

  gameScale = min(
    width / 1920,
    height / 1080
  );
let worldMouseX = (mouseX - (width - 1920 * gameScale) / 2) / gameScale;
let worldMouseY = (mouseY - (height - 1080 * gameScale) / 2) / gameScale;
  push();

 translate(
  (width - 1920 * gameScale) / 2,
  (height - 1080 * gameScale) / 2
);
    (height - 1080 * gameScale) / 2
  

  scale(gameScale);


  // 这里以后全部按照1920×1080写
  image(bg,0,0,1920,1080);

drawingContext.shadowBlur = 40;
drawingContext.shadowColor =  "#5da6ff";
 if (eating) {

  eatTimer++;

  if (eatTimer > 15) {

    eatTimer = 0;

    eatOpen = !eatOpen;

    if (eatOpen) {
      eatCount++;
    }

  }


  if (eatOpen) {

    image(characterOpen,650,300,620,620);

  } else {

    image(character,650,300,620,620);

  }


 if (eatCount >= 4) {

  eating = false;
  eatCount = 0;

  itemVisible = true;
  itemX = startX;
  itemY = startY;

}


} else if (nearCharacter) {

  image(characterOpen,650,300,620,620);

} else {

  image(character,650,300,620,620);

}
drawingContext.shadowBlur = 0;

itemHeight = objectImg.height * (itemWidth / objectImg.width);


isHover =
  worldMouseX > itemX &&
  worldMouseX < itemX + itemWidth &&
  worldMouseY > itemY &&
  worldMouseY < itemY + itemHeight;
  if (dragging) {
  itemX = worldMouseX - itemWidth / 2;
  itemY = worldMouseY - itemHeight / 2;
}
let itemCenterX = itemX + itemWidth / 2;
let itemCenterY = itemY + itemHeight / 2;

let characterCenterX = 650 + 620 / 2;
let characterCenterY = 300 + 620 / 2;

let distance = dist(
  itemCenterX,
  itemCenterY,
  characterCenterX,
  characterCenterY
);
if (distance < 180) {
  nearCharacter = true;
} else {
  nearCharacter = false;
}
let drawWidth = isHover ? itemWidth * 0.95 : itemWidth;
let drawHeight = isHover ? itemHeight * 0.95 : itemHeight;
if (itemVisible) {

  image(
    objectImg,
    itemX + (itemWidth - drawWidth) / 2,
    itemY + (itemHeight - drawHeight) / 2,
    drawWidth,
    drawHeight
  );

}
if (isHover) {

  // 半透明黑色方框
  fill(0, 120);
  rect(430, 500, 260, 95);

  // 标题
  fill(255);
  textSize(32);
  text("鸡尾酒", 435, 540);

  // 介绍
  textSize(22);
  text("为什么我不能在马尔代夫", 435, 575);

}

pop();


}
function mousePressed() {

  if (isHover) {
    dragging = true;
  }

}
function mouseReleased() {

  dragging = false;

  if (nearCharacter) {

    // 喂食成功
    itemVisible = false;

    eating = true;
    eatCount = 0;
    eatTimer = 0;

  } else {

    // 回原位
    itemX = startX;
    itemY = startY;

  }

}


