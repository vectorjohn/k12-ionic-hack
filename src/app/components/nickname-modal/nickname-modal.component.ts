import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-nickname-modal',
    templateUrl: './nickname-modal.component.html',
    styleUrls: ['./nickname-modal.component.scss']
})
export class NicknameModalComponent implements OnInit {

    avatars = [
        '/assets/images/avatars/user-1.png',
        '/assets/images/avatars/user-2.png',
        '/assets/images/avatars/user-3.png',
        '/assets/images/avatars/user-4.png',
        '/assets/images/avatars/user-5.png',
        '/assets/images/avatars/user-6.png'
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
