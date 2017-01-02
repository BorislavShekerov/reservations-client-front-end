import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../../../services/user-authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [AuthenticationService]
})
export class LoginFormComponent {
  private loginForm: FormGroup;

  private invalidLogin: boolean = false;
  private loading: boolean = false;
  @Output() loginOutcome: EventEmitter<boolean> = new EventEmitter();

  constructor(private authenticationService: AuthenticationService, fb: FormBuilder) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, <any>Validators.pattern(emailRegex)])],
      'password': [null, Validators.required],
    });
  }

  submitLoginForm($form) {
    this.loading = true;

    setTimeout(() => {
      this.authenticationService.authorizeUser($form.email, $form.password).subscribe(loginValid => {
        if (!loginValid) {
          this.invalidLogin = false;
          this.loading = false;
          this.loginOutcome.next(false);

        } else {
          // this.modal.close('Authentication success');
          // this.router.navigate(['app/' + this.location.path()]);
          this.loading = false;
          this.loginOutcome.next(true);
        }
      });
    }, 1500);

  }
}
