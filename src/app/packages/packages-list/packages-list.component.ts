import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Package } from '../../models/package.model';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-packages-list',
  templateUrl: './packages-list.component.html',
  styleUrls: ['./packages-list.component.scss']
})
export class PackagesListComponent implements OnInit {
  dataSource = new MatTableDataSource<Package>([]);
  displayedColumns = ['package_id','package_name','total_sessions','remaining_sessions','price','status'];

  constructor(private pkgService: PackageService) { }

  ngOnInit(): void {
    this.pkgService.getPackages().subscribe(p => this.dataSource.data = p);
  }

}
