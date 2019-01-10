import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {NotificationItem} from '../../models/notification-item';
import {HttpClient} from '@angular/common/http';
import {NetworkService} from '../network/network.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService extends BaseService<NotificationItem, NotificationItem> {

    constructor(protected http: HttpClient, protected networkService: NetworkService) {
        super(http, networkService, '/assets/mocks/notifications.json');
    }

    protected transform(response: NotificationItem): NotificationItem {
        return response;
    }
}
