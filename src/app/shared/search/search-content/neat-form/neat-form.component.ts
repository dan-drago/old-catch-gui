import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-neat-form',
  templateUrl: './neat-form.component.html',
  styleUrls: ['./neat-form.component.scss']
})
export class NeatFormComponent implements OnInit {
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
    this.router.navigate(['neat'], navigationExtras);
  }

  isFormSubmittable() {
    return true;
    // return !!this.form!.get('objid')!.value;
  }
}
