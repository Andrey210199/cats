import {LOCALSTORAGE} from "./constant.js";
import { Api } from "./api.js";
import { createCard } from "./utilites.js";

//Константы
const {elements, life, lifeTime} = LOCALSTORAGE

const api = new Api(Constant.CONFIG_API);

export function checkLStor(){
    if(localStorage.length)
    {
    const localData =JSON.parse(localStorage.getItem(elements));
    const localSTimeLife =localStorage.getItem(life);
    const relTime =refTime(localSTimeLife);

    if(localData && localData.length && relTime)
    {
        localData.forEach(elem =>{createCard(elem)})
    }
    else
    {
        getAllCAts();
    }
}
else{
    getAllCAts();
}
}

export function updateLocalS(data, action){

    const lData =localStorage.length? JSON.parse(localStorage.getItem(elements)): null;


    switch (action) {
        case "all":
                localStorage.setItem(elements,JSON.stringify(data));
                lStorRefrech(lifeTime);
            return;
        case "add":
                lData.push(data);
                localStorage.setItem(elements,JSON.stringify(lData));
            return;
        case "update":
            const nDatas = lData.map(elem => Number(elem.id)===Number(data.id)? data: elem);
            localStorage.setItem(elements, JSON.stringify(nDatas));
            return;
        case "delete":
            const nData = lData.filter(elem => elem.id!==data);
            localStorage.setItem(elements, JSON.stringify(nData));
            return;
    
        default:
            localStorage.clear();
            break;
    }
}

function lStorRefrech(minutes){
    const refDate =new Date();
    refDate.setMinutes(refDate.getMinutes()+minutes);
    localStorage.setItem(life, refDate);
}

function refTime(localSTimeLife){
    return (new Date() < new Date(localSTimeLife));
 }
 
 function getAllCAts(){
     api.getAllCAtsOrCatById()
     .then(({data})=>{
         data.forEach((cat)=>{
             createCard(cat);
         });
         updateLocalS(data,"all")
     });
 }