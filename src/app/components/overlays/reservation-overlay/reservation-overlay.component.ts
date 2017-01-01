import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService, UserRegistrationResponse, EMAIL_TAKEN } from '../../../services/user-authentication.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../../../model/user';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-overlay',
  templateUrl: './reservation-overlay.component.html',
  styleUrls: ['./reservation-overlay.component.scss'],
  providers: [AuthenticationService, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class ReservationOverlayComponent implements OnInit {

  private loginForm: FormGroup;
  private registrationForm: FormGroup;

  private invalidLogin: boolean = false;
  private loading: boolean = false;
  private invalidRegistrationError: boolean = false;
  private invalidRegistrationEmailTaken: boolean = false;
  private successfulRegistration: boolean = false;

  private user: User;
  @ViewChild('passwordField') passwordField: ElementRef;

  constructor(private modal: NgbActiveModal, private authenticationService: AuthenticationService, fb: FormBuilder, private location: Location, private router: Router) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, <any>Validators.pattern(emailRegex)])],
      'password': [null, Validators.required],
    });

    this.user = { email: "", password: "", phoneNumber: "" };

    this.registrationForm = fb.group({
      'email': [this.user.email, [Validators.required, <any>Validators.pattern(emailRegex)]],
      'password': [this.user.password, [Validators.required, Validators.minLength(8), Validators.required]],
      'passwordRepeat': [null, this.passwordsMatch()],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required]
    });
  }

  passwordsMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let passwordToMatch = "";
      const repeatedPaswordValue = control.value;
      if (this.passwordField) {
        passwordToMatch = this.passwordField.nativeElement.value;
      }

      return repeatedPaswordValue !== passwordToMatch ? { 'passwordNotMatching': { repeatedPaswordValue } } : null;
    };
  }

  ngOnInit() {
  }

  submitRegistrationForm(userDetails) {
    this.loading = true;

    setTimeout(() => {
      this.authenticationService.registerUser(userDetails).subscribe((registrationResponse: UserRegistrationResponse) => {
        if (!registrationResponse.isSuccessful) {
          if (registrationResponse.failureReason == EMAIL_TAKEN) {
            this.invalidRegistrationEmailTaken = true;
          } else {
            this.invalidRegistrationError = true;
          }
        } else {
          this.successfulRegistration = true;
        }

        this.loading = false;
      });
    }, 1500);
  }

  submitLoginForm($form) {
    this.loading = true;

    setTimeout(() => {
      this.authenticationService.authorizeUser($form.email, $form.password).subscribe(loginValid => {
        if (!loginValid) {
          this.invalidLogin = loginValid;
          this.loading = false;
        } else {
          this.modal.close('Authentication success');
          this.router.navigate(['app/' + this.location.path()]);
          this.loading = false;
        }
      });
    }, 1500);



  }

}
