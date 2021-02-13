import setting from "../Settings.json";
import {AbstractService} from "../AbstractService";
import {RequestService} from "../RequestService";
import {NetworkConnectionError} from "../../util/Error/NetworkConnectionError";
import {SavingError} from "../../util/Error/SavingError";

export class ClienteService extends AbstractService{

    getAll = () => {
        let url = setting.main + "clientes/all"
        return this.doGet(url);
    }
}
