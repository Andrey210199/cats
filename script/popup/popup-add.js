import { Popup } from "./popup.js";
import * as Constant from "../other/constant.js";
import * as AddCat from "./addCat.js";
import { updateLocalS } from "../cache/local-storage.js";
import { Api } from "../api.js";
import { createCard } from "../other/utilites.js";

//Константы
const {NOPHOTO, CONFIG_API} = Constant;

export class PopupAddCat extends Popup{
    constructor(selector, photo, formId){
        super(selector, photo);
        this._api =  new Api(CONFIG_API);;
        this._formId = this._popup.querySelector(`#${formId}`);
        this._formArr = [...this._formId.elements];
    }

     _add=(event)=>{
        event.preventDefault();
         this._dataFromForm =AddCat.addCat(this._formArr, NOPHOTO);

        this._api.addCat(this._dataFromForm)
        .then(()=>{
            createCard(this._dataFromForm);
            updateLocalS(this._dataFromForm,"add")
            this.closePopup();
            this._formId.reset();
        });
    }

    _popupId=()=>{
        this._formArr.forEach(element => {
            
            if(element.name ==="id")
            {
                element.value = this._id;
            }
        });
        
    }

    openPopup(id){
        super.openPopup();
        this._id = id;
        this._popupId();
        this._formId.addEventListener("submit", this._add);
    }

    closePopup(){
        super.closePopup();
        document.removeEventListener("submit", this._add);
    }
}