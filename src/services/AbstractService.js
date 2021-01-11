import {RequestService} from "./RequestService";
import {AuthorizationError} from "../util/Error/AuthorizationError";
import {NetworkConnectionError} from "../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../util/Error/AuthenticationError";

export class AbstractService{
    doGet = (url) => {
        return new RequestService()
            .doGet(url)
            .then(resp => {

                if ((resp instanceof Response || resp instanceof Object) && resp.status === 403){//FORBIDEN
                    throw new AuthorizationError();
                }
            })
            .catch(e => {

                if (e instanceof Error &&  e.message.includes('NetworkError')){
                    throw new NetworkConnectionError();
                }

                if (e instanceof Response && e.status === 500){
                    throw new AuthenticationError();
                }

                if (e instanceof AuthorizationError){// FORBIDEN
                    throw e;
                }

            });
    }
}