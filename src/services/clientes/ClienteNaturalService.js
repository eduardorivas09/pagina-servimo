import {RequestService} from "../RequestService";
import setting from "../Settings.json";
import {NetworkConnectionError} from "../../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../../util/Error/AuthenticationError";
import {AuthorizationError} from "../../util/Error/AuthorizationError";
import {AbstractService} from "../AbstractService";

export class ClienteNaturalService extends AbstractService{

    getAll = () => {
        let url = setting.main + "clientes/natural"
        return this.doGet(url)
    }

    getFiltered = (search) => {
        let url = setting.main + "clientes/natural"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }

    save = (obj) => {
        let url = setting.main + "clientes/natural"
        return new RequestService().doPost(url,obj,true)
    }

}