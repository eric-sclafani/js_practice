
interface Question {
    category:string;
    correct_answer:string;
    difficulty:string;
    incorrect_answers: string[];
    question:string;
    type:string; 
}

interface QuestionsResponse {
    results: Question[];
}

async function fetchQuestions(url:string):Promise<QuestionsResponse>{
    const data = await fetch(url);
    return await data.json();
}

const shuffleAnswers = (array:string[]):string[] => {
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

const createQuestionDiv = (question:Question):HTMLDivElement => {
    let questionAnswers = shuffleAnswers([question.correct_answer, ...question.incorrect_answers]);

    const wrapper = document.createElement("div");
    wrapper.className = "question-wrapper";

    for (const answer of questionAnswers){

        const input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "answer");
        input.className = "answer";
        input.value = answer;

        const label = document.createElement("label");
        label.setAttribute("for", "answer");

        wrapper.prepend(input);
        wrapper.prepend(label);
        
    }

    return wrapper;
    

const createAllQuestions = (questions:QuestionsResponse): HTMLDivElement[] => {
    const allQuestionDivs:HTMLDivElement[] = [];
    const data = questions.results;

    for (const question of data){
        const htmlDiv = createQuestionDiv(question);
        allQuestionDivs.push(htmlDiv);
    }
    return allQuestionDivs;

}




    


}


