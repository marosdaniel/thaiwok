import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MDBModalRef, ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-remove-confirmation-modal',
  templateUrl: './remove-confirmation-modal.component.html',
  styleUrls: ['./remove-confirmation-modal.component.scss']
})
export class RemoveConfirmationModalComponent implements OnInit, AfterViewInit {
  @ViewChild('frame') modalContent: any;

  constructor(private modal: ModalDirective) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  public openModal() {
    this.modalContent.show();
  }

}
