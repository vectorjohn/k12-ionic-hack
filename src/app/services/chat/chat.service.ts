import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Message} from '../../models/message';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private MESSAGES = 'messages';

    messages: Message[] = [];
    messages$: Subject<Message[]> = new Subject<Message[]>();

    constructor(protected storage: Storage) {
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
}
