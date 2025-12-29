import { Application, Sprite, Graphics, Text, Assets, AnimatedSprite, Texture, Container } from "pixi.js";

import { createDeck } from "./scripts/generateDeck";

const deck = createDeck();

console.log("the value of deck", deck)

let score_player1 = 0;
let score_player2 = 0;


const dataplayer1 = [];
const dataplayer2 = [];


const app = new Application();

await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
})

// app initiated with canvas height and widht of window inner screen size 


const divContainer = document.getElementById("pixi-container")!;
divContainer.appendChild(app.canvas);

// canvas injected in id of div : -> : "pixi-container"

const previewCardsContainer = new Container();
app.stage.addChild(previewCardsContainer);
// this conatiner will have all 4 card flipbook display when game over!


const cardSheet = await Assets.load("assets/cardAtlas.json");
// important to fetch card sheet 


// two containers for 2 players ok ?

const player1Container = new Container();
player1Container.position.set(50, app.screen.height - 350);
// player1 container from x ->50 and from y -> screenheight-350 pixels


const pBG1 = new Graphics();
pBG1.fill(0xBCD4E6)       // start a fill with color
  .rect(0, 0, 500, 300) // draw rectangle
  .fill();              // finalize fill (like endFill)

player1Container.addChild(pBG1);
// bg added in container of player 1 

const player1button = new Container();
// container for button -> ye container of player 1 me jayega 
const playerBtnBg = new Graphics();
// ye graphics hai jo bg color dega button of player1 ka esa 

playerBtnBg.fill(0x000000);
playerBtnBg.rect(-100, -25, 200, 50);
playerBtnBg.fill();

const playerBtnTxt = new Text({
  text: `Open-Card : ${score_player1}`,
  style: {
    fill: 0xffffff, // white text
    fontSize: 22,
    fontWeight: "bold",
  }

});
// ye player btn text me text dalega esa 

playerBtnTxt.anchor.set(0.5);
player1button.addChild(playerBtnBg, playerBtnTxt);

// anchor set kiya hai aur player1 button wale container me dono chize dal di

player1button.x = 500 / 2; // half of container width
player1button.y = 50;

// player button ki postion det krdi 
// ye container ke respect me set hoga 

// overall : top centre button for player1 






// initiating player 2 container 

const player2Container = new Container();
player2Container.position.set(app.screen.width - 550, app.screen.height - 350);

// screen ke bottom left pe jayega ye container 

const pBG2 = new Graphics();
pBG2.fill(0xBCD4E6).rect(0, 0, 500, 300).fill();
player2Container.addChild(pBG2);

// player 2 container ka bg hai ye 













player1button.eventMode = "static";
player1button.cursor = "pointer";

player1Container.addChild(player1button);


// top centre button for player 2

const player2button = new Container();
const player2btnBg = new Graphics();

player2btnBg.fill(0x000000);
player2btnBg.rect(-100, -25, 200, 50);
player2btnBg.fill();

const player2BtnText = new Text({

  text: `Open-Card : ${score_player2}`,
  style: {
    fill: 0xffffff,
    fontSize: 22,
    fontWeight: "bold",
  }
});
player2BtnText.anchor.set(0.5);
player2button.addChild(player2btnBg, player2BtnText);



// player2button.pivot.set(100, 25);
player2button.x = 500 / 2; // container width / 2
player2button.y = 50;      // top padding

player2button.eventMode = "static";
player2button.cursor = "pointer";

player2Container.addChild(player2button);







const clubCards = new AnimatedSprite(cardSheet.animations["clubs"]) // ye array me frames hai
// means isse apan clubs card ka animation (just all card display like flipbook show hoga )


// config : 

const startX = 200;
const startY = 100;

const gapX = 100; // gap between cards
const scale = 1.3;
const animationSpeed = 0.02;



let gameStarted = false;

const suits = ["clubs", "diamonds", "spades", "hearts"]

if (!gameStarted) {
  suits.forEach((suit, index) => {

    const cardSprite = new AnimatedSprite(cardSheet.animations[suit]);

    cardSprite.anchor.set(0.5);
    cardSprite.x = startX + index * gapX; // side-by-side
    cardSprite.y = startY;
    cardSprite.scale.set(scale);
    cardSprite.animationSpeed = animationSpeed;
    cardSprite.loop = true;
    cardSprite.play();

    previewCardsContainer.addChild(cardSprite)
    // app.stage.addChild(cardSprite);



  })
}

const deckTexture = await Assets.load("assets/deckCards.png");
const deckSprite = new Sprite(deckTexture);
deckSprite.anchor.set(0.5);
deckSprite.x = app.screen.width / 2;
deckSprite.y = 150; // thoda niche so chipke na top se

app.stage.addChild(deckSprite);
deckSprite.visible = false;

if (gameStarted) {

}

const startButton = new Container();

const btnBg = new Graphics();
btnBg.beginFill(0x222222);
btnBg.drawRoundedRect(-120, -40, 240, 80, 20);
btnBg.endFill();

const btnText = new Text("START GAME", {
  fill: 0xffffff,
  fontSize: 28,
  fontWeight: "bold",
});

btnText.anchor.set(0.5);

startButton.addChild(btnBg, btnText);

startButton.x = app.screen.width / 2;
startButton.y = app.screen.height / 2;

startButton.eventMode = "static";
startButton.cursor = "pointer";

app.stage.addChild(startButton);


startButton.on("pointerdown", () => {
  gameStarted = true;
  startButton.visible = false;
  deckSprite.visible = true;
  previewCardsContainer.visible = false;

  app.stage.addChild(player1Container);
  app.stage.addChild(player2Container);


})




import { generateRandomNumber } from "./scripts/generateRandom";


const randomnumber = generateRandomNumber();
console.log(randomnumber)




let currentPlayer : 1|2 = 1;
const MAX_ROUNDS =5;
let currentRound = 1;


function setButtonEnabled(button:Container, enabled : boolean){
  button.eventMode = enabled?"static":"none";
  button.alpha = enabled ? 1 : 0.5;

}


function handleTurn(player :1 |2){

  if(currentRound>5){
    console.log("game over ");
    return;

  }

  if(player===1){
    console.log(`player ${player} opened some card`)

    setButtonEnabled(player1button,false);
    setButtonEnabled(player2button,true);

    currentPlayer = 2;
  }

  else{
    console.log(`player ${player} opened card`);
    currentRound++;
    currentPlayer =1;

    setButtonEnabled(player2button, false)
    setButtonEnabled(player1button, true);
  }




  console.log("round number  is : ", currentRound)

}


player1button.on("pointerdown",()=>{
  if(currentPlayer!==1)return;
  handleTurn(1)
})

player2button.on("pointerdown", ()=>{
  if(currentPlayer!==2)return;

  handleTurn(2);
})