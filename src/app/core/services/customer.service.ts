import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Customer } from '../../models/customer';
import { isIterable } from 'rxjs/internal/util/isIterable';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/api/customers`).pipe(
      map((response:any) => {
        console.log(response);
        return this.mapCustomers(response.data)
      }),
      catchError(error => {
        alert("Unexpected Error occured")
        console.error('Error fetching customers:', error);
        return EMPTY;
      })
    );;
  }

  private mapCustomers(data: any[]): Customer[] {
    return data.map(item => ({
      customerId: item.customerId,
      name: item.name,
      email: item.email,
      address:item.address,
      city:item.city,
      meterReading:item.meterReading,
      mobile:item.phone,
      previousBillDate:item.previousBillDate
    }));
  }
}
