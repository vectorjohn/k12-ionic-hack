import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private online: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
