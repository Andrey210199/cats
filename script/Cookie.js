export function getCookie(){
    return document.cookie.split("; ").reduce((acc, curr)=>{
        let [name,value] =curr.split("=");
        return {...acc, [name]: value}
    },{})
}