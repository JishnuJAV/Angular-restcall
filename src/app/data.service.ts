import { Injectable } from '@angular/core';
import { UserSettings} from './usersettings';
import {HttpClient} from '@angular/common/http';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users : UserSettings[]=[]
  userUpdated = new Subject<UserSettings[]>()

  constructor(private httpclient:HttpClient) { }

  postform(usersetting:UserSettings):Observable<any>{
    console.log("Inside Dataservice")
    return this.httpclient.post("https://jsonplaceholder.typicode.com/posts",usersetting)
  }
 
  getuser(){
    return this.users.slice()
  }
  getSingleUser(index: number) {
    return this.users[index]
  }

  addUser(user:UserSettings) {
    this.users.push(user)
    this.userUpdated.next(this.users.slice())
  }

  updateUser(index: number, user: UserSettings) {
    this.users[index] = user
    this.userUpdated.next(this.users.slice())
  }

  deleteUser(index:number) {
    this.users.splice(index, 1)
    this.userUpdated.next(this.users.slice())

  }

}
