export class Card{
    constructor(data,parent,template, selector){
        this._data = data;
        this._img = this._data.img_link;
        this._name = this._data.name;
        this._parent = document.querySelector(`.${parent}`);
        this._template = template;
        this._selector = selector;
        
    }

    _getTemplate(){
      return  document.querySelector(`#${this._template}`).content.querySelector(`.${this._selector}`);
    }
    createCard(){
        this._card = this._getTemplate().cloneNode(true);
        this._card.querySelector("[class*=img]").src = this._img;
        this._card.querySelector("[class*=name").textContent = this._name;
        if(!this._data.favourite)
        {
            this._like = this._card.querySelector("[class*=btn]");
            this._like.remove();
        }

        this._parent.append(this._card);


    }
}
