import {RequestService} from "../RequestService";
import setting from "../Settings.json";

export class ClienteJuridicoService{

    getAll = () => {
        let url = setting.main + "clientes/Juridico"//localhost:8080/main/clientes/Juridico
        return new RequestService().doGet(url);
    }

    getFiltered = (search) => {
        let url = setting.main + "clientes/Juridico"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return new RequestService().doGet(url);
    }

}