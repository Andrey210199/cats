import * as Card from "../card.js";
import {CLASSES} from "./constant.js";

const {cards,cardTemplate, card: cardClass } = CLASSES;

export function createCard(data){
    const card = new Card.Card(data, cards, cardTemplate , cardClass);
    card.createCard();
}