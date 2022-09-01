import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { StudentModel } from '../student-model';


@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  formgroup!:FormGroup
  studentObj:StudentModel = new StudentModel();
  data:any


  constructor(public formbuilder:FormBuilder,public interceptor:ApiService) { }


  ngOnInit(): void {
   
       this.formgroup = this.formbuilder.group({
           firstname:[''],
           lastname:[''],
           email:[''],
           mobilenumber:[''],
           class:['']
        
       })

  
    this.Data()

  }

  
  

clicked(){
  this.studentObj.firstname = this.formgroup.value.firstname;
  this.studentObj.lastname = this.formgroup.value.lastname;
  this.studentObj.email = this.formgroup.value.email;
  this.studentObj.mobilenumber = this.formgroup.value.mobilenumber;
  this.studentObj.class = this.formgroup.value.class;

 this.interceptor.postStudents(this.studentObj).subscribe( ( res) => {
  console.log(res);
  this.Data()
  this.formgroup.reset();
  alert("Successfully added!")
 },(err) => {
  alert(err)
 })



 
}


Data(){
  this.interceptor.getstudents().subscribe( (res) => {
    this.data = res;
  },(err) => {
    alert("failed to get data" + err)
  })
}

delete(data:any){
  this.interceptor.deleteStudents(data.id).subscribe( (res) => {
    alert("deleted successfully")
    this.Data()
  },(err) =>{
    alert("failed to delete pls try again!")
  }) 
  
}

editor(row:any){
  this.studentObj.id = row.id
  this.formgroup.controls['firstname'].setValue(row.firstname);
  this.formgroup.controls['lastname'].setValue(row.lastname)
  this.formgroup.controls['email'].setValue(row.email)
  this.formgroup.controls['mobilenumber'].setValue(row.mobilenumber)
  this.formgroup.controls['class'].setValue(row.class)
}


updater(){
  this.studentObj.firstname = this.formgroup.value.firstname;
  this.studentObj.lastname = this.formgroup.value.lastname;
  this.studentObj.email = this.formgroup.value.email;
  this.studentObj.mobilenumber = this.formgroup.value.mobilenumber;
  this.studentObj.class = this.formgroup.value.class;
 
  this.interceptor.editStudents(this.studentObj,this.studentObj.id).subscribe( (res) => {
    alert("updated successfully!")
  },(err) => {
    alert("unable to update pls try again")
  })

}

}
