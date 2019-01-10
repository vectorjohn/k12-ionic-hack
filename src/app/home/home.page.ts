import {Component} from '@angular/core';
import {NotificationItem} from '../models/notification-item';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    overdueItems: NotificationItem[];
    showOverdue = true;
    showMessages = true;

    constructor() {
        this.overdueItems = new Array < NotificationItem >();
    }

    hideOverdue(hide) {
        this.showOverdue = !hide;
    }
    hideMessages(hide) {
        this.showMessages = !hide;
    }
}
