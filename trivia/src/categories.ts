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

export async function parseCategoryData():Promise<void> {
    const categories = await fetchAllCategories("https://opentdb.com/api_category.php");
    const data = categories["trivia_categories"];
    storeCategoryData(data);
}