import {AbstractService} from "../AbstractService";
import setting from "../Settings.json";
import {RequestService} from "../RequestService";

export class RoleService extends AbstractService {
    getAll = () => {
        let url = setting.public + "roles"
        return this.doGet(url);
    }

    save = (obj) => {
        let url = setting.admin + "roles/"
        return new RequestService().doPost(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }

    update = (obj) => {
        let url = setting.admin + `roles/${obj.id}`
        return new RequestService().doPut(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }
}