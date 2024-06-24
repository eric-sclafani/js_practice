




export async function fetchQuestions(url:string):Promise<any>{
    const data = await fetch(url);
    return await data.json();
}