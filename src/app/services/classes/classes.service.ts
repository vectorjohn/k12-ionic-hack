import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {StudentClass, StudentClassResponse} from '../../models/student-class';
import {Observable} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {

    constructor(private http: HttpClient) {
    }

    getClasses(): Observable<[StudentClass]> {
        return this.http.get('/assets/mocks/classes.json', )
            .pipe(map((resp: StudentClassResponse) => resp.classes));
    }
}
