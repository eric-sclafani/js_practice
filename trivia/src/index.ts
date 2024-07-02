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
    button
        .prop('disabled', true)
        .prop("title", "Submit button is disabled for 6.5 seconds to reset API call");

    setTimeout(
        () => { 
            button
                .prop("disabled", false)
                .prop("title", "");
        },
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

        const firstQuestion = qLoader.loadNextQuestion();
        questionForm.prepend(firstQuestion as HTMLDivElement)

        dialog.showModal();
        tempDisableFormSubmit();
    })

    // next button
    questionForm.on("submit", (event) => {
        event.preventDefault();

        // get user's answer and store it

        
        const nextQuestion = qLoader.loadNextQuestion();

        if (nextQuestion){
            questionForm.prepend(nextQuestion as HTMLDivElement);
        }
        

    })
  
    $("#quit-dialog").on("click", () => {
        dialog.close();
    })

}

// when Qs are created, save correct answers to local storage
// everytime user answers question, save that to same local storage
// at the end, see how many questions user guessed correctly


populateCategoryDropdown();
attachButtonEventHandlers();