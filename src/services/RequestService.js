import setting from './Settings.json';
import {Session} from "./seguridad/Session";

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
        ).then(response => response.json())
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

        return await fetch(this.fullPath() + path,
            {
                method: method,
                headers: headers,
                body: body

            })
            .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(resp))
            .then(resp => resp.json())

    }
}