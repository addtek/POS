import {
  Injectable
} from '@angular/core';
import {
  Router,
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';

import {
  AuthenticationService, UserService,
} from '../_services';
import {StockComponent} from '../components/stock/stock.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CanDeactivateGuard implements CanDeactivate <StockComponent> {
    constructor(
      private dialog: MatDialog,
      public route: ActivatedRoute
    ) {}
  canDeactivate(component: StockComponent): boolean | Observable<boolean> | Promise<boolean> {
    if (component.hasUnsavedData()) {
      if (confirm('You have unsaved changes! If you leave, your changes will be lost.')) {
        return true;
      } else {
        return false;
      }
    }
    return true;
//  console.log(this.route.url);
//     if (component.hasUnsavedData()) {
      // const dialogRef = this.dialog.open(DialogComponent, {
      //   width: '400px',
      //   data: {itemName: null, message: 'You have unsaved changes! If you leave, your changes will be lost.'}
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //     confirm =  result.confirm;
      //     if (confirm !== undefined) {
      //         return confirm;
      //       }
      //   });
      return component.confirm();

    // } else {
    //   return true;
    // }
  }
}
