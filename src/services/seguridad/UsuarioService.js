import {AbstractService} from "../AbstractService";
import setting from "../Settings.json";
import {RequestService} from "../RequestService";
import {Session} from "./Session";

export class UsuarioService extends AbstractService {

    getAll = () => {
        let url = setting.admin + "users"
        return this.doGet(url)
    }

    getCurrent = () => {
        let url = setting.admin + "users/me"
        return new RequestService().doPost(
            url,
            JSON.stringify({username : null, password : null, token : Session.getToken()}),
            true
        ).catch(e => {
            throw e;
        });
    }

    save = (obj) => {
        let url = setting.admin + "users/"
        return new RequestService().doPost(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }

    update = (obj) => {
        let url = setting.admin + `users/${obj.id}`
        return new RequestService().doPut(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }

}