import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tdee',
  templateUrl: './tdee.component.html',
  styleUrls: ['./tdee.component.scss'],
})
export class TdeeComponent implements OnInit {
  constructor() { }
  public gender: string = '';
  public time1: string = '';
  public height: any = '';
  public weight1: any = '';
  public age: any = '';
  public bmr1: any = '';
  public result1: any = '';

  public weight2: any = '';
  public time2: string = '';
  public bodyfat: any = '';
  public result2: any = '';
  public bmr2: any = '';


  ngOnInit(): void { }

  public cal1() {
    console.log(this.gender, this.time1, this.height, this.weight1, this.age);
    if (this.gender == '' || this.weight1 == '' || this.height == '' || this.age == '' || this.gender == null || this.weight1 == null || this.height == null || this.age == null) {
      this.result1 = 'Bạn vui lòng nhập đủ dữ liệu để thực hiện thao tác!'
    }
    if (this.gender == 'male') {
      if (this.weight1 == '' || this.height == '' || this.age == '' || this.gender == null || this.weight1 == null || this.height == null || this.age == null) {
        this.result1 = 'Bạn vui lòng nhập đủ dữ liệu để thực hiện thao tác!'
        return false;
      }else{
        this.bmr1 = this.weight1 * 10 + this.height * 6.25 - this.age * 5 + 5;
        console.log(this.bmr1 + 'of male');

        // CALC
        if (this.time1 == '0') {
          var tdee1 = this.bmr1 * 1.2;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '1') {
          var tdee1 = this.bmr1 * 1.375;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '2') {
          var tdee1 = this.bmr1 * 1.55;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '3') {
          var tdee1 = this.bmr1 * 1.725;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '4') {
          var tdee1 = this.bmr1 * 1.9;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        }
      }

    } else if (this.gender == 'female') {
      if (this.weight1 == '' || this.height == '' || this.age == '' || this.gender == null || this.weight1 == null || this.height == null || this.age == null) {
        this.result1 = 'Bạn vui lòng nhập đủ dữ liệu để thực hiện thao tác!'
        return false;
      } else {
        this.bmr1 = this.weight1 * 10 + this.height * 6.25 - this.age * 5 - 161;
        console.log(this.bmr1);
        // CALC
        if (this.time1 == '0') {
          var tdee1 = this.bmr1 * 1.2;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '1') {
          var tdee1 = this.bmr1 * 1.375;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '2') {
          var tdee1 = this.bmr1 * 1.55;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '3') {
          var tdee1 = this.bmr1 * 1.725;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        } else if (this.time1 == '4') {
          var tdee1 = this.bmr1 * 1.9;
          this.result1 = 'chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo';
          console.log('chỉ số TDEE của bạn là ' + Math.round(tdee1) + ' calo');
        }
      }
    }

    return '';
  }

  public cal2() {
    console.log(this.time2, this.weight2, this.bodyfat);
    if (this.weight2 == '' || this.bodyfat == ''|| this.weight2 == null || this.bodyfat == null) {
      this.result2 = 'Bạn vui lòng nhập đủ dữ liệu để thực hiện thao tác!'
    }

    if (this.weight2 == '' || this.bodyfat == '' || this.weight2 == null || this.bodyfat == null) {
      this.result2 = 'Bạn vui lòng nhập đủ dữ liệu để thực hiện thao tác!'
      return;
    } else {
      this.bmr2 = 21.6 * (this.weight2 - this.weight2 * this.bodyfat * 0.01) + 370;
      if (this.time2 == 'time0') {
        var tdee2 = this.bmr2 * 1.2;
        this.result2 = 'chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo';
        console.log('chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo');
      } else if (this.time2 == 'time1') {
        var tdee2 = this.bmr2 * 1.375;
        this.result2 = 'chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo';
        console.log('chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo');
      }
      else if (this.time2 == 'time2') {
        var tdee2 = this.bmr2 * 1.55;
        this.result2 = 'chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo';
        console.log('chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo');
      }
      else if (this.time2 == 'time3') {
        var tdee2 = this.bmr2 * 1.725;
        this.result2 = 'chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo';
        console.log('chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo');
      } else if (this.time2 == 'time4') {
        var tdee2 = this.bmr2 * 1.9;
        this.result2 = 'chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo';
        console.log('chỉ số TDEE của bạn là ' + Math.round(tdee2) + ' calo');
      }
    }
    return '';
  }
}
