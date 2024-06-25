interface Category{
    id:number
    name:string
}

interface CategoryResponse {
    trivia_categories: Category[]
}

async function fetchAllCategories (url:string):Promise<CategoryResponse> {
    const response = await fetch(url);
    return response.json();
}

const storeCategoryData = (data:Category[]) => {
    const names:string[] = [];
    data.forEach((elem) => names.push(elem.name));
    localStorage["names"] = JSON.stringify(names);
    
    const IDs:number[] = [];
    data.forEach((elem) => IDs.push(elem.id));
    localStorage["IDs"] = JSON.stringify(IDs);
}

async function parseCategoryData():Promise<void> {
    const categories = await fetchAllCategories("https://opentdb.com/api_category.php");
    const data = categories["trivia_categories"];
    storeCategoryData(data);
}


export async function populateCategoryDropdown ():Promise<void>{
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