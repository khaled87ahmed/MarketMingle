import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { updateUserFlag } from 'src/app/Store/isUserLoggedIn/isUserLoggedInActions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  moveLeft: boolean = false;
  errMsg: string = '';
  loginLoading:boolean = false;
  registerLoading:boolean = false;
  isUserLoggedIn$ = this.store.pipe(select((state: any) => state.userLogin.flag));

  constructor(private service: AuthenticationService ,private router:Router, private store: Store) { window.scrollTo(0, 0); }


  setMoveLeft(flag: boolean) {
    this.moveLeft = flag;
    this.errMsg='';
    this.registerLoading = false;
    this.loginLoading = false;

    this.registerSchema.reset({
      name: '', 
      email: '',   
      phone: '',   
      password: '',   
      rePassword: ''
    });
    this.loginSchema.reset({
      email: '',   
      password: ''
    });

  };


  getRegisterData() {
    this.service.Register(this.registerSchema.value).subscribe(
      (res: any) => {

        this.setMoveLeft(false)

      }
      ,
      (err: any) => {

        this.registerLoading = false;

        if (err.status == 400) 
          this.errMsg = err.error.errors.msg || err.error.message;

        else
          this.errMsg = err.error.message;


      }

    )
  }

  getLoginData() {
    this.service.Login(this.loginSchema.value).subscribe(
      (res: any) => {

        this.store.dispatch(updateUserFlag({ newValue: true }));
        localStorage.setItem('token',res.token);
        this.loginLoading = false;
        this.router.navigate(['/home']);
        
      }
      ,
      (err: any) => {

        this.loginLoading = false;

        if (err.status == 400) 
          this.errMsg = err.error.errors.msg || err.error.message;

        else
          this.errMsg = err.error.message;


      }

    )
  }

  
// ----------------------------------------------------------------------------------------------------------------------------------

  // register validation :-

  registerSchema = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    rePassword: new FormControl('', [Validators.required, this.matchPassword.bind(this)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  // Custom validator for password match
  matchPassword(control: FormControl): { [key: string]: any } | null {
    const password = this.registerSchema?.get('password')?.value;
    const rePassword = control.value;
    return password === rePassword ? null : { passwordNotMatched: true };
  }


  onSubmitRegisterSchema() {
    this.errMsg = '';
    this.registerLoading = true;

    this.getRegisterData();
    

  }

  // ----------------------------------------------------------------------------------------------------------------------------------

  // login validation :-

  loginSchema = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })


  onSubmitLoginSchema() {
    this.errMsg = '';
    this.loginLoading = true;
    
    this.getLoginData();
    
  }

  // ----------------------------------------------------------------------------------------------------------------------------------


}


