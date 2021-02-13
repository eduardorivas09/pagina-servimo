

export class ServicioService  extends AbstractService{

    getAll = () => {
        let url = setting.main + "/main/contrato/servicio"
        return this.doGet(url);
    }

    

}
