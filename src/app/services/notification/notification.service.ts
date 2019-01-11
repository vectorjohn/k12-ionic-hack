import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {NotificationResponse, Notifications} from '../../models/notification-item';
import {HttpClient} from '@angular/common/http';
import {NetworkService} from '../network/network.service';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/index';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NotificationService extends BaseService<Notifications, NotificationResponse> {

    constructor(protected http: HttpClient,
                protected networkService: NetworkService,
                protected storage: Storage,
                private toastController: ToastController) {
        super(http, networkService, storage, '/assets/mocks/notifications.json');
        // setup offline/line toast
        this.networkService.isOnline().subscribe(online => {
            this.toastController.dismiss();
            if (online) {
                this.notifyOnline();
            } else {
                this.notifyOffline();
            }
        });
    }

    private async notifyOnline() {
        const toast = await this.toastController.create({
            message: 'Online!',
            position: 'top',
            color: 'light',
            translucent: true,
            animated: true,
            duration: 2000
        });
        toast.present();
    }

    private async notifyOffline() {
        const toast = await this.toastController.create({
            message: 'Offline!',
            position: 'top',
            color: 'warning',
            translucent: true,
            animated: true,
            duration: 2000
        });
        toast.present();
    }

    async notifyChat(msg) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'top',
            color: 'light',
            translucent: true,
            animated: true,
            duration: 2000
        });
        toast.present();
    }

    async notifyHide() {
        const toast = await this.toastController.create({
            message: 'This item is temporarily hidden.',
            duration: 2000
        });
        toast.present();
    }

    public getNotifications(): Observable<Notifications> {
        return super.getData();
    }

    protected transform(response: NotificationResponse): Notifications {
        const n = new Notifications();
        n.overdue = response.overdue;
        n.upcoming = response.upcoming;
        n.messages = response.messages;
        return n;
    }
}
