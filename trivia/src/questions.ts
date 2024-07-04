
class Question {
    public correctAnswer:string;
    public incorrectAnswers: string[];
    public questionText:string;

    public questionDiv!:HTMLDivElement;
    public userAnswer!:string;

    constructor(correct_answer:string, incorrect_answers:string[], question:string) {
        this.correctAnswer = correct_answer;
        this.incorrectAnswers = incorrect_answers;
        this.questionText = question;
    }

}

export class QuestionLoader {

    private _questions:Question[];
    private _currentQuestion!:Question;
    private _index:number;
    
    constructor(){ 
        this._questions = [];
        this._index = 0; 
    }

    get questions():Question[]{
        return this._questions;
    }

    get currentQuestion():Question{
        return this._currentQuestion;
    }

    get index():number{
        return this._index;
    }

    public isLastQuestion():boolean {
        return this._index+1 == this._questions.length;
    }

    public resetIndex():void {
        this._index = 0;
    }

    public loadNextQuestion():void {

        this.removePreviousQuestionIfExists();        

        const currentQuestion = this._questions[this._index]; 
        if (currentQuestion){
            this._index++
            this._currentQuestion = currentQuestion;
        }
    }

    public async prepareAllQuestions(url:string): Promise<void>{
        const questions = await this.fetchQuestions(url);
        let counter = 0;
        for (let question of questions){
            question = this.processText(question);

            const div = this.createQuestionDiv(question, counter);
            question.questionDiv = div;
            counter++
        }
        this._questions = questions;
    }

    private removePreviousQuestionIfExists():void {
        if ($(".question-wrapper").html()){
            $(".question-wrapper").html("") 
        }
    }

    private processText(question:Question):Question{
       const cleanText = (text:string) => {
        return text.replaceAll("&#039;", "'").replaceAll("&quot;", "\"");
       }
       question.questionText = cleanText(question.questionText);
       question.correctAnswer = cleanText(question.correctAnswer);
       question.incorrectAnswers = question.incorrectAnswers.map((x) => cleanText(x))
       return question;
       
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
    
    private createQuestionDiv (question:Question, count:number):HTMLDivElement {
        let questionAnswers = this.shuffleAnswers([question.correctAnswer, ...question.incorrectAnswers]);
    
        const questionWrapper = document.createElement("div");
        questionWrapper.className = "question-wrapper";
    
        const answersWrapper = document.createElement("div");
        answersWrapper.className = "answers-wrapper";
    
        const questionText = document.createElement("h2");
        questionText.className = "question-text";
        questionText.innerText = `${count+1}. ${question.questionText}`;
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