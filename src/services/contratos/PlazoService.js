import {AbstractService} from "../AbstractService";
import setting from "../Settings.json";

export class PlazoService extends AbstractService {

    getAll = () => {
        let url = setting.main + "contrato/plazo"
        return this.doGet(url);
    }

}