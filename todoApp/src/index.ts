import { generateRandomTodo } from "./randomTodoGenerator.js";

let todoCount = 0;

const getTodoWrapper = (checkboxNumber:string):HTMLElement|null => {
    const todoItems = $("#todo-items").children();
    for (const item of todoItems) {
        if (item.classList[0].slice(-1) == checkboxNumber){
            return item;
        }
    }
    return null;
}


const checkboxEventHandler = function (this:HTMLInputElement) {
    
    const checkboxNumber = this.className.slice(-1);
    const todoWrapper = getTodoWrapper(checkboxNumber) as HTMLElement;

    if (this.checked){
        todoWrapper.style.textDecoration = "line-through";
        todoWrapper.style.color = "gray";
    } else {
        todoWrapper.style.textDecoration = "none";
        todoWrapper.style.color = "black"; 
    }

}

const createTodoCheckbox = (todoNum:number):HTMLInputElement => {
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.className = `checkbox-${todoNum}`;
    todoCheckbox.addEventListener("change", checkboxEventHandler);
    return todoCheckbox;
}

const createTodoText = (text:string):HTMLDivElement => {
    const todoText = document.createElement("div");
    todoText.innerHTML = text;
    todoText.className = "todo-text";
    return todoText;
}

const createRemoveButton = ():HTMLButtonElement => {
    const removeButton = document.createElement("button");
    removeButton.className = "todo-remove";
    removeButton.innerHTML = "<i class='fa-regular fa-trash'></i>";
    return removeButton;
}


const createTodoItem  = (text:string, todoNum:number):HTMLDivElement => {
    const todoItemWrapper = document.createElement("div");
    todoItemWrapper.className = `todo-item-wrapper-${todoNum}`;

    todoItemWrapper.append(createTodoCheckbox(todoNum));
    todoItemWrapper.append(createTodoText(text));
    todoItemWrapper.append(createRemoveButton());

    return todoItemWrapper;
}

function randomChoice(choices:Array<string>):string {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

const addTodoItemToDOM = (todo:HTMLDivElement, forceAnim:string = ""):void => {

    if (!forceAnim){
        const todoAnimDirections = [
            "Top", 
            "Bottom", 
            "Left", 
            "Right",
            "TopLeft",
            "TopRight",
            "BottomLeft",
            "BottomRight"
        ];
        const selection =  "slideFrom".concat(randomChoice(todoAnimDirections))
        todo.classList.add(selection);
        $("#todo-items").append(todo);
    } else {
        todo.classList.add(forceAnim);
        $("#todo-items").append(todo);
    }
    
}

const attachSubmitEventHandler = ():void => {
    const form = $('#main-form');
    
    form.on("submit", (event) => {
        event.preventDefault();
        const formInput = form.find('input[name="todo-input"]');
        const formInputText = formInput.val() as string;

        addTodoItemToDOM(
            createTodoItem(formInputText, todoCount),
        );

        todoCount++;
        formInput.val(""); // reset textbox
    });
}

async function attachRandomTodoButtonHandler():Promise<void> {

    const randomTodoButton = $("#generate-random-todo");

    randomTodoButton.on("click", async function () {
        const randomTodoText:string = (await generateRandomTodo()).todo;
        addTodoItemToDOM(
            createTodoItem(randomTodoText, todoCount),
        );
        todoCount++; 
    })
}



attachSubmitEventHandler();
attachRandomTodoButtonHandler();