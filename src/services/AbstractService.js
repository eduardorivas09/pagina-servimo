import {RequestService} from "./RequestService";
import {AuthorizationError} from "../util/Error/AuthorizationError";
import {NetworkConnectionError} from "../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../util/Error/AuthenticationError";
import {ServerError} from "../util/Error/ServerError";

export class AbstractService{
    doGet = (url) => {
        return new RequestService()
            .doGet(url)
            .then(resp => {
                // if ((resp instanceof Response || resp instanceof Object) && resp.status === 403){//FORBIDEN
                //     throw new AuthorizationError();
                // }
                //
                // if ((resp instanceof Response || resp instanceof Object) && resp.status === 500){//INTERNAL SERVER ERROR
                //     throw new ServerError();
                // }

                return resp;
            })
            .catch(e => {
                throw e;
            });
    }
}