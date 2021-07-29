import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  readonly baseURL = "http://localhost:35087/api/Courses"
  // course: Course = new Course();
  

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
   * Creates one Course from given form model
   * @param course Course
   * @returns Observable
   */
  async createCourse(course: Course) {
    return this.http.post(this.baseURL, course);
  }

  /**
   * Modifies one Course given by `id` with data from `course`
   * @param id number
   * @param course Course
   * @returns Observable
   */
  async editCourse(id: number, course: Course) {
    return this.http.put(`${this.baseURL}/${id}`, course);
  }

  /**
   * Removes one Course given by `id`
   * @param id number
   * @returns Observable
   */
  async deleteCourse(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
