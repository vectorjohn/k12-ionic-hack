import {Component} from '@angular/core';
import {BasePage} from '../base.page';
import {LoginService} from '../../services/login/login.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage extends BasePage {

    constructor(protected loginService: LoginService,
                protected modal: ModalController) {
        super(loginService, modal);
    }
}
