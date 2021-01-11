import {RequestService} from "../RequestService";
import config from './../Settings.json';
import {NetworkConnectionError} from "../../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../../util/Error/AuthenticationError";
import {AuthorizationError} from "../../util/Error/AuthorizationError";

export class Session{

    static #token = null;

    static #logged = false;

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
                    if (e instanceof Error &&  (e.message.includes('NetworkError') || e.message.includes('NetworkError'))){
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



    static getToken = () => {
        // if (!this.#logged){
        //     throw new NoLoggedError();
        // }
        return this.#token;
    }

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