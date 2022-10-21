export function addCat(data){
    const formArr = [...document.querySelector(`#${data}`).elements];
    const formData = {};
    formArr.forEach((elem)=>{
        console.log(elem.type)
        switch(elem.type)
        {
            case "submit":break;
            case "checkbox": formData[elem.name] = elem.checked; break;
            default: formData[elem.name] = elem.value; break;
        }
    });

    return formData;
}