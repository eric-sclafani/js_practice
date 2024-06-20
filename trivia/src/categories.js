async function fetchAllCategories(url) {
    const response = await fetch(url);
    return response.json();
}
const storeCategoryData = (data) => {
    const names = [];
    data.forEach((elem) => names.push(elem.name));
    localStorage["names"] = JSON.stringify(names);
    const IDs = [];
    data.forEach((elem) => IDs.push(elem.id));
    localStorage["IDs"] = JSON.stringify(IDs);
};
export async function parseCategoryData() {
    const categories = await fetchAllCategories("https://opentdb.com/api_category.php");
    const data = categories["trivia_categories"];
    storeCategoryData(data);
}
