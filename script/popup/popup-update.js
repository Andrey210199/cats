import { Popup } from "./popup.js";
import * as Constant from "../constant.js";
import * as AddCat from "./addCat.js";
import * as Card from "../card.js";
import { updateLocalS } from "../local-storage.js";
import { Api } from "./../api.js";

export class UpdatePopup extends Popup{
    constructor(selector, photo, formId){
        super(selector, photo);

        this._api =  new Api(Constant.CONFIG_API);;
        this._formId = this._popup.querySelector(`#${formId}`);
        this._input =this._popup.querySelector("input");
        this._id =this._formId.querySelector(".id");
        this._element = [...this._formId.elements];
        //Кнопки
        this._updateBtnEdit = this._formId.querySelector("[id*=update]");
        this._updateBtnUpdate = this._formId.querySelector("[class*=submit]");
        this._updateBtnDelete = this._formId.querySelector("[class*=delete]");
    }

    _inputClass()
    {
        this._inputEvent =this._input.classList.contains("no-event");

        if(!this._inputEvent)
        {
            this._editElem()
        }
    }

    _escPopupClose(event){
        if(event.key ==="Escape")
        {
            this._inputClass();
            this.closePopup();
        }
    }

    _isDisabled(elem){
        if(!elem.hasAttribute("disabled"))
        {
            elem.setAttribute("disabled","");
        }
        else{
            elem.removeAttribute("disabled");
        }
    }
    _editElem=()=>{
        this._element.forEach(elem=>{ 
            if(elem.type ==="checkbox"){
                elem.parentNode.classList.toggle("no-event");
               this._isDisabled(elem);
            }
            else if(elem.type !=="submit")
            {
                elem.classList.toggle("no-event");
                this._isDisabled(elem);
            }

            });
    }

    _updateCard=()=>{
         this._data = AddCat.addCat(this._element, Constant.NOPHOTO);
         this._data.id = this._id.textContent;
               
        this._api.updateCatById(this._data.id,this._data)
        .then(()=>{
            this._card = new Card.Card(this._data,"cards","card__template", "card");
            updateLocalS(this._data, "update");
            this._card.updateCard();
            this.closePopup();
        });
    }

    _deleteCard=()=>{
        this._elemId = this._id.textContent;
        this._api.deleteCatById(this._elemId)
        .then(()=>{
         this._card = document.querySelector(".cards").querySelector(`[id="${this._elemId}"]`)
         updateLocalS(this._elemId, "delete");
         this._card.remove();
         this.closePopup();
        });
    }

    openPopup(){
        super.openPopup();

        this._updateBtnEdit.addEventListener("click", this._editElem);
        this._updateBtnUpdate.addEventListener("click", this._updateCard);
        this._updateBtnDelete.addEventListener("click",this._deleteCard);

    }

    closePopup(){
        super.closePopup();
        document.removeEventListener("click", this._editElem);
        document.removeEventListener("click", this._updateCard);
        document.removeEventListener("click", this._deleteCard);
        this._inputClass();

    }

}

export function showData(data, formId){
   const element = [...formId.elements];
   const id = formId.querySelector("[class*=id]");
   id.textContent = data.id;
   
   element.forEach(elem => {
    switch(elem.name){
        case "": break;
        case "favourite": elem.checked = data[elem.name]; break;
        default:  elem.value = data[elem.name]; break;
    }

   });
}


