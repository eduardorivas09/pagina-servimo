import {RequestService} from "../RequestService";
import setting from "../Settings.json";

export class ClienteNaturalService{

    getAll = () => {
        let url = setting.main + "clientes/natural"
        return new RequestService().doGet(url);
    }

    getFiltered = (search) => {
        let url = setting.main + "clientes/natural"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return new RequestService().doGet(url);
    }

    save = (obj) => {
        let url = setting.main + "clientes/natural"
        return new RequestService().doPost(url,obj,true)
    }

}