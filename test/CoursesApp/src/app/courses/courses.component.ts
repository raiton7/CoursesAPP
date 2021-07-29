import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../shared/course.model';
import { CoursesService } from '../shared/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})
export class CoursesComponent implements OnInit {

  coursesList: Course[] = [] as Course[];
  constructor(public service: CoursesService, public router: Router) { }

  ngOnInit(): void {
    this.refreshList();
  }

  async refreshList() {
    this.coursesList  = await this.service.getList();
    // console.log(this.coursesList);
  }

  btnAddCourse =  () => {
    this.router.navigateByUrl('app-course-form');
  }
}
