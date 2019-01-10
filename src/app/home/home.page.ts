import {Component} from '@angular/core';
import { ToastController } from '@ionic/angular';
import {Notifications} from '../models/notification-item';
import {NotificationService} from '../services/notification/notification.service';
import {Observable} from 'rxjs/index';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    notifications$: Observable<Notifications>;
    showOverdue = true;
    showUpcoming = true;
    showMessages = true;

    constructor(private notificationService: NotificationService,public toastController: ToastController) {
    }

    ionViewDidEnter() {
        this.notifications$ = this.notificationService.getNotifications();
    }

    hideOverdue(hide) {
        this.showOverdue = !hide;
        if (hide) {this.presentToast();}
    }

    hideUpcoming(hide) {
        this.showUpcoming = !hide;
    }

    hideMessages(hide) {
        this.showMessages = !hide;
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Your settings have been saved.',
            duration: 2000
        });
        toast.present();
    }
}
