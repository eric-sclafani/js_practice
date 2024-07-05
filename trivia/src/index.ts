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
        .prop("title", "Submit button is disabled for 5 seconds to reset API call");

    setTimeout(
        () => {     
            button
                .prop("disabled", false)
                .prop("title", "");
        },
        5000
    )
}

async function attachButtonEventHandlers() {
    const paramsForm = $("#params-form");
    const dialog = document.querySelector("#question-dialog") as HTMLDialogElement;
    const qLoader = new QuestionLoader(); 
    const questionForm = $("#question-form");

    // when use closes by pressing Esc, ensure qLoader is reset
    document.addEventListener("keydown", (event) => {
        if (event.key === 'Escape' && dialog.open) {
            event.preventDefault();
            qLoader.reset();
            dialog.close();
        }
    })

    paramsForm.on("submit", async function(event){
        event.preventDefault();
        tempDisableFormSubmit();

        $("#next-question").show();
        $("#next-question").html("Next");
        $("#score-wrapper").html("");

        const url = createUrlOnSubmit(event, paramsForm);
        await qLoader.prepareAllQuestions(url);
        console.log(qLoader.questions)
       
        qLoader.removePreviousQuestionIfExists();
        qLoader.loadNextQuestion();

        const firstQuestion = qLoader.currentQuestion;
        questionForm.prepend(firstQuestion.questionDiv);

        dialog.showModal();
    })

    // next button
    questionForm.on("submit", (event) => {
        event.preventDefault();

        if (qLoader.isLastQuestion()){
            $("#next-question").html("Finish!");
        } 

        if (qLoader.questionnaireIsOver()){
            $("#next-question").hide();
            
            qLoader.removePreviousQuestionIfExists();
            questionForm.prepend(qLoader.scoreScreen());

        }
        else {
            const userAnswer = questionForm.serializeArray()[0].value; 
            qLoader.currentQuestion.userAnswer = userAnswer

            qLoader.removePreviousQuestionIfExists(); 
            qLoader.loadNextQuestion();
            const nextQuestion = qLoader.currentQuestion;
            questionForm.prepend(nextQuestion.questionDiv);
        }
        
        
    })
  
    $("#quit-dialog").on("click", () => {
        qLoader.reset();
        dialog.close();
    })

}

populateCategoryDropdown();
attachButtonEventHandlers();