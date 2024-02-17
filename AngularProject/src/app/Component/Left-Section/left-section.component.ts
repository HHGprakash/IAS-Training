import { Component, OnInit } from '@angular/core';
import { ContractorTrainingService } from '../Admin/contractor-training/contractor-training.service';
import { LoginService } from '../Auth/login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-left-section',
  templateUrl: './left-section.component.html',
  styleUrls: ['./left-section.component.scss']
})
export class LeftSectionComponent implements OnInit {

  ContractorList: any = [];
  userrole = JSON.parse(localStorage.getItem('currentUser') || '{}').userRoleName;
  IsDisplay :any;
  routingfullurl: any;
 // applicationId: any;
isnavdisplay:boolean = true;

  constructor(private contractorTrainingService: ContractorTrainingService,
    private LoginService: LoginService,
    private activedRoute: ActivatedRoute,
    private router: Router
      ) { 
      // console.log('routeparams from navbar-----',this.activedRoute.snapshot.params['applicationid'])
      // console.log('navbar url --',this.router.url)
      this.routingfullurl = this.router.url
    }

  ngOnInit(): void {
      if(this.userrole == "LtcUser" || this.userrole == "TrainingOfficer"){
        this.IsDisplay = false;
      }
      else{
        this.IsDisplay = true;
      }  
      this.geturlparams()
  }

  geturlparams(){
    var urlarray = this.routingfullurl.split('/');
    console.log(urlarray);
    if(urlarray.length == 4){
this.isnavdisplay = false;
    }
  }
}
