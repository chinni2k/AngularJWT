import { FormControl, FormGroup } from '@angular/forms';

export class FormValidator {
  static validateAllFormsFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((i) => {
      const controls = formGroup.get(i);
      if (controls instanceof FormControl) {
        controls.markAsDirty({ onlySelf: true });
      } else if (controls instanceof FormGroup) {
        this.validateAllFormsFields(controls);
      }
    });
  }
}
