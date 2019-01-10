import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

    @Input() name: string;
    @Input() description: string;
    @Input() discipline: string;
    @Input() grade: string;
    @Input() percentage: number;
    @Input() image: string;
    // Assignments?


    constructor() {
    }

    ngOnInit() {
    }
}
