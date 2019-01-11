import {Component, OnInit} from '@angular/core';
import {LoginService} from '../services/login/login.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

    username: string;

    constructor(private loginService: LoginService, private modal: ModalController) {
    }

    ngOnInit() {
    }

    save(): void {
        this.loginService.setLogin(this.username);
        this.modal.dismiss();
    }

    invalid() {
        return this.username === undefined || this.username === '';
    }
}
