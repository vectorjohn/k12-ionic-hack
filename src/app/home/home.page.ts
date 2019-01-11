import {Component} from '@angular/core';
import {Notifications} from '../models/notification-item';
import {NotificationService} from '../services/notification/notification.service';
import {Observable} from 'rxjs/index';
import {LoginService} from '../services/login/login.service';
import {ModalController} from '@ionic/angular';
import {BasePage} from '../page/base.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage {

    notifications$: Observable<Notifications>;
    showOverdue = true;
    showUpcoming = true;
    showMessages = true;
    name: string;

    constructor(private notificationService: NotificationService,
                protected loginService: LoginService,
                protected modal: ModalController) {
        super(loginService, modal);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.loginService.changed.subscribe(() => {
            this.updateName();
        });
    }

    ionViewDidEnter() {
        this.updateName();
        this.notifications$ = this.notificationService.getNotifications();
    }

    private async updateName(): Promise<void> {
        this.name = await this.loginService.getLogin();
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
