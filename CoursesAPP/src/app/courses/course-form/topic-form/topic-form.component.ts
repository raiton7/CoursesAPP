import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Topic } from 'src/app/shared/topic.model';
import { TopicsService } from 'src/app/shared/topics.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styles: [
  ]
})
export class TopicFormComponent implements OnInit {

  public topicForm: Topic = new Topic();
  public clickedSave: boolean = false;

  constructor(public dialogRef: MatDialogRef<TopicFormComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, 
  private topicsService: TopicsService) { }

  async ngOnInit() {
    await this.getTopic();
  }

  async getTopic() {
    let id = this.data.id;
    if (id != 0) {
      this.topicForm = await this.topicsService.getTopic(id);
    }
  }

  onSubmit() {
    this.clickedSave = true;
    this.dialogRef.close([this.topicForm, this.clickedSave]);
  }

  onNoClick(): void {
    this.dialogRef.close([new Topic(), false]);
  }
}

export interface DialogData {
  id: number;
}
