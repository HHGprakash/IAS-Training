import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularProject';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    var currentuser = localStorage.getItem('currentUser');
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('currentUser');
        if (token == undefined || token ==null) {
          this.router.navigate(['/login']);
        }
        if (currentuser != token) {
          this.router.navigate(['/login']);
        }
      }
    });

  }

}
