import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './role.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  displayedColumns: string[] = ['index', 'role_name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getRoles() {
    this.roleService.getRole({}).subscribe((res: any) => {
      if (res != null && res.status == true) {
        this.dataSource.data = res.results.list;
      } else {
        this.dataSource.data = [];
      }
    });
  }

  editRole(role: any) {
    this.router.navigate(['/permissions', role.role_id]);
  }

  deleteRole(role: any) {
    if (confirm(`ต้องการลบ Role "${role.role_name}" หรือไม่?`)) {
      // TODO: เรียก API ลบ role
      this.snackBar.open('ลบ Role สำเร็จ', 'ปิด', { duration: 3000 });
      this.getRoles();
    }
  }
}
