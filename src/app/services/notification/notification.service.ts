import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {NotificationItem, NotificationResponse, Notifications} from '../../models/notification-item';
import {HttpClient} from '@angular/common/http';
import {NetworkService} from '../network/network.service';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class NotificationService extends BaseService<Notifications, NotificationResponse> {

    constructor(protected http: HttpClient,
                protected networkService: NetworkService,
                protected storage: Storage) {
        super(http, networkService, storage, '/assets/mocks/notifications.json');
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
