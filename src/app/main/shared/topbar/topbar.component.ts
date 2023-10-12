import { Component, HostListener, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth_services/auth.service';
import { NameService } from 'src/app/authentication/auth_services/name.service';
import { UserStoreService } from 'src/app/authentication/auth_services/user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {
  fullName: string = '';
  scrolled: boolean = false;

  _storeService = inject(UserStoreService);
  _nameService = inject(NameService);

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // this._storeService.getFullNameFromStore().subscribe((data) => {
    //   this.fullName = data; // Assuming data is the user's name
    //   console.log(data);
    //   console.log(this.fullName);
    // });
    this._storeService.getFullNameFromStore().subscribe((data) => {
      console.log('FullName BehaviorSubject emitted:', data);
      let fullNameFromToken = this.auth.getFullNameFromToken();
      console.log('FullName from Token:', fullNameFromToken);

      //data = fullNameFromToken; // This line might be causing the issue
      this.fullName = data || fullNameFromToken;
      console.log('Updated fullName:', this.fullName);
    });

    // this._storeService.getFullNameFromStore().subscribe({
    //   next:(response)=>{
    //     console.log(response);
    //   }
    // })

    // this._storeService.getRoleFromStore().subscribe({
    //   next:(value) =>{
    //     console.log(value)
    //   },
    // })
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  onClick() {
    Swal.fire({
      icon: 'question',
      text: 'Are you sure do you want to Logout',
    });
    const newLocal = this;
    newLocal.auth.logout();
    Swal.fire({
      icon: 'success',
      text: 'Logout Done Successfully ',
    });
  }

  async onClick6() {
    const result = await Swal.fire({
      icon: 'warning',
      text: 'Are you sure you want to Logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#1783aa',
      cancelButtonColor: '#D0312D',
    });

    if (result.isConfirmed) {
      await this.auth.logout();
      // this.fullName = '';
      Swal.fire({
        icon: 'success',
        text: 'Logout Done Successfully',
        confirmButtonColor: '#1783aa',
        timer: 2000,
        timerProgressBar: true,
      });
    }
  }

  // <button (click)="performSearch()" id="searchButton">Search</button>

  //   import { Component, HostListener } from '@angular/core';

  // @Component({
  //   selector: 'app-search',
  //   templateUrl: './search.component.html',
  //   styleUrls: ['./search.component.css']
  // })
  // export class SearchComponent {
  //   performSearch() {
  //     // Your search logic here
  //     console.log('Performing search...');
  //   }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'End') {
      event.preventDefault(); // Prevent default tab behavior
      const searchButton = document.getElementById(
        'logout'
      ) as HTMLButtonElement;
      if (searchButton) {
        searchButton.click();
      }
    }
  }
}
