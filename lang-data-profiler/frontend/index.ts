interface DataResponse {
    lowered_text:string;
}



class DataRequest {

    data!:DataResponse

    constructor(url:string){
        this.fetchData(url);
    }

    private async fetchData(url:string):Promise<void>{
        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            this.data = json;
          } catch (error) {
                console.log(error)
          }
    }
}

const request = new DataRequest("http://localhost:8000/lower/HELLO");