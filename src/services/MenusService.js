import { Toast } from 'primereact/toast';

export class MenusService{
    getMainMenuItems = () => {
        return new Promise(resolve => {
            const items = [
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
            resolve(items);
        });
    }

    getPopUpMenuItems = () => {
        return new Promise(resolve => {
           const items =[
               {
                   label: 'Usuario',
                   items: [
                       {
                           label: 'Editar',
                           icon: 'pi pi-user-edit',
                           // command: () => {
                           //     this.toast.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                           // }
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