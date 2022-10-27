import * as Constant from "./constant.js";

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
