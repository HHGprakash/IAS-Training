import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Auth/login/login.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  Logout() {
    this.LoginService.logout();
  }
}
