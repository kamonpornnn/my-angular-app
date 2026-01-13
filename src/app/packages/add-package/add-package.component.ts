import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from '../../models/package.model';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private pkgService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      package_name: ['', Validators.required],
      description: [''],
      total_sessions: [1, Validators.required],
      remaining_sessions: [1, Validators.required],
      price: [0, Validators.required],
      start_date: [new Date()],
      expire_date: [null],
      status: ['ACTIVE']
    });
  }

  submit() {
    if (this.form.invalid) return;
    const raw = this.form.value;
    const pkg: Package = {
      package_id: Date.now().toString(),
      package_name: raw.package_name,
      description: raw.description,
      total_sessions: raw.total_sessions,
      remaining_sessions: raw.remaining_sessions,
      price: raw.price,
      start_date: raw.start_date ? raw.start_date.toISOString() : new Date().toISOString(),
      expire_date: raw.expire_date ? raw.expire_date.toISOString() : '',
      status: raw.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.pkgService.addPackage(pkg).subscribe(() => this.router.navigate(['/packages']));
  }
}
