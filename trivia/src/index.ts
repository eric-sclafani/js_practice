import { parseCategoryData } from "./categories.js"


async function populateCategoryDropdown ():Promise<void>{
    await parseCategoryData();
    const categoryDropdown = $("select[name='category']");

    const categoryNames:string[] = JSON.parse(localStorage.names);
    const categoryIDs:number[] = JSON.parse(localStorage.IDs);

    for (const name of categoryNames) {
        const option = document.createElement("option");
        option.innerText = name;
        option.className = "category-selection";

        const value = categoryIDs[categoryNames.indexOf(name)].toString();
        option.value = value;
        categoryDropdown.append(option)
    } 
}

const getAmount = (value:string):string => {
    return `amount=${value}`;
}

const getCategory = (value:string):string => {
    return value == "any" ? "" : `&category=${value}`;
}

const getDifficulty = (value:string):string => {
    return value == "any" ? "" : `&difficulty=${value}`;
}

const getType = (value:string):string => {
    return value == "any" ? "" : `&type=${value}`;
}

const generateAPIUrl = (formData:JQuery.NameValuePair[]) => {
    let baseURL = "https://opentdb.com/api.php?";
    const amount = getAmount(formData[0].value);
    const category = getCategory(formData[1].value);
    const difficulty = getDifficulty(formData[2].value);
    const type = getType(formData[3].value);
    
    const url = baseURL + amount + category + difficulty + type;
    return url;
}

const attachFormEventHandler = () => {
    const form = $("form");
    form.on("submit", (event) => {
        event.preventDefault();
        const formData = form.serializeArray();
        const url = generateAPIUrl(formData)
        console.log(url)
    })
}



populateCategoryDropdown();
attachFormEventHandler();