import { AbstractService } from "../AbstractService";
import setting from "../Settings.json";

export class HorariosService extends AbstractService {


    getAll = () => {
        let url = setting.main + "/main/horario"
        return this.doGet(url)
    }


    getFiltered = (search) => {
        let url = setting.main + "/main/horario"
        url += (search != null && search.trim().length > 0) ? `/?search=${search}` : ""
        return this.doGet(url);
    }

    getAllInactivo() {
        let url = setting.main + "/main/empleado/inactivo"
        return this.doGet(url)
    }
}