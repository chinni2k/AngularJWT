import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  isButtonActive = false;
  isSidebarOpen: boolean = true;
  activeLink: string = ''; // Track the active link

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isButtonActive = this.isSidebarOpen;
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
