import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {ModalController} from '@ionic/angular';
import {Subject} from 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    changed: Subject<void>;

    constructor(private storage: Storage, private modal: ModalController) {
        this.changed = new Subject<void>();
    }

    public async hasLogin(): Promise<boolean> {
        return await this.getLogin().then(val => !!val);
    }

    public async getLogin(): Promise<string> {
        return await this.storage.ready().then(val => this.storage.get('LoginService.login'));
    }

    public async setLogin(login: string) {
        await this.storage.ready().then(val => {
            this.storage.set('LoginService.login', login);
            this.changed.next();
        });
    }
}
