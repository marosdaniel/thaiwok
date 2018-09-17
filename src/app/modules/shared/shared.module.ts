import {NgModule} from '@angular/core';
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {

}
