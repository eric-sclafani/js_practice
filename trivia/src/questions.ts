
class Question {
    private correct_answer:string;
    private incorrect_answers: string[];
    private question:string;
    public questionDiv!:HTMLDivElement;

    constructor(correct_answer:string, incorrect_answers:string[], question:string) {
        this.correct_answer = correct_answer;
        this.incorrect_answers = incorrect_answers;
        this.question = question;
    }

    get correctAnswer():string {
        return this.correct_answer
    }

    get incorrectAnswers():string[] {
        return this.incorrect_answers;
    }

    get questionText():string{
        return this.question
    }
}

export class QuestionLoader {

    private questions:Question[];
    private index:number;
    private currentQuestion!:Question;
    
    constructor(){ 
        this.questions = [];
        this.index = 0; 
    }

    get viewAllQuestions(){
        return this.questions;
    }

    public loadNextQuestion():void {

        this.removePreviousQuestionIfExists();        

        const currentQuestion = this.questions[this.index]; 
        if (currentQuestion){
            this.index++
            this.currentQuestion = currentQuestion;
        }

    }

    public async prepareAllQuestions(url:string): Promise<void>{
        const questions = await this.fetchQuestions(url);
        for (const question of questions){
            const div = this.createQuestionDiv(question);
            question.questionDiv = div;
        }
        this.questions = questions;
    }

    private removePreviousQuestionIfExists():void {
        if ($(".question-wrapper").html()){
            $(".question-wrapper").html("") 
        }
    }

    private async fetchQuestions(url:string):Promise<Question[]> {
        const response = (await fetch(url)).json();
        const responseData = await response;

        const questions :Question[] = [];
        const results = responseData["results"];

        for (const result of results){
            questions.push(
                new Question(
                    result.correct_answer,
                    result.incorrect_answers,
                    result.question
                )   
            )
        }
        return questions;
    }

    private shuffleAnswers (array:string[]):string[] {
        const shuffledArr:string[] = [];
        const amountAnswers = array.length;
    
        while (shuffledArr.length != amountAnswers){
            const randomIndex = Math.floor(Math.random() * amountAnswers);
            const randomSelection = array[randomIndex];
    
            if (!shuffledArr.includes(randomSelection)){
                shuffledArr.push(randomSelection)
            }
        }
        return shuffledArr;
    }
    
    private createQuestionDiv (question:Question):HTMLDivElement {
        let questionAnswers = this.shuffleAnswers([question.correctAnswer, ...question.incorrectAnswers]);
    
        const questionWrapper = document.createElement("div");
        questionWrapper.className = "question-wrapper";
    
        const answersWrapper = document.createElement("div");
        answersWrapper.className = "answers-wrapper";
    
        const questionText = document.createElement("h2");
        questionText.className = "question-text";
        questionText.innerText = question.questionText;
        questionWrapper.appendChild(questionText);
    
        for (const answer of questionAnswers){
    
            const input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "answer");
            input.id = answer
            input.value = answer;
            input.required = true;
    
            const label = document.createElement("label");
            label.setAttribute("for", answer);
            label.innerText = answer;
            label.className = "question-label";
            label.prepend(input);
    
            answersWrapper.append(label);
            
        }
        questionWrapper.appendChild(answersWrapper)
        return questionWrapper
    }
}