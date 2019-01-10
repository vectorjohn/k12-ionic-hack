import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {Observable, Subject} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private online: Subject<boolean> = new Subject();

    constructor(private network: Network) {
        this.network.onConnect().subscribe(value => {
            this.online.next(true);
        });
        this.network.onDisconnect().subscribe(value => {
            this.online.next(false);
        });
    }

    public isOnline(): Observable<boolean> {
        return this.online;
    }
}
