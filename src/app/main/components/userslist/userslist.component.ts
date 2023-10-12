import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject
} from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { LocationService } from '../../services/location.service';
import { MainEmployeeService } from '../../services/main-employee.service';
import { Users } from '../../services/models/users';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css'],
})
export class UserslistComponent implements OnInit {
  @ViewChild('TABLE') table!: ElementRef;

  user!: Users[];
  Source_location!: any;

  dataSource: any;
  displayedColumns = ['id', 'firstName', 'lastName', 'role', 'actions'];

  /**  injection */
  //Angular v15 feature for inject instead Constructor injection
  _userListService = inject(MainEmployeeService);
  _locationService = inject(LocationService);
  _destroyRef = inject(DestroyRef);
  /**---------------------- */

  constructor() {
    //Angular v16 features
    //we can use takeUntillDestroyed only in Constructor .we cant use in  ngOninit
    // this._userListService
    //   .getAll()
    //   .pipe(takeUntilDestroyed())
    //   .subscribe({
    //     next: (data) => {
    //       console.log(data);
    //       const Result = data;
    //       this.dataSource = Result;
    //     },
    //   });
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    // Angular v16 feature .
    //this make our application free from memory leakage
    //if we can use takeUntillDestroyed this the another method for to destroy our subscription

    const destroyed = new Subject();
    this._destroyRef.onDestroy(() => {
      destroyed.next(destroyed);
      destroyed.complete();
    });
    this._userListService
      .getAll()
      .pipe(takeUntil(destroyed))
      .subscribe({  
        next: (value) => {
          console.log(value);
          this.dataSource = value;
          // for (const object of this.dataSource) {
          //   console.log(object.username);
          // }
        },
      });
  }

  onEdit(e: any) {}
  onDelete(e: any) {}
  exportExcel() {
    const columnsToExclude: string[] = ['actions'];

    const originalDisplayedColumns = [...this.displayedColumns];
    this.displayedColumns = this.displayedColumns.filter(
      (column) => !columnsToExclude.includes(column)
    );
    console.log(this.displayedColumns);

    Swal.fire({
      title: 'File Name ',
      input: 'email',
      inputLabel: 'Enter the file name that you need ',
      inputPlaceholder: 'Enter the file name',
      showCancelButton: true,
      confirmButtonText: 'Export',
      confirmButtonColor: '#1783aa',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#D0312D',
      showCloseButton: true,
      //})

      // Use SweetAlert2 to get the file name
      // Swal.fire({
      //   title: 'Enter file name:',

      //   input: 'text',
      //   padding: '80px',
      //   inputPlaceholder: 'Enter a file name...',
      //   showCancelButton: true,
      //   confirmButtonText: 'Export',
      //   confirmButtonColor:'#1783aa',
      //   cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value || value.trim().length === 0) {
          return 'enter file name';
        }
        return null; // Return null for valid input
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const fileName = result.value || 'SheetJS';

        // Export the data
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
          this.table.nativeElement
        );
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Restore the original displayed columns
        this.displayedColumns = originalDisplayedColumns;

        /* save to file */
        XLSX.writeFile(wb, `${fileName}.xlsx`);
      } else {
        // If the user clicks Cancel, restore the original displayed columns
        this.displayedColumns = originalDisplayedColumns;
      }
    });
  }
}
// function takeUntilDestroyed(): import('rxjs').OperatorFunction<
//   Users[],
//   unknown
// > {
//   throw new Error('Function not implemented.');
// }
