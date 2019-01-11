import {OnInit} from '@angular/core';
import {LoginService} from '../services/login/login.service';
import {ModalController} from '@ionic/angular';
import {LoginModalComponent} from '../login-modal/login-modal.component';

export abstract class BasePage implements OnInit {

    constructor(protected loginService: LoginService,
                protected modal: ModalController) {
    }

    ngOnInit(): void {
        this.openLoginModalAsNeeded();
    }

    public async openLoginModalAsNeeded() {
        const hasLogin = await this.loginService.hasLogin();
        if (!hasLogin) {
            const m = await this.modal.create({component: LoginModalComponent});
            await m.present();
        }
    }
}
