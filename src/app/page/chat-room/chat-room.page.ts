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
    avatar: string;
    @ViewChild('chats') mahChats: ElementRef;

    imgApi = [
        'placekitten.com',
        'fillmurray.com',
        'stevensegallery.com',
        'baconmockup.com'
    ];

    picsum = 'https://picsum.photos/200/300?image=';
    picstart = 10;
    picend = 1085;

    constructor(private socket: Socket,
                private toast: ToastController,
                private notify: NotificationService,
                private history: ChatService,
                protected loginService: LoginService,
                protected modal: ModalController) {
        super(loginService, modal);

    this.avatar = this.picsum + (Math.floor(Math.random() * this.picend)).toString();

        this.getMessages().subscribe(message => {
            console.log('pushing message');
            this.messages = this.messages.concat(message);
            // this.history.addMessage(message);
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
    }

    ngOnInit() {
        super.ngOnInit();
        this.joinChat();
        // TODO: figure out hwo to make this interact nicely with the server
        //       sending recent messages (to avoid duplicates)
        // this.history.getMessages()
        //     .pipe(first())
        //     .subscribe((messages) => {
        //         console.log('setting my messages', messages);
        //         this.messages = messages;
        //         this.joinChat();
        //     });
    }

    joinChat() {
        this.socket.on('disconnect', () => {
            this.reconnect();
        })
        this.reconnect();
    }

    reconnect() {
        this.socket.connect();
        this.loginService.getLogin().then(n => {
            this.messages = [];
            this.nickname = n;
            this.socket.emit('set-nickname', this.nickname);
        });
    }

    sendMessage() {
        this.socket.emit('add-message', {text: this.message, avatar: this.avatar});
        this.message = '';
    }

    getMessages(): Observable<Message> {
        const observable = new Observable<Message>(observer => {
            this.socket.on('message', (data) => {
                console.log('socket on message', data);
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
