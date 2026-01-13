// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  @HostBinding('class.collapsed')
  get hostCollapsed(): boolean {
    return this.collapsed;
  }

  currentUser = {
    name: 'แพทย์หญิง สมหญิง',
    role: 'แพทย์'
  };

  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: 'fas fa-home', route: '/dashboard' },
    { id: 'opd', label: 'คิว OPD', icon: 'fas fa-calendar-alt', route: '/opd', badge: 3 },
    { id: 'patients', label: 'ผู้ป่วย', icon: 'fas fa-users', route: '/patients' },
    { id: 'packages', label: 'แพ็กเกจ', icon: 'fas fa-box', route: '/packages' },
    { id: 'settings', label: 'ตั้งค่า', icon: 'fas fa-cog', route: '/settings' }
  ];

  constructor(private router: Router) {}

  onToggle() {
    this.collapsed = !this.collapsed;
    this.toggleSidebar.emit(this.collapsed);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  onLogout() {
    console.log('Logout clicked');
  }
}