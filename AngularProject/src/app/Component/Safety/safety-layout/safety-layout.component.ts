import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Auth/login/login.service';

@Component({
  selector: 'app-safety-layout',
  templateUrl: './safety-layout.component.html',
  styleUrls: ['./safety-layout.component.scss']
})
export class SafetyLayoutComponent implements OnInit {

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  Logout() {
    this.LoginService.logout();
  }
}
