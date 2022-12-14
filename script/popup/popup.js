import { CLASSES } from "../other/constant.js";

//Константы
const {addPopupCatImage, addPopupActive, addPopupHidden} =CLASSES;

export class Popup{
    constructor(selector, photo){
        this._popup = document.querySelector(`.${selector}`);
        this._escPopupClose = this._escPopupClose.bind(this);
        this._img = this._popup.querySelector(`.${addPopupCatImage}`);
        this._pop = this._popup.querySelector("[name=img_link]");
        this._defPhoto = photo;
        
    }

   
    _escPopupClose(event){
            if(event.key ==="Escape")
            {
                this.closePopup();
            }
    }

    _errorUrl=()=>{
        this._img.src = this._defPhoto;
        this._pop.value ="";
    }

    blur=()=>{
        if(this._pop.value !=="")
        {
        this._img.onerror = this._errorUrl;
        this._img.src = this._pop.value;
        }
    }

    _blurEvt=()=>{
            this._pop.addEventListener("blur", this.blur); 
    }

    openPopup(){
        this._popup.classList.add(addPopupActive);
        this._event =document.addEventListener("keyup", this._escPopupClose);
        if(this._pop !==null)
        {
        this._blurEvt();
        }
        this.btnPopupClose();
        
    }

    closePopup(){
        this._popup.classList.remove(addPopupActive);
        this._popup.classList.add(addPopupHidden);
        setTimeout(()=>{this._popup.classList.remove(addPopupHidden)},400);
       document.removeEventListener("keyup",this._escPopupClose);
       document.removeEventListener("blur", this.blur);
    }

    btnPopupClose(){
        const btn = this._popup.querySelector("[class*=close]");
        this._popup.addEventListener("click",  (event)=>{
            if(event.target ===btn || event.target === this._popup)
            {
                this.closePopup();
            }
        })
    }
}