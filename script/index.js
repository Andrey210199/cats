//Импорт файлов
import * as Constant from "./constant.js";
import { loginPopup } from "./popup/login-popup.js";
import * as UpdatePopup from "./popup/popup-update.js";
import { PopupAddCat } from "./popup/popup-add.js";
import { Api } from "./api.js";
import { getCookie } from "./Cookie.js";
import { Authorized } from "./authorized.js";
import { checkLStor, updateLocalS } from "./local-storage.js";

//Константы
const {DEFAULTPHOTO, CONFIG_API} =Constant;
const {cardName, cardBtn, cardBtnFalse, cards: cardsClass} = Constant.CLASSES;
const {elements} =Constant.LOCALSTORAGE;

//Переменные
const api = new Api(CONFIG_API);
const addcat = new PopupAddCat("popup-add-cat", DEFAULTPHOTO,"form__add-cat");
const popupLogin = new loginPopup("popup-login", DEFAULTPHOTO, "form__login", "header__login");
const popupUpdateCat = new UpdatePopup.UpdatePopup("popup-update-cat", DEFAULTPHOTO, "form__update");

const loginBtn = document.querySelector(".header__login");
const addCatBtn = document.querySelector(".header__btn");
const cards = document.querySelector(`.${cardsClass}`);

const updateId = document.querySelector("#form__update");

let isAuth = getCookie().email;

//Вызовы функций
function updatePopupOpen(data, ...props){
    UpdatePopup.showData(data,updateId);
    popupUpdateCat.openPopup();
    popupUpdateCat.blur();
}

 function likeToggle(elem, id, evt){
    elem.favourite = evt.target.classList.contains(cardBtnFalse);
    api.updateCatById(id,elem)
    .then(()=>{
        updateLocalS(elem,"update");
        evt.target.classList.toggle(cardBtnFalse);
    });
}

function updatePopupCheck(evt, functions){
    let localBoolean =false;
    const id =evt.target.closest("[id]").id;
    const localS = JSON.parse(localStorage.getItem(elements));
    localS.forEach((elem)=>{
        
        if(elem.id === Number(id))
        {
           localBoolean =true;
           functions(elem, id, evt);  
        }
    });

    if(!localBoolean)
    {
        api.getAllCAtsOrCatById(id)
        .then(({data})=>{
            functions(data, id, evt)
        })
    }
}

loginBtn.addEventListener("click", (evt)=>{
    isAuth = getCookie().email;

    if(isAuth)
    {   document.cookie= `email= ${getCookie().email}; max-age=-1`;
        isAuth = undefined;
        Authorized(loginBtn);
    }
    else{
        popupLogin.openPopup();
    }
    
});

addCatBtn.addEventListener("click", (evt)=>{
    api.getAllId()
    .then(({data})=>{
       const id = data[data.length-1]+1;
        addcat.openPopup(id);
    });

});

cards.addEventListener("click", (evt)=>{
    if(evt.target.className === cardName)
    {
        updatePopupCheck(evt, updatePopupOpen);
    }
    else if(evt.target.classList.contains(cardBtn))
    {
        updatePopupCheck(evt, likeToggle)
          
    }
});

checkLStor();
Authorized(loginBtn);
