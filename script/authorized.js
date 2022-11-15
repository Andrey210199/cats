import * as Constant from "./other/constant.js";
import { getCookie } from "./cache/Cookie.js";

//Константы
const {hiddenClass,activeClass} = Constant.SHOWCLASS;
const {blockClass,noBlockClass} = Constant.BLOCKCLASS;
const {login, notlogin} = Constant.AUTHORIZEDTEXTBTN;

export function Authorized(loginBtn)
{
    let isAuth = getCookie().email;

if(isAuth){

    ToggleClass(loginBtn, notlogin, hiddenClass, blockClass)

}
else{

    ToggleClass(loginBtn, login, activeClass, noBlockClass)
}

}

function ToggleClass(loginBtn, BtnText, clas, blockClas){
    const Elements = document.querySelectorAll(`.${clas}`);
    const BlockEllements = document.querySelectorAll(`.${blockClas}`);
    loginBtn.textContent =BtnText;
    showHiddenElem(Elements, hiddenClass, activeClass);
    showHiddenElem(BlockEllements, blockClass, noBlockClass);
}

function showHiddenElem(elems, hiddenClass, activeClass){
    elems.forEach((elem)=>{
     elem.classList.toggle(hiddenClass);
     elem.classList.toggle(activeClass);
    });
}