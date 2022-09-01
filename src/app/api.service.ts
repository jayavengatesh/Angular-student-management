import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http:HttpClient) { }
         
          
  getstudents(){
    return this.http.get("http://localhost:3000/posts").pipe(map(res => res))
  }


  postStudents(data:any){
    return this.http.post("http://localhost:3000/posts",data).pipe(map(res => res)) 
  }

  editStudents(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map(res => res)) 
  }

  deleteStudents(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map(res => res)) 
  }

}
