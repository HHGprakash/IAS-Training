import { HttpClient } from '@angular/common/http';
import { rendererTypeName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { urlConstant } from '../constant/urlConstant';
import * as _ from 'underscore';

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  public config = {};
  public userData: any = {};
  public loading: any;
  public UserDetail: any = {};
  public IsWriteAccess: boolean = true;
  public IsTaskManagerWriteAccess: boolean = true;
  public IsCreatorWriteAccess: boolean = true;
  public IsPmoManager: boolean = true;
  public url: any;

  constructor(
    public http: HttpClient,
    private _toastr: ToastrService,
    public router: Router,
  ) { }




  public toastSuccessMsg(title: any, message: any, timeOut?: object) {
    this._toastr.success(message, title, timeOut);
  }

  public toastErrorMsg(title: any, message: any, timeOut?: object) {
    this._toastr.error(message, title, { timeOut: timeOut == undefined ? 5000 : Number(timeOut), enableHtml: true });
  }

  public toastWarningMsg(title: any, message: any, timeOut?: object) {
    this._toastr.warning(message, title, timeOut);
  }

  public DefaultLandscape() {
    var css = '@page { size: landscape; }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style') as HTMLStyleElement;
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }

  private subject = new Subject<any>();

  sendData(obj: any) {
    this.subject.next(obj);
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  DateBlock(StarDate: any, EndDate: any) {
    if (StarDate == null || EndDate == null) {
      return [];
    }
    let DateDiff = Math.round(new Date(EndDate).valueOf() - new Date(StarDate).valueOf()) / (1000 * 60 * 60 * 24);
    var AddDays = Math.ceil(Math.ceil(DateDiff) / 13);

    var DateBlocks = [];
    var TotalBlock = 13;
    var Left = 0;
    for (var i = 0; i < 13; i++) {
      DateBlocks.push({
        Left: Left,
        Date: new Date(new Date(StarDate).setDate(new Date(StarDate).getDate() + (AddDays * i)))
      });
      Left += 100 / TotalBlock;
    }
    return DateBlocks;
  }

  StringToDate(date: any) {
    if (date != null) {
      date = {
        "year": new Date(date).getFullYear(),
        "month": new Date(date).getMonth() + 1,
        "day": new Date(date).getDate()
      };
    }
    return date;
  }
  DateToString(date: any) {

    if (date != null) {
      if (date.month.toString().length == "1") {
        date.month = "0" + date.month;
      }
      if (date.day.toString().length == "1") {
        date.day = "0" + date.day;
      }
      date = date.year + "-" + date.month + '-' + date.day;
    }
    return date;
  }


  GetAllCountries() {
    return this.http.get(urlConstant.Common.GetAllCountries).pipe();
  }

  GetAllRole() {
    return this.http.get(urlConstant.Common.GetAllRole).pipe();
  }

  GetYearRange(StartYear: number, EndYear: number, Order: string = "asc") {
    var Years = [];
    if (Order == "desc") {
      for (let i = EndYear; i >= StartYear; i--) {
        Years.push(i);
      }
    } else {
      for (let i = StartYear; i <= EndYear; i++) {
        Years.push(i);
      }
    }
    return Years;
  }

  getAge(dateString: any) {
    if (dateString == null || dateString == "")
      return null;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public CopyObject(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }

  DeleteObject(ojb: any, index: number) {
    var tmpEle = this.CopyObject(ojb);
    ojb = [];
    tmpEle.splice(index, 1);
    return tmpEle;
  }

  GetRanking(Application: any) {
    var value: any = 0;
    var Rank: any = [];

    //age
    var age: any = this.getAge(Application.dateofBirth);
    if (age >= 18 && age <= 45) {
      value = 1;
    } else if (age > 45) {
      value = 0.5;
    }
    Rank.push({
      "Question": "Age",
      "Answer": age,
      "value": value
    })

    //Q4.  Nationality - we may need to now include Country Classification
    value = 0;
    if (Application.countryClass == "LDC" ||
      Application.countryClass == "LLDC" ||
      Application.countryClass == "SIDS	" ||
      Application.countryClass == "LDC/SIDS" ||
      Application.countryClass == "LDC/LLDC")
      value = .5;
    Rank.push({
      "Question": "Country Class",
      "Answer": Application.countryClass,
      "value": value
    })

    //Gender
    value = 0;
    if (Application.sex == "Male")
      value = .5;
    else if (Application.sex == "Female")
      value = .75;
    Rank.push({
      "Question": "Gender",
      "Answer": Application.sex,
      "value": value
    })

    //Languages
    value = 0;
    if (Application.listening == "Excellent")
      value = 5;
    else if (Application.listening == "Good")
      value = 4;
    else if (Application.listening == "Fair")
      value = 3;
    else if (Application.listening == "Poor")
      value = 2;
    Rank.push({
      "Question": "Proficiency in English - listening",
      "Answer": Application.listening,
      "value": value
    })

    value = 0;
    if (Application.speaking == "Excellent")
      value = 5;
    else if (Application.speaking == "Good")
      value = 4;
    else if (Application.speaking == "Fair")
      value = 3;
    else if (Application.speaking == "Poor")
      value = 2;
    Rank.push({
      "Question": "Proficiency in English - speaking",
      "Answer": Application.speaking,
      "value": value
    })

    value = 0;
    if (Application.writing == "Excellent")
      value = 5;
    else if (Application.writing == "Good")
      value = 4;
    else if (Application.writing == "Fair")
      value = 3;
    else if (Application.writing == "Poor")
      value = 2;
    Rank.push({
      "Question": "Proficiency in English - writing",
      "Answer": Application.writing,
      "value": value
    })

    value = 0;
    if (Application.reading == "Excellent")
      value = 5;
    else if (Application.reading == "Good")
      value = 4;
    else if (Application.reading == "Fair")
      value = 3;
    else if (Application.reading == "Poor")
      value = 2;
    Rank.push({
      "Question": "Proficiency in English - reading",
      "Answer": Application.reading,
      "value": value
    })

    //qualification
    var value1: number;
    value1 = 0;
    if (Application.qualification != null) {
      var qualification = Application.qualification.split(",");

      _.each(qualification, (item: any) => {
        if (item.trim() == "Diploma")
          value1 += 1;
        if (item.trim() == "Bachelor")
          value1 += 2;
        if (item.trim() == "Master")
          value1 += 2.5;
        if (item.trim() == "M.Phil")
          value1 += 2.5;
        if (item.trim() == "PhD")
          value1 += 2.5;
      })
    }
    Rank.push({
      "Question": "Qualification",
      "Answer": Application.qualification,
      "value": value1
    })

    //researchundertakenifany
    value = 0.5;
    if (Application.researchundertakenifany && Application.researchundertakenifany.trim() != "") {
      Rank.push({
        "Question": "Research undertaken",
        "Answer": Application.researchundertakenifany,
        "value": value
      })
    }

    //atseaWorkingExperience
    value = 0.5;
    if (Application.atseaWorkingExperience && Application.atseaWorkingExperience.trim() != "") {
      Rank.push({
        "Question": "At-sea Working Experience",
        "Answer": Application.atseaWorkingExperience,
        "value": value
      })
    }
    //participationininternationalsymposia
    value = 0.5;
    if (Application.participationininternationalsymposia && Application.participationininternationalsymposia.trim() != "") {
      Rank.push({
        "Question": "Participation in international symposia/workshops, fellowships and other training programmes",
        "Answer": Application.participationininternationalsymposia,
        "value": value
      })
    }

    return Rank;
  }
}

