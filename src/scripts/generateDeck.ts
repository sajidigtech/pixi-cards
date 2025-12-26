import { CARD_VALUES } from "../constants/constants";
import { SUITS } from "../constants/constants";
import { RANKS } from "../constants/constants";

import { CARD } from "../constants/constants";


export function createDeck () : CARD[] {

    const deck : CARD[] = [];
    // shuru me empty deck hai bro 

    SUITS.forEach((suit)=>{

        RANKS.forEach((rank)=>{

            deck.push({
                suit,
                rank,
                value :CARD_VALUES[rank],
                frameName : `${suit}_${rank}`
            })

        })

    })





    return deck;

}