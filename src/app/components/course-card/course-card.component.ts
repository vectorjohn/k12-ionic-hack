import {Component, Input, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';

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


    constructor(public toastController: ToastController) {
    }

    ngOnInit() {
    }

    startDownload(n: string): void {
        this.presentToast(n);
    }

    async presentToast(n: string) {
        const toast = await this.toastController.create({
                message: 'Downloading ' + n + 'for offline use',
                duration: 2000
            });
        toast.present();
    }
}
