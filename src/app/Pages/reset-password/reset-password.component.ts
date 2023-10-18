import { Component } from '@angular/core';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  constructor(private service: AuthenticationService ,private router:Router) { window.scrollTo(0, 0);  }

  toResetPassword: boolean = false;
  errMsg: string = '';
  successMsg: string = '';
  sendCodeLoading: boolean = false;
  verifyCodeLoading: boolean = false;
  resetPasswordLoading: boolean = false;

  verifyCodeSchema = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    code: new FormControl('', [Validators.required]),
  })

  resetPasswordSchema = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, this.matchPassword.bind(this)]),
  })

  // Custom validator for password match
  matchPassword(control: FormControl): { [key: string]: any } | null {
    const password = this.resetPasswordSchema?.get('password')?.value;
    const rePassword = control.value;
    return password === rePassword ? null : { passwordNotMatched: true };
  }

  handleOnSendCode() {
    this.sendCodeLoading = true;

    let data: object = {
      email: this.verifyCodeSchema.value.email
    }

    this.service.forgotPassword(data).subscribe(
      (res: any) => {

        this.sendCodeLoading = false;
        this.errMsg = ''
        this.successMsg = res.message

      }
      ,
      (err: any) => {

        this.successMsg = ''
        this.errMsg = err.error.message
        this.sendCodeLoading = false;

      }


    )

  }

  handleVerifyCode() {

    this.verifyCodeLoading = true;

    let data: object = {
      resetCode: this.verifyCodeSchema.value.code
    }

    this.service.verifyResetCode(data).subscribe(
      (res: any) => {

        this.toResetPassword = true;
        this.sendCodeLoading = false;
        this.errMsg = ''
        this.successMsg = ''
        this.verifyCodeLoading = false;

      }
      ,
      (err: any) => {
        this.successMsg = ''
        this.errMsg = err.error.message
        this.verifyCodeLoading = false;

      }


    )

  }

  handleResetPassword() {

    this.resetPasswordLoading = true;

    let data: object = {
      "email": this.verifyCodeSchema.value.email,
      "newPassword": this.resetPasswordSchema.value.password
    }

    this.service.resetPassword(data).subscribe(
      (res: any) => {

        localStorage.setItem('token', res.token)
        this.router.navigate(['/home']);
        
      }
      ,
      (err: any) => {

        this.successMsg = ''
        this.errMsg = err.error.message
        this.resetPasswordLoading = false;

      }


    )

  }

  returnToVerifyEmail() {
    this.toResetPassword = false;
    this.errMsg = ''
    this.successMsg = ''
    this.resetPasswordSchema.reset()
    this.verifyCodeSchema.reset()
  }

}
