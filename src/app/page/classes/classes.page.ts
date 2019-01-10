import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../../services/classes/classes.service';
import {StudentClass} from '../../models/student-class';
import {Observable} from 'rxjs/index';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.page.html',
    styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {

    classes$: Observable<StudentClass[]>;

    constructor(private classesService: ClassesService) {
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.classes$ = this.classesService.getClasses();
        /*this.classesService.getClasses().subscribe((classes: StudentClass[]) => {
            this.classes = classes;
        });*/
    }

}
