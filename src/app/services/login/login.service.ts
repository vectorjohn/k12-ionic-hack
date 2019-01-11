import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private _login: string;

    constructor(private storage: Storage, private modal: ModalController) {
    }

    public async hasLogin(): Promise<boolean> {
        return await this.getLogin().then(val => !!val);
    }

    public async getLogin(): Promise<string> {
        await this.storage.ready();
        if (this._login === undefined) {
            this._login = await this.storage.get('LoginService.login');
        }
        return this._login;
    }

    public async setLogin(login: string) {
        await this.storage.ready();
        this._login = login;
        this.storage.set('LoginService.login', login);
    }
}
