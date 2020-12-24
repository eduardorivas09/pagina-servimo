import setting from './Settings.json';
import {Session} from "./seguridad/Session";

export class RequestService {

    fullPath = () => setting.url;

    async doGet(path) {
        const token = 'Bearer ' + await Session.getToken()
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
        const headers = (hasToken === false) ?
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': ''
            } :
            {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': ''
            }
        return await fetch(this.fullPath() + path,
            {
                method: 'POST',
                headers: headers,
                body: body

            })
            .then(resp => resp.ok ? Promise.resolve(resp) : Promise.reject(resp))
            .then(resp => resp.json())
    }
}