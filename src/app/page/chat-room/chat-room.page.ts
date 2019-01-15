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
import {Subject, Subscription} from 'rxjs/Rx';
import {fromEvent} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {FromEventTarget} from 'rxjs/src/internal/observable/fromEvent';

interface Emitter<T> {
    on: (event: string, callback: (T) => void) => void;
    removeListener: (event: string, callback: (T) => void) => void;
}

interface UserEvent {
    user: string;
    event: 'left' | 'joined';
}

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
    @ViewChild('content') content: any;

    ngUnsubscribe$: Subject<void> = new Subject<void>();

    viewEntered = false;

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

        this.getMessages().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((message: Message) => {
            this.messages = this.messages.concat(message);
        });
        this.getUsers().pipe(takeUntil(this.ngUnsubscribe$)).subscribe((data: UserEvent) => {
            const user = data.user;
            this.loginService.getLogin().then(n => {
                this.nickname = n;
                if (user !== this.nickname) {
                    if (data.event === 'left') {
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
        this.joinChat();
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
        this.socket.disconnect();
    }

    ionViewDidEnter() {
        this.viewEntered = true;
        this.scrollToBottom();
    }

    ionViewWillLeave() {
        this.viewEntered = false;
    }

    joinChat() {
        fromEvent(this.toFromEventTarget(this.socket), 'disconnect')
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this.connect();
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

    sendMessage() {
        this.chatService.send(this.message, this.avatar);
        this.message = '';
    }

    getMessages(): Observable<Message> {
        return fromEvent(this.toFromEventTarget<Message>(this.socket), 'message')
            .pipe(tap((x) => {
                console.log('message', x);
                this.scrollToBottom();
            }));
    }

    getUsers(): Observable<UserEvent> {
        return fromEvent(this.toFromEventTarget<UserEvent>(this.socket), 'users-changed')
            .pipe(tap((x) => console.log('users-changed', x)));
    }


    scrollToBottom() {
        if (this.viewEntered) {
            this.content.scrollToBottom(300);
        }
    }


    getDate(): Date {
        return new Date();
    }

    private toFromEventTarget<T>(emitter: Emitter<T>): FromEventTarget<T> {
        return {
            addEventListener: (event, listener) => emitter.on(event, listener),
            removeEventListener: (event, listener) => emitter.removeListener(event, listener)
        };
    }
}
