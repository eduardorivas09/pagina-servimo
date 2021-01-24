import {RequestService} from "../RequestService";
import setting from "../Settings.json";
import {NetworkConnectionError} from "../../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../../util/Error/AuthenticationError";
import {AuthorizationError} from "../../util/Error/AuthorizationError";
import {AbstractService} from "../AbstractService";
import {SavingError} from "../../util/Error/SavingError";

export class ClienteNaturalService extends AbstractService{

    getAll = () => {
        let url = setting.main + "clientes/natural"
        return this.doGet(url)
    }

    getFiltered = (search) => {
        let url = setting.main + "clientes/natural"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }

    save = (obj) => {
        let url = setting.main + "clientes/natural/"
        return new RequestService().doPost(url,JSON.stringify(obj),true)
            .catch(e => {
                if (e instanceof Error &&  e.message.includes('NetworkError')){
                    throw new NetworkConnectionError();
                }

                if (e instanceof Response && e.status === 500){
                    throw new SavingError(e.message);
                }

                if (e instanceof Response && e.status === 409){//CONFLICT
                    throw new SavingError("un problema con la informacion.");
                    // throw new AuthenticationError();
                }

                return false;
            });
    }

    update = (obj) => {
        let url = setting.main + "clientes/natural/" + obj.id
        console.log(url)
        console.log(obj);
        return new RequestService().doPut(url,JSON.stringify(obj),true)
            .catch(e => {
                console.log(e);
                if (e instanceof Error &&  e.message.includes('NetworkError')){
                    throw new NetworkConnectionError();
                }

                if (e instanceof Response && e.status === 500){
                    throw new SavingError(e.message);
                }

                if (e instanceof Response && e.status === 409){//CONFLICT
                    throw new SavingError("un problema con la informacion.");
                    // throw new AuthenticationError();
                }

                return false;
            });
    }

}