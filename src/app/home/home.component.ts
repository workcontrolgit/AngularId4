import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { DataService } from './data.service';
import { Logger} from '@core';
import {PersonQuery} from '@app/models/person.query'

const log = new Logger('App');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  webapiData$: PersonQuery;

  constructor(private quoteService: QuoteService,private dataService: DataService) {}

  ngOnInit() {
    log.debug('init');


    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
  }
  callapi() {
    this.isLoading = true;
    this.dataService.getPersons()
    .pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
  .subscribe((data) =>  {
        this.webapiData$ = data;
        log.debug('this.webapiData$ ' + JSON.stringify(this.webapiData$));
        log.debug(JSON.stringify(data));
      });
  }    
}
