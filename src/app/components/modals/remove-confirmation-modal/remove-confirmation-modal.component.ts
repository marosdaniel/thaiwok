import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-remove-confirmation-modal',
  templateUrl: './remove-confirmation-modal.component.html',
  styleUrls: ['./remove-confirmation-modal.component.scss']
})
export class RemoveConfirmationModalComponent implements OnInit, AfterViewInit {
  @ViewChild('basicModal') basicModal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.openModal();
  }

  public openModal() {
    this.basicModal.show();
  }

}
