import { Injectable } from '@angular/core';
import { Topic } from './topic.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private http: HttpClient) { }

  readonly baseURL = "http://localhost:35087/api/Topics"


  /**
   * Returns list of Topic model
   * @returns Topic[]
   */
  async getList() {
    let topicsList: Topic[] = [];
    await this.http.get(this.baseURL)
      .toPromise()
      .then(res => topicsList = res as Topic[]);
    
    return topicsList;
  }

  /**
   * Returns list of Topic model related with Course given by courseId
   * @param courseId number
   * @returns Topic[]
   */
  async getListByCourseId(courseId: number) {
    let topicsList: Topic[] = [];
    await this.http.get(`${this.baseURL}/list/${courseId}`)
      .toPromise()
      .then(res => topicsList = res as Topic[]);
    
    return topicsList;
  }

  /**
   * Returns one Topic by id
   * @param id number
   * @returns Topic
   */
  async getTopic(id: number) {
    let topic: Topic = new Topic();
    await this.http.get(`${this.baseURL}/${id}`)
      .toPromise()
      .then(res => topic = res as Topic);
    
    return topic;
  }

  /**
   * Creates one Topic from given form model
   * @param topic Topic
   * @returns Promise
   */
  async createTopic(topic: Topic) {
    return await this.http.post(this.baseURL, topic)
      .toPromise();
  }

  /**
   * Modifies one Topic given by `id` with data from `topic`
   * @param id number
   * @param topic Topic
   * @returns Observable
   */
  editTopic(id: number, topic: Topic) {
    return this.http.put(`${this.baseURL}/${id}`, topic);
  }

  /**
   * Removes one Topic given by `id`
   * @param id number
   * @returns Observable
   */
  async deleteTopic(id: number) {
    return await this.http.delete(`${this.baseURL}/${id}`)
    .toPromise();
  }
}
