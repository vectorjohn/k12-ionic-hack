import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../../services/classes/classes.service';
import {StudentClass} from '../../models/student-class';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.page.html',
    styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

    classes: StudentClass[];

    constructor(private classesService: ClassesService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.classesService.getClasses().subscribe((classes: StudentClass[]) => {
            this.classes = classes;
        });
    }

}
