import * as Constant from "./constant.js";
import { Api } from "./api.js";
import { createCard } from "./utilites.js";

const api = new Api(Constant.CONFIG_API);

export function checkLStor(){
    if(localStorage.length)
    {
    const localData =JSON.parse(localStorage.getItem("cats"));
    const localSTimeLife =localStorage.getItem("catsTime");
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

    const lData =localStorage.length? JSON.parse(localStorage.getItem("cats")): null;


    switch (action) {
        case "all":
                localStorage.setItem("cats",JSON.stringify(data));
                lStorRefrech(Constant.STORAGELIFEMINUTES);
            return;
        case "add":
                lData.push(data);
                localStorage.setItem("cats",JSON.stringify(lData));
            return;
        case "update":
            const nDatas = lData.filter(elem => elem.id!==data.id);
            nDatas.push(data);
            localStorage.setItem("cats", JSON.stringify(nDatas));
            return;
        case "delete":
            const nData = lData.filter(elem => elem.id!==data);
            localStorage.setItem("cats", JSON.stringify(nData));
            return;
    
        default:
            localStorage.clear();
            break;
    }
}

function lStorRefrech(minutes){
    const refDate =new Date();
    refDate.setMinutes(refDate.getMinutes()+minutes);
    localStorage.setItem("catsTime", refDate);
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