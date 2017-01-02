import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  private signInFormVisible: boolean = false;
  constructor(private location: Location, private router: Router) { }

  ngOnInit() {
  }

  handleLoginOutcome(loginSuccess: boolean) {
    if (loginSuccess) {
      this.router.navigate(['app/' + this.location.path()]);
    }
  }

}
