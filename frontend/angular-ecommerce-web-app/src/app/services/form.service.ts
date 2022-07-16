import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let date: number[]=[];
    for(let i=startMonth;i<=12;i++) {date.push(i)};
    return of(date);
  }

  getCreditCardYears(): Observable<number[]> {

    let year: number[]=[];
    const startYear: number = new Date().getFullYear();
    const endYeay: number = startYear + 10;
    for(let i=startYear;i<=endYeay;i++) {
      year.push(i);
    }
    return of(year);
  }
}
