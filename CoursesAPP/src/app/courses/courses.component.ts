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

  async ngOnInit() {
    await this.refreshList();
  }

  async refreshList() {
    this.coursesList  = await this.service.getList();
  }

  async onDelete(id: number, name: string) {
    if (confirm(`Czy na pewno chcesz usunąć "${name}"?`)) {
      await this.service.deleteCourse(id);
      await this.refreshList();
    }
  }
}
