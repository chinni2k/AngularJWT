import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeLink: string = 'home';
  scrolled: boolean = false;
  isNavbarOpen: boolean = false;

  data!: FormGroup;


  constructor(private router: Router, private fb: FormBuilder) {
    this.data = this.fb.group({
      user: [''],
      pass: [''],
    });
  }

  ngOnInit(): void {
    //this.onScroll();
  }

  onSubmit() {
    console.log(this.data?.value);
  }

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   this.scrolled = window.scrollY > 50;
  // }

  // onUpdateActiveLink(value: string): void {
  //   this.activeLink = value;
  // }

  // toggleNavbar(): void {
  //   this.isNavbarOpen = !this.isNavbarOpen;
  // }
}
