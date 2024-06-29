
interface Question {
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers: string[];
    question:string;
    type:string; 
}


export class QuestionLoader {

    private questionDivs:HTMLDivElement[];
    
    constructor(){ 
        this.questionDivs = [];
    }

    public async loadAllQuestions(url:string): Promise<void>{
        const questions = await this.fetchQuestions(url);
        // process question objs into divs
    }

    private async fetchQuestions(url:string):Promise<Question[]> {
        const response = (await fetch(url)).json();
        const results = await response;
        return results["results"];
    }

    private loadNextQuestion():Function {
        let index = 0;
        //const currentQuestion = this.questions[index];
        
        return function(){

        }
    }

    

}



// const shuffleAnswers = (array:string[]):string[] => {
//     const shuffledArr:string[] = [];
//     const amountAnswers = array.length;

//     while (shuffledArr.length != amountAnswers){
//         const randomIndex = Math.floor(Math.random() * amountAnswers);
//         const randomSelection = array[randomIndex];

//         if (!shuffledArr.includes(randomSelection)){
//             shuffledArr.push(randomSelection)
//         }
//     }
//     return shuffledArr;
// }

// const createQuestionDiv = (question:Question):HTMLDivElement => {
//     let questionAnswers = shuffleAnswers([question.correct_answer, ...question.incorrect_answers]);

//     const questionWrapper = document.createElement("div");
//     questionWrapper.className = "question-wrapper";

//     const answersWrapper = document.createElement("div");
//     answersWrapper.className = "answers-wrapper";

//     const questionText = document.createElement("h2");
//     questionText.className = "question-text";
//     questionText.innerText = question.question;
//     questionWrapper.appendChild(questionText);

//     for (const answer of questionAnswers){

//         const input = document.createElement("input");
//         input.setAttribute("type", "radio");
//         input.setAttribute("name", "answer");
//         input.id = answer
//         input.value = answer;

//         const label = document.createElement("label");
//         label.setAttribute("for", answer);
//         label.innerText = answer;
//         label.className = "question-label";
//         label.prepend(input);

//         answersWrapper.append(label);
        
//     }
//     questionWrapper.appendChild(answersWrapper)
//     return questionWrapper
// }
    
// const createAllQuestions = (questions:QuestionsResponse): HTMLDivElement[] => {
//     const allQuestionDivs:HTMLDivElement[] = [];
//     const data = questions.results;

//     for (const question of data){
//         const htmlDiv = createQuestionDiv(question);
//         allQuestionDivs.push(htmlDiv);
//     }
//     return allQuestionDivs;
// }


// const questionLoader = (response:QuestionsResponse):Function => {
//     const questions = createAllQuestions(response);
//     let currentQuestionIndex = 0;
    
//     return function():HTMLDivElement | null{
//         const currentQuestion = questions[currentQuestionIndex]
//         if (currentQuestion){
//             currentQuestionIndex++
//             return currentQuestion;
//         } 
//         else { 
//             return null
//         };
    
        
        
//     }
// }