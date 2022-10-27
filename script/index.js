//Импорт файлов
import * as Cats from "./cats.js";
import * as Card from "./card.js";
import * as Popup from "./popup/popup.js";
import * as AddCat from "./popup/addCat.js";
import * as Constant from "./constant.js";
import * as UpdatePopup from "./popup/popup-update.js";
import { Api } from "./api.js";
import { getCookie } from "./Cookie.js";
import { updateLocalS } from "./local-storage.js";

//Переменные
const cats = Cats.cats;
const api = new Api(Constant.CONFIG_API);
const addcat = new Popup.Popup("popup-add-cat", Constant.DEFAULTPHOTO);
const popupLogin = new Popup.Popup("popup-login", Constant.DEFAULTPHOTO);
const popupUpdateCat = new UpdatePopup.UpdatePopup("popup-update-cat", Constant.DEFAULTPHOTO, "form__update", api);


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
function createCard(data){
    const card = new Card.Card(data,"cards","card__template", "card");
    card.createCard();
}

function add(event){
    event.preventDefault();
    const formArr = [...popupAddCat.elements];
    const dataFromForm =AddCat.addCat(formArr,Constant.NOPHOTO)
    api.addCat(dataFromForm)
    .then(()=>{
        createCard(dataFromForm);
        addcat.closePopup();
        popupAddCat.reset();
    });
}

loginBtn.addEventListener("click", (evt)=>{
    if(isAuth)
    {   document.cookie= `email= ${getCookie().email}; max-age=-1`;
        isAuth = undefined;
        Authorized();
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
           document.cookie = `${elem.type}=${elem.value}; max-age=3000`
        }     
     });
     isAuth = getCookie().email;
     Authorized();
     popupLogin.closePopup();
     
    });

popupAddCat.addEventListener("submit", add);

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

function showHiddenElem(elems, hiddenClass, activeClass){
    elems.forEach((elem)=>{
     elem.classList.toggle(hiddenClass);
     elem.classList.toggle(activeClass);
    });
}

function Authorized()
{
    const hidden = Constant.SHOWCLASS.hiddenClass;
    const active = Constant.SHOWCLASS.activeClass;

if(isAuth){
   const hiddenElements = document.querySelectorAll(`.${Constant.SHOWCLASS.hiddenClass}`);
   loginBtn.textContent="Выйти";
    showHiddenElem(hiddenElements, hidden, active);

}
else{
    const showElements = document.querySelectorAll(`.${Constant.SHOWCLASS.activeClass}`);
    loginBtn.textContent ="Войти";
    showHiddenElem(showElements, hidden, active);
}

}
checkLStor();
Authorized();

function refTime(localSTimeLife){
   return (new Date() < new Date(localSTimeLife));
}

function getAllCAts(){
    api.getAllCAtsOrCatById()
    .then(({data})=>{
        data.forEach((cat)=>{
            createCard(cat);
        });
        updateLocalS(data,"all")
    });
}

function checkLStor(){
    if(localStorage.length)
    {
    const localData =JSON.parse(localStorage.getItem("cats"));
    const localSTimeLife =localStorage.getItem("catsTime");
    const relTime =refTime(localSTimeLife);

    if(localData && localData.length && relTime)
    {
        localData.forEach(elem =>{createCard(elem)})
    }
    else
    {
        getAllCAts();
    }
}
else{
    getAllCAts();
}
}

