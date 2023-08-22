import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../student';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  users: any;
  public Student:Array<Student>=[]
  id:number | undefined;
  displayedColumns: string[] = ['id','name','age','gender','dob','degree','department','languages known','edit','delete'];
  public dataSource = new MatTableDataSource<Student>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form: any;
  newform!:FormGroup;
  name=new FormControl('')
  age=new FormControl('')
  gender=new FormControl('')
  dob=new FormControl('')
  degree=new FormControl('')
  department=new FormControl('')
  // Englishskills=new FormControl()
  // Tamilskills=new FormControl()
  // Hindiskills=new FormControl()
  // Frenchskills=new FormControl()
  // otherskills=new FormControl()
  skills=new FormControl('')
  createbtn:boolean=true;
  updatebtn:boolean=false;
  formbuilder: any;

   constructor(private http:HttpClient){}
  
   ngOnInit(): void {
     this.load();
     this.newform=this.formbuilder.group({
      name:['',Validators.required],
      age:['',Validators.required],
      gender:['',Validators.required],
      dob:['',Validators.required],
      degree:['',Validators.required],
      department:['',Validators.required],
     skills:['',Validators.required],
     })
   }
   skilllist: string[] = ["Tamil","English","Hindi","French","other"];
 
   ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator;
  }
   load(){
     debugger;
     this.http.get("http://localhost:5091/Crud/grid").subscribe({
       next:response=>{
        console.log(response);  
        this.dataSource.data=response as Student[];
      },
       error:error=>console.log(error),
       complete:()=>console.log('request is completed')
     })
   }
   clear(){
    this.name.setValue('');
    this.age.setValue('');
    this.gender.setValue('');
    this.dob.setValue('');
    this.degree.setValue('');
    this.department.setValue('');
    this.skills.setValue('');
    this.createbtn=true;
    this.updatebtn=false;
   }
   insert()
   {
     debugger;
     var strskills="";
     var data=new Student;
     data.name=this.name.value?.toString();
     data.age=Number(this.age.value);
     data.gender=this.gender.value?.toString();
     data.dob=this.convert(this.dob.value?.toString());
     data.degree=this.degree.value?.toString();
     data.department=this.department.value?.toString();
     data.skills=this.skills.value?.toString();
     this.http.post<Student>("http://localhost:5091/Crud/insert",data).subscribe
     ({
        next:response=>{
          console.log(response);  
          this.dataSource.data=response as unknown as Student[];
          this.load();
          this.clear();
           },
      })
   }

   convert(str: any) {
    debugger;
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
   del(samp:any){

    this.http.get('http://localhost:5091/Crud/delete/'+samp.id+'').subscribe
    ({
       next:response=>{
        console.log(response);  
        this.dataSource.data=response as Student[];
        this.load();
        },
        })
       }
  update()
  {
      var item=new Student();
      item.id=this.id;
      item.name=this.name.value?.toString();
      item.age=Number(this.age.value);
      item.gender=this.gender.value?.toString();
      item.dob=this.convert(this.dob.value?.toString());
      item.degree=this.degree.value?.toString();
      item.department=this.department.value?.toString();
      item.skills=this.skills.value?.toString();
      this.http.post<Student>("http://localhost:5091/Crud/update",item).subscribe({
        next:response=>{
          this.dataSource.data=response as unknown as Student[];
          this.load();
          this.clear();
        }
      })
  }
  selectedlist(val:string){
    debugger;
    var skilllist=[];
    if(val.indexOf("Tamil")!=-1) {
      skilllist.push("Tamil")
    }
    this.skills.setValue("Tamil");
}
  edit(samp:any)
  {
    debugger;
    this.id=(samp.id)
     this.name.setValue(samp.name);
     this.age.setValue(samp.age);
     this.gender.setValue(samp.gender);
     this.dob.setValue(samp.dob);
     this.degree.setValue(samp.degree);
     this.department.setValue(samp.department);
    
    //  this.skills.setValue(this.skilllist);
    //  this.selectedlist(samp.skills);
     this.updatebtn=true;
     this.createbtn=false;
  }

}


