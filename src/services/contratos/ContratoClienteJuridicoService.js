import {RequestService} from "../RequestService";
import setting from "../Settings.json";

export class ContratoClienteJuridicoService{

    getAll = () => {
        let url = setting.main + "contrato/clientes/juridico"
        return new RequestService().doGet(url);
    }

    getFiltered = (search) => {
        let url = setting.main + "contrato/clientes/juridico"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return new RequestService().doGet(url);
    }
}