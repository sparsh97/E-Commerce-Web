import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice!: number;
  totalQuantity!: number;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.fb.group({
      customer: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.fb.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      })
    });

    const startMonth: number = new Date().getMonth() +1;
    this.formService.getCreditCardMonths(startMonth).subscribe(res => {
      this.creditCardMonths = res;
    });

    this.formService.getCreditCardYears().subscribe(res => {
      this.creditCardYears = res;
    })
  }

  onSubmit(){
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }

  copyShippingAddressToBillingAdress(event: any) {
    if(event?.target?.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYear() {
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = this.checkoutFormGroup.get('creditCard')?.value.expirationYear;
    let startMonth!: number;
    if(currentYear == selectedYear) {
      startMonth = new Date().getMonth();
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(res => {
      this.creditCardMonths = res;
    })
  }

}
