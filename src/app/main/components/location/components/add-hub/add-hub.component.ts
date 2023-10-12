import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/main/services/location.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-hub',
  templateUrl: './add-hub.component.html',
  styleUrls: ['./add-hub.component.css']
})
export class AddHubComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }

  form!: FormGroup;
  stateId!: number[];
  state!: any;
  Hub!: any;
  /**----Get Id from Select------ */

  _service = inject(LocationService);
  BaseUrl = environment.apiUrl;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      location: ['', Validators.required],
      state:['',Validators.required],
      hub:['',Validators.required],
      stId: ['', Validators.required],
      hubId: ['', Validators.required],
    });
    // this._service.getState().subscribe({
    //   next: (data) => {
    //     this.state = data;
    //   },
    // });
  }

  onSelectState() {
    debugger;
    const StateId = this.form.get('stId')?.value;
    this._service.getHub(StateId).subscribe({
      next: (HUB) => {
        this.Hub = HUB;
      },
    });
  }

  OnSubmit() {
    if (this.form.valid) {
      const stateId = this.form.get('stId')?.value;
      const hubId = this.form.get('hubId')?.value;
      const location = this.form.get('location')?.value;
      const Flag = '1';
      this._service.addLocation(location, stateId, hubId, Flag).subscribe({
        next: (value) => {
          const message = value;
          for (const v of message) {
            this.showAlert(v.message);
          }
        },
      });
    }
    this.form.reset();
  }
  showAlert(message: string) {
    Swal.fire({
      text: message,
    });
  }

}
