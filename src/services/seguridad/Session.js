import {RequestService} from "../RequestService";
import config from './../Settings.json';
import {NetworkConnectionError} from "../../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../../util/Error/AuthenticationError";

export class Session{

    /**
     * Variable de tipo string que almacena el token de authentifacion del usuario actual.
     * Esta variable es accesible solo en esta clase pero persiste su valor durante la ejecucion de toda la aplicacion.
     * @type {string}
     */
    static #token = null;

    /**
     * Variable de tipo boolean cuyo valor true significa que el usuario ha iniciado sesion y false lo contrario.
     * Esta variable es accesible solo en esta clase, pero su valor persisten durante la ejecucion de toda la aplicacion
     * @type {boolean}
     */
    static #logged = false;

    /**
     * Metodo de inicio de sesion que realiza una peticion al servidor para verificar si el usuario es valido o no.
     * @param username  Nombre de usuario
     * @param password  Contrasena
     * @returns {Promise<null>}
     */
    async  initSession(username, password){
        if(
            (username == null || username.length < 0) ||
            (password == null || password.length < 0)
        )  {
            username = 'admin';
            password = 'admin';
        }

        let auth = null;
        if (Session.getToken() == null){
            console.log("Pidiendo credenciales");
            const request = new RequestService()
            await request.doPost(
                config.authenticate,
                JSON.stringify({username : username, password : password, token:null}),
                false
                )
                .then(resp => {
                    auth = resp['#token'];
                    Session.#token = resp['token'];
                    Session.#logged = true;
                    localStorage.setItem('token',resp['token']);
                }).catch(e => {
                    Session.#logged = false;
                    console.log(e)
                    if (e instanceof Error &&  (e.message.includes('NetworkError')
                        || e.message.includes('Failed to fetch'))){
                        throw new NetworkConnectionError();
                    }

                    if (e instanceof Response && e.status === 500){
                        throw new AuthenticationError();
                    }

                });
        }else{
            auth = Session.getToken();
        }
        return auth;
    }

    /**
     * Metodo que verifica si el token pasado como parametro es valido.
     * El token es utilizado y necesario para poder acceder a los datos que el api proporciona por lo que verificar
     * la veracidad del token es indispensable
     * @param authenticationToken
     * @returns {Promise<boolean>}
     */
    static async  verifyToken(authenticationToken){
        let validToken = false;
        if (authenticationToken !== null && authenticationToken !== undefined){
            const request = new RequestService();

            console.log('Verificando token');
            await request.doPost(
                config.authenticateToken,
                JSON.stringify({username : null, password : null, token : authenticationToken}),
                false
            )
                .then(resp => {
                    Session.#token = resp['token'];
                    Session.#logged = true;
                    validToken = true;
                    localStorage.setItem('token',resp['token']);
                }).catch(e => {
                    Session.#logged = false;
                    validToken = false;
                    console.log(e)
                    if (e instanceof Error &&  e.message.includes('NetworkError')){
                        throw new NetworkConnectionError();
                    }

                    if (e instanceof Response && e.status === 500){
                        throw new AuthenticationError();
                    }

                    if (e instanceof Response && e.status === 400){//BAD_REQUEST
                        console.log('El token incorrecto')
                        // throw new AuthenticationError();
                    }

                    return false;
                });
        }

        return validToken;
    }

    /**
     * Metodo que devuelve el token global.
     * @returns {string} token
     */
    static getToken = () => { return this.#token; }

    /**
     * Metodo que verifica si el usuario esta logeado.
     * Cuando el usuario se logea por primera vez se genera un token de autentificacion y este es almacenado en el
     * navegador, por lo que este metodo verifica si se ha almacenado este token previamente y si es el caso lo recupera
     * y verifica la veracidad del mismo en el servidor para posteriormente confirmar la autentificacion.
     * @returns {Promise<boolean>} si el usuario esta logeado.
     */
     static  isLogged = async () => {
         if (!this.#logged) {
             const storedToken = localStorage.getItem('token');
             console.log("Token almacenado en local storage " + storedToken);
             if (storedToken !== undefined && storedToken !== null) {
                 let valid = false;

                 await this.verifyToken(storedToken).then((resp) => valid = resp).catch(e => {
                     valid = false;
                     throw e;
                 });

                 return valid;
             }else{
                 return false;
             }
         }
         console.log('Ya esta logeado!');
         return this.#logged;
     }
}