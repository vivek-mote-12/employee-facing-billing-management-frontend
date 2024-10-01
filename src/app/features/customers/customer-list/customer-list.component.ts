import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/customer';
import { CustomerService } from '../../../core/services/customer.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{
  constructor(private customerService:CustomerService){}
  
  customers$!: Observable<Customer[]>;
  ngOnInit(): void {
      this.loadCustomers();
  }
  loadCustomers(): void {
    this.customers$=this.customerService.getCustomers();
  }
}
