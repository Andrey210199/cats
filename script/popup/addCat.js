export function addCat(data, noPhoto){
    const formData = {};
    data.forEach((elem)=>{
        switch(elem.type)
        {
            case "submit":break;
            case "checkbox": formData[elem.name] = elem.checked; break;
            case "id": 
            default: elem.type==="url" && elem.value ===""? formData[elem.name] = noPhoto: formData[elem.name] = elem.value; break;
        }
    });
    return formData;
}