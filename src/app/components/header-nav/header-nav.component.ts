import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/user-authentication.service';
import { UserStateChangeService } from '../../services/user-state-change.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class HeaderNavComponent implements OnInit {
  private userLoggedIn: boolean = false;
  private isUserLoggedIn: boolean = false;
  private currentState: string;

  constructor(private location: Location, private router: Router, private authenticationService: AuthenticationService, private userStateChangeService: UserStateChangeService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authenticationService.isUserAuthenticated();

    this.computeCurrentState();

    this.authenticationService.getUserAuthenticatedEventStream().distinctUntilChanged()
      .subscribe(userLoggedSuccess => this.isUserLoggedIn = userLoggedSuccess);
  }

  computeCurrentState() {
    if (this.location.path().indexOf("search") > -1) this.currentState = "search";
    else this.currentState = "reservations";
  }
  
  handleLoginOutcome(loginSuccess: boolean) {
    if (loginSuccess) {
      this.isUserLoggedIn = true;
    }
  }

  changeState(newState: string) {
    this.currentState = newState;
    this.userStateChangeService.stateChangesStream.next(newState);
  }

}
