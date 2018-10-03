import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

// COMPONENTS
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';

// PIPES
import {FilterPipe} from '../../pipes/filter.pipe';
import {SortPipe} from '../../pipes/sort.pipe';
import {RemoveConfirmationModalComponent} from '../../components/modals/remove-confirmation-modal/remove-confirmation-modal.component';
import {SuccessOrderModalComponent} from '../../components/modals/success-order-modal/success-order-modal.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
    RemoveConfirmationModalComponent,
    SuccessOrderModalComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
    RemoveConfirmationModalComponent,
    SuccessOrderModalComponent
  ]
})
export class SharedModule {

}
