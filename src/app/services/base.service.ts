import {Injectable} from '@angular/core';
import {NetworkService} from './network/network.service';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T, R> {
    private loaded = false;
    private cachedData: BehaviorSubject<T> = new BehaviorSubject<T>(null);

    constructor(private http: HttpClient, private networkService: NetworkService, private jsonPath: string) {
    }

    public getData(): Observable<T> {
        this.networkService.isOnline().pipe(take(1), map(online => {
            if (!this.loaded && online) {
                this.loadData();
            }
        }));
        return this.cachedData;
    }

    private loadData(): void {
        this.http.get(this.jsonPath).pipe(map((resp: R) => {
            this.cachedData.next(this.transform(resp));
            this.loaded = true;
        })).subscribe();
    }

    protected abstract transform(response: R): T;
}
