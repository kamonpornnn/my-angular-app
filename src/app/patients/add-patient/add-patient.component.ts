import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patients } from '../../models/patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: [null, Validators.required],
      phone_number: [''],
      national_id: [''],
      date_of_birth: [''],
      weight_kg: [null],
      height_cm: [null],
      chronic_diseases: [''],
      drug_food_allergies: [''],
      illness_history: [''],
      surgery_history: [''],
      emergency_contact_first_name: [''],
      emergency_contact_last_name: [''],
      emergency_contact_phone: [''],
      emergency_contact_relationship: [''],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const payload: Patients = {
      patient_id: Date.now().toString(),
      first_name: this.form.value.first_name,
      last_name: this.form.value.last_name,
      age: this.form.value.age || 0,
      phone_number: this.form.value.phone_number || '',
      national_id: this.form.value.national_id || '',
      date_of_birth: this.form.value.date_of_birth || '',
      weight_kg: this.form.value.weight_kg || 0,
      height_cm: this.form.value.height_cm || 0,
      chronic_diseases: this.form.value.chronic_diseases || '',
      drug_food_allergies: this.form.value.drug_food_allergies || '',
      illness_history: this.form.value.illness_history || '',
      surgery_history: this.form.value.surgery_history || '',
      emergency_contact_first_name: this.form.value.emergency_contact_first_name || '',
      emergency_contact_last_name: this.form.value.emergency_contact_last_name || '',
      emergency_contact_phone: this.form.value.emergency_contact_phone || '',
      emergency_contact_relationship: this.form.value.emergency_contact_relationship || '',
    };

    this.patientsService.addPatient(payload).subscribe({
      next: () => this.router.navigate(['/patients']),
      error: (err) => { console.error('Add patient failed', err); }
    });
  }

  cancel() {
    this.router.navigate(['/patients']);
  }

}
