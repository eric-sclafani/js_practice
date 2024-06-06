"use strict";
const createTodoItem = (text) => {
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
};
const addTodoItemToDOM = (todo) => {
    $("#todo-items").append(todo);
};
const attachSubmitEventHandler = () => {
    const form = $('#main-form');
    form.on("submit", (event) => {
        event.preventDefault();
        const formInput = form.find('input[name="todo-input"]');
        const formInputText = formInput.val();
        addTodoItemToDOM(createTodoItem(formInputText));
        formInput.val(""); // reset textbox
    });
};
attachSubmitEventHandler();
