import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'app-permissiton',
  templateUrl: './permissiton.component.html',
  styleUrls: ['./permissiton.component.scss']
})
export class PermissitonComponent implements OnInit {

  roleId: number = 0;
  roleName: string = '';
  permissions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roleId = +params['id'];
      if (this.roleId) {
        this.getPermissions();
      }
    });
  }

  getPermissions() {
    this.roleService.getRolePermissions(this.roleId).subscribe((res: any) => {
      if (res?.results?.list) {
        this.permissions = res.results.list;
        if (this.permissions.length > 0) {
          this.roleName = this.permissions[0].role_name;
        }
      }
    });
  }

  onPermissionChange(item: any) {
    console.log('Permission changed:', item);
  }

  savePermissions() {
    this.roleService.updateRolePermissions({ role_id: this.roleId, permissions: this.permissions }).subscribe((res: any) => {
      this.router.navigate(['/roles']);
    });
  }

  goBack() {
    this.router.navigate(['/roles']);
  }

}
