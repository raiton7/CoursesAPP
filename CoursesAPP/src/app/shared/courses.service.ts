import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  readonly baseURL = "http://localhost:35087/api/Courses"
  

  /**
   * Returns list of Course model
   * @returns Course[]
   */
  async getList() {
    let coursesList: Course[] = [];
    await this.http.get(this.baseURL)
      .toPromise()
      .then(res => coursesList = res as Course[]);
    
    return coursesList;
  }

  /**
   * Returns one Course by id
   * @param id number
   * @returns Course
   */
  async getCourse(id: number) {
    let course: Course = new Course();
    await this.http.get(`${this.baseURL}/${id}`)
      .toPromise()
      .then(res => course = res as Course);
    
    return course;
  }

  /**
   * Creates one Course from given form model
   * @param course Course
   * @returns Promise
   */
  async createCourse(course: Course) {
    return await this.http.post(this.baseURL, course)
      .toPromise();
  }

  /**
   * Modifies one Course given by `id` with data from `course`
   * @param id number
   * @param course Course
   * @returns Observable
   */
  async editCourse(id: number, course: Course) {
    return await this.http.put(`${this.baseURL}/${id}`, course)
    .toPromise();
  }

  /**
   * Removes one Course given by `id`
   * @param id number
   * @returns Observable
   */
  async deleteCourse(id: number) {
    return await this.http.delete(`${this.baseURL}/${id}`)
    .toPromise();
  }
}
