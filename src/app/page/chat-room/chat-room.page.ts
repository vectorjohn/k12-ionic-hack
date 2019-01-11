import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/index';
import {NotificationService} from '../../services/notification/notification.service';
import {LoginService} from '../../services/login/login.service';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.page.html',
    styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

    nickname: string;
    messages = [];
    message = '';
    @ViewChild('chats') mahChats: ElementRef;

    constructor(private socket: Socket,
                private toast: ToastController,
                private notify: NotificationService,
                private loginService: LoginService) {

        this.getMessages().subscribe(message => {
            this.messages.push(message);
        });
        this.getUsers().subscribe(data => {
            const user = data['user'];
            if (user !== this.nickname) {
                if (data['event'] === 'left') {
                    this.notify.notifyChat('User left: ' + user);
                } else {
                    this.notify.notifyChat('User joined: ' + user);
                }
            }
        });

        this.loginService.getLogin().then(n => this.nickname = n);
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.joinChat();
    }

    joinChat() {
        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);
    }


    sendMessage() {
        this.socket.emit('add-message', {text: this.message});
        this.message = '';
    }

    getMessages() {
        const observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    getUsers() {
        const observable = new Observable(observer => {
            this.socket.on('users-changed', (data) => {
                    observer.next(data);
            });
        });
        return observable;
    }

    ionViewWillLeave() {
        this.socket.disconnect();
    }

    getDate(): Date {
        return new Date();
    }

    scrollToBottom() {
        try {
            this.mahChats.nativeElement.scrollTop = this.mahChats.nativeElement.scrollHeight;
        } catch (err) {
        }
    }
}
