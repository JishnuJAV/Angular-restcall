import { Component, OnInit } from '@angular/core';
import {UserSettings} from '../usersettings';
import {DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 users:UserSettings[]

  constructor( private dataservice:DataService , private router:Router) { }

  ngOnInit(): void {
    this.users = this.dataservice.getuser()
    
  }
  onEditUser(index: number) {
    this.router.navigate([`${index}/edit`])
  }

}
