import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fat',
  templateUrl: './fat.component.html',
  styleUrls: ['./fat.component.scss']
})
export class FatComponent implements OnInit {

  constructor() { }

  public height: any = '';
  public heightTens: any = ''
  public heightUnits: any = '';
  public heightType: boolean = true;

  public weight: any = '';
  public weightType: boolean = true;

  public calories: any = '';
  public age: any = '';
  public sex: any = '';
  public job: any = '';
  public goal: any = '';
  public fats: any = '';

  placeholderHeight: string = '';
  placeholderHeightUnits: string = '';
  placeholderWeightUnits: string = '';

  public types1() {
    if (this.heightType) {
      this.placeholderHeight = "Nhập số Mét";
      this.placeholderHeightUnits = "Nhập số Cemtimet";
    } else {
      this.placeholderHeight = "Nhập số Feet";
      this.placeholderHeightUnits = "Nhập số Inches";
    }
  }

  public types2() {
    if (this.weightType) {
      this.placeholderWeightUnits = "Nhập số Kí";
    } else {
      this.placeholderWeightUnits = "Nhập số Pound";

    }
  }

  ngOnInit(): void {
    this.types1();
    this.types2();
  }

  public calc() {

    if (this.heightType == false) {
      // tính theo feet
      this.height = parseInt(this.heightTens) * 30.48 + parseInt(this.heightUnits) * 2.54;
    } else {
      console.log('check h type: ' + this.heightType);
      this.height = parseInt(this.heightTens) * 100 + parseInt(this.heightUnits);
    }

    if (this.weightType == false) {
      // tính theo pound
      console.log('check w type: ' + this.weight);
      this.weight = this.weight * 0.453592;
    }

    if (this.sex == true) {
      // tính theo giới tính nam
      this.calories = this.weight * 10 + this.height * 6.25 - this.age * 5 + 5;
      this.jobs();
    } else {
      console.log('check gender: ' + this.sex);
      this.calories = this.weight * 10 + this.height * 6.25 - this.age * 5 - 161;
      this.jobs();
    }

  }

  public jobs() {
    switch (this.job) {
      case 'L':
        this.calories = Math.round(this.calories * 1.1);
        console.log('jobs() value: ' + this.calories);
        this.goals();
        break;
      case 'M':
        this.calories = Math.round(this.calories * 1.3);
        this.goals();
        break;
      case 'V':
        this.calories = Math.round(this.calories * 1.5);
        this.goals();
        break;
      case 'E':
        this.calories = Math.round(this.calories * 1.7);
        this.goals();
        break;
    }
  }

  public goals() {
    console.log(this.goal);

    switch (this.goal) {
      case 'fat-loss':
        if (this.calories <= 2000) this.calories = Math.round(0.9 * this.calories);
        if (this.calories > 2000) this.calories = Math.round(0.8 * this.calories);
        this.fats = Math.round((0.20 * this.calories) / 9) + 'g';
        console.log('goals() value: ' + this.calories, 'goals() result: ' + this.fats);
        break;
      case 'maintenance':
        this.fats = Math.round((0.25 * this.calories) / 9) + 'g';
        console.log('goals() value: ' + this.calories, 'goals() result: ' + this.fats);
        break;
      case 'gainz':
        this.calories += 500;
        this.fats = Math.round((0.25 * this.calories) / 4) + 'g';
        console.log('goals() value: ' + this.calories, 'goals() result: ' + this.fats);
        break;
    }
  }



}
