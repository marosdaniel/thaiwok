import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpLoaderFactory {
  constructor(http: HttpClient) {
    return new TranslateHttpLoader(http);
  }
}
