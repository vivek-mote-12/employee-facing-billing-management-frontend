import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  otpSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', []],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (!this.otpSent) {
        this.sendOTP();
      } else {
        this.verifyOTP();
      }
    }
  }

  sendOTP() {
    this.otpSent = true;
    this.loginForm
      .get('otp')
      ?.setValidators([Validators.required, Validators.pattern(/^\d{6}$/)]); // Apply validation to OTP field
    this.loginForm.get('otp')?.updateValueAndValidity(); // Update form control
    // const email = this.loginForm.get('email')?.value;
    // this.authService.sendOTP(email).subscribe({
    //   next: () => {
    //     this.otpSent = true;
    //     this.loginForm.get('otp')?.setValidators(Validators.required);
    //     this.loginForm.get('otp')?.updateValueAndValidity();
    //   },
    //   error: (error) => {
    //     console.error('Error sending OTP', error);
    //     // Handle error (e.g., show error message to user)
    //   }
    // });
  }

  verifyOTP() {
    this.router.navigate(['/dashboard']);
    // const email = this.loginForm.get('email')?.value;
    // const otp = this.loginForm.get('otp')?.value;
    // this.authService.verifyOTP(email, otp).subscribe({
    //   next: () => {
    //     this.router.navigate(['/dashboard']);
    //   },
    //   error: (error) => {
    //     console.error('Error verifying OTP', error);
    //     // Handle error (e.g., show error message to user)
    //   }
    // });
  }
}
