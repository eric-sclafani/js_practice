


const createTodoItem  = (text:string):HTMLDivElement => {
    const todoItemWrapper = document.createElement("div");
    todoItemWrapper.className = "todo-item-wrapper";

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";

    const todoText = document.createElement("div");
    todoText.innerHTML = text;
    todoText.className = "todo-text";

    const removeButton = document.createElement("button");
    removeButton.className = "todo-remove";
    removeButton.innerHTML = "<i class='fa-regular fa-trash'></i>";

    todoItemWrapper.append(todoCheckbox);
    todoItemWrapper.append(todoText);
    todoItemWrapper.append(removeButton);

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
            createTodoItem(formInputText),
        );

        formInput.val(""); // reset textbox


    });
}

// var checkbox = document.querySelector("input[name=checkbox]");

// checkbox.addEventListener('change', function() {
//   if (this.checked) {
//     console.log("Checkbox is checked..");
//   } else {
//     console.log("Checkbox is not checked..");
//   }
// });


attachSubmitEventHandler()