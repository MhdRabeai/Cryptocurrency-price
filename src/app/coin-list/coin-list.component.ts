import { CurrencyService } from './../services/currency.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
})
export class CoinListComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'img',
    'symbol',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  bannerData: any = [];
  currency: string = 'INR';
  constructor(
    private api: ApiService,
    private router: Router,
    private currencyService: CurrencyService
  ) {}
  ngOnInit() {
    this.getAllData();
    this.getBannerData();
    this.currencyService.getCurrency().subscribe((res) => {
      this.currency = res;
      this.getAllData();
      this.getBannerData();
    });
  }
  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((res) => {
      this.bannerData = res;
    });
  }
  getAllData() {
    this.api.getCurrency(this.currency).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  goToDetalis(row: any) {
    this.router.navigate(['coin-detail', row.id]);
  }
}
