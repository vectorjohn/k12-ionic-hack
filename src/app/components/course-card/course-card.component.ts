import {Component, Input, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

    @Input() name: string;
    @Input() description: string;
    @Input() discipline: string;
    @Input() grade: string;
    @Input() percentage: number;
    @Input() image: string;

    // Assignments?

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit() {
    }

    startDownload(n: string): void {
        this.notificationService.notifyDownload(n);
    }

}
