import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Patients } from '../../models/patient.model';
import { PatientsService } from '../patients.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit, AfterViewInit, OnDestroy {
  patients$!: Observable<Patients[]>;
  displayedColumns: string[] = ['patient_id', 'first_name', 'last_name', 'age', 'phone_number', 'national_id'];
  dataSource = new MatTableDataSource<Patients>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private sub: any;

  constructor(private patientsService: PatientsService) { }

  ngOnInit(): void {
    this.patients$ = this.patientsService.getPatients();
    this.sub = this.patients$.subscribe({
      next: (p) => this.dataSource.data = p,
      error: (err) => {
        console.error('Failed to load patients', err);
        this.dataSource.data = [];
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
