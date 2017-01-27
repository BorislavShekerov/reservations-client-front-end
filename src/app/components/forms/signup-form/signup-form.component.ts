import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService, UserRegistrationResponse, EMAIL_TAKEN } from '../../../services/user-authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  private registrationForm: FormGroup;

  private loading: boolean = false;
  private invalidRegistrationError: boolean = false;
  private invalidRegistrationEmailTaken: boolean = false;
  private successfulRegistration: boolean = false;
  @Output() registrationOutcome: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('passwordField') passwordField: ElementRef;

  constructor(private authenticationService: AuthenticationService, fb: FormBuilder) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.registrationForm = fb.group({
      'email': [null, [Validators.required, <any>Validators.pattern(emailRegex)]],
      'password': [null, [Validators.required, Validators.minLength(8), Validators.required]],
      'passwordRepeat': [null, this.passwordsMatch()],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required]
    });
  }

  ngOnInit() {
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

  submitRegistrationForm(userDetails) {
    this.loading = true;

    this.authenticationService.registerUser(userDetails).subscribe((registrationResponse: UserRegistrationResponse) => {
      if (!registrationResponse.isSuccessful) {
        if (registrationResponse.failureReason == EMAIL_TAKEN) {
          this.invalidRegistrationEmailTaken = true;
        } else {
          this.invalidRegistrationError = true;
        }
      } else {
        this.successfulRegistration = true;
        this.registrationOutcome.next(true);
      }

      this.loading = false;
    });
  }

}
