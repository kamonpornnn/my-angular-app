import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // ถ้า login แล้วให้ redirect ไป dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.snackBar.open('เข้าสู่ระบบสำเร็จ', 'ปิด', { duration: 3000 });
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          this.isLoading = false;
          this.snackBar.open('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'ปิด', { duration: 3000 });
        }
      });
    }
  }
}
