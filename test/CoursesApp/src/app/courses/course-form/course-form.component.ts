import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/shared/course.model';
import { CoursesService } from 'src/app/shared/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styles: [
  ]
})
export class CourseFormComponent implements OnInit {

  courseForm: Course = new Course();

  constructor(public service: CoursesService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {

  }

}
