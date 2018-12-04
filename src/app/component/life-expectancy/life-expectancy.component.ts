import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { LifeExpectancy, LifeExpectancyHistory } from '../../model/life-expectancy';
import { PopulationService } from '../../service/population.service';

@Component({
  selector: 'app-life-expectancy',
  templateUrl: './life-expectancy.component.html',
  styleUrls: ['./life-expectancy.component.scss']
})
export class LifeExpectancyComponent implements OnInit {

  genders: string[] = ['male', 'female'];
  gender: string = this.genders[0];

  countries: string[] = [];
  country: string;

  date: Date = new Date();
  age: number = 30;

  lastDate: Date;
  lifeExpectancyDate: LifeExpectancy;
  lifeExpectancyNow: LifeExpectancy;

  displayedColumns: string[] = ['gender', 'country', 'date', 'age', 'expectancy'];

  constructor(private populationService: PopulationService) { }

  ngOnInit(): void {
    this.populationService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.country = this.countries.find(c => c.includes('Slovakia') || c.includes('Slovak Republic'));
    });
  }

  disabledButton(): boolean {
    return !this.gender || !this.country || !this.date || !this.age;
  }

  calculateLifeExpectancy(): void {
    this.populationService.getLifeExpectancy(this.gender, this.country, this.stripTime(this.date), this.age).subscribe(expectancy => {
      this.storeLifeExpectancyToLocalStorage(this.gender, this.country, this.date, this.age, expectancy);
      this.lastDate = new Date(this.date);
      this.lifeExpectancyDate = this.createLifeExpectancy(expectancy);
      this.lifeExpectancyNow = this.createLifeExpectancy(expectancy - (this.stripTime(new Date()).getTime() - this.stripTime(this.date).getTime()) / 1000 / 60 / 60 / 24 / 365);
    });
  }

  private stripTime(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  private createLifeExpectancy(years: number): LifeExpectancy {
    const lifeExpectancy: LifeExpectancy = new LifeExpectancy();

    lifeExpectancy.years = Math.floor(years);
    lifeExpectancy.months = Math.floor((years - lifeExpectancy.years) * 12);
    lifeExpectancy.days = Math.floor((years - lifeExpectancy.years - lifeExpectancy.months / 12) * 365);

    return lifeExpectancy;
  }

  private storeLifeExpectancyToLocalStorage(gender: string, country: string, date: Date, age: number, expectancy: number) {
    const data = this.getLifeExpectancyHistory();
    data.unshift({ gender: gender, country: country, date: date, age: age, expectancy: expectancy });
    localStorage.setItem('life_expectancy', JSON.stringify(data.slice(0, Math.min(5, data.length))));
  }

  hasLifeExpectancyHistory(): boolean {
    return !!localStorage.getItem('life_expectancy');
  }

  getLifeExpectancyHistory(): LifeExpectancyHistory[] {
    const data = localStorage.getItem('life_expectancy');
    return data ? JSON.parse(data) : [];
  }

  isRequiredError(value: any): ErrorStateMatcher {
    return {
      isErrorState(): boolean {
        return !value;
      }
    };
  }
}
