import {NetworkService} from './network/network.service';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';

export abstract class BaseService<T, R> {
    private loaded = false;
    private cachedData: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    constructor(protected http: HttpClient,
                protected networkService: NetworkService,
                protected storage: Storage,
                private jsonPath: string) {
    }

    public getData(): Observable<T> {
        this.networkService.isOnline().pipe(map(online => {
            if (!this.loaded && online) {
                this.loadData();
            } else if (!this.loaded) {
                this.loadStoredData();
            }
        })).subscribe();
        return this.cachedData.asObservable();
    }

    private loadData(): void {
        this.http.get(this.jsonPath).pipe(map((resp: R) => {
            this.storage.ready().then(value => this.storage.set(this.jsonPath, resp));
            this.cachedData.next(this.transform(resp));
            this.loaded = true;
        })).subscribe();
    }

    private loadStoredData(): void {
        this.storage.ready().then(value => this.storage.get(this.jsonPath).then(val => {
            if (val) {
                this.cachedData.next(this.transform(val));
            }
        }));
    }

    protected abstract transform(response: R): T;
}
