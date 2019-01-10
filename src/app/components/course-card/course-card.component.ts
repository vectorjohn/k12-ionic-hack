import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

    @Input() name: string;

    constructor() {
    }

    ngOnInit() {
    }
}
