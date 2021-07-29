import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';
import { CoursesService } from './shared/courses.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopicFormComponent } from './courses/course-form/topic-form/topic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseFormComponent,
    TopicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [ CoursesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
