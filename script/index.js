//Импорт файлов
import * as Popup from "./popup/popup.js";
import * as AddCat from "./popup/addCat.js";
import * as Constant from "./constant.js";
import * as UpdatePopup from "./popup/popup-update.js";
import { PopupAddCat } from "./popup/popup-add.js";
import { Api } from "./api.js";
import { getCookie } from "./Cookie.js";
import { Authorized } from "./authorized.js";
import { checkLStor } from "./local-storage.js";

//Переменные
const api = new Api(Constant.CONFIG_API);
const addcat = new PopupAddCat("popup-add-cat", Constant.DEFAULTPHOTO,"form__add-cat");
const popupLogin = new Popup.Popup("popup-login", Constant.DEFAULTPHOTO);
const popupUpdateCat = new UpdatePopup.UpdatePopup("popup-update-cat", Constant.DEFAULTPHOTO, "form__update");


const loginBtn = document.querySelector(".header__login");
const addCatBtn = document.querySelector(".header__btn");
const popupAddCat = document.querySelector("#form__add-cat");
const cards = document.querySelector(".cards");

const loginForm = document.querySelector("#form__login");

const updatePopupClass = document.querySelector(".popup-update-cat")
const updateId = updatePopupClass.querySelector("#form__update");

let isAuth = getCookie().email;
const link = "card__name";



//Вызовы функций
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
addCatBtn.addEventListener("click", (evt)=>{addcat.openPopup()});

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
        const id =evt.target.closest("[id]").id;
        api.getAllCAtsOrCatById(id)
        .then(({data})=>{
            UpdatePopup.showData(data,updateId);
            popupUpdateCat.openPopup();
            popupUpdateCat.blur();
        })

    }
});


checkLStor();
Authorized(loginBtn);

/* api.getAllId()
.then(({data})=>{
    console.log(data[data.length-1]+1);
}) */