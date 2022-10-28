import * as Card from "./card.js";

export function createCard(data){
    const card = new Card.Card(data,"cards","card__template", "card");
    card.createCard();
}