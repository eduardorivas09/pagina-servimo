import {RequestService} from "../RequestService";
import setting from "../Settings.json";
import {AbstractService} from "../AbstractService";

export class ContratoClienteJuridicoService extends AbstractService{

    getAll = () => {
        let url = setting.main + "contrato/clientes/juridico"
        return this.doGet(url);
    }

    getFiltered = (search) => {
        let url = setting.main + "contrato/clientes/juridico"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }

    save = (obj) => {
        let url = setting.main + "contrato/clientes/juridico/"
        return new RequestService().doPost(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }
}