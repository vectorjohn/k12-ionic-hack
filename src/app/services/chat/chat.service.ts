import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Message} from '../../models/message';
import {Observable, ReplaySubject, Subject} from 'rxjs/Rx';
import {LoginService} from '../login/login.service';
import {Socket} from 'ng-socket-io';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private MESSAGES = 'messages';

    messages: Message[] = [];
    messages$: Subject<Message[]> = new ReplaySubject<Message[]>(1);
    nickname: string;

    constructor(protected storage: Storage,
                private loginService: LoginService,
                private socket: Socket) {
        this.storage.ready()
            .then(() => this.storage.get(this.MESSAGES))
            .then(val => {
                this.messages = val || [];
                this.messages$.next(this.messages.slice());
            });
    }

    addMessage(m: Message) {
        this.messages = this.messages.concat([m]);
        this.storage.ready()
            .then(() => {
                this.storage.set(this.MESSAGES, this.messages);
                this.messages$.next(this.messages);
            });
    }

    getMessages(): Observable<Message[]> {
        return this.messages$.asObservable();
    }

    join(): void {
        this.socket.connect();
        this.loginService.getLogin().then(n => {
            this.nickname = n;
            this.socket.emit('set-nickname', this.nickname);
        });
    }

    send(m: string, a: string): void {
        const messageBundle = {text: m, avatar: a};
        console.log(messageBundle);
        this.socket.emit('add-message', messageBundle);
    }
}
