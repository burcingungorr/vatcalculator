import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculatorComponent],
  template: `
    <div class="app-container">
      <app-calculator></app-calculator>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding:5px;
    }

  `]
})
export class AppComponent {}