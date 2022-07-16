import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  countryUrl: string = 'http://localhost:8080/api/countries';
  stateUrl: string = 'http://localhost:8080/api/states';
  constructor(private http: HttpClient) {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let date: number[] = [];
    for (let i = startMonth; i <= 12; i++) {
      date.push(i);
    }
    return of(date);
  }

  getCreditCardYears(): Observable<number[]> {
    let year: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYeay: number = startYear + 10;
    for (let i = startYear; i <= endYeay; i++) {
      year.push(i);
    }
    return of(year);
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<GetResponseCountry>(this.countryUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  getStates(countryCode: string): Observable<State[]> {
    return this.http
      .get<GetResponseStates>(
        this.stateUrl + `/search/findByCountryCode?code=${countryCode}`
      )
      .pipe(map((response) => response._embedded.states));
  }
}

interface GetResponseCountry {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
