import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NotificationItem} from '../../models/notification-item';

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

    constructor() {
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

}
