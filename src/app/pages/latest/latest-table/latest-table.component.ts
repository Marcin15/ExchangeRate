import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LatestDto } from 'src/app/models/dtos/latestDto';

@Component({
  selector: 'app-latest-table',
  templateUrl: './latest-table.component.html',
  styleUrls: ['./latest-table.component.scss']
})
export class LatestTableComponent implements OnInit {

  @Input() latestData!: LatestDto[];

  constructor() { }

  ngOnInit(): void {
  }

  // isRateChangeNegative() {
  //   let rateChange = this.latestData.
  // }

}
