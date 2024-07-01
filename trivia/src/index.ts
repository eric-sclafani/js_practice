import { populateCategoryDropdown } from "./categories.js"
import { QuestionLoader } from "./questions.js";

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

const tempDisableFormSubmit = () => {
    const button = $("#submit");
    button.prop('disabled', true);

    setTimeout(
        () => button.prop("disabled", false),
        6500
    )
}

async function attachButtonEventHandlers() {
    const paramsForm = $("#params-form");
    const dialog = document.querySelector("#question-dialog") as HTMLDialogElement;
    const qLoader = new QuestionLoader(); 
    const questionForm = $("#question-form");

    paramsForm.on("submit", async function(event){
        event.preventDefault();
        
        const url = createUrlOnSubmit(event, paramsForm);
        await qLoader.prepareAllQuestions(url);
        questionForm.prepend(qLoader.loadNextQuestion() as HTMLDivElement)

        dialog.showModal();
        tempDisableFormSubmit();
    })

    // next button
    questionForm.on("submit", (event) => {
        event.preventDefault();
        questionForm.prepend(qLoader.loadNextQuestion() as HTMLDivElement)

    })
  
    $("#quit-dialog").on("click", () => {
        dialog.close();
    })

}



populateCategoryDropdown();
attachButtonEventHandlers();
