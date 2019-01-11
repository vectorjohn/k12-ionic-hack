import {Component} from '@angular/core';
import {BasePage} from '../base.page';
import {LoginService} from '../../services/login/login.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage extends BasePage {

    constructor(protected loginService: LoginService,
                protected modal: ModalController) {
        super(loginService, modal);
    }
}
