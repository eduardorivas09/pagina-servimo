import {RequestService} from "../RequestService";
import config from './../Settings.json';
import {NetworkConnectionError} from "../../util/Error/NetworkConnectionError";
import {AuthenticationError} from "../../util/Error/AuthenticationError";

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
                JSON.stringify({username : username, password : password}),
                false
                )
                .then(resp => {
                    auth = resp['#token'];
                    Session.#token = resp['token'];
                }).catch(e => {
                    console.log(e)
                    if (e instanceof Error &&  e.message.includes('NetworkError')){
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

    static getToken = () => {
        // this.#token = new Session().initSession();
        return this.#token;
    }
}