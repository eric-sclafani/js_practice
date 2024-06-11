async function getRandomTodo() {
    const response = await fetch('https://dummyjson.com/todos/random');
    return response.json();
}
export async function generateRandomTodo() {
    const data = await getRandomTodo();
    return data;
}
