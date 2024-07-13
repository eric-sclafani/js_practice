import { FastAPIRequest } from "./dataRequest.js"



const attachFormEventHandler = () => {
    $("#input-form").on("submit", (event:any) => {
        event.preventDefault();
        
        let form = document.querySelector("#input-form") as HTMLFormElement;
        const formData = new FormData(form)
        console.log(formData)
    })
}




















async function main(){
    const request = new FastAPIRequest("http://localhost:8000/lower/HELLO");
    await request.fetchData()
    console.log(request.data.text)
}


attachFormEventHandler();