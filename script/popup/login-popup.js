import { Popup } from "./popup.js";
import { Authorized } from "../authorized.js";
import { COOKIELIFE } from "../other/constant.js";

export class loginPopup extends Popup{
    constructor(selector, photo, formId, loginBtn){
        super(selector, photo);
        this._formId = this._popup.querySelector(`#${formId}`);
        this._btn = this._popup.querySelector("[type = submit]");
        this._loginBtn = document.querySelector(`.${loginBtn}`);
    }

    _Default= (event)=>{
        event.preventDefault();
   }

    _authorize= ()=>{
        this._elements =[...this._formId.elements];
        this._elements.forEach((elem)=>{
           if(elem.type=="email")
           {
              document.cookie = `${elem.type}=${elem.value}; max-age=${COOKIELIFE}`;   
           }     
        });
        Authorized(this._loginBtn);
        this.closePopup();
    }   

   openPopup(){
        super.openPopup();
        this._formId.addEventListener("submit",this._Default);

        this._btn.addEventListener("click",this._authorize);
    }

    closePopup(){
        super.closePopup();
        document.removeEventListener("submit", this._Default);
        document.removeEventListener("click",this._authorize)

    }


}