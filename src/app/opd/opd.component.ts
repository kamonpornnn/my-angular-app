import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { OpdService } from './opd.service';
import { PatientsService } from '../patients/patients.service';
import { OPDVisit } from '../models/opd.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PackageService } from '../packages/package.service';
import { Package } from '../models/package.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientPackage } from '../models/patient-package.model';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.scss']
})
export class OpdComponent implements OnInit {

  form!: FormGroup;
  displayedColumns: string[] = ['opd_id', 'patient_id', 'package', 'visit_date', 'bp', 'pr', 'temp', 'pain', 'chief_complaint', 'status'];
  dataSource = new MatTableDataSource<OPDVisit>([]);
  patients: any[] = [];
  packages: Package[] = [];
  patientSearchControl = new FormControl('');
  filteredPatients$!: Observable<any[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private opdService: OpdService,
    private patientsService: PatientsService,
    private packageService: PackageService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      patient_id: ['', Validators.required],
      visit_date: [new Date(), Validators.required],
      bp_systolic: [null],
      bp_diastolic: [null],
      pr: [null],
      temperature_c: [null],
      pain_score: [null],
      chief_complaint: [''],
      diagnosis: [''],
      treatment: [''],
      status: ['DRAFT'],
      payment_type: [null],
      package_id: [null]
    });

    this.loadPatients();
    this.loadPackages();
    this.loadVisits();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPatients() {
    this.patientsService.getPatients().subscribe(p => {
      this.patients = p;
      this.filteredPatients$ = this.patientSearchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterPatients(value))
      );
    });
  }

  loadPackages(){
    this.packageService.getPackages().subscribe(p => {
      this.packages = p || [];
    });
  }

  buyPackage(pkg: Package){
    const patientId = this.form.get('patient_id')?.value;
    if(!patientId){
      this.snackBar.open('กรุณาเลือกผู้ป่วยก่อนซื้อแพ็กเกจ','ปิด',{duration:2500});
      return;
    }

    this.packageService.purchasePackage(patientId, pkg.package_id).subscribe({
      next: (res: PatientPackage) => {
        this.snackBar.open('ซื้อแพ็กเกจเรียบร้อย','ปิด',{duration:2500});
        this.loadPackages();
      },
      error: (err) => {
        console.error('purchase failed', err);
        this.snackBar.open('ซื้อแพ็กเกจไม่สำเร็จ','ปิด',{duration:3000});
      }
    });
  }

  getPackageName(id: string | null | undefined){
    if(!id) return '';
    const found = this.packages.find(x => x.package_id === id);
    return found ? found.package_name : id;
  }

  private _filterPatients(value: string) {
    const filterValue = (value || '').toLowerCase();
    return this.patients.filter(p => (`${p.first_name} ${p.last_name}`).toLowerCase().includes(filterValue));
  }

  loadVisits() {
    this.opdService.getVisits().subscribe(v => this.dataSource.data = v);
  }

  submit() {
    if (this.form.invalid) return;
    const raw = this.form.value;
    const visit: OPDVisit = {
      opd_id: Date.now().toString(),
      patient_id: raw.patient_id,
      visit_date: (raw.visit_date instanceof Date) ? raw.visit_date.toISOString() : raw.visit_date,
      bp_systolic: raw.bp_systolic,
      bp_diastolic: raw.bp_diastolic,
      pr: raw.pr,
      temperature_c: raw.temperature_c,
      pain_score: raw.pain_score,
      chief_complaint: raw.chief_complaint || '',
      diagnosis: raw.diagnosis || '',
      treatment: raw.treatment || '',
      status: raw.status || 'DRAFT',
      payment_type: raw.payment_type || null,
      package_id: raw.package_id || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.opdService.addVisit(visit).subscribe(() => {
      this.loadVisits();
      this.form.reset({ status: 'DRAFT', visit_date: new Date() });
    });
  }

  onPatientSelected(event: MatAutocompleteSelectedEvent) {
    const p = event.option.value;
    if (p && p.patient_id) {
      this.form.patchValue({ patient_id: p.patient_id });
      this.patientSearchControl.setValue(`${p.first_name} ${p.last_name}`);
    }
  }

}
