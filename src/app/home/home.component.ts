import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Logger } from '@core';
import { PersonQuery } from '@app/models/person-query';

import { ApiHttpService } from '@core/services/api-http.service';
import { ApiEndpointsService } from '@core/services/api-endpoints.service';


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

  constructor(
    // Application Services
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService) { }

  ngOnInit() {
    log.debug('init');
  }

  callapi() {
    this.isLoading = true;
    this.apiHttpService
      .get(this.apiEndpointsService.getPersonsEndpoint())
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.webapiData$ = data;
      });
  }

}
