import { populateCategoryDropdown } from "./categories.js"
import { questionLoader, fetchQuestions } from "./questions.js";

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

const createUrlOnSubmit = (event:any, form:JQuery<HTMLElement>):string => {
    event.preventDefault();
    const formData = form.serializeArray();
    const url = generateAPIUrl(formData)
    return url;
}

async function showQuestionsModal(event:any, paramsForm:JQuery<HTMLElement>, dialog:HTMLDialogElement) {
    event.preventDefault();
    const url = createUrlOnSubmit(event, paramsForm)
    const questionReponse = await fetchQuestions(url);
    const loadQuestion = questionLoader(questionReponse);
    
    $("#question-form").prepend(loadQuestion())
    

    dialog.showModal();

}


function attachFormEventHandlers() {
    const form = $("#params-form");
    const dialog = document.querySelector("#question-dialog") as HTMLDialogElement;

    form.on("submit", (event) => showQuestionsModal(event, form, dialog))

  
    $("#quit-dialog").on("click", () => {
        dialog.close();
    })

}




populateCategoryDropdown();
attachFormEventHandlers();
