interface Category{
    id:number
    name:string
}

interface CategoryResponse {
    trivia_categories: Category[]
}


async function fetchAllCategories (url:string):Promise<CategoryResponse> {
    const response = (await fetch(url)).json();
    return response
}




async function parseCategories ():Promise<void> {
    const categories = await fetchAllCategories("https://opentdb.com/api_category.php");
    const data = categories["trivia_categories"];
    console.log(data)


    
    
}




parseCategories();