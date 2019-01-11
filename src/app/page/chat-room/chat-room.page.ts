import {Component, ElementRef, ViewChild} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/index';
import {NotificationService} from '../../services/notification/notification.service';
import {LoginService} from '../../services/login/login.service';
import {Message} from '../../models/message';
import {ChatService} from '../../services/chat/chat.service';
import {first} from 'rxjs/operators';
import {BasePage} from '../base.page';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.page.html',
    styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage extends BasePage {

    nickname: string;
    messages: Message[] = [];
    message = '';
    @ViewChild('chats') mahChats: ElementRef;

    constructor(private socket: Socket,
                private toast: ToastController,
                private notify: NotificationService,
                private history: ChatService,
                protected loginService: LoginService,
                protected modal: ModalController) {
        super(loginService, modal);

        this.getMessages().subscribe(message => {
            this.messages.push(message);
            this.history.addMessage(message);
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
        super.ngOnInit();
        this.history.getMessages()
            .pipe(first())
            .subscribe((messages) => {
                console.log('setting my messages', messages);
                this.messages = messages;
                this.joinChat();
            });
    }

    joinChat() {
        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);
    }


    sendMessage() {
        this.socket.emit('add-message', {text: this.message});
        this.message = '';
    }

    getMessages(): Observable<Message> {
        const observable = new Observable<Message>(observer => {
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
