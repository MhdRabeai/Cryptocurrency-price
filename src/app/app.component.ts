import { CurrencyService } from './services/currency.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Cryptocurrency-price-tracker';
  selectedCurrency: string = 'INR';
  constructor(private currencyService: CurrencyService) {}
  sendCurrency(event: any) {
    this.currencyService.setCurrency(event);
  }
}
