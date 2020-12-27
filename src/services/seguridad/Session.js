import {RequestService} from "../RequestService";
import config from './../Settings.json';

export class Session{

    static token = null;

    async  initSession(username, password, callback){
        if(
            (username == null || username.length < 0) ||
            (password == null || password.length < 0)
        )  {
            username = 'admin';
            password = 'admin';
        }

        let auth = null;
        if (Session.token == null){
            console.log("Pidiendo credenciales");
            const request = new RequestService()
            await request.doPost(
                config.authenticate,
                JSON.stringify({username : username, password : password}),
                false
                )
                .then(resp => {
                    auth = resp['token'];
                    Session.token = resp['token'];
                })
                .catch(error => {
                    // console.log(error);
                    if (callback !== undefined && callback != null){
                        callback();
                    }

                });
        }else{
            auth = Session.token;
        }
        return auth;

    }

    static getToken = () => {
        this.token = new Session().initSession();
        return this.token;
    }
}