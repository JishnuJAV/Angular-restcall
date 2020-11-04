import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {UserSettings} from '../usersettings';
import {DataService} from '../data.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usersetting:UserSettings={
    name:null,
    phone:null,
    mail:null,
    gender:null,
    select1:null,
    select2:null
  }
  users: UserSettings[] = []
  userSubscription: Subscription;
  id: number;
  editMode: boolean = false
  constructor( private dataservice:DataService, private route: ActivatedRoute,private router:Router) { }

 

  ngOnInit(): void {
    console.log("inside SignUp..!!")
    this.route.params.subscribe(param => {
      this.id = param['id']
      this.editMode = param['id'] != null

    })
    this.userSubscription = this.dataservice.userUpdated.subscribe((data) => {
      this.users = data
    })

    this.users = this.dataservice.getuser()
  }

  onSubmit(form:NgForm){
    console.log("Inside onSubmit")
    console.log(this.usersetting)
    if(form.invalid){
      alert("Form is Invalid..!!")
    }
    // else{
    //   this.dataservice.postform(form.value).subscribe(
    //     data=>console.log(data),
    //     error=>console.log(error)
    //   );
    else {
      if(!this.editMode) {
        this.dataservice.addUser(form.value)
      } else {
        this.dataservice.updateUser(this.id, form.value)
      }
      this.router.navigate(['home'])
    }
  }
  onEditUser(index: number) {
    this.router.navigate([`${index}/edit`])
  }
  onDeleteUser() {
    this.dataservice.deleteUser(this.id)
    this.router.navigate(['home'])

  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
