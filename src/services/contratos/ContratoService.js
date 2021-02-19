import {AbstractService} from "../AbstractService";
import setting from "../Settings.json";

export class ContratoService extends AbstractService {
    getAll = () => {
        let url = setting.main + "contrato"
        return this.doGet(url);
    }
}