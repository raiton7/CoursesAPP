import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/course.model';
import { CoursesService } from 'src/app/shared/courses.service';
import { Topic } from 'src/app/shared/topic.model';
import { TopicsService } from 'src/app/shared/topics.service';
import { TopicFormComponent } from './topic-form/topic-form.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styles: [
  ]
})
export class CourseFormComponent implements OnInit {

  courseForm: Course = new Course();
  topicsList: Topic[] = [] as Topic[];
  tmpTopicsList: Topic[] = [] as Topic[];
  topicForm: Topic = new Topic();

  constructor(private coursesService: CoursesService, private topicsService: TopicsService, 
    private router: Router, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.tmpTopicsList = [] as Topic[];

    if (id != 0) {
      this.getCourse(id);
      this.refreshTopicsList(id);
    }
  }

  async getCourse(id: number) {
    this.courseForm = await this.coursesService.getCourse(id);
  }

  async onSubmit(form: NgForm) {
    let btnName = document.activeElement?.getAttribute("Name");
    
    // add course
    if (this.courseForm.id == 0) {
      await this.coursesService.createCourse(this.courseForm)
      .then(
        res => { this.courseForm = res as Course },
        err => { console.log(err); }
      );

      await this.addAllTemporaryTopics();
    }
    // edit course
    else {
      await this.coursesService.editCourse(this.courseForm.id, this.courseForm)
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

  async btnTopicDialog(id: number) {
    const dialogRef = this.dialog.open(TopicFormComponent, {
      width: '600px',
      data: {id: id}
    });

    let clickedSave = false;
    dialogRef.afterClosed().subscribe(result => {
      try {
        this.topicForm = result[0] as Topic;
        clickedSave = result[1];

        if (clickedSave) {
          if (id == 0)
            this.addTopicToCourse(this.topicForm);
          else {
            this.topicsService.editTopic(id, this.topicForm).subscribe(res => {}, err => console.log(err));
            this.topicsList.forEach(t => { 
              if (t.id == id) { 
                t.name = this.topicForm.name; 
                t.number = this.topicForm.number 
              } 
            });
          }
        }
      }
      catch{ }
    });
  }

  async addTopicToCourse(newTopic: Topic) {
    // course exists, just add one topic
    if (this.courseForm.id != 0) {
      newTopic.courseId = this.courseForm.id;
      await this.topicsService.createTopic(newTopic);
      await this.refreshTopicsList(this.courseForm.id);
    }
    // course doesn't exist, add new topic to temporary list, later add all topics to newly created course
    else {
      this.tmpTopicsList.push(newTopic);
      this.topicsList.push(newTopic);
    }
  }

  async addAllTemporaryTopics() {
    if (this.courseForm.id != 0) {
      this.tmpTopicsList.forEach(async tmpTopic => {
        tmpTopic.courseId = this.courseForm.id;
        await this.topicsService.createTopic(tmpTopic);
      });
    }
    this.tmpTopicsList = [] as Topic[];
    await this.refreshTopicsList(this.courseForm.id);
  }

  async onTopicDelete(id: number, name: string, number: number)
  {
    if (confirm(`Czy na pewno chcesz usunąć "${name}"?`)) {
      if (this.topicForm.id != 0) {
        await this.topicsService.deleteTopic(id)
        await this.refreshTopicsList(this.courseForm.id);
      }
      else {
        this.tmpTopicsList.forEach((el, ind) => {
          if (el.name === name && el.number === number) this.tmpTopicsList.splice(ind, 1);
        });
      }
    }
  }

  async refreshTopicsList(id: number) {
    if (id != 0)
      this.topicsList = await this.topicsService.getListByCourseId(id);
  }
}
