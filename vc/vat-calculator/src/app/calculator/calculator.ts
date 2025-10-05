import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ApiService } from '../services/api';

@Component({
  selector: 'app-calculator', 
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class CalculatorComponent implements OnInit {
  form: FormGroup;
  result: any = null;

  constructor(private fb: FormBuilder, private api: ApiService) {

    this.form = this.fb.group({
      inclusive: [100, [Validators.required]],     //  ana tutar
      levyPercent: [1, [Validators.required]],      // Levy oranı
      getFundPercent: [2.5, [Validators.required]], // GET Fund oranı
      covidPercent: [1, [Validators.required]],     // Covid oranı
      nhilPercent: [2.5, [Validators.required]],    // NHIL oranı
      vatPercent: [15, [Validators.required]],      // KDV oranı
    });
  }

  // bileşen açıldığında
  ngOnInit(): void {
    this.form.get('inclusive')!.valueChanges.pipe(
      debounceTime(500),          
    ).subscribe((val) => {
      if (this.form.valid && val !== null && val !== '') {
        this.calculate();
      }
    });
  }

  // hesaplama işlemi
  calculate(): void {
    if (this.form.invalid) return;

    this.api.calculate(this.form.value).subscribe({
      next: (res) => this.result = res,   
      error: (err) => console.error(err)  
    });
  }
}
