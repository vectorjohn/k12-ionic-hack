import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
// import {Content} from '@angular/compiler/src/render3/r3_ast';
import {Socket} from 'ng-socket-io';
import {Observable} from 'rxjs/index';
import {NotificationService} from '../../services/notification/notification.service';
import {LoginService} from '../../services/login/login.service';
import {Message} from '../../models/message';
import {ChatService} from '../../services/chat/chat.service';
import {BasePage} from '../base.page';
import {Subscription} from 'rxjs/Rx';

@Component({
    selector: 'app-chat-room',
    templateUrl: './chat-room.page.html',
    styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage extends BasePage implements OnInit, OnDestroy {

    nickname: string;
    messages: Message[] = [];
    message = '';
    avatar: string;
    @ViewChild('chats') chats: ElementRef;
    @ViewChild('content') content: any;

    messagesSub: Subscription;
    usersSub: Subscription;

    viewEntered = false;
    shouldConnect = true;

    picsum = 'https://picsum.photos/200/300?image=';
    picend = 1085;

    constructor(private socket: Socket,
                private toast: ToastController,
                private notify: NotificationService,
                private history: ChatService,
                protected loginService: LoginService,
                protected modal: ModalController,
                private chatService: ChatService) {
        super(loginService, modal);

        this.avatar = this.picsum + (Math.floor(Math.random() * this.picend)).toString();

        this.nickname = this.chatService.nickname;

        this.messagesSub = this.getMessages().subscribe(message => {
            this.messages = this.messages.concat(message);
        });
        this.usersSub = this.getUsers().subscribe(data => {
            const user = data['user'];
            this.loginService.getLogin().then(n => {
                this.nickname = n;
                if (user !== this.nickname) {
                    if (data['event'] === 'left') {
                        this.notify.notifyChat('User left: ' + user);
                    } else {
                        this.notify.notifyChat('User joined: ' + user);
                    }
                }
            });

        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.shouldConnect = true;
        this.joinChat();
    }

    ngOnDestroy() {
        this.messagesSub.unsubscribe();
        this.usersSub.unsubscribe();
    }

    ionViewDidEnter() {
        this.viewEntered = true;
        this.scrollToBottom();
    }

    ionViewWillLeave() {
        this.viewEntered = false;
        this.shouldConnect = false;
        this.socket.disconnect();
    }

    joinChat() {
        this.socket.on('disconnect', () => {
            if (this.shouldConnect) {
                this.reconnect();
            }
        });
        this.connect();
    }

    connect() {
        console.log('connect');
        this.socket.connect();
        this.loginService.getLogin().then(n => {
            this.messages = [];
            this.nickname = n;
            this.socket.emit('set-nickname', this.nickname);
        });
    }

    reconnect() {
        console.log('reconnect');
        this.socket.connect();
        this.loginService.getLogin().then(n => {
            // this.messages = [];
            this.nickname = n;
            this.socket.emit('set-nickname', this.nickname);
        });
    }

    sendMessage() {
        this.chatService.send(this.message, this.avatar);
        this.message = '';
        // this.scrollToBottom();
    }

    getMessages(): Observable<Message> {
        const observable = new Observable<Message>(observer => {
            this.socket.on('message', (data) => {
                console.log('socket on message', data);
                observer.next(data);
                this.scrollToBottom();
            });
        });
        return observable;
    }

    getUsers() {
        const observable = new Observable(observer => {
            this.socket.on('users-changed', (data) => {
                console.log(data);
                observer.next(data);
            });
        });
        return observable;
    }


    scrollToBottom() {
        if (this.viewEntered) {
            console.log('scrolling...');
            this.content.scrollToBottom(300);
        }
    }


    getDate(): Date {
        return new Date();
    }
}
