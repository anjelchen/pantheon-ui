import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Population } from '../model/population';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  private baseUrl = 'http://api.population.io:80/1.0/';

  private countryUrl = 'countries';
  private populationUrl = 'population/${year}/${country}/';
  private lifeExpectancyUrl = 'life-expectancy/remaining/${sex}/${country}/${date}/${age}/';

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

  getCountries(): Observable<string[]> {
    return this.http.get<{countries: string[]}>(this.baseUrl + this.countryUrl)
      .pipe(map(res => res.countries));
  }

  getPopulation(year: number = 1990, country: string = 'Slovak Republic', minAge: number = 18, maxAge: number = 30): Observable<Population[]> {
    return this.http.get<Population[]>(this.baseUrl + this.populationUrl.replace('${year}', `${year}`).replace('${country}', country))
      .pipe(map(pp => pp.filter(p => p.age >= minAge && p.age <= maxAge)));
  }

  getLifeExpectancy(sex: string, country: string, date: Date, age: number): Observable<number> {
    return this.http.get<{remaining_life_expectancy: number}>(this.baseUrl + this.lifeExpectancyUrl.replace('${sex}', sex).replace('${country}', country)
      .replace('${date}', formatDate(date, 'yyyy-MM-dd', this.locale)).replace('${age}', `${age}y`))
      .pipe(map(le => le.remaining_life_expectancy));
  }
}
