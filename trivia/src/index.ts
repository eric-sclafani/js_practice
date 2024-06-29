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


    
    // await qLoader.fetchQuestions();
    // return qLoader;
    

    
    
    // const questionReponse = await fetchQuestions(url);
    // const loadQuestion = questionLoader(questionReponse);
    //$("#question-form").prepend(loadQuestion())
    


async function attachButtonEventHandlers() {
    const form = $("#params-form");
    const dialog = document.querySelector("#question-dialog") as HTMLDialogElement;
    const qLoader = new QuestionLoader(); 

    form.on("submit", async function(event){

        event.preventDefault();
        const url = createUrlOnSubmit(event, form);
        // await qLoader.loadAllQuestions(url);

        
        
        dialog.showModal();
    })

    $("#next-question").on("click", () => {

    })
  
    $("#quit-dialog").on("click", () => {
        dialog.close();
    })

}

// user presses next:
    // increment question index
    // keep track of user answer and see if its correct
    // wipe the previous question's HTML and next question HTML
    // if last question, next button will say finish


populateCategoryDropdown();
attachButtonEventHandlers();
