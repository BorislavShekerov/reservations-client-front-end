import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/user-authentication.service';
import { UserStateChangeService } from '../../services/user-state-change.service';
import { User } from '../../model/user';

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
  private userDetails: User;
  private signInFormVisible: boolean;
  
  constructor(private location: Location, private router: Router, private authenticationService: AuthenticationService, private userStateChangeService: UserStateChangeService) { }

  ngOnInit() {
    this.isUserLoggedIn = this.authenticationService.isUserAuthenticated();
    if (this.isUserLoggedIn) {
      this.userDetails = JSON.parse(localStorage.getItem("currentUser"));
    }

    this.computeCurrentState();
    this.registerAuthenticationListener();
  }

  computeCurrentState() {
    if (this.location.path().indexOf("search") > -1) this.currentState = "search";
    else this.currentState = "reservations";
  }

  handleLoginOutcome(loginSuccess: boolean) {
    if (loginSuccess) {
      this.isUserLoggedIn = true;
      this.signInFormVisible = false;
    }
  }

  changeState(newState: string) {
    this.currentState = newState;
    this.userStateChangeService.stateChangesStream.next(newState);
  }

  registerAuthenticationListener() {
    this.authenticationService.getUserAuthenticatedEventStream().distinctUntilChanged()
      .subscribe(userLoggedSuccess => { 
        this.isUserLoggedIn = userLoggedSuccess;
        if(userLoggedSuccess){
          this.userDetails = JSON.parse(localStorage.getItem("currentUser"));
        }
      });
  }

  logUserOut(){
    this.authenticationService.logUserOut();
  }

}
