import { Toast } from 'primereact/toast';
import setting from "./Settings.json";
import {RequestService} from "./RequestService";
import {AuthorizationError} from "../util/Error/AuthorizationError";
import {NetworkConnectionError} from "../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../util/Error/AuthenticationError";
import {Session} from "./seguridad/Session";
import Customer from "../components/views/clientes/Customer";

export class MenusService{

    getAll = async () => {
        let url =  "api/menus"
        return await new RequestService()
            .doPost(url,JSON.stringify({username : null, password : null, token : Session.getToken()}), true)
            .then(resp => {
                console.log(resp)
                if ((resp instanceof Response || resp instanceof Object) && resp.status === 403){//FORBIDEN
                    throw new AuthorizationError();
                }

                return resp;
            })
            .catch(e => {
                console.log(e)
                // if (e instanceof Error &&  e.message.includes('NetworkError')){
                //     throw new NetworkConnectionError();
                // }
                //
                // if (e instanceof Response && e.status === 500){
                //     throw new AuthenticationError();
                // }

                // if (e instanceof AuthorizationError){// FORBIDEN
                //     throw e;
                // }

                throw e;

            });
    }


    getMainMenuItems = async (onClickMenu) => {

        const reponse = await this.getAll().catch(e => {
            throw e;
        });

        console.log(reponse);

        const menu = []

            const parent = reponse.filter(elemento => elemento.menuPadre === null)

            parent.forEach(element => {
                const child = reponse.filter(e1 => e1.menuPadre !== null && e1.menuPadre.id === element.id)
                const obj = {
                    label: element.nombreMenu,
                    icon: element.iconClass,
                }

                if (element.nombreMenu.includes('INICIO')){
                    obj.url = element.url;
                }else{
                    obj.command = () => {
                        onClickMenu(element.url)
                    }
                }

                const items = []

                child.forEach(c1 => {
                    const node = {
                        label: c1.nombreMenu,
                        icon: c1.iconClass,
                    }

                    if (c1.url !== undefined && c1.url !== null){
                        // node.url = c1.url;
                        node.command = () => {
                            onClickMenu(c1.url)
                        }
                        console.log(c1.url)
                    }

                    items.push(node);
                })

                if (items.length > 0){
                    obj.items = items
                }

                // if(obj.url !== undefined && obj.url !== null){
                //
                //     const url = obj.url;
                //     obj.command = () => {
                //         onClickMenu(url)
                //     }
                //
                //     // if (!obj.nombreMenu.includes('INICIO')){
                //     //     obj.url = '';
                //     // }
                //
                // }

                menu.push(obj);
            })

        return new Promise(resolve => {
            const items = menu
            resolve(items);
        });
    }

    getPopUpMenuItems = (editCallBack) => {
        return new Promise(resolve => {
           const items =[
               {
                   label: 'Usuario',
                   items: [
                       {
                           label: 'Editar',
                           icon: 'pi pi-user-edit',
                           command: () => {
                               editCallBack();
                           }
                       },
                       {
                           label: 'Preferencias',
                           icon: 'pi pi-star',
                           // command: () => {
                           //     this.toast.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                           // }
                       }
                   ]
               },
               {
                   label: 'Sesion',
                   items: [
                       {
                           label: 'Cerrar Sesion',
                           icon: 'pi pi-power-off',
                           url: 'http://localhost:3000/login',
                           command: () => {
                               localStorage.removeItem('token');
                           }
                       }
                   ]
               }
           ]
            resolve(items);
        });
    }
}

/**
 [
 {
                    label:'Inicio',
                    icon:'pi pi-fw pi-home',
                    url: '/'

                },
 {
                    label:'Jornadas Laborales',
                    icon:'pi pi-fw pi-calendar',
                    items:[
                        {
                            label:'Trabajadores en Turno',
                            icon:'pi pi-fw pi-circle-on'
                        },
                        {
                            label:'Calendario',
                            icon:'pi pi-fw pi-calendar'
                        },
                        {
                            label:'Vacaciones',
                            icon:'pi pi-fw pi-caret-up'
                        },{
                            label:'Historico',
                            icon:'pi pi-fw pi-chart-bar'
                        },

                    ]
                },
 {
                    label:'Clientes',
                    icon:'pi pi-fw pi-users',
                    items:[
                        {
                            label:'Clientes Naturales',
                            icon:'pi pi-fw pi-user',
                            url: 'http://localhost:3000/main/clientes/natural',
                        },
                        {
                            label:'Clientes Juridicos',
                            icon:'pi pi-fw pi-sitemap',
                            url: 'http://localhost:3000/main/clientes/juridico',
                        }
                    ]
                },
 {
                    label:'Contratos',
                    icon:'pi pi-fw pi-briefcase',
                    items:[
                        {
                            label:'Clientes Naturales',
                            icon:'pi pi-fw pi-user',

                        },
                        {
                            label:'Clientes Juridicos',
                            icon:'pi pi-fw pi-sitemap',

                        }
                    ]
                },
 {
                    label:'Solicitudes',
                    icon:'pi pi-fw pi-envelope',
                    items:[
                        {
                            label:'Consultas',
                            icon:'pi pi-fw pi-info',

                        },
                        {
                            label:'Contratacion de Serivios',
                            icon:'pi pi-fw pi-check',

                        },
                        {
                            label:'Dar de Baja',
                            icon:'pi pi-fw pi-circle-off'
                        }
                    ]
                }
 ]
 */