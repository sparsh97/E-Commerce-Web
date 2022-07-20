import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { WhiteSpaceValidator } from 'src/app/cvalidators/white-space-validator';
import { CartItemService } from 'src/app/services/cart-item.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice!: number;
  totalQuantity!: number;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];
  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];

  constructor(private fb: FormBuilder, 
    private formService: FormService,
    private cartService: CartItemService) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.fb.group({
      customer: this.fb.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9._]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.fb.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
      }),
      billingAddress: this.fb.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
      }),
      creditCard: this.fb.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        cardNumber: new FormControl('', [Validators.required,
          Validators.pattern("[0-9]{16}")]),
        securityCode:  new FormControl('', [
          Validators.required,
          Validators.pattern("[0-9]{3}"),
          WhiteSpaceValidator.notOnlyWhiteSpace,
        ]),
        expirationMonth:new FormControl('', [Validators.required]),
        expirationYear:new FormControl('', [Validators.required]),
      }),
    });

    this.getCountriesList();
    this.reviewCartDetails();
    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe((res) => {
      this.creditCardMonths = res;
    });

    this.formService.getCreditCardYears().subscribe((res) => {
      this.creditCardYears = res;
    });

  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get creditCardName() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get creditCardCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  get creditCardMonth() {
    return this.checkoutFormGroup.get('creditCard.expirationMonth');
  }  
  get creditCardYear() {
    return this.checkoutFormGroup.get('creditCard.expirationYear');
  }  

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
    console.log(this.checkoutFormGroup.get('billingAddress')?.value);
  }

  copyShippingAddressToBillingAdress(event: any) {
    if (event?.target?.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingStates = this.shippingStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingStates = [];
    }
  }

  handleMonthsAndYear() {
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number =
      this.checkoutFormGroup.get('creditCard')?.value.expirationYear;
    let startMonth!: number;
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth();
    } else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe((res) => {
      this.creditCardMonths = res;
    });
  }

  getCountriesList() {
    this.formService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  getShippingStateList(countryCode: string) {
    this.formService.getStates(countryCode).subscribe((res) => {
      this.shippingStates = res;
    });
  }

  getBillingStateList(countryCode: string) {
    this.formService.getStates(countryCode).subscribe((res) => {
      this.billingStates = res;
    });
  }

  handleStateBasedOnCountryShipping(formGroup?: FormGroup) {
    // let shippingAddress: FormGroup = this.checkoutFormGroup.get('shippingAddress');
    const countryCode =
      this.checkoutFormGroup.get('shippingAddress')?.value.country;
    if (countryCode != null || countryCode != '') {
      this.getShippingStateList(countryCode);
    }
  }

  handleStateBasedOnCountryBilling(formGroup?: FormGroup) {
    // let shippingAddress: FormGroup = this.checkoutFormGroup.get('shippingAddress');
    const countryCode =
      this.checkoutFormGroup.get('billingAddress')?.value.country;
    if (countryCode != null || countryCode != '') {
      this.getBillingStateList(countryCode);
    }
  }

  reviewCartDetails() {
    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    });

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })
  }
}
