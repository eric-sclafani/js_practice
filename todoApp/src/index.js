"use strict";
const getTodoWrapper = (checkboxNumber) => {
    const todoItems = $("#todo-items").children();
    for (const item of todoItems) {
        if (item.classList[0].slice(-1) == checkboxNumber) {
            return item;
        }
    }
    return null;
};
const checkboxEventHandler = function () {
    const checkboxNumber = this.className.slice(-1);
    const todoWrapper = getTodoWrapper(checkboxNumber);
    if (this.checked) {
        todoWrapper.style.textDecoration = "line-through";
        todoWrapper.style.color = "gray";
    }
    else {
        todoWrapper.style.textDecoration = "none";
        todoWrapper.style.color = "black";
    }
};
const createTodoCheckbox = (todoNum) => {
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.className = `checkbox-${todoNum}`;
    todoCheckbox.addEventListener("change", checkboxEventHandler);
    return todoCheckbox;
};
const createTodoText = (text) => {
    const todoText = document.createElement("div");
    todoText.innerHTML = text;
    todoText.className = "todo-text";
    return todoText;
};
const createRemoveButton = () => {
    const removeButton = document.createElement("button");
    removeButton.className = "todo-remove";
    removeButton.innerHTML = "<i class='fa-regular fa-trash'></i>";
    return removeButton;
};
const createTodoItem = (text, todoNum) => {
    const todoItemWrapper = document.createElement("div");
    todoItemWrapper.className = `todo-item-wrapper-${todoNum}`;
    todoItemWrapper.append(createTodoCheckbox(todoNum));
    todoItemWrapper.append(createTodoText(text));
    todoItemWrapper.append(createRemoveButton());
    return todoItemWrapper;
};
function randomChoice(choices) {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
const addTodoItemToDOM = (todo, forceAnim = "") => {
    if (!forceAnim) {
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
        const selection = "slideFrom".concat(randomChoice(todoAnimDirections));
        todo.classList.add(selection);
        $("#todo-items").append(todo);
    }
    else {
        todo.classList.add(forceAnim);
        $("#todo-items").append(todo);
    }
};
const attachSubmitEventHandler = () => {
    const form = $('#main-form');
    let todoCount = 0;
    form.on("submit", (event) => {
        event.preventDefault();
        const formInput = form.find('input[name="todo-input"]');
        const formInputText = formInput.val();
        addTodoItemToDOM(createTodoItem(formInputText, todoCount));
        todoCount++;
        formInput.val(""); // reset textbox
    });
};
// var checkbox = document.querySelector("input[name=checkbox]");
// checkbox.addEventListener('change', function() {
//   if (this.checked) {
//     console.log("Checkbox is checked..");
//   } else {
//     console.log("Checkbox is not checked..");
//   }
// });
attachSubmitEventHandler();
