import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationItem} from '../../models/notification-item';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {

    @Input() items: NotificationItem[];
    @Input() type = 'warning';
    @Input() title = 'title';
    @Input() icon = 'mail';
    @Output() hide = new EventEmitter<boolean>();

    constructor(private notifications: NotificationService) {
    }

    public closeMe(): void {
        this.hide.emit(true);
    }

    public removeItem(id: string) {
        this.items = this.items.filter(i => i.id !== id);
        if (this.items.length === 0) {
            this.closeMe();
        }
    }

    public pin(item: NotificationItem): void {
        item.pinned = true;
        this.notifications.pin(item.name);
    }

}
