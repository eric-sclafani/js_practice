interface DataResponse {
    text:string;
}


export class FastAPIRequest {

    public data!: DataResponse;
    private url: string;

    constructor(url:string){
        this.url = url;
    }

    public async fetchData():Promise<void>{
        try {
            const response = await fetch(this.url);
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