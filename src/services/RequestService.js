import setting from './Settings.json';
import {Session} from "./seguridad/Session";
import {NetworkConnectionError} from "../util/Error/NetworkConnectionError";
import {SavingError} from "../util/Error/SavingError";
import {AuthorizationError} from "../util/Error/AuthorizationError";
import {ServerError} from "../util/Error/ServerError";

export class RequestService {

    fullPath = () => setting.url;

    async doGet(path) {
        let token = 'Bearer ' + await Session.getToken();

        // try{
        //     token = 'Bearer ' + await Session.getToken();
        // }catch (e) {
        //     console.log('Lanzando excepcion desde Request service')
        //     throw e;
        // }

        return await fetch(
            this.fullPath() + path,
            {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': ''
                }
            }
        ).then(response => {
            if ((response instanceof Response || response instanceof Object) && response.status === 403){//FORBIDEN
                throw new AuthorizationError();
            }

            if ((response instanceof Response || response instanceof Object) && response.status === 500){//INTERNAL SERVER ERROR
                console.log("Lanzando error")
                throw new ServerError();
            }

            return response.json()
        }).catch(e => {
            if (e instanceof Error &&  e.message.includes('NetworkError')){
                throw new NetworkConnectionError();
            }
            throw e;
        })
    }

    async doPost(path, body, hasToken) {
        return await this.doPostPutMethod(path, body, hasToken, 'POST')
    }

    async doPut(path, body, hasToken) {
        return await this.doPostPutMethod(path, body, hasToken, 'PUT')
    }

    async doPostPutMethod(path, body, hasToken, method) {
        let token = await Session.getToken();
        const headers = (hasToken === false) ?
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': ''
            } :
            {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': ''
            }
        console.log('full path: ' + this.fullPath() + path)
        return await fetch(this.fullPath() + path,
            {
                method: method,
                headers: headers,
                body: body

            })
            .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(resp))
            .then(resp => resp.json())
            .catch(e => {
                console.log(e);
                if (e instanceof Error &&  e.message.includes('NetworkError')){
                    throw new NetworkConnectionError();
                }

                if (e instanceof Response && e.status === 403){
                    throw new AuthorizationError();
                }

                if (e instanceof Response && e.status === 500){
                    throw new SavingError(e.message);
                }

                if (e instanceof Response && e.status === 409){//CONFLICT
                    throw new SavingError("a una restriccion. Consulte con el administrador.");
                    // throw new AuthenticationError();
                }

                return false;
            });

    }
}