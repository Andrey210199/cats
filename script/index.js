//Импорт файлов
import * as Cats from "./cats.js";
import * as Card from "./card.js";
import * as Popup from "./popup/popup.js";
import * as AddCat from "./popup/addCat.js";

//Переменные
const cats = Cats.cats;
const addcat = new Popup.Popup("popup-add-cat");
const addCatBtn = document.querySelector(".header__btn");
const popupAddCat = document.querySelector("#form__add-cat");
const pop = document.querySelector("[name=img_link]");
const img = document.querySelector(".form__img");


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

function errorUrl(){
    this.src = "https://get.wallhere.com/photo/1920x1440-px-British-cat-shorthair-1912001.jpg";
}


addCatBtn.addEventListener("click", (evt)=>{addcat.openPopup()});
popupAddCat.addEventListener("submit", add);

pop.addEventListener("blur", (e)=>{
    
    if(pop.value !=="")
    {
    img.onerror = errorUrl;
    img.src = e.target.value;
    }
    
});

