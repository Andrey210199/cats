//Импорт файлов
import * as Cats from "./cats.js";
import * as Card from "./card.js";
import * as Popup from "./popup/popup.js";
import * as AddCat from "./popup/addCat.js";

//Переменные
const cats = Cats.cats;
const addcat = new Popup.Popup("popup-add-cat");
const addCatBtn = document.querySelector(".header__btn");


//Вызовы функций
function createCard(data){
    const card = new Card.Card(data,"cards","card__template", "card");
    card.createCard();
}

cats.forEach((cat)=>{
    createCard(cat);
})


function add(event){
    event.preventDefault();
    createCard(AddCat.addCat("form__add-cat"))
    addcat.closePopup();
}


addCatBtn.addEventListener("click", (evt)=>{addcat.openPopup()});
document.querySelector("#form__add-cat").addEventListener("submit", add);