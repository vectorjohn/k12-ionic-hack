import {Component, Input, OnInit} from '@angular/core';
import {Notifications} from '../models/notification-item';
import {NotificationService} from '../services/notification/notification.service';
import {Observable} from 'rxjs/index';
import {LoginService} from '../services/login/login.service';
import {ModalController} from '@ionic/angular';
import {LoginModalComponent} from '../login-modal/login-modal.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    notifications$: Observable<Notifications>;
    showOverdue = true;
    showUpcoming = true;
    showMessages = true;
    @Input() name: string;

    constructor(private notificationService: NotificationService,
                protected loginService: LoginService,
                protected modal: ModalController) {
    }

    ngOnInit(): void {
        this.openLoginModalAsNeeded();
    }

    async ionViewDidEnter() {
        this.name = await this.loginService.getLogin();
        this.notifications$ = this.notificationService.getNotifications();
    }

    public async openLoginModalAsNeeded() {
        const hasLogin = await this.loginService.hasLogin();
        if (!hasLogin) {
            const m = await this.modal.create({component: LoginModalComponent});
            await m.present();
        }
    }

    hideOverdue(hide) {
        this.showOverdue = !hide;
        if (hide) {
            this.presentToast();
        }
    }

    hideUpcoming(hide) {
        this.showUpcoming = !hide;
        if (hide) {
            this.presentToast();
        }
    }

    hideMessages(hide) {
        this.showMessages = !hide;
        if (hide) {
            this.presentToast();
        }
    }

    async presentToast() {
        this.notificationService.notifyHide();
    }
}
