import { FastAPIRequest } from "./dataRequest.js"

const SAMPLE1 = "The Renaissance, spanning roughly from the 14th to the 17th century, was a transformative period in European history. Originating in Italy, it marked a revival of interest in the classical art, literature, and learning of ancient Greece and Rome. This era witnessed significant developments in various fields, including art, science, and politics. Renowned figures such as Leonardo da Vinci, Michelangelo, and Raphael revolutionized art with their masterful works and techniques. In science, polymaths like Galileo Galilei and Copernicus challenged existing views, laying the groundwork for modern astronomy and physics. The invention of the printing press by Johannes Gutenberg around 1440 played a crucial role in disseminating knowledge, making books more accessible and fostering an environment of intellectual growth. The Renaissance also saw the emergence of humanism, a philosophical movement that emphasized the value of human potential and achievements, profoundly influencing Western thought and culture."
const SAMPLE2 = "New York City, often called 'The Big Apple', is an iconic global metropolis renowned for its dynamic energy, cultural diversity, and architectural marvels. Situated on the East Coast of the United States, it consists of five boroughs: Manhattan, Brooklyn, Queens, the Bronx, and Staten Island, each with its own unique identity and charm. Manhattan is the heart of the city, famous for its skyline dominated by skyscrapers like the Empire State Building and One World Trade Center. It is also home to Central Park, a sprawling green oasis amidst the urban jungle, and Times Square, known for its dazzling lights and Broadway theaters. Brooklyn, known for its artistic vibe and historic brownstones, boasts attractions such as the Brooklyn Bridge and Prospect Park. Queens is the most ethnically diverse urban area in the world, offering a rich tapestry of cultures and cuisines. The Bronx, birthplace of hip-hop, features Yankee Stadium and the expansive Bronx Zoo. Staten Island, accessible by a scenic ferry ride, offers a more suburban feel with parks and historic sites. NYC is a global hub for finance, media, and fashion, with Wall Street symbolizing economic power. Its cultural scene is unparalleled, with world-class museums like the Metropolitan Museum of Art and the Museum of Modern Art, and an ever-evolving array of dining and entertainment options. From its role in shaping global finance and media to its vibrant street life and neighborhoods, New York City stands as a symbol of ambition, innovation, and resilience."
const SAMPLE3 = "Tigers, the largest of all wild cats, are magnificent and powerful predators native to Asia. They are known for their striking orange coats with black stripes, which provide camouflage in their forest habitats. Tigers are solitary animals and highly territorial, each maintaining a large range to ensure ample prey. They primarily hunt ungulates such as deer and wild boar. Sadly, all tiger subspecies are endangered due to habitat loss, poaching, and human-wildlife conflict. Conservation efforts are crucial to protect these majestic creatures and their habitats, ensuring they continue to thrive in the wild."




async function sendAPIRequest(text:string):Promise<FastAPIRequest> {
    const request = new FastAPIRequest(`http://localhost:8000/nlp/?text=${text}`);
    await request.fetchData();
    return request;
}





const attachFormEventHandler = (): void => {

    $("#input-form").on("submit", async function(event:any) {
        event.preventDefault();
        
        const formData = $(this).serializeArray();
        $("#inputText").val("");
        const inputValue = formData[0].value;

        const request = await sendAPIRequest(inputValue);

        
    })
}









attachFormEventHandler();
