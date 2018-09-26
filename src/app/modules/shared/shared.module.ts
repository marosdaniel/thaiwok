import {NgModule} from '@angular/core';
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {

}
