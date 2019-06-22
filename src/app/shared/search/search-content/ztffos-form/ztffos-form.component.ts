import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ztffos-form',
  templateUrl: './ztffos-form.component.html',
  styleUrls: ['./ztffos-form.component.scss']
})
export class ZtffosFormComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      objid: new FormControl('', { validators: [] }),
      seeing: new FormControl('', { validators: [] }),
      maglimit: new FormControl('', { validators: [] })
    });
  }

  onSubmit() {
    const navigationExtras: NavigationExtras = {
      state: {
        objid: this.form!.get('objid')!.value
      }
    };
    this.router.navigate(['ztffos'], navigationExtras);
  }

  isFormSubmittable() {
    return true;
  }
}
