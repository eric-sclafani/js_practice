"use strict";
async function fetchAllCategories(url) {
    const response = (await fetch(url)).json();
    return response;
}
async function parseCategories() {
    const categories = await fetchAllCategories("https://opentdb.com/api_category.php");
    const data = categories["trivia_categories"];
    console.log(data);
}
parseCategories();
