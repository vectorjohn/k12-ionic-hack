import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {NicknameModalComponent} from '../../components/nickname-modal/nickname-modal.component';
import {Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/index';
import {NotificationService} from '../../services/notification/notification.service';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.page.html',
    styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

    nickname = 'nick';
    messages = [];
    message = '';
    @ViewChild('chats') mahChats: ElementRef;

    constructor(private modal: ModalController,
                private socket: Socket,
                private toast: ToastController,
                private notify: NotificationService) {

        this.getMessages().subscribe(message => {
            this.messages.push(message);
        });
        this.getUsers().subscribe(data => {
            const user = data['user'];
            if (data['event'] === 'left') {
                this.notify.notifyChat('User left: ' + user);
            } else {
                this.notify.notifyChat('User joined: ' + user);
            }
        });
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.joinChat();
    }

    async openNicknameModal(): Promise<void> {
        const m = await this.modal.create({component: NicknameModalComponent});
        await m.present();
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
        } catch (err) {}
    }
}
