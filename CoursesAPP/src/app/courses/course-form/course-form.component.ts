import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private service: CoursesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id != 0) {
      this.getCourse(id);
    }
  }

  async getCourse(id: number) {
    this.courseForm = await this.service.getCourse(id);
  }

  async onSubmit(form: NgForm) {
    let btnName = document.activeElement?.getAttribute("Name");
    console.log(btnName);
    
    // add course
    if (this.courseForm.id == 0) {
      await this.service.createCourse(this.courseForm)
      .then(
        res => { this.courseForm = res as Course },
        err => { console.log(err); }
      );
    }
    // edit course
    else {
      await this.service.editCourse(this.courseForm.id, this.courseForm)
      .then(
        res => { /* notification success */ },
        err => { console.log(err); }
      );
    }

    switch (btnName) {
      case 'save': {
        this.router.navigateByUrl(`/courses/course-form/${this.courseForm.id}`);
        break;
      }

      case 'save_exit': {
        this.router.navigateByUrl('/courses');
        break;
      }
    }
  }
}
