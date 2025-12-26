import { Application, Sprite, Graphics, Text, Assets, AnimatedSprite, Texture, Container } from "pixi.js";

import { createDeck } from "./scripts/generateDeck";

const deck = createDeck();

let player1;
let player2;


const app = new Application();

await app.init({
  width: 1500,
  height: 1000,
  backgroundColor: 0x1099bb,
})


const divContainer = document.getElementById("pixi-container")!;
divContainer.appendChild(app.canvas);

const cardSheet = await Assets.load("assets/cardAtlas.json");


const suits = ["clubs", "diamonds", "spades", "hearts"]

const clubCards = new AnimatedSprite(cardSheet.animations["clubs"]) // ye array me frames hai


// config : 

const startX = 200;
const startY = 100;

const gapX = 100; // gap between cards
const scale = 1.3;
const animationSpeed = 0.02;



let gameOver = true;

if(gameOver){
  suits.forEach((suit, index) => {

  const cardSprite = new AnimatedSprite(cardSheet.animations[suit]);

  cardSprite.anchor.set(0.5);
  cardSprite.x = startX + index * gapX; // side-by-side
  cardSprite.y = startY;
  cardSprite.scale.set(scale);
  cardSprite.animationSpeed = animationSpeed;
  cardSprite.loop = true;
  cardSprite.play();
  app.stage.addChild(cardSprite);



})
}

// clubCards.anchor.set(0.5);

// clubCards.x = app.screen.width / 2;
// clubCards.y = app.screen.height / 2;

// clubCards.animationSpeed = 0.05; // slow
// clubCards.loop = true;
// clubCards.play();

// app.stage.addChild(clubCards);


// import { handlegame } from "./scripts/handlePlayButton";

// handlegame();




// console.log(deckkk)

import { generateRandomNumber } from "./scripts/generateRandom";


const randomnumber = generateRandomNumber();
console.log(randomnumber)