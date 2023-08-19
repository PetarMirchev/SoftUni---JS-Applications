import { UserReadableError } from "../errors/UserReadableError";

export class BaseApiService {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }


    async _internalFetchJson(url, option){
        let response = await fetch(url, option);

        try {
            if(response.status === 200){ //ok 
                return await response.json();
            } else if (response.status === 204){ // user registered
                return undefined;
            } else { // error 
                let result = await response.json();
                throw new UserReadableError(result.message);
            }
        } catch (error) {
            throw error;
        }
       
    }
}