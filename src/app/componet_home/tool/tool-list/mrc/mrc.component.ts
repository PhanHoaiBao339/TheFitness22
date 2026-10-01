import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mrc',
  templateUrl: './mrc.component.html',
  styleUrls: ['./mrc.component.scss'],
})
export class MrcComponent implements OnInit {
  constructor() {}

  public calsPerDay: any = 0;
  public optObject: any = '';
  public mealsPerDayy: any = 0;
  public mealsPerDay: any = 0;
  public carbPart: any = 0.0;
  public proPart: any = 0.0;
  public fatPart: any = 0.0;
  public carbs: any = 0.0;
  public pro: any = 0.0;
  public fat: any = 0.0;
  public totalPercent: any = 0;
  public i: any = 0;

  public carbParts: any;
  public proParts: any;
  public fatParts: any;

  // Var CALC
  public daycarb: any = '';
  public mealcarb: any = '';

  public calcarb: any = '';
  public calcarbmeal: any = '';

  public daypro: any = '';
  public mealpro: any = '';

  public calpro: any = '';
  public calpromeal: any = '';

  public dayfat: any = '';
  public mealfat: any = '';

  public calfat: any = '';
  public calfatmeal: any = '';

  ngOnInit(): void {

  }

  // onChange(carbs:any , pro:any, fat:any){
  //   console.log(this.carbs, this.pro, this.fat);
  //   this.totalPercent = carbs + pro + fat;
  // }

  public choseItem(item: number) {
    switch (item) {
      case 1:
        this.carbPart = 50;
        this.proPart = 25;
        this.fatPart = 25;
        break;

      case 2:
        this.carbPart = 55;
        this.proPart = 25;
        this.fatPart = 20;
        break;

      case 3:
        this.carbPart = 40;
        this.proPart = 30;
        this.fatPart = 30;
        break;

      case 4:
        this.carbPart = 60;
        this.proPart = 25;
        this.fatPart = 15;
        break;

      case 5:
        this.carbPart = 25;
        this.proPart = 40;
        this.fatPart = 35;
        break;

      case 6:
        this.carbPart = 10;
        this.proPart = 45;
        this.fatPart = 45;
        break;

      default:
        break;
    }
  }

  public calcIt() {
    console.log(
      this.calsPerDay,
      this.carbPart,
      this.proPart,
      this.fatPart,
      (this.mealsPerDay = parseInt(this.mealsPerDayy))
    );

    this.carbParts = parseFloat(this.carbPart) / 100;
    this.proParts = parseFloat(this.proPart) / 100;
    this.fatParts = parseFloat(this.fatPart) / 100;

    var total = this.carbParts + this.proParts + this.fatParts;
    if (total.toFixed(2) != 1.0) {
      alert('Tổng số 3 ô phải là 100%');
      return false;
    }

    // CALC
    // Carb
    this.daycarb= ((this.calsPerDay * this.carbParts) / 4).toFixed(1);
    this.mealcarb = Math.round((this.daycarb / this.mealsPerDay) * 10) / 10;

    this.calcarb = Math.round(this.calsPerDay * this.carbParts);
    this.calcarbmeal = Math.round((this.calcarb / this.mealsPerDay) * 10) / 10;

    //Protein
    this.daypro = ((this.calsPerDay * this.proParts) / 4).toFixed(1);
    this.mealpro = Math.round((this.daypro / this.mealsPerDay) * 10) / 10;

    this.calpro = Math.round(this.calsPerDay * this.proParts);
    this.calpromeal = Math.round((this.calpro / this.mealsPerDay) * 10) / 10;

    //Fat
    this.dayfat = ((this.calsPerDay * this.fatParts) / 9).toFixed(1);
    this.mealfat = Math.round((this.dayfat / this.mealsPerDay) * 10) / 10;

    this.calfat = Math.round((this.calsPerDay * this.fatParts));
    this.calfatmeal = Math.round((this.calfat) / this.mealsPerDay * 10) / 10;

    return '';
  }
}
