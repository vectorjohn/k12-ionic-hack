import {Component} from '@angular/core';
import {ClassesService} from '../../services/classes/classes.service';
import {StudentClass} from '../../models/student-class';
import {BasePage} from '../base.page';
import {LoginService} from '../../services/login/login.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-classes',
    templateUrl: './classes.page.html',
    styleUrls: ['./classes.page.scss'],
})
export class ClassesPage extends BasePage {

    classes: StudentClass[];

    constructor(private classesService: ClassesService,
                protected loginService: LoginService,
                protected modal: ModalController) {
        super(loginService, modal);
    }

    ionViewDidEnter() {
        this.classesService.getClasses().subscribe((classes: StudentClass[]) => {
            this.classes = classes;
        });
    }

}
