import {NetworkService} from './network/network.service';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {filter, take} from 'rxjs/internal/operators';

export abstract class BaseService<T, R> {
    private loaded = false;
    private cachedData: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    constructor(protected http: HttpClient, protected networkService: NetworkService, private jsonPath: string) {
    }

    public getData(): Observable<T> {
        this.networkService.isOnline().pipe(filter(online => online), take(1), map(online => {
            if (!this.loaded) {
                this.loadData();
            }
        })).subscribe(this.cachedData);
        return this.cachedData.asObservable();
    }

    private loadData(): void {
        this.http.get(this.jsonPath).pipe(map((resp: R) => {
            this.cachedData.next(this.transform(resp));
            this.loaded = true;
        })).subscribe();
    }

    protected abstract transform(response: R): T;
}
