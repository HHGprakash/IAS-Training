import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Auth/login/login.service';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.scss']
})
export class TopSectionComponent implements OnInit {

  IsShow = true;
  constructor(private LoginService: LoginService, private router: Router) {

    if (this.router.url.includes("/ISA/Isa")) {
      this.IsShow = false;
      }
  }
  userusername = JSON.parse(localStorage.getItem('currentUser') || '{}').userusername;


  ngOnInit(): void {
    
  }
  LogOut() {
    this.LoginService.logout();
  }
}
