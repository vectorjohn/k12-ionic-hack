import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentClass, StudentClassResponse} from '../../models/student-class';
import {Observable} from 'rxjs/index';
import {BaseService} from '../base.service';
import {NetworkService} from '../network/network.service';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class ClassesService extends BaseService<StudentClass[], StudentClassResponse> {

    constructor(protected http: HttpClient,
                protected networkService: NetworkService,
                protected storage: Storage) {
        super(http, networkService, storage, '/assets/mocks/classes.json');
    }

    getClasses(): Observable<StudentClass[]> {
        return super.getData();
    }

    protected transform(response: StudentClassResponse): StudentClass[] {
        return response.classes;
    }
}
