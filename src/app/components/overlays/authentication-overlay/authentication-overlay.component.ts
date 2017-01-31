import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../services/user-authentication.service';

@Component({
  selector: 'app-authentication-overlay',
  templateUrl: './authentication-overlay.component.html',
  styleUrls: ['./authentication-overlay.component.scss']
})
export class AuthenticationOverlayComponent implements OnInit {

  constructor(private modal: NgbActiveModal, private location: Location, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  handleLoginOutcome(loginSuccess: boolean) {
    if (loginSuccess) {
      this.modal.close('Authentication success');
      this.authenticationService.userAuthenticatedEventStream.next(true);
    }
  }

  handleRegistrationOutcome(registrationSuccess: boolean){
    if(registrationSuccess){

    }
  }
}
