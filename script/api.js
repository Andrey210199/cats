export class Api{
    constructor(data){
        this._data = data;
        this._url = data.url;
        this._headers = data.headers;
    }

    #ansver(res){
        return res.ok? res.json(): Promise.reject(...res,"Ошибка сервера.");
    }

    getAllCAtsOrCatById(id= null){
        return fetch(`${this._url}/show${id!==null?`/${id}`:""}`,
        {
            method: "GET"
        }).then( this.#ansver);
    }

    getAllId(){
        return fetch(`${this._url}/ids`,{
            method: "GET"
        }).then(this.#ansver);
    }

    addCat(data){
       return fetch(`${this._url}/add`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this.#ansver);
    }

    updateCatById(id, data){
        return fetch(`${this._url}/update/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this.#ansver);
    }

    deleteCatById(id){
       return fetch(`${this._url}/delete/${id}`,
       {
        method: "DELETE"
       })
      
    }
}