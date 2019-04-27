import { Component, OnInit, ViewChild, ApplicationRef, ChangeDetectorRef, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { SidenavService } from '../../_services/sideNavService';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  NavigationError,
  Router
} from '@angular/router';
import { MatTableDataSource, MatPaginator, MatDialog, MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from 'src/app/_services';


@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('snav') public sidenav: MatSidenav;
  title = '| ATS';
  loading = true;
  color = 'accent';
  mode = 'indeterminate';
  value = 30;
  bufferValue = 55;
  user;
  mobileQuery: MediaQueryList;
  enableClassCombination = true;
  private _mobileQueryListener: () => void;
  constructor(
    private router: Router,
    private sidenavService: SidenavService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    private auth: AuthenticationService,
  ) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          setTimeout(() => {
            this.loading = false;
          }, 500);
          break;
        }
        default: {
          break;
        }
      }
    });
    this.mobileQuery = media.matchMedia('(max-width: 500px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
    this.user = this.auth.currentUserValue;
  }

  // toggleSettings(): void {
  //   const dialogRef = this.dialog.open(RegisterComponent, {
  //     width: '600px',
  //     disableClose: false,
  //     data: {

  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // if (!result.invalid) { this.generateTimeTable(); }
  //   });
  // }
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(TableSetupComponent, {
  //     width: '600px',
  //     disableClose: false,
  //     data: {

  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // if (!result.invalid) { this.tableGen.triggerGenerateTimeTable(); }
  //   });
  // }
}
