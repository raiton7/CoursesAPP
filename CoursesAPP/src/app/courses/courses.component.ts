import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(public service: CoursesService, public router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("refresh list");
    this.refreshList();
  }

  async refreshList() {
    this.coursesList  = await this.service.getList();
  }

  async onDelete(id: number, name: string) {
    // console.log("delete");
    // let dialogRef = this.dialog.open(CoursesComponent, {
    //   height: '400px',
    //   width: '600px'
    // });

    if (confirm(`Czy na pewno chcesz usunąć "${name}"?`)) {
      await this.service.deleteCourse(id);
      await this.refreshList();
    }
  }
}
