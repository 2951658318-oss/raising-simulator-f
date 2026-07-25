let gameState = "start";
let myFont;
let resultType = "";
let finishHover = false;
let finishScale = 1;
let restartHover = false;
let restartScale = 1;
let bg;
let character;
let characterOpen;
let gameScale;
let objects = [];
let items = [];
let itemPool = [];
let slots = [];
let totalScores = {

  collector: 0,
  dreamer: 0,
  observer: 0,
  resonator: 0,
  creator: 0,
  thinker: 0,
  player: 0,
  performer: 0

};
let collectorImg;
let dreamerImg;
let observerImg;
let resonatorImg;
let creatorImg;
let thinkerImg;
let playerImg;
let performerImg;
let startImg;
let secretImg;
let emptyImg;
let dialogueBox;
let showDialogue = false; // 是否显示对话框
let dialogueText = "";    // 当前显示的文字
let dialogueTimer = 0;    // 对话计时
let dialogues = [
  "我喜欢这个。",
  "这个感觉很熟悉。",
  "谢谢。",
  "这让我想到一些东西。",
  "我感觉很好。",
  "好像在哪里见过。",
  "这个让我觉得安心。",
  "我想要更多。"
];
let dragging = false;
let draggingItem = null;
let dialogueActive = false;
let hoverItem = null;

let nearCharacter = false;

let eating = false;
let eatOpen = false;
let eatTimer = 0;
let eatCount = 0;
let fedCount = 0;

// 对话出现次数计数
let dialogueCount = 0;

let worldMouseX = 0;
let worldMouseY = 0;



// ======================
// 加载资源
// ======================

/**
 * 加载背景图片资源
 * 加载游戏主背景和场景背景图片
 */
function loadBackgroundAssets(){
   bg = loadImage(
    "assets/tbg.JPG"
  );
}

/**
 * 加载角色图片资源
 * 加载角色常态图和张嘴图
 */
function loadCharacterAssets(){
 
  character = loadImage(
    "assets/cha/ori1.PNG"
  );
  characterOpen = loadImage(
    "assets/cha/ori2.PNG"
  );
}

/**
 * 加载字体资源
 * 加载游戏中使用的字体文件
 */
function loadFontAssets(){
  myFont = loadFont(
    "assets/fonts/SiYuanSongTiRegular/SourceHanSerifCN-Medium-6.otf"
  );
}

/**
 * 加载游戏数据
 * 从JSON文件加载游戏对象数据
 */
function loadGameData(){
  objects = loadJSON(
    "data/objects.json"
  );
}

/**
 * 加载结果类型图片资源
 * 加载8种不同的性格结果对应的展示图片
 */
function loadResultImages(){
  collectorImg = loadImage("assets/result/collector.JPG");
  dreamerImg = loadImage("assets/result/dreamer.JPG");
  observerImg = loadImage("assets/result/observer.JPG");
  resonatorImg = loadImage("assets/result/resonator.JPG");
  creatorImg = loadImage("assets/result/creator.JPG");
  thinkerImg = loadImage("assets/result/thinker.JPG");
  playerImg = loadImage("assets/result/player.JPG");
  performerImg = loadImage("assets/result/performer.JPG");
}

/**
 * 加载界面图片资源
 * 加载开始界面、隐藏结局和空结果的图片
 */
function loadUIScreens(){
  startImg = loadImage("assets/s.JPG");
  secretImg = loadImage("assets/result/staff.JPG");
  emptyImg = loadImage("assets/result/none.JPG");
}

function preload(){
  loadBackgroundAssets();
  loadCharacterAssets();
  loadFontAssets();
  loadGameData();
  loadResultImages();
  loadUIScreens();
  dialogueBox = loadImage("assets/bubble.PNG");
}

function setup(){
  textStyle(BOLD);
  // 创建全屏画布
  createCanvas(windowWidth, windowHeight);
  // 设置字体
  textFont(myFont);
  generateSlots();

  createItems();
}

// ======================
// 固定物品位置
// ======================

function generateSlots(){

slots = [

{x:270,y:220},
{x:480,y:230},
{x:280,y:440},
{x:480,y:440},
{x:280,y:640},
{x:480,y:640},


// 左中
{x:670,y:200},
{x:670,y:440},
{x:670,y:700},


// 右中
{x:1290,y:200},
{x:1200,y:490},
{x:1250,y:700},


// 右侧
{x:1500,y:240},
{x:1680,y:240},
{x:1450,y:440},
{x:1700,y:440},
{x:1500,y:640},
{x:1700,y:640},


// 中间补充
{x:1120,y:350},
{x:1020,y:220},
{x:840,y:190},


// 边角
{x:100,y:320},
{x:90,y:570},
{x:390,y:820},
{x:1110,y:850},
{x:890,y:800},

{x:700,y:880},
{x:1400,y:880},

// 四角
{x:90,y:90},
{x:1670,y:50},
{x:90,y:820},
{x:1620,y:850}


];

}


// ======================
// 创建物品
// ======================

function createItems(){

items = [];


itemPool = Object.values(objects);

itemPool.sort(()=>random(-1,1));

for(
let i = 0;
i < slots.length;
i++
){


let obj = itemPool.shift();


items.push({

img:loadImage(
obj.image
),


name:obj.name,


description:obj.description,


scores:obj.scores,


x:slots[i].x,

y:slots[i].y,


homeX:slots[i].x,

homeY:slots[i].y,


width:150,


visible:true


});


}


console.log(
"显示物品:",
items.length
);


}



// ======================
// 窗口变化
// ======================

function windowResized(){

resizeCanvas(
windowWidth,
windowHeight
);

}



// ======================
// 主循环 DRAW
// ======================

function draw(){
  
gameScale = min(width / 1920, height / 1080);
background(255);

if(gameState == "start"){

  drawStart();
  drawStartScreenText();
  return;

}

gameScale = min(
width / 1920,
height / 1080
);



worldMouseX =
(mouseX -
(width - 1920 * gameScale)/2)
/
gameScale;



worldMouseY =
(mouseY -
(height - 1080 * gameScale)/2)
/
gameScale;



push();



translate(

(width - 1920 * gameScale)/2,

(height - 1080 * gameScale)/2

);



scale(gameScale);

if(gameState == "result"){

  drawResult();

  return;

}

// ======================
// 背景
// ======================


image(
bg,
0,
0,
1920,
1080
);


// ======================
// 角色 + 光晕
// ======================


drawingContext.shadowBlur = 40;

drawingContext.shadowColor =
"#5da6ff";



if(eating){


eatTimer++;



if(eatTimer > 15){


eatTimer = 0;


eatOpen = !eatOpen;


if(eatOpen){

eatCount++;

}

}



if(eatOpen){

image(
characterOpen,
650,
300,
620,
620
);

}

else{

image(
character,
650,
300,
620,
620
);

}



if(eatCount >=4){

  eating=false;

  eatCount=0;


  // 随机触发对话
  // 20%的概率出现
  if(random(1) < 0.2){

    showDialogue = true;

    dialogueText = random(dialogues);

    dialogueTimer = millis();

  }

}



}

else{


if(nearCharacter){


image(
characterOpen,
650,
300,
620,
620
);


}

else{


image(
character,
650,
300,
620,
620
);


}


}

drawingContext.shadowBlur = 0;

// ======================
// hover检测
// ======================


hoverItem=null;



for(let item of items){


if(!item.visible)
continue;



let h =
item.img.height *
(item.width/item.img.width);


let detectWidth = item.width;
let detectHeight = h;



if(

worldMouseX > item.x &&
worldMouseX < item.x + item.width &&


worldMouseY > item.y &&
worldMouseY < item.y + h


){


hoverItem=item;


}



}
// ======================
// 拖动物品
// ======================


if(
dragging &&
draggingItem
){


draggingItem.x =
worldMouseX -
draggingItem.width/2;



draggingItem.y =
worldMouseY -
(
draggingItem.img.height *
(
draggingItem.width /
draggingItem.img.width
)
)/2;



}



// ======================
// 判断是否靠近角色
// ======================


if(draggingItem){


let itemCenterX =
draggingItem.x +
draggingItem.width/2;



let itemCenterY =
draggingItem.y +
(
draggingItem.img.height *
(
draggingItem.width /
draggingItem.img.width
)
)/2;



let d = dist(

itemCenterX,

itemCenterY,

960,

610

);



nearCharacter = d < 180;


}

else{


nearCharacter=false;


}



// ======================
// 绘制物品
// ======================


for(let item of items){


if(item.visible){



let h =
item.img.height *
(
item.width /
item.img.width
);



let drawWidth = item.width;

let drawHeight = h;



// 限制最大高度

if(drawHeight > 170){


drawHeight = 170;


drawWidth =
item.img.width *
(
170 /
item.img.height
);


}



let scaleHover = 1;


if(item === hoverItem){

  scaleHover = 0.96;

}


let finalWidth =
drawWidth * scaleHover;


let finalHeight =
drawHeight * scaleHover;



let offsetX =
(drawWidth - finalWidth) / 2;


let offsetY =
(drawHeight - finalHeight) / 2;



image(
item.img,

item.x + offsetX,

item.y + offsetY,

finalWidth,

finalHeight

);


}



}



// ======================
// hover简介框
// ======================


if(hoverItem){



textSize(22);



let boxWidth =
max(

260,

textWidth(
hoverItem.description
)+40

);



let boxHeight = 85;



let infoX =
hoverItem.x +
hoverItem.width +
20;



let infoY =
hoverItem.y;



if(
infoX + boxWidth > 1920
){


infoX =
hoverItem.x -
boxWidth -
20;


}



if(
infoY + boxHeight > 1080
){


infoY =
1080 -
boxHeight -
20;


}



fill(0,120);



rect(

infoX,

infoY,

boxWidth,

boxHeight

);



fill(255);



textSize(32);



text(

hoverItem.name,

infoX+20,

infoY+35

);



textSize(22);



text(

hoverItem.description,

infoX+20,

infoY+70

);


}
// ======================
// 对话框
// ======================

if(showDialogue){

  image(
    dialogueBox,
    1000,
    330,
    dialogueBox.width * 0.15,
    dialogueBox.height * 0.15
  );


  fill(0);

  textSize(28);

  textAlign(
    CENTER,
    CENTER
  );


  text(
    dialogueText,
    1150,
    410
  );


  // 3秒消失
  if(millis() - dialogueTimer > 3000){

    showDialogue = false;

  }

}
// ======================
// 完成按钮
// ======================


let finishX = 1000;
let finishY = 90;


// 判断鼠标是否在文字附近

finishHover =
abs(worldMouseX - finishX) < 80 &&
abs(worldMouseY - finishY) < 40;



if(finishHover){

  finishScale = 0.95;

}
else{

  finishScale = 1;

}



push();


translate(
  finishX,
  finishY
);


scale(finishScale);


fill(0);
textSize(60);

textAlign(
  CENTER,
  CENTER
);


text(
  "点击此处结束喂食并生成结果",
  0,
  0
);


pop();

pop();


}



// ======================
// 鼠标按下
// ======================


function mousePressed(){
  if(
  gameState == "result" &&
  resultType == "empty"
){

  resetGame();

  return;

}
  if(
  gameState == "result" &&
  restartHover
){

  resetGame();

  return;

}
if(gameState == "start"){

  gameState = "game";

  return;

}
// 点击完成

if(
  finishHover
){

 if(fedCount >= items.length){

  resultType = "secret";

}

else if(fedCount == 0){

  resultType = "empty";

}

else{

  resultType = calculateResult();

}


gameState = "result";

  console.log(
    "结果:",
    resultType
  );

  return;

}

let worldMouseX =
(mouseX -
(width - 1920 * gameScale)/2)
/
gameScale;



let worldMouseY =
(mouseY -
(height - 1080 * gameScale)/2)
/
gameScale;




for(let item of items){


if(!item.visible)
continue;



let h =
item.img.height *
(
item.width /
item.img.width
);



if(

worldMouseX > item.x &&

worldMouseX < item.x + item.width &&


worldMouseY > item.y &&

worldMouseY < item.y + h

){


draggingItem=item;

dragging=true;

break;


}


}


}




// ======================
// 鼠标松开
// ======================


function mouseReleased(){


dragging=false;



if(draggingItem){



if(nearCharacter){



if(nearCharacter){


  draggingItem.visible=false;


  fedCount++;


  eating=true;

  eatCount=0;

  eatTimer=0;


}
// 累计属性分数
for(let key in draggingItem.scores){

  let value = draggingItem.scores[key];

  if(value != null){

    totalScores[key] += value;

  }

}

console.log(totalScores);

// 记录这个位置
let slotX = draggingItem.homeX;
let slotY = draggingItem.homeY;


// 如果还有剩余物品
if(itemPool.length > 0){

  let obj = itemPool.shift();

  items.push({

    img:loadImage(obj.image),

    name:obj.name,

    description:obj.description,

    scores:obj.scores,

    x:slotX,
    y:slotY,

    homeX:slotX,
    homeY:slotY,

    width:150,

    visible:true

  });

}
items = items.filter(item => item.visible);

eating=true;

eatCount=0;

eatTimer=0;


}

else{



draggingItem.x =
draggingItem.homeX;


draggingItem.y =
draggingItem.homeY;



}



}



draggingItem=null;


}
function calculateResult(){

  let maxScore = -1;
  let result = "";


  for(let key in totalScores){

    if(totalScores[key] > maxScore){

      maxScore = totalScores[key];

      result = key;

    }

  }


  return result;

}
function drawResult(){


  let img;


  if(resultType == "collector"){

    img = collectorImg;

  }

  else if(resultType == "dreamer"){

    img = dreamerImg;

  }

  else if(resultType == "observer"){

    img = observerImg;

  }

  else if(resultType == "resonator"){

    img = resonatorImg;

  }

  else if(resultType == "creator"){

    img = creatorImg;

  }

  else if(resultType == "thinker"){

    img = thinkerImg;

  }

  else if(resultType == "player"){

    img = playerImg;

  }

  else if(resultType == "performer"){

    img = performerImg;

  }
else if(resultType == "secret"){

  img = secretImg;

}
else if(resultType == "empty"){

  img = emptyImg;

}


  image(
    img,
    0,
    0,
    1920,
    1080
  );
  fill(255,0,0);


  // 重新开始文字

let restartX = 700;
let restartY = 700;


restartHover =
abs(worldMouseX - restartX) < 100 &&
abs(worldMouseY - restartY) < 40;


if(restartHover){

  restartScale = 0.9;

}
else{

  restartScale = 1;

}



push();


translate(
  restartX,
  restartY
);


scale(restartScale);


fill(0);
textSize(62);

textAlign(
  CENTER,
  CENTER
);


text(
  "重新开始",
  0,
  0
);


pop();


}
function drawStart(){


  let startScale = min(
    width / 1920,
    height / 1080
  );


  push();


  translate(
    (width - 1920 * startScale)/2,
    (height - 1080 * startScale)/2
  );


  scale(startScale);


  image(
    startImg,
    0,
    0,
    1920,
    1080
  );


  pop();


}
function resetGame(){


  totalScores = {

    collector:0,
    dreamer:0,
    observer:0,
    resonator:0,
    creator:0,
    thinker:0,
    player:0,
    performer:0

  };


  createItems();


  gameState = "game";


  resultType = "";
 
  fedCount = 0;

}
function drawStartScreenText(){

  push();

  textFont(myFont);
  textAlign(LEFT, CENTER);


  // 标题
  fill(0);

  textSize(70 * gameScale);

  text(
    "欢迎来到养成模拟器",
    230 * gameScale,
    180 * gameScale
  );


  // 橙色副标题
  fill(230, 110, 20);

  textSize(70 * gameScale);

  text(
    "你将领养一只奇异的生物",
    230 * gameScale,
    260 * gameScale
  );


  // 中间说明
  fill(0);

  textAlign(CENTER, CENTER);

  textSize(70 * gameScale);

  text(
    "屏幕中的一切物品都供你选择",
    1100 * gameScale,
    470 * gameScale
  );


  // 粉色说明
  fill(240, 80, 170);

  textSize(70 * gameScale);

  text(
    "拖拽以喂食 每次选择都会影响成长结果",
    960 * gameScale,
    550 * gameScale
  );


  // 开始文字
  fill(0);

  textAlign(LEFT, CENTER);

  textSize(70 * gameScale);

  text(
    "点击任意处开始",
    450 * gameScale,
    850 * gameScale
  );


  pop();

}
