import { RequestService } from "../RequestService";
import setting from "../Settings.json";
import { NetworkConnectionError } from "../../util/Error/NetworkConnectionError";
import { AuthenticationError } from "../../util/Error/AuthenticationError";
import { AuthorizationError } from "../../util/Error/AuthorizationError";
import { AbstractService } from "../AbstractService";
import { SavingError } from "../../util/Error/SavingError";

export class CarjoTrabajadorService extends AbstractService {


    getAll = () => {
        let url = setting.main + "cargo"
        return this.doGet(url)
    }

    getFiltered = (search) => {
        let url = setting.main + "cargo"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }
}