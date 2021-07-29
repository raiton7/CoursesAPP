import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/course-form', component: CourseFormComponent },
  { path: 'courses/course-form/:id', component: CourseFormComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
