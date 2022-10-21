export function addCat(data){
    const formArr = [...document.querySelector(`#${data}`).elements];
    const formData = {};
    formArr.forEach((elem)=>{
        switch(elem.type)
        {
            case "submit":break;
            case "checkbox": formData[elem.name] = elem.checked; break;
            default: elem.type==="url" && elem.value ===""? formData[elem.name] ="http://www.ooorenome.ru/images/noimg.jpg": formData[elem.name] = elem.value; break;
        }
    });
    return formData;
}