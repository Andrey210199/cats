import * as Constant from "./constant.js";
import { getCookie } from "./Cookie.js";


export function Authorized(loginBtn)
{
    let isAuth = getCookie().email;
    const hidden = Constant.SHOWCLASS.hiddenClass;
    const active = Constant.SHOWCLASS.activeClass;
    const block = Constant.BLOCKCLASS.blockClass;
    const noBlock = Constant.BLOCKCLASS.noBlockClass;

if(isAuth){
   const hiddenElements = document.querySelectorAll(`.${hidden}`);
   const blockEllements = document.querySelectorAll(`.${block}`);
   loginBtn.textContent="Выйти";
    showHiddenElem(hiddenElements, hidden, active);
    showHiddenElem(blockEllements, block, noBlock);

}
else{
    const showElements = document.querySelectorAll(`.${active}`);
    const noBlockEllements = document.querySelectorAll(`.${noBlock}`);
    loginBtn.textContent ="Войти";
    showHiddenElem(showElements, hidden, active);
    showHiddenElem(noBlockEllements, block, noBlock);
}

}

function showHiddenElem(elems, hiddenClass, activeClass){
    elems.forEach((elem)=>{
     elem.classList.toggle(hiddenClass);
     elem.classList.toggle(activeClass);
    });
}