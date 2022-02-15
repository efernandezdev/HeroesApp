import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/heroes/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm['status'] == 'VALID') {
      this.loginForm.value['email'] = this.loginForm.value['email'].trim();
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/heroes/home']);
        },
        error: (err) => {
          Swal.fire({
            icon: 'warning',
            text: `${err['error']['error']}`,
          });
          console.log(err);
        },
      });
    }else{
          Swal.fire({
            icon: 'warning',
            text: `Password and Email are required`,
          });
    }
  }
}
