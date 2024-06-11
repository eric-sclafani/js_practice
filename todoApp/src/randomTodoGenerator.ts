interface TodoItem {
    id:string,
    todo:string,
    completed:string,
    userID:number
}


async function getRandomTodo():Promise<TodoItem> {
    const response = await fetch('https://dummyjson.com/todos/random')
    return response.json();

}

export async function generateRandomTodo ():Promise<TodoItem> {
    const data = await getRandomTodo();
    return data;
}