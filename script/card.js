export class Card{
    constructor(data,parent,template, selector){
        this._data = data;
        this._img = this._data.img_link;
        this._name = this._data.name;
        this._id = this._data.id;
        this._parent = document.querySelector(`.${parent}`);
        this._template = template;
        this._selector = selector;
        
    }

    _getTemplate(){
      return  document.querySelector(`#${this._template}`).content.querySelector(`.${this._selector}`);
    }

    _dataCard(){
        this._card.querySelector("[class*=img]").src = this._img;
        this._card.querySelector("[class*=name").textContent = this._name;
        this._btn = this._card.querySelector("[class*=btn]");
        this._card.id = this._id;
        if(!this._data.favourite && this._btn!==null)
        {
            this._like = this._btn;
            this._like.remove();
        }
    }

    createCard(){
        if(this._id!==undefined)
        {
        this._card = this._getTemplate().cloneNode(true);
        this._dataCard();
        this._parent.append(this._card);
        }
    }

    updateCard(){
        this._card = this._parent.querySelector(`[id="${this._id}"]`);
        this._dataCard();
    }

}
