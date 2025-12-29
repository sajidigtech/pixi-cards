import { Application, Sprite, Graphics, Text, Assets, AnimatedSprite, Texture, Container } from "pixi.js";

import { createDeck } from "./scripts/generateDeck";

const deck = createDeck();

console.log("the value of deck", deck)

let player1;
let player2;


const app = new Application();

await app.init({
  width: 1800,
  height: 1000,
  backgroundColor: 0x1099bb,
})


const divContainer = document.getElementById("pixi-container")!;
divContainer.appendChild(app.canvas);

const previewCardsContainer = new Container();
// this conatiner will have all 4 card flipbook display when game over!
app.stage.addChild(previewCardsContainer);


const cardSheet = await Assets.load("assets/cardAtlas.json");
// important to fetch card sheet 




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

if(!gameStarted){
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

if(gameStarted){

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


startButton.on("pointerdown", async()=>{
  gameStarted = true;
  startButton.visible = false;
  deckSprite.visible = true;
  previewCardsContainer.visible = false;

   const randomIndex = Math.floor(Math.random() * deck.length);
   const card = deck[randomIndex];

   console.log("Picked card:", card); 

   const cardTexture = Texture.from(card.frameName);
   const cardSprite = new Sprite(cardTexture);
   cardSprite.anchor.set(0.5);
   cardSprite.x = app.screen.width / 2;
   cardSprite.y = 400; // deck ke neeche
   cardSprite.scale.set(1.5);
   await new Promise((resolve)=>setTimeout(resolve,1000));
   app.stage.addChild(cardSprite);
})



const addCardToPlayerDeck = ()=>{



}


const removeDisplayPlayers =()=>{

    

}




import { generateRandomNumber } from "./scripts/generateRandom";


const randomnumber = generateRandomNumber();
console.log(randomnumber)