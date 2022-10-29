//Импорт файлов
import * as Popup from "./popup/popup.js";
import * as Constant from "./constant.js";
import * as UpdatePopup from "./popup/popup-update.js";
import { PopupAddCat } from "./popup/popup-add.js";
import { Api } from "./api.js";
import { getCookie } from "./Cookie.js";
import { Authorized } from "./authorized.js";
import { checkLStor, updateLocalS } from "./local-storage.js";

//Переменные
const api = new Api(Constant.CONFIG_API);
const addcat = new PopupAddCat("popup-add-cat", Constant.DEFAULTPHOTO,"form__add-cat");
const popupLogin = new Popup.Popup("popup-login", Constant.DEFAULTPHOTO);
const popupUpdateCat = new UpdatePopup.UpdatePopup("popup-update-cat", Constant.DEFAULTPHOTO, "form__update");


const loginBtn = document.querySelector(".header__login");
const addCatBtn = document.querySelector(".header__btn");
const cards = document.querySelector(".cards");

const loginForm = document.querySelector("#form__login");

const updatePopupClass = document.querySelector(".popup-update-cat")
const updateId = updatePopupClass.querySelector("#form__update");

let isAuth = getCookie().email;
const link = "card__name";
const like ="card__btn";
const falseLike ="card__btn_false"



//Вызовы функций
function updatePopupOpen(data, id,evt){
    UpdatePopup.showData(data,updateId);
    popupUpdateCat.openPopup();
    popupUpdateCat.blur();
}

 function likeToggle(elem, id, evt){
    elem.favourite = evt.target.classList.contains(falseLike);
    api.updateCatById(id,elem)
    .then(()=>{
        updateLocalS(elem,"update");
        evt.target.classList.toggle(falseLike);
    });
}

function updatePopupCheck(evt, functions){
    let localBoolean =false;
    const id =evt.target.closest("[id]").id;
    const localS = JSON.parse(localStorage.getItem("cats"));
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

loginForm.addEventListener("submit",(event)=>{
     event.preventDefault();
     const elements =[...loginForm.elements];
     elements.forEach((elem)=>{
        if(elem.type=="email")
        {
           document.cookie = `${elem.type}=${elem.value}; max-age=3000`;
           
        }     
     });
     isAuth = getCookie().email;
     Authorized(loginBtn);
     popupLogin.closePopup();
     
    });



updateId.addEventListener("submit",(event)=> event.preventDefault())


cards.addEventListener("click", (evt)=>{
    if(evt.target.className === link)
    {
        updatePopupCheck(evt, updatePopupOpen);
    }
    else if(evt.target.classList.contains(like))
    {
        updatePopupCheck(evt, likeToggle)
          
    }
});


checkLStor();
Authorized(loginBtn);

