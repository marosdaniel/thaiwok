import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

// COMPONENTS
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';

// PIPES
import {FilterPipe} from '../../pipes/filter.pipe';
import {SortPipe} from '../../pipes/sort.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
  ]
})
export class SharedModule {

}
