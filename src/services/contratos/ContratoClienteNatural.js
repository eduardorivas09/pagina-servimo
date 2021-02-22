import {AbstractService} from "../AbstractService";
import setting from "../Settings.json";
import {RequestService} from "../RequestService";

export class ContratoClienteNatural extends AbstractService{

    getAll = () => {
        let url = setting.main + "contrato/clientes/natural"
        return this.doGet(url);
    }

    save = (obj) => {
        let url = setting.main + "contrato/clientes/natural/"
        return new RequestService().doPost(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }

    update = (obj) => {
        let url = setting.main + `contrato/clientes/natural/${obj.id}`
        return new RequestService().doPut(url,JSON.stringify(obj),true)
            .catch(e => {
                throw e;
            });
    }

}