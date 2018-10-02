import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

// COMPONENTS
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';

// PIPES
import {FilterPipe} from '../../pipes/filter.pipe';
import {SortPipe} from '../../pipes/sort.pipe';
import {RemoveConfirmationModalComponent} from '../../components/modals/remove-confirmation-modal/remove-confirmation-modal.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
    RemoveConfirmationModalComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    FilterPipe,
    SortPipe,
    RemoveConfirmationModalComponent
  ]
})
export class SharedModule {

}
