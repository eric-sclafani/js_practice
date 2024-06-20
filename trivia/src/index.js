import { parseCategoryData } from "./categories.js";
async function populateCategoryDropdown() {
    await parseCategoryData();
    const categoryDropdown = $("select[name='category']");
    const categoryNames = JSON.parse(localStorage.names);
    const categoryIDs = JSON.parse(localStorage.IDs);
    for (const name of categoryNames) {
        const option = document.createElement("option");
        option.innerText = name;
        option.className = "category-selection";
        const value = categoryIDs[categoryNames.indexOf(name)].toString();
        option.value = value;
        categoryDropdown.append(option);
    }
}
populateCategoryDropdown();
