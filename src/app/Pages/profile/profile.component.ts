import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { updateLoading } from 'src/app/Store/loading/loadingActions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  addressDetails: string = '';
  phone: string = '';
  city: string = '';
  errConstructor: string = '';
  errPass: string = '';
  errAddr: string = '';
  errUser: string = '';


  profileSchema = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    secondName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(this.phone, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    address: new FormControl(this.addressDetails, [Validators.required, Validators.minLength(3)]),
    city: new FormControl(this.city, [Validators.required, Validators.minLength(3)]),
    currentPasswod: new FormControl('', [Validators.required]),
    newPasswod: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    confirmNewPasswod: new FormControl('', [Validators.required, this.matchPassword.bind(this)]),
  });

  matchPassword(control: FormControl): { [key: string]: any } | null {
    const password = this.profileSchema?.get('newPasswod')?.value;
    const rePassword = control.value;
    return password === rePassword ? null : { passwordNotMatched: true };
  }

  constructor(private store: Store, private authService: AuthenticationService, private router: Router) {

    window.scrollTo(0, 0);

    if (!localStorage.getItem('token'))
      this.router.navigate(['/login']);

    this.getLoggedUserAddress()
  }



  async getLoggedUserAddress() {

    this.store.dispatch(updateLoading({ newValue: true }));

    this.authService.getLoggedUserAddress().subscribe(
      (res: any) => {
        const n = res.results;

        if (res.results) {
          this.addressDetails = res.data[n - 1]?.details || '';
          this.phone = res.data[n - 1]?.phone || '';
          this.city = res.data[n - 1]?.city || '';
        }

        this.profileSchema.reset({
          address: this.addressDetails,
          city: this.city,
          phone: this.phone
        });
        this.errConstructor = '';
        this.store.dispatch(updateLoading({ newValue: false }));
      },
      (err: any) => {
        this.errConstructor = err.error.message;
        this.store.dispatch(updateLoading({ newValue: false }));
      }
    );

  }

  async putAddress() {
    try {

      interface Address {
        name: string;
        phone?: string | null | undefined;
        city?: string | null | undefined;
        details?: string | null | undefined;
      }

      let addressData: Address = {
        "name": "Home",
      }

      this.profileSchema.value.address ? addressData.details = this.profileSchema.value.address : null;
      this.profileSchema.value.city ? addressData.city = this.profileSchema.value.city : null;
      this.profileSchema.value.phone ? addressData.phone = this.profileSchema.value.phone : null;

      const res: any = await this.authService.addAddress(addressData).toPromise();


      this.errAddr = '';
    } catch (err: any) {
      this.errAddr = err.error.errors.msg;
    }
  }

  async putUserData() {
    try {

      const fName = this.profileSchema.value.firstName || '';
      const lfName = this.profileSchema.value.secondName || '';

      interface User {
        name?: string;
        email?: string | null | undefined;
        phone?: string | null | undefined;
      }

      let userData: User = {}

      fName + ' ' + lfName ? userData.name = fName + ' ' + lfName : null;
      this.profileSchema.value.email ? userData.email = this.profileSchema.value.email : null;
      this.profileSchema.value.phone ? userData.phone = this.profileSchema.value.phone : null;

      const res = await this.authService.updateLoggedUserData(userData).toPromise();
      this.errUser = '';
    } catch (err: any) {
      this.errUser = err.error.errors.msg;
    }
  }

  async changePassword() {
    if (this.profileSchema.value.currentPasswod && this.profileSchema.value.newPasswod && this.profileSchema.value.confirmNewPasswod) {
      try {

        const passwordData = {
          currentPassword: this.profileSchema.value.currentPasswod,
          password: this.profileSchema.value.newPasswod,
          rePassword: this.profileSchema.value.confirmNewPasswod
        };

        const res: any = await this.authService.updateLoggedUserPassword(passwordData).toPromise();
        localStorage.setItem('token', res.token);
        this.errPass = '';

      } catch (err: any) {
        this.errPass = err.error.errors.msg;
      }
    }
  }

  async onSave() {
    try {
      this.store.dispatch(updateLoading({ newValue: true }));
      await Promise.all([this.putAddress(), this.putUserData(), this.changePassword()]);
    } finally {
      this.store.dispatch(updateLoading({ newValue: false }));
    }
  }


}
