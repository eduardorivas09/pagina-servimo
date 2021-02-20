import {AbstractService} from '../AbstractService' 
import setting from "../Settings.json";
export class ServicioService  extends AbstractService{

    getAll = () => {
        let url = setting.main + "contrato/servicio"
        return this.doGet(url);

    }

    

}
