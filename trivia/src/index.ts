import { parseCategoryData } from "./categories.js"






async function populateCategoryDropdown ():Promise<void>{
    await parseCategoryData();
    const categoryDropdown = $("select[name='category']");

    const categoryNames:string[] = JSON.parse(localStorage.names);
    const categoryIDs:number[] = JSON.parse(localStorage.IDs);

    for (const name of categoryNames) {
        const option = document.createElement("option");
        option.innerText = name;
        option.className = "category-selection";

        const value = categoryIDs[categoryNames.indexOf(name)].toString();
        option.value = value;

        categoryDropdown.append(option)
    }


    
}



populateCategoryDropdown();