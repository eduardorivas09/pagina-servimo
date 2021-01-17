import setting from "../Settings.json";
import {AbstractService} from "../AbstractService";

export class ClienteJuridicoService extends AbstractService{

    getAll = () => {
        let url = setting.main + "clientes/Juridico"//localhost:8080/main/clientes/Juridico
        return this.doGet(url);
    }

    getFiltered = (search) => {
        let url = setting.main + "clientes/Juridico"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }

}