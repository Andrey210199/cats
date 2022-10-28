import * as Constant from "./constant.js";
import { getCookie } from "./Cookie.js";


export function Authorized(loginBtn)
{
    let isAuth = getCookie().email;
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

function showHiddenElem(elems, hiddenClass, activeClass){
    elems.forEach((elem)=>{
     elem.classList.toggle(hiddenClass);
     elem.classList.toggle(activeClass);
    });
}