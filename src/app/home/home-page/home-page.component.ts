import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { TokenService } from 'src/app/core/token/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  mobileQuery: MediaQueryList;
  public first: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public tokenService: TokenService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(){
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }

}
