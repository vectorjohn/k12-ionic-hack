import {Injectable, OnDestroy} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject, Observable, Subject} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class NetworkService implements OnDestroy {

    private online: Subject<boolean>;

    constructor(private network: Network) {
        this.onOffline = this.onOffline.bind(this);
        this.onOnline = this.onOnline.bind(this);

        this.online = new BehaviorSubject(navigator.onLine);
        addEventListener('online', this.onOnline);
        addEventListener('offline', this.onOffline);
    }

    ngOnDestroy() {
        removeEventListener('online', this.onOnline);
        removeEventListener('offline', this.onOffline);
    }

    public isOnline(): Observable<boolean> {
        return this.online;
    }

    private onOffline() {
        this.online.next(false);
    }

    private onOnline() {
        this.online.next(true);
    }
}
