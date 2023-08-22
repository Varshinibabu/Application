import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Student } from './student';
import { findIndex } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'student';
  public users: any;
  public Student:Array<Student>=[]
  id:any
  // selectedskill:any;
  event:any
  name=new FormControl('')
  age=new FormControl('')
  gender=new FormControl('')
  dob=new FormControl('')
  degree=new FormControl('')
  department=new FormControl('')
  Englishskills=new FormControl(false)
  Tamilskills=new FormControl(false)
  Hindiskills=new FormControl(false)
  otherskills=new FormControl(false)
  skills=new FormControl('')

  btnupdate:boolean=false;
  btncreate:boolean=true;
  path:string | undefined;
  constructor(private http:HttpClient,private router: Router){}
  ngOnInit(): void {
   
    this.load();
   }
   edit(mod:any)
   {
    var strskills="";
       this.id=(mod.id);
       this.name.setValue(mod.name);
       this.age.setValue(mod.age);
       this.gender.setValue(mod.gender);
       this.dob.setValue(mod.dob);
       this.degree.setValue(mod.degree);
       this.department.setValue(mod.department);
       this.skills.setValue(mod.skills);
       this.selectlist( mod.skills);
       this.btnupdate=true;
       this.btncreate=false;
   }
   
    
   selectlist(val:string)
   {
    debugger;
    let string1: string = val;
    
    if(val.indexOf("Tamil")==-1){
      this.Tamilskills=new FormControl(false)
    }else{
      this.Tamilskills=new FormControl(true)
    }
    if(val.indexOf("English")==-1){
      this.Englishskills=new FormControl(false)
    }else{
      this.Englishskills=new FormControl(true)
    }
    if(val.indexOf("Hindi")==-1){
      this.Hindiskills=new FormControl(false)
    }else{
      this.Hindiskills=new FormControl(true)
    }
    if(val.indexOf("other")==-1){
      this.otherskills=new FormControl(false)
    }else{
      this.otherskills=new FormControl(true)
    }
    
   }

   clear(){
    this.name.setValue("");
    this.age.setValue("");
    this.gender.setValue("");
    this.dob.setValue("");
    this.degree.setValue("");
    this.department.setValue("");
    this.Hindiskills.setValue(false);
    this.Tamilskills.setValue(false);
    this.Englishskills.setValue(false);
     this.otherskills.setValue(false);
     this.btncreate=true;
     this.btnupdate=false;
   }
  load(){
    this.http.get("http://localhost:5091/Crud/grid").subscribe({
      next:response=>this.users=response,
      error:error=>console.log(error),
      complete:()=>console.log('request is completed')
    })
  }
  
  insert()
  {
    debugger;
    var strskills="";
    var data=new Student;
    data.name=this.name.value?.toString();
    data.age=Number(this.age.value);
    data.gender=this.gender.value?.toString();
    data.dob=this.dob.value?.toString();
    data.degree=this.degree.value?.toString();
    data.department=this.department.value?.toString();
     if(this.Englishskills.value){
      strskills+="English"+",";
    }
    if(this.Tamilskills.value){
      strskills+="Tamil"+",";
    }
    if(this.Hindiskills.value){
      strskills+="Hindi"+",";
    }
    if(this.otherskills.value){
      strskills+="other"+",";
    }
   
     var samp=strskills.substring(0,strskills.length-1)
     data.skills=samp;
    this.http.post<Student>("http://localhost:5091/Crud/insert",data).subscribe
    ({
       next:response=>{
        if(response){
          this.load();
          this.clear();
        }
       }
       
    })
  }
  del(samp:any){
    this.http.get("http://localhost:5091/Crud/delete/"+samp.id+"").subscribe
    ({
       next:response=>{
        if(response){
          this.load();
        }
       }
       
    })
  }
  update(){
    debugger;
    var strskills="";
    var item=new Student()
    item.id=this.id;
    item.name=this.name.value?.toString();
    item.age=Number(this.age.value);
    item.gender=this.gender.value?.toString();
    item.dob=this.dob.value?.toString();
    item.degree=this.degree.value?.toString();
    item.department=this.department.value?.toString();
    if(this.Englishskills.value){
      strskills+="English"+",";
    }
    if(this.Tamilskills.value){
      strskills+="Tamil"+",";
    }
    if(this.Hindiskills.value){
      strskills+="Hindi"+",";
    }
    if(this.otherskills.value){
      strskills+="other"+",";
    }
    var exa=strskills.substring(0,strskills.length-1)
    item.skills=exa;
   
    this.http.post<Student>("http://localhost:5091/Crud/update",item).subscribe
    ({
       next:response=>{
        if(response){
          this.load();
          this.clear();
        }
       }
       
    })
    
  }
 
}

