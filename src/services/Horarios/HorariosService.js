import { AbstractService } from "../AbstractService";
import { RequestService } from "../RequestService";
import setting from "../Settings.json";

export class HorariosService extends AbstractService {


    getAll = () => {
        let url = setting.main + "horario"
        return this.doGet(url)
    }


    getFiltered = (search) => {
        let url = setting.main + "horario"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }

    getAllInactivo() {
        let url = setting.main + "empleado/inactivo"
        return this.doGet(url)
    }


    save = (obj) => {
        let url = setting.main + "horario/"
        return new RequestService().doPost(url, JSON.stringify(obj), true)
            .catch(e => {

                if (e instanceof Error && e.message.includes('NetworkError')) {
                    throw new NetworkConnectionError();
                }

                if (e instanceof Response && e.status === 500) {
                    throw new SavingError(e.message);
                }

                if (e instanceof Response && e.status === 409) {//CONFLICT
                    throw new SavingError("un problema con la informacion.");
                    // throw new AuthenticationError();
                }

                return false;

            });
    }

    update = (obj) => {
        let url = setting.main + `.../${obj.id}`
        console.log(url)
        console.log(obj);
        return new RequestService().doPut(url, JSON.stringify(obj), true)
            .catch(e => {

                if (e instanceof Error && e.message.includes('NetworkError')) {
                    throw new NetworkConnectionError();
                }

                if (e instanceof Response && e.status === 500) {
                    throw new SavingError(e.message);
                }

                if (e instanceof Response && e.status === 409) {//CONFLICT
                    throw new SavingError("un problema con la informacion.");
                    // throw new AuthenticationError();
                }

                return false;

            });


    }
}