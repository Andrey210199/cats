export class Popup{
    constructor(selector){
        this._popup = document.querySelector(`.${selector}`);
        this._escPopupClose = this._escPopupClose.bind(this);
        
    }

   
    _escPopupClose(event){
            if(event.key ==="Escape")
            {
                this.closePopup();
            }
    }

    openPopup(){
        this._popup.classList.add("popup_active");
        this._event =document.addEventListener("keyup", this._escPopupClose);
        this.btnPopupClose();
        
    }

    closePopup(){
        this._popup.classList.remove("popup_active");
       document.removeEventListener("keyup",this._escPopupClose);
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