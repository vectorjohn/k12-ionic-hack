import {Component} from '@angular/core';
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

    constructor(private notificationService: NotificationService) {
    }

    ionViewDidEnter() {
        console.log('view did enter');
        this.notifications$ = this.notificationService.getNotifications();
    }

    hideOverdue(hide) {
        this.showOverdue = !hide;
    }

    hideUpcoming(hide) {
        this.showUpcoming = !hide;
    }

    hideMessages(hide) {
        this.showMessages = !hide;
    }
}
